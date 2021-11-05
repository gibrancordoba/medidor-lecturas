const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const LecturasRouter = require('./routes/lecturas');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://oscar:gIBRAN21..@cluster0.tbg0o.mongodb.net/lectura');
    
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get('/', (req, res) => {
        res.json({"message": "Server is running :D"});
    });

    app.use('/lecturas', LecturasRouter);

    let PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });

}

