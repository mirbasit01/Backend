const path = require('path');
const express = require('express');
const app = express();
const PORT = 7000;
const { connectDB } = require('./db/connection');
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser');
const { checkAuthenticationcookie } = require('./middleware/authenticationmiddleware');


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Blogging-Application';

connectDB(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });

 app.use(express.urlencoded({extended: false}));
 app.use(cookieParser());
 app.use(checkAuthenticationcookie('token'))
    

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))


app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    })
});

app.use('/user', userRoute)

 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));