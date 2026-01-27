require('dotenv').config();
const express = require('express');
const app = express();
const { connectDB } = require('./connection');
const URL = require('./models/url');
const PORT = 8000;
const path = require('path');
const cookieParser = require('cookie-parser');
const { checkforatuhentication, restrictTo } = require('./middleware/auth');

// connect to database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/URLShortener';

connectDB(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRoute")
const userRoute = require("./routes/user")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforatuhentication)
app.use('/url', restrictTo(['NORMAL', 'ADMIN']) , urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)

// Set CSP headers
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy',
        "default-src 'self'; font-src 'self' https://fonts.gstatic.com; connect-src 'self';");
    next();
});





app.set('view engine', 'ejs');
app.set("views", path.resolve('./views'));

app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    }, { new: true });

    if (!entry) {
        return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));