const express = require('express');
const ascii = require('ascii-art');
const multer = require('multer');
const cors = require('cors');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.static('public'));

app.post('/convert', upload.single('image'), (req, res) => {
    ascii.image({
        filepath: req.file.path,
        width: 50
    }, (err, converted) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.send(converted);
    });
});

app.listen(3000, () => console.log('Server listening on port 3000'));