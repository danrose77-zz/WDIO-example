import Environment from '../../../Pages/Environment.js';
import Product from '../../../Pages/Product.js';
import Search from '../../../Pages/Search.js';
import Navigation from '../../../Pages/Navigation.js';
import Checkout from "../../../Pages/Checkout";
import Customer from "../../../Pages/Customer";
import Givex from "../../../Pages/Givex";

let giftcard = '6338901547310003689';

describe(specname+' - Paypal and giftcard payment from a new user', () => {
    it('Set up a gift card', () => {
        Givex.login();
        Givex.setupGiftcards(giftcard);
    });
    it('Open the environment', () => {
        Environment.openBaseURL();
    });
    it('Set up a customer account', () => {
        Customer.setUpNewAccount();
    });
    it('Go to a random section and add a product to the shopping bag', () => {
        Navigation.randomSection();
        Search.PickRandomProduct();
        Product.SelectASizeAndAddTo('Bag');
    });
    it('Go to the checkout as a guest and pay by paypal and giftcard', () => {
        Navigation.GoToCheckout();
        Checkout.addGiftcards(giftcard, "0692");
        Checkout.payByPaypal();
    });
});