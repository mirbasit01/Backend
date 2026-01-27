const path = require('path');
const express = require('express');
const app = express();
// const { connectDB } = require('./connection');
const PORT = 5000;
const multer = require('multer');

// connect to database
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mirbasitBot';

// connectDB(MONGODB_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => {
//         console.error('MongoDB connection failed:', err.message);
//         process.exit(1);
//     });


const storage = multer.diskStorage({
    destination: function (req, file, cd) { 
        return cd(null, "./uploads")
    },
    filename: function (req, file, cd) { 
        return cd(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage })


app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.render('homepage')
});

app.post('/upload', upload.fields([{ name: 'profile'} , {name: "profilecover"} ]), (req, res) => {
    console.log(req.body)
    console.log(req.file);
    return res.redirect('/');

}),




    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));