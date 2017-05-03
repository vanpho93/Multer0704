const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const limits = { fileSize: 100 * 1024 };

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png') return cb(null, true);
    cb(new Error('LOI DINH DANG'));
};

const uploadMiddle = multer({ storage, limits, fileFilter }).single('avatar');

const app = express();
app.listen(3000, () => console.log('Server started'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'));

app.post('/upload', (req, res) => {
    uploadMiddle(req, res, err => {
        if (err) return res.send(`LOI ${err}`);
        res.send('THANH_CONG');
    });
});
