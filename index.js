const express = require('express');
const multer = require('multer');

const uploadMiddle = multer({ dest: './public' }).single('avatar');

const app = express();
app.listen(3000, () => console.log('Server started'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'));

app.post('/upload', uploadMiddle, (req, res) => {
    res.send('THEM_THANH_CONG');
});
