const express= require('express')
const router = express.Router()

module.exports = router
const stripe = require('stripe')('sk_test_51HMx6dIOQdAQbH8cK2ZMO8qV5HB2XgA37BomKPC3RiAoFg9LjGOw34Qsmbhnw4U2ruK8DDetEroBve29PBg9rMyQ00d5uh0ldq');

// create PaymentMethods
router.post('/createPaymentMethods/', (req, res) => {
    return stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: req.body.number,
          exp_month: req.body.month,
          exp_year: req.body.years,
          cvc: req.body.cvc,
        },  
    }).then(result => res.status(200).json(result)); 
});