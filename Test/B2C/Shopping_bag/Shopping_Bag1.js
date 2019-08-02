import Environment from '../../../Pages/Environment.js';
import Product from '../../../Pages/Product.js';
import Search from '../../../Pages/Search.js';
import Navigation from '../../../Pages/Navigation.js';
import ShoppingBag from "../../../Pages/ShoppingBag";

let Qty1 = 1;
let Qty2 = 2;
let Qty3 = 3;
let Qty4 = 4;
let Qty5 = 5;
let Qty6 = 6;

describe(specname+' - A product can be removed from the shopping bag', () => {
    it('Open the environment', () => {
        Environment.openBaseURL();
    });
    it('Go to a random section and return a product and add '+Qty3+' to the bag', () => {
        Navigation.randomSection();
        Search.PickRandomProduct();
        Product.SelectASizeAndAddTo('Bag',Qty3);
    });
    it('Item quantity can be reduced in the shopping bag', () => {
        ShoppingBag.removeShoppingBagItems(Qty1)
    });
});