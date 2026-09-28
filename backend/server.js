const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
const orderSchema = require("./models/Order");
const cartSchema = require("./models/Cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middlewares/auth");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=>{
    console.log("MongoDB connection failed",err)
})

// ─── Per-user dynamic model helpers ──────────────────────────────────────────
// Mongoose caches models by name; we use a unique name per user so each user
// gets their own collection (orders_<userId> and cart_<userId>).

function getUserOrderModel(userId) {
    const modelName = `orders_${userId}`;
    // Return cached model if already registered, else create it
    if (mongoose.modelNames().includes(modelName)) {
        return mongoose.model(modelName);
    }
    return mongoose.model(modelName, orderSchema, modelName);
}

function getUserCartModel(userId) {
    const modelName = `cart_${userId}`;
    if (mongoose.modelNames().includes(modelName)) {
        return mongoose.model(modelName);
    }
    return mongoose.model(modelName, cartSchema, modelName);
}

// Creates (initialises) a user's order and cart collections in MongoDB by
// inserting and immediately removing a placeholder document.  This ensures the
// collections exist as soon as the account is created.
async function initUserCollections(userId) {
    const OrderModel = getUserOrderModel(userId);
    const CartModel  = getUserCartModel(userId);

    // Insert a placeholder then delete it so the collection is created on disk
    const orderPlaceholder = await OrderModel.create({
        _placeholder: true,
        userId,
        username: "__init__",
        productId: "__init__",
        productName: "__init__",
        price: 0,
        quantity: 1,
        totalPrice: 0
    });
    await OrderModel.deleteOne({ _id: orderPlaceholder._id });

    const cartPlaceholder = await CartModel.create({
        _placeholder: true,
        userId,
        productId: "__init__",
        productName: "__init__",
        price: 0
    });
    await CartModel.deleteOne({ _id: cartPlaceholder._id });
}
// ─────────────────────────────────────────────────────────────────────────────

app.post("/api/auth/signup", async (req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    const normalisedUsername = username.trim().toLowerCase();
    const normalisedEmail = email.trim().toLowerCase();

    if(!isNaN(normalisedUsername.charAt(0))){
        return res.status(400).json({
            message:"First character of the username can't be a number"
        })
    }

    if(password.length < 8){
        return res.status(400).json({
            message:"Password must be atleast 8 characters long"
        })
    }

    const existingUser = await User.findOne({
        $or: [
            {username : normalisedUsername},
            {email : normalisedEmail}
        ]
    })

    if(existingUser){
        return res.status(409).json({
            message:"Username or email already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        username: normalisedUsername,
        email: normalisedEmail,
        password: hashedPassword
    })

    // Initialise dedicated orders and cart collections for this user
    await initUserCollections(user._id);

    res.status(201).json({
        message: "Account created successfully"
    })
})

app.post("/api/auth/signin", async (req, res) => {
    const { email, password } = req.body;

    const normalisedEmail = (email || "").trim().toLowerCase();

    if (!password || password.length < 8) {
        return res.status(400).json({
            message: "password must be 8 characters long"
        });
    }

    const user = await User.findOne({ email: normalisedEmail });

    if (!user) {
        return res.status(400).json({
            message: "user doesn't exist"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "password is invalid"
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "sign in successful",
        username: user.username
    });
})

app.post("/api/auth/signout", (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message:"Signed out successfully"
    })
})

app.get("/api/auth/me", authenticateToken, (req,res)=>{
    res.status(200).json({
        user: req.user
    })
})

app.get("/api/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const skip = parseInt(req.query.skip) || 0;
        const products = await Product.find({}).skip(skip).limit(limit);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products", error: err.message });
    }
});

app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({
            message: `Failed to fetch product due to ${err}`
        });
    }
});

// ─── Orders (per-user collection) ────────────────────────────────────────────

app.post("/api/orders", authenticateToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock" });
        }

        const totalPrice = parseFloat((product.price * quantity).toFixed(2));

        const OrderModel = getUserOrderModel(req.user.id);

        const order = await OrderModel.create({
            userId: req.user.id,
            username: req.user.username,
            productId: product._id.toString(),
            productName: product.name,
            productImage: product.imageUrl,
            price: product.price,
            quantity,
            totalPrice
        });

        await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
        res.status(500).json({ message: "Failed to place order", error: err.message });
    }
});

app.get("/api/orders", authenticateToken, async (req, res) => {
    try {
        const OrderModel = getUserOrderModel(req.user.id);
        const orders = await OrderModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders", error: err.message });
    }
});

// ─── Cart (per-user collection) ──────────────────────────────────────────────

// Get all cart items for the logged-in user
app.get("/api/cart", authenticateToken, async (req, res) => {
    try {
        const CartModel = getUserCartModel(req.user.id);
        const items = await CartModel.find({ userId: req.user.id });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cart", error: err.message });
    }
});

// Add a product to cart (or increment quantity if it already exists)
app.post("/api/cart", authenticateToken, async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const CartModel = getUserCartModel(req.user.id);

        // Upsert: if product already in cart, increment quantity
        const existing = await CartModel.findOne({ userId: req.user.id, productId: product._id.toString() });

        if (existing) {
            const newQty = existing.quantity + quantity;
            if (newQty > product.stock) {
                return res.status(400).json({ message: "Not enough stock" });
            }
            existing.quantity = newQty;
            await existing.save();
            return res.status(200).json({ message: "Cart updated", item: existing });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ message: "Not enough stock" });
        }

        const item = await CartModel.create({
            userId: req.user.id,
            productId: product._id.toString(),
            productName: product.name,
            productImage: product.imageUrl,
            price: product.price,
            quantity
        });

        res.status(201).json({ message: "Added to cart", item });
    } catch (err) {
        res.status(500).json({ message: "Failed to add to cart", error: err.message });
    }
});

// Update quantity of a specific cart item
app.patch("/api/cart/:itemId", authenticateToken, async (req, res) => {
    try {
        const { quantity } = req.body;
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const CartModel = getUserCartModel(req.user.id);
        const item = await CartModel.findOneAndUpdate(
            { _id: req.params.itemId, userId: req.user.id },
            { quantity },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item updated", item });
    } catch (err) {
        res.status(500).json({ message: "Failed to update cart item", error: err.message });
    }
});

// Remove a specific item from cart
app.delete("/api/cart/:itemId", authenticateToken, async (req, res) => {
    try {
        const CartModel = getUserCartModel(req.user.id);
        const result = await CartModel.findOneAndDelete({ _id: req.params.itemId, userId: req.user.id });

        if (!result) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove cart item", error: err.message });
    }
});

// Clear the entire cart for the logged-in user
app.delete("/api/cart", authenticateToken, async (req, res) => {
    try {
        const CartModel = getUserCartModel(req.user.id);
        await CartModel.deleteMany({ userId: req.user.id });
        res.status(200).json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: "Failed to clear cart", error: err.message });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})