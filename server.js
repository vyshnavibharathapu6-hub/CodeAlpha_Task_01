const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware rules configurations
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'codealpha-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Local MongoDB database link initialization
mongoose.connect('mongodb://localhost:27017/codealphaStore')
    .then(() => console.log('MongoDB is connected successfully!'))
    .catch(err => console.log('Database Connection Error:', err));

// --- Database Blueprint Entities (Schemas) ---
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    rating: Number
});
const Product = mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cart: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }]
});
const User = mongoose.model('User', userSchema);

// --- Session Access Guard Middleware ---
function requireLogin(req, res, next) {
    if (!req.session.userId) return res.redirect('/auth');
    next();
}

// --- Routes Operational Logic Mapping ---
app.get('/auth', (req, res) => res.render('auth'));

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ username: req.body.username, password: hashedPassword, cart: [] });
        await newUser.save();
        res.redirect('/auth');
    } catch {
        res.send('<h3>Registration Error: Profile username already exists. <a href="/auth">Try again</a></h3>');
    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/');
    } else {
        res.send('<h3>Log In Error: Invalid matching account credentials. <a href="/auth">Try again</a></h3>');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth');
});

app.get('/', requireLogin, async (req, res) => {
    const products = await Product.find({});
    res.render('index', { products, viewMode: 'shop' });
});

app.post('/add-to-cart/:id', requireLogin, async (req, res) => {
    const requestedQuantity = parseInt(req.body.quantity) || 1;
    const user = await User.findById(req.session.userId);
    const existingIndex = user.cart.findIndex(item => item.productId.toString() === req.params.id);
    
    if (existingIndex > -1) {
        user.cart[existingIndex].quantity += requestedQuantity;
    } else {
        user.cart.push({ productId: req.params.id, quantity: requestedQuantity });
    }
    await user.save();
    res.redirect('/');
});

app.get('/cart', requireLogin, async (req, res) => {
    const user = await User.findById(req.session.userId).populate('cart.productId');
    res.render('cart', { cartItems: user.cart, viewMode: 'cart', user });
});

// 👤 Fixed Route Mapping to supply profile variables to cart view context
app.get('/account', requireLogin, async (req, res) => {
    const user = await User.findById(req.session.userId);
    res.render('cart', { cartItems: [], viewMode: 'account', user });
});

app.post('/checkout', requireLogin, async (req, res) => {
    const user = await User.findById(req.session.userId);
    user.cart = []; 
    await user.save();
    res.send('<div style="text-align:center; margin-top:60px; font-family:sans-serif;"><h2>📦 Amazon Alpha Order Placed Successfully!</h2><p>Your delivery dispatch profile details and feedback reviews have been recorded.</p><a href="/" style="color:#e77600; font-weight:bold; text-decoration:none;">← Return back to Shopping Feed</a></div>');
});

// Seed data function injections
async function seedDB() {
    const count = await Product.countDocuments();
    if(count === 0) {
        await Product.create([
            { name: "Pro Mechanical Keyboard", price: 129, description: "Hot-swappable tactile RGB mechanical keyboard build configuration.", imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500", rating: 4.8 },
            { name: "Wireless Ergonomic Mouse", price: 79, description: "Ultra lightweight precise response tracker featuring customizable side macros.", imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500", rating: 4.4 },
            { name: "UltraWide 4K Gaming Monitor", price: 349, description: "32-inch immersive IPS bezel-less display with flawless HDR scaling options.", imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500", rating: 4.7 }
        ]);
        console.log("Database catalog fully initialized with premium items.");
    }
}
seedDB();

app.listen(3000, () => console.log('Server live online at: http://localhost:3000/auth'));