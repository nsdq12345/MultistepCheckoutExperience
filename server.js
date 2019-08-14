const express = require('express');
const app = express();
const port = 3000;

const Sequelize = require('sequelize');
const sequelize = new Sequelize('checkout', 'root', 'abc12345', {
    host: 'localhost',
    dialect: 'mysql'
  });

const Checkout = sequelize.define('checkout', {}, {freezeTableName: true, timestamps: false});

app.use(express.static('public'));
app.use(express.json())


app.get('/checkout', (req, res, next) => {
   Checkout.create()
    .then(checkout => {
        res.send(''+checkout.dataValues.id);
    });
});

app.post('/signup', (req, res, next) => {
    console.log(req.body);
    res.end();
});

app.listen(3000, function () {
    console.log('Ready')
})