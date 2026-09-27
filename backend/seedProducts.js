const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  {
    id: 1,
    name: "Classic White Sneakers",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    stock: 24,
    category: "Footwear",
    price: 2499,
    rating: 4.5
  },
  {
    id: 2,
    name: "Running Shoes",
    imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
    stock: 0,
    category: "Footwear",
    price: 3299,
    rating: 2.8
  },
  {
    id: 3,
    name: "Oversized Cotton T-Shirt",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    stock: 42,
    category: "Clothing",
    price: 899,
    rating: 3.7
  },
  {
    id: 4,
    name: "Denim Jacket",
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0",
    stock: 0,
    category: "Clothing",
    price: 2199,
    rating: 4.1
  },
  {
    id: 5,
    name: "Wireless Headphones",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    stock: 31,
    category: "Electronics",
    price: 4999,
    rating: 4.9
  },
  {
    id: 6,
    name: "Wireless Mouse",
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    stock: 56,
    category: "Electronics",
    price: 1299,
    rating: 3.2
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    stock: 7,
    category: "Electronics",
    price: 3999,
    rating: 4.7
  },
  {
    id: 8,
    name: "Smart Watch",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    stock: 0,
    category: "Electronics",
    price: 5999,
    rating: 2.4
  },
  {
    id: 9,
    name: "Leather Backpack",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 17,
    category: "Bags",
    price: 2799,
    rating: 4.6
  },
  {
    id: 10,
    name: "Canvas Tote Bag",
    imageUrl: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c",
    stock: 0,
    category: "Bags",
    price: 799,
    rating: 3.1
  },
  {
    id: 11,
    name: "Aviator Sunglasses",
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    stock: 28,
    category: "Accessories",
    price: 1499,
    rating: 4.0
  },
  {
    id: 12,
    name: "Classic Leather Wallet",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    stock: 44,
    category: "Accessories",
    price: 999,
    rating: 2.9
  },
  {
    id: 13,
    name: "Stainless Steel Water Bottle",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    stock: 63,
    category: "Home",
    price: 699,
    rating: 4.3
  },
  {
    id: 14,
    name: "Minimal Desk Lamp",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    stock: 0,
    category: "Home",
    price: 1599,
    rating: 1.9
  },
  {
    id: 15,
    name: "Ceramic Coffee Mug",
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    stock: 75,
    category: "Home",
    price: 499,
    rating: 3.5
  },
  {
    id: 16,
    name: "Organic Green Tea",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
    stock: 38,
    category: "Food",
    price: 349,
    rating: 4.8
  },
  {
    id: 17,
    name: "Dark Chocolate Bar",
    imageUrl: "https://images.unsplash.com/photo-1575377427642-087cf684f29d",
    stock: 0,
    category: "Food",
    price: 199,
    rating: 3.0
  },
  {
    id: 18,
    name: "Yoga Mat",
    imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
    stock: 26,
    category: "Fitness",
    price: 1299,
    rating: 4.4
  },
  {
    id: 19,
    name: "Adjustable Dumbbells",
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    stock: 3,
    category: "Fitness",
    price: 4499,
    rating: 2.2
  },
  {
    id: 20,
    name: "Travel Neck Pillow",
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    stock: 0,
    category: "Travel",
    price: 899,
    rating: 3.9
  },

  {
    id: 21,
    name: "Black Running Shoes",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    stock: 19,
    category: "Footwear",
    price: 2899,
    rating: 4.2
  },
  {
    id: 22,
    name: "Casual Canvas Shoes",
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    stock: 34,
    category: "Footwear",
    price: 1799,
    rating: 3.8
  },
  {
    id: 23,
    name: "Leather Formal Shoes",
    imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
    stock: 8,
    category: "Footwear",
    price: 3499,
    rating: 4.6
  },
  {
    id: 24,
    name: "High Top Sneakers",
    imageUrl: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
    stock: 0,
    category: "Footwear",
    price: 2799,
    rating: 3.4
  },
  {
    id: 25,
    name: "Summer Flip Flops",
    imageUrl: "https://images.unsplash.com/photo-1603487742131-4160ec999306",
    stock: 51,
    category: "Footwear",
    price: 599,
    rating: 4.1
  },

  {
    id: 26,
    name: "Basic Black T-Shirt",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    stock: 67,
    category: "Clothing",
    price: 699,
    rating: 4.2
  },
  {
    id: 27,
    name: "Oversized Black Hoodie",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    stock: 23,
    category: "Clothing",
    price: 1899,
    rating: 4.7
  },
  {
    id: 28,
    name: "Slim Fit Jeans",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    stock: 15,
    category: "Clothing",
    price: 2299,
    rating: 4.0
  },
  {
    id: 29,
    name: "Cotton Polo Shirt",
    imageUrl: "https://images.unsplash.com/photo-1625910513413-5fc45e4d7f31",
    stock: 32,
    category: "Clothing",
    price: 1199,
    rating: 3.9
  },
  {
    id: 30,
    name: "Winter Wool Sweater",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
    stock: 0,
    category: "Clothing",
    price: 2499,
    rating: 4.5
  },

  {
    id: 31,
    name: "Bluetooth Speaker",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    stock: 27,
    category: "Electronics",
    price: 2199,
    rating: 4.4
  },
  {
    id: 32,
    name: "USB-C Fast Charger",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
    stock: 84,
    category: "Electronics",
    price: 999,
    rating: 4.1
  },
  {
    id: 33,
    name: "Portable Power Bank",
    imageUrl: "https://images.unsplash.com/photo-1609592424146-6e9e9c8c8e47",
    stock: 41,
    category: "Electronics",
    price: 1599,
    rating: 3.8
  },
  {
    id: 34,
    name: "Wireless Earbuds",
    imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1",
    stock: 29,
    category: "Electronics",
    price: 2999,
    rating: 4.6
  },
  {
    id: 35,
    name: "Webcam HD 1080p",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
    stock: 12,
    category: "Electronics",
    price: 2499,
    rating: 3.6
  },
  {
    id: 36,
    name: "Smartphone Stand",
    imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb",
    stock: 73,
    category: "Electronics",
    price: 499,
    rating: 4.3
  },
  {
    id: 37,
    name: "USB Mechanical Keypad",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    stock: 6,
    category: "Electronics",
    price: 1899,
    rating: 4.0
  },
  {
    id: 38,
    name: "LED Gaming Mouse",
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    stock: 0,
    category: "Electronics",
    price: 1799,
    rating: 2.7
  },
  {
    id: 39,
    name: "Tablet Sleeve",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    stock: 36,
    category: "Electronics",
    price: 899,
    rating: 4.2
  },
  {
    id: 40,
    name: "Smart LED Bulb",
    imageUrl: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2",
    stock: 45,
    category: "Electronics",
    price: 799,
    rating: 3.9
  },

  {
    id: 41,
    name: "Travel Backpack",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 21,
    category: "Bags",
    price: 2399,
    rating: 4.5
  },
  {
    id: 42,
    name: "Laptop Backpack",
    imageUrl: "https://images.unsplash.com/photo-1556306535-38febf6782e7",
    stock: 18,
    category: "Bags",
    price: 3199,
    rating: 4.7
  },
  {
    id: 43,
    name: "Mini Shoulder Bag",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    stock: 13,
    category: "Bags",
    price: 1499,
    rating: 3.8
  },
  {
    id: 44,
    name: "Gym Duffel Bag",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 9,
    category: "Bags",
    price: 1999,
    rating: 4.2
  },
  {
    id: 45,
    name: "Compact Sling Bag",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
    stock: 0,
    category: "Bags",
    price: 1299,
    rating: 3.3
  },

  {
    id: 46,
    name: "Polarized Sunglasses",
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    stock: 25,
    category: "Accessories",
    price: 1799,
    rating: 4.4
  },
  {
    id: 47,
    name: "Classic Baseball Cap",
    imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
    stock: 48,
    category: "Accessories",
    price: 599,
    rating: 3.7
  },
  {
    id: 48,
    name: "Leather Belt",
    imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc",
    stock: 31,
    category: "Accessories",
    price: 899,
    rating: 4.1
  },
  {
    id: 49,
    name: "Minimalist Wrist Watch",
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    stock: 14,
    category: "Accessories",
    price: 2499,
    rating: 4.6
  },
  {
    id: 50,
    name: "Silver Chain Bracelet",
    imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d",
    stock: 0,
    category: "Accessories",
    price: 1199,
    rating: 3.0
  },

  {
    id: 51,
    name: "Wooden Wall Clock",
    imageUrl: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    stock: 17,
    category: "Home",
    price: 1399,
    rating: 4.2
  },
  {
    id: 52,
    name: "Decorative Plant Pot",
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    stock: 34,
    category: "Home",
    price: 699,
    rating: 4.5
  },
  {
    id: 53,
    name: "Soft Throw Pillow",
    imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2",
    stock: 22,
    category: "Home",
    price: 599,
    rating: 3.9
  },
  {
    id: 54,
    name: "Cotton Bedsheet Set",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    stock: 11,
    category: "Home",
    price: 1899,
    rating: 4.3
  },
  {
    id: 55,
    name: "Scented Candle",
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59",
    stock: 0,
    category: "Home",
    price: 449,
    rating: 3.2
  },

  {
    id: 56,
    name: "Arabica Coffee Beans",
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
    stock: 29,
    category: "Food",
    price: 599,
    rating: 4.8
  },
  {
    id: 57,
    name: "Premium Black Tea",
    imageUrl: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9",
    stock: 43,
    category: "Food",
    price: 399,
    rating: 4.2
  },
  {
    id: 58,
    name: "Mixed Dry Fruits",
    imageUrl: "https://images.unsplash.com/photo-1599599810694-b5ac4ddc1a38",
    stock: 18,
    category: "Food",
    price: 899,
    rating: 4.6
  },
  {
    id: 59,
    name: "Organic Honey",
    imageUrl: "https://images.unsplash.com/photo-1471943311424-646960669fbc",
    stock: 24,
    category: "Food",
    price: 499,
    rating: 4.4
  },
  {
    id: 60,
    name: "Oatmeal Cookies",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    stock: 0,
    category: "Food",
    price: 299,
    rating: 3.5
  },

  {
    id: 61,
    name: "Resistance Bands Set",
    imageUrl: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d",
    stock: 37,
    category: "Fitness",
    price: 799,
    rating: 4.3
  },
  {
    id: 62,
    name: "Kettlebell 10kg",
    imageUrl: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712",
    stock: 8,
    category: "Fitness",
    price: 1799,
    rating: 4.1
  },
  {
    id: 63,
    name: "Foam Roller",
    imageUrl: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30",
    stock: 16,
    category: "Fitness",
    price: 999,
    rating: 3.8
  },
  {
    id: 64,
    name: "Fitness Jump Rope",
    imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
    stock: 52,
    category: "Fitness",
    price: 399,
    rating: 4.0
  },
  {
    id: 65,
    name: "Gym Gloves",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
    stock: 0,
    category: "Fitness",
    price: 699,
    rating: 3.6
  },

  {
    id: 66,
    name: "Hard Shell Suitcase",
    imageUrl: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87",
    stock: 12,
    category: "Travel",
    price: 3999,
    rating: 4.5
  },
  {
    id: 67,
    name: "Travel Organizer Pouch",
    imageUrl: "https://images.unsplash.com/photo-1553531384-cc64ac80f931",
    stock: 28,
    category: "Travel",
    price: 699,
    rating: 4.0
  },
  {
    id: 68,
    name: "Foldable Travel Bag",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 19,
    category: "Travel",
    price: 1299,
    rating: 4.2
  },
  {
    id: 69,
    name: "Travel Toiletry Kit",
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
    stock: 33,
    category: "Travel",
    price: 799,
    rating: 3.9
  },
  {
    id: 70,
    name: "Universal Travel Adapter",
    imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761",
    stock: 0,
    category: "Travel",
    price: 1499,
    rating: 2.9
  },

  {
    id: 71,
    name: "Blue Light Glasses",
    imageUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371",
    stock: 26,
    category: "Accessories",
    price: 999,
    rating: 4.1
  },
  {
    id: 72,
    name: "Canvas Watch Strap",
    imageUrl: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56",
    stock: 39,
    category: "Accessories",
    price: 499,
    rating: 3.8
  },
  {
    id: 73,
    name: "Minimal Card Holder",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    stock: 44,
    category: "Accessories",
    price: 699,
    rating: 4.4
  },
  {
    id: 74,
    name: "Leather Key Holder",
    imageUrl: "https://images.unsplash.com/photo-1553484771-047a44eee27b",
    stock: 21,
    category: "Accessories",
    price: 449,
    rating: 3.5
  },
  {
    id: 75,
    name: "Classic Leather Gloves",
    imageUrl: "https://images.unsplash.com/photo-1520975958225-5b7b6e4e4d9e",
    stock: 0,
    category: "Accessories",
    price: 1299,
    rating: 3.1
  },

  {
    id: 76,
    name: "Stainless Steel Pan",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    stock: 14,
    category: "Home",
    price: 1599,
    rating: 4.3
  },
  {
    id: 77,
    name: "Wooden Cutting Board",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
    stock: 27,
    category: "Home",
    price: 799,
    rating: 4.0
  },
  {
    id: 78,
    name: "Glass Storage Jars",
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
    stock: 35,
    category: "Home",
    price: 899,
    rating: 4.2
  },
  {
    id: 79,
    name: "Ceramic Dinner Set",
    imageUrl: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0",
    stock: 6,
    category: "Home",
    price: 2499,
    rating: 4.6
  },
  {
    id: 80,
    name: "Kitchen Storage Box",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c3f",
    stock: 0,
    category: "Home",
    price: 599,
    rating: 3.4
  },

  {
    id: 81,
    name: "Protein Granola",
    imageUrl: "https://images.unsplash.com/photo-1517093728432-a0440f8d45af",
    stock: 31,
    category: "Food",
    price: 449,
    rating: 4.5
  },
  {
    id: 82,
    name: "Peanut Butter",
    imageUrl: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04",
    stock: 46,
    category: "Food",
    price: 349,
    rating: 4.7
  },
  {
    id: 83,
    name: "Instant Coffee Pack",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    stock: 57,
    category: "Food",
    price: 299,
    rating: 3.9
  },
  {
    id: 84,
    name: "Fruit Jam",
    imageUrl: "https://images.unsplash.com/photo-1563833711637-7a9c4a6a1f1f",
    stock: 18,
    category: "Food",
    price: 249,
    rating: 4.0
  },
  {
    id: 85,
    name: "Milk Chocolate Box",
    imageUrl: "https://images.unsplash.com/photo-1548907040-4d42f0e6f6c6",
    stock: 0,
    category: "Food",
    price: 499,
    rating: 3.2
  },

  {
    id: 86,
    name: "Adjustable Yoga Blocks",
    imageUrl: "https://images.unsplash.com/photo-1599447292180-45fd84092ef4",
    stock: 23,
    category: "Fitness",
    price: 599,
    rating: 4.3
  },
  {
    id: 87,
    name: "Workout Bench",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    stock: 4,
    category: "Fitness",
    price: 5499,
    rating: 4.1
  },
  {
    id: 88,
    name: "Exercise Mat",
    imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
    stock: 31,
    category: "Fitness",
    price: 899,
    rating: 3.9
  },
  {
    id: 89,
    name: "Ankle Weights",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
    stock: 13,
    category: "Fitness",
    price: 999,
    rating: 4.2
  },
  {
    id: 90,
    name: "Pull Up Bar",
    imageUrl: "https://images.unsplash.com/photo-1598971639058-999a9b4f3b0f",
    stock: 0,
    category: "Fitness",
    price: 1399,
    rating: 3.0
  },

  {
    id: 91,
    name: "Travel Passport Holder",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    stock: 42,
    category: "Travel",
    price: 599,
    rating: 4.3
  },
  {
    id: 92,
    name: "Compression Packing Cubes",
    imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
    stock: 17,
    category: "Travel",
    price: 999,
    rating: 4.5
  },
  {
    id: 93,
    name: "Insulated Travel Bottle",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    stock: 25,
    category: "Travel",
    price: 1199,
    rating: 4.1
  },
  {
    id: 94,
    name: "Compact Travel Umbrella",
    imageUrl: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17",
    stock: 36,
    category: "Travel",
    price: 699,
    rating: 3.7
  },
  {
    id: 95,
    name: "Travel Sleep Mask",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
    stock: 0,
    category: "Travel",
    price: 299,
    rating: 3.3
  },

  {
    id: 96,
    name: "Portable Bluetooth Keyboard",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    stock: 11,
    category: "Electronics",
    price: 2299,
    rating: 4.4
  },
  {
    id: 97,
    name: "Laptop Stand",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    stock: 32,
    category: "Electronics",
    price: 1499,
    rating: 4.6
  },
  {
    id: 98,
    name: "Desk Cable Organizer",
    imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761",
    stock: 61,
    category: "Electronics",
    price: 399,
    rating: 3.8
  },
  {
    id: 99,
    name: "Monitor Light Bar",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    stock: 5,
    category: "Electronics",
    price: 1999,
    rating: 4.5
  },
  {
    id: 100,
    name: "Portable Mini Projector",
    imageUrl: "https://images.unsplash.com/photo-1626379953822-baec19c3accd",
    stock: 0,
    category: "Electronics",
    price: 6999,
    rating: 4.0
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    // Clean existing products
    await Product.deleteMany({});
    console.log("Cleared existing products in 'products' collection");

    // Insert all products
    const inserted = await Product.insertMany(products);
    console.log(`Successfully seeded ${inserted.length} products into 'products' collection!`);

    await mongoose.disconnect();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

seedDatabase();
