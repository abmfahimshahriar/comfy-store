// domain/.netlify/functions/create-payment-intent
require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
    if (event.body) {
        const {cart, shippingFee, totalAmount} = JSON.parse(event.body);

        const calculateOrderAmount = () => {
            return shippingFee + totalAmount;
        }
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: 'usd',
            });
            return {
                statusCode: 200,
                body: JSON.stringify({clientSecret: paymentIntent.client_secret}),
            }
        }
        catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                body: JSON.stringify({message: e.message}),
            }
        }

    }
    return {
        statusCode: 200,
        body: 'create payment intent'
    }

}
