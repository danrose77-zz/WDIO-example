import Environment from '../../../Pages/Environment.js';
import Checkout from "../../../Pages/Checkout";

describe('Delivery.js - Place an order with international delivery type option', () => {
    it('Open the environment', () => {
        Environment.openBaseURL();
    });
    it('Select a product with delivery type options', () => {
        Checkout.selectProductWithDeliveryTypeOptions();
        Checkout.selectInternationalShippingAndPay();
    });
});
