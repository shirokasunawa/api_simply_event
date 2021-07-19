const express= require('express')
const router = express.Router()

module.exports = router
const stripe = require('stripe')('sk_test_51JAv5tDHgX1AEz0ppv7p7ooZESOvxwHcSaMMFBac0sDTBZBccNBivURbLcAwNXcht9l8Efy8ZODCJeZXp81rmkBX00K8r7u31l');

/////////// Inscription ///////////////

// 1 create PaymentMethods
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

// 2 Create Customers
router.post('/createCustomers/', (req, res) => {
    return stripe.customers.create({
        name : req.body.name,
        email : req.body.email,
        description: 'Customer created',
        payment_method : req.body.paymentMethod    
    }).then(result => res.status(200).json(result)); 
});

// 3 Create attachPaymentMethod
router.post('/attachPaymentMethod/:id', (req, res) => {
    return stripe.paymentMethods.attach(
        req.params.id,
        {customer : req.body.customer} 
    ).then(result => res.status(200).json(result)); 
});

/////////// Abonnement ///////////////

// Create Subscription
router.post('/doSubscription/', (req, res) => {
    return stripe.subscriptions.create({
        customer: req.body.customer,
        default_payment_method : req.body.paymentMethod,
        items: [{price: req.body.price}],
    }).then(result => res.status(200).json(result));    
});

// Get Subscription
router.get('/getSubscription/:id', (req, res) => {
    return stripe.subscriptions.retrieve(
        req.params.id,
    ).then(result => res.status(200).json(result));    
});

// Del Subscription
router.put('/delSubscription/:id', (req, res) => {
    return stripe.subscriptions.update(
        req.params.id,
        {cancel_at_period_end: true}
    ).then(result => res.status(200).json(result));    
});

/////////// Payment Net ///////////////

// create Token
router.post('/createAccount/', (req, res) => {
    return stripe.accounts.create({
        type : 'custom',
        country : 'FR',
        email : 'siidu_96@hotmail.fr',
        // capabilities: {
        //     card_payments: {request: true},
        //     transfers: {request: true},
        // }
    }
    ).then(result => res.status(200).json(result)); 
});

router.post('/createTokens/', (req, res) => {
  return stripe.tokens.create({
      card: {
          number: req.body.number,
          exp_month: req.body.month,
          exp_year: req.body.years,
          cvc: req.body.cvc,
      },
  }).then(result => res.status(200).json(result)); 
});
// Create Paymente
router.post('/doPayment/', (req, res) => {
    return stripe.charges.create({
        amount: 20000, // Unit: cents
        currency: 'eur',
        source: req.body.tokenId,
        description: 'Inscription',  
        // customer : 'cus_JoXVVjg7sOmiPU'
    }).then(result => res.status(200).json(result)); 
});

// {
//     customer : "cus_JoXVVjg7sOmiPU",
//     card: {
//         number: req.body.number,
//         exp_month: req.body.month,
//         exp_year: req.body.years,
//         cvc: req.body.cvc,
//     }, 