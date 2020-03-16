import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100; // Los precios se expresan en centavos
    const publishableKey = 'pk_test_cDobLJLdPSDaRTfkASWxT9Zp00BP4K3hVQ';


    const onToken = token => {
        console.log(token);
        alert('Payment successful')
        
    } 

    return (
        <StripeCheckout 
            label='Pay Now' 
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now' 
            token={onToken}
            stripeKey={publishableKey}
        />
    )
 }

 export default StripeCheckoutButton;