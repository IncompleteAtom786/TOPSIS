import express from 'express';
import fs from 'fs'
import bodyParser from 'body-parser';
import cors from 'cors';

const port = 3001;

var app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

app.post('/saveData', (req, res) => {
    const data = req.body;
    console.log(data);

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Data saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
