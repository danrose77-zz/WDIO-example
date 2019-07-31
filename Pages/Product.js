import Page from './Page'
import Screenshot from '../functions/Screenshot';
import GetRandom from "../functions/GetRandom";
import ShoppingBag from "./ShoppingBag";

class Product extends Page {
    get ProductTitle() {
        return $('h1.col-12.product-description.lg-first:nth-child(1)');
    }

    get WishListButton() {
        return $('.fa-heart');
    }

    get AddToBagButtons() {
        return $$('fieldset > input');
    }

    get atbSizeSelectorModal() {
        return $('#atb-size-selector-modal');
    }

    get wlSizeSelectorModal() {
        return $('#wl-size-selector-modal');
    }

    get wlSizeSelectorDD() {
        return $('#wl-size-selector-modal > div > div > div.modal-body.row > div.col-12.col-md-7 > select');
    }

    get wlSizeSelectorDDoptions() {
        return $('#wl-size-selector-modal > div > div > div.modal-body.row > div.col-12.col-md-7 > select > option');
    }

    get ATBSizeSelectorDD() {
        return $("//div[contains(@class,'size-container dropdown')]//select[contains(@name,'size-dropdown')]");
    }

    get ATBSizeSelectorDDoptions() {
        return $('#atb-size-selector-modal > div > div > div.modal-body.row > div.col-12.col-md-7 > div > select > option');
    }

    get SizeSelectorDD() {
        return $('#add_to_bag_desktop > div.size-container.dropdown > div.size-dropdown-container > select');
    }

    get SizeSelectorDDoptions() {
        return $('#add_to_bag_desktop > div.size-container.dropdown > div.size-dropdown-container > select > option');
    }

    get SizeBoxText() {
        return $('.size-text');
    }

    get SizeBoxValid() {
        return $$('div.size-box-container:not([class$=hidden]) > div.size-box:not([class$="size-box invalid"])');
    }

    get ATBSizeBoxValid() {
        return $$('#atb-size-selector-modal > div > div > div.modal-body.row > div.col-12.col-md-7 > div > div > div.size-box');
    }

    get WLSizeBoxValid() {
        return $$('#wl-size-selector-modal > div > div > div.modal-body.row > div.col-12.col-md-7 > div > div.size-box');
    }

    get SizeModal_addtowishlist() {
        return $('div.wishlist-button button modal-cta');
    }

    skuObject(No, Quantity, SHIPNODE_KEY, PRIME_LINE_NO, SHIP_ADVICE_NO) {
        this.No = No;
        this.Quantity = Quantity;
        this.SHIPNODE_KEY = SHIPNODE_KEY;
        this.PRIME_LINE_NO = PRIME_LINE_NO;
        this.SHIP_ADVICE_NO = SHIP_ADVICE_NO;
    }
    logUsedSKU(SKU) {
        skuslist[skuslist.length] = new this.skuObject(SKU, "", "", "", "");
    }

    SelectASizeAndAddTo(addTo, numberToAdd, SKU_used) {
        if ((SKU_used === false) || (SKU_used === undefined)) {
            browser.pause(3000);
            if (this.SizeBoxValid.length > 1) {
                    GetRandom.sizeBox(this.SizeBoxValid);
            } else if (this.SizeSelectorDD.isDisplayed() === true) {
                GetRandom.selectByIndex(this.SizeSelectorDD, this.SizeSelectorDDoptions)
            }
        }
        browser.pause(1000);
        Screenshot.viewport();
        // ATB
        console.log('addTo = '+ addTo);
        if (addTo === 'Bag') {
            let ATBbutton = this.AddToBagButtons;
            if (numberToAdd === undefined) {
                let quantity1 = parseInt(ShoppingBag.get1stItemQty.getHTML(false));
                let quantity2 = quantity1 + 1;
                while (quantity1 !== quantity2) {
                    try {
                        ATBbutton[0].click();
                    } catch (e) {

                    }
                    browser.pause(1000);
                    quantity1 = parseInt(ShoppingBag.get1stItemQty.getHTML(false));
                }
            } else {
                let quantity1 = parseInt(ShoppingBag.get1stItemQty.getHTML(false));
                let quantity2 = quantity1 + numberToAdd;
                while (quantity1 !== quantity2) {
                    try {
                        ATBbutton[0].click();
                    } catch (e) {

                    }
                    browser.pause(1200);
                    quantity1 = parseInt(ShoppingBag.get1stItemQty.getHTML(false));
                    if (formFactor !== 'mobile') {
                        ShoppingBag.closeBasket.click();
                    }
                    browser.pause(1200);
                }
            }
        } else if (addTo === 'Wishlist') {
            let WLbutton = this.WishListButton;
            WLbutton.click();
        }
        Screenshot.viewport();
        try {
            let ATBmodalDetector = this.atbSizeSelectorModal.getAttribute('class');
            let WLmodalDetector = this.wlSizeSelectorModal.getAttribute('class');

            Screenshot.viewport();
            browser.pause(1000);
            if (ATBmodalDetector === 'modal fade size-select-modal show') {
                if (this.ATBSizeBoxValid.length > 0) {
                    GetRandom.sizeBox(this.ATBSizeBoxValid);
                } else if (this.ATBSizeSelectorDD.isDisplayed() === true) {
                    GetRandom.selectByIndex(this.ATBSizeSelectorDD, this.ATBSizeSelectorDDoptions)
                }
                browser.pause(500);
                let ATBbutton = this.AddToBagButtons;
                ATBbutton[1].click();
            } else if (WLmodalDetector === 'modal fade size-select-modal show') {
                if (this.WLSizeBoxValid.length > 0) {
                    GetRandom.sizeBox(this.WLSizeBoxValid);
                } else if (this.wlSizeSelectorDD.isDisplayed() === true) {
                    GetRandom.selectByIndex(this.wlSizeSelectorDD, this.wlSizeSelectorDDoptions)
                }
                browser.pause(500);
                this.SizeModal_addtowishlist.click();
            }
            Screenshot.viewport();
            browser.pause(1500);
        } catch (e) {

        }

    }
}

export default new Product();
