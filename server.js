const express = require('express');
const app = express();
const port = 3000;

// const mysql = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'abc12345',
//     database : '`my_db`'
//   });

const Sequelize = require('sequelize');
const sequelize = new Sequelize('checkout', 'root', 'abc12345', {
    host: 'localhost',
    dialect: 'mysql'
  });

const Checkout = sequelize.define('checkout', {}, {freezeTableName: true, timestamps: false});

const Person = sequelize.define('person', {
    checkout_id: {
        type: Sequelize.INTEGER
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {freezeTableName: true, timestamps: false});

const Address = sequelize.define('address', {
    checkout_id: {
        type: Sequelize.INTEGER
    },
    line1: {
        type: Sequelize.STRING,
        allowNull: true
    },
    line2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    state: {
        type: Sequelize.STRING,
        allowNull: true
    },
    zip: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {freezeTableName: true, timestamps: false});

const Payment = sequelize.define('payment', {
    checkout_id: {
        type: Sequelize.INTEGER
    },
    credit_card_number: {
        type: Sequelize.STRING,
        allowNull: true
    },
    exp_date: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cvv: {
        type: Sequelize.STRING,
        allowNull: true
    },
    zip: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {freezeTableName: true, timestamps: false});

app.use(express.static('public'));
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }));


app.get('/checkout', (req, res, next) => {
   Checkout.create()
    .then(checkout => {
        res.send(''+checkout.dataValues.id);
    });
});

app.post('/person', (req, res, next) => {
    Person.create({
        checkout_id: req.body.checkoutId,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }).then(() => {
        res.end();
    })
});

app.post('/address', (req, res, next) => {
    Address.create({
        checkout_id: req.body.checkoutId,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }).then(() => {
        res.end();
    })
})

app.post('/payment', (req, res, next) => {
    Payment.create({
        checkout_id: req.body.checkoutId,
        credit_card_number: req.body.creditCardNumber,
        exp_date: req.body.expiration,
        cvv: req.body.cvv,
        zip: req.body.zip,
    }).then(() => {
        res.end();
    })
});

app.get('/results', (req, res, next) => {
    sequelize.query("SELECT * FROM person INNER JOIN payment ON (payment.checkout_id = person.checkout_id) INNER JOIN address ON (address.checkout_id = person.checkout_id) WHERE person.checkout_id = ?", 
        { replacements: [req.headers.id], type: sequelize.QueryTypes.SELECT })
    .then(data => {
        res.send(data);
    })
});

app.listen(3000, function () {
    console.log('Ready')
});