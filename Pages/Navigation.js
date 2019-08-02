import Page from './Page'
import objectLength from '../functions/objectLength'
import Search from "./Search";
import Screenshot from "../functions/Screenshot";
import GetRandom from "../functions/GetRandom";
import write from "../functions/write";
import Checkout from "./Checkout";

class Navigation extends Page {
    get body() {
        return $("body");
    }

    get hamburger() {
        return $('//i[@class="custom-icon burger"]');
    }

    get menu_tier1() {
        return $$('#menu-items > li > a > span.cr-table > span > img');
    }

    get menu_subtiers() {
        return $$("ul[style*='display']:not([style*='display: none;']) li a");
    }

    get menu_subtier1_back() {
        return $(".js-menu .nav-categories:nth-of-type(2) .go-back .cr-cell");
    }

    get menu_subtier2_back() {
        return $(".js-menu .categories-text:nth-of-type(3) .go-back .cr-cell");
    }

    get RD2019_shoppingBagIcon() {
        return $("//div[contains(@class,'account-actions banner-column')]//li[4]//a");
    }

    get SignIn_Guest() {
        return $('a[class$=register-link]');
    }

    get wishlistLinks() {
        return $$("//i[@class='custom-icon favourites']");
    }
    get WishlistLoad() {
        return $('.send-wish-list');
    }
    get closeBasket() {
        return $('div.close-basket > a > i');
    }

    get acceptCookies() {
        return $("//a[@class='cc-btn cc-allow']");
    }

    get logo() {
        return $(".logo");
    }
    get my_account() {
        return $(".account-actions .my-account");
    }
    get favourites() {
        return $(".account-actions .favourites");
    }
    get search_container() {
        return $(".banner-column .search-container i");
    }
    get navWrapper() {
        return $(".nav-wrapper");
    }
    get spinner() {
        return $(".spinner");
    }

    // Functions
    acceptCookiesPrompt() {
        try {
            if (this.acceptCookies.isDisplayed() === true) {
                this.acceptCookies.click();
            }
        } catch (e) {
        }
    }

    openShoppingBasket() {
        let basketOpen = this.closeBasket.isDisplayed();
        if (basketOpen === false) {
            this.RD2019_shoppingBagIcon.click();
        }
    }

    backToBaseMenu() {
        browser.pause(1000);
        let T2_menu_displayed = this.menu_subtier2_back.isDisplayed();
        if (T2_menu_displayed === true) {
            this.menu_subtier2_back.click();
        }
        browser.pause(1000);
        let T1_menu_displayed = this.menu_subtier1_back.isDisplayed();
        if (T1_menu_displayed === true) {
            this.menu_subtier1_back.click();
        }
    }

    randomSection() {
        Screenshot.viewport();
        let success = false;
        while (success === false) {
            this.hamburger.click();
            this.acceptCookiesPrompt();
            this.backToBaseMenu();
            this.menu_tier1[1].waitForExist();
            GetRandom.element(this.menu_tier1, undefined, 2);
            this.menu_subtiers[1].waitForExist();
            GetRandom.element(this.menu_subtiers, undefined, 4, 2);
            try {
                this.menu_subtiers[1].waitForExist();
                if (this.menu_subtiers[0].isDisplayed() === true) {
                    GetRandom.element(this.menu_subtiers, undefined,4, 1);
                }
            } catch (e) {

            }

            browser.pause(1000);
            this.spinner.waitForExist(30000, true);

            let classAttrib = this.body.getAttribute('class').trim();
            console.log('classAttrib = ' + classAttrib);
            if ((classAttrib === 'error-page sana')||(classAttrib === 'error-page sana two-tone')) {
                browser.url(site);
                browser.pause(3000);
                success = false;
            } else {
                let count = Search.ResultsLinks.length;
                success = !((count === undefined) || (count === 0));
            }
        }
        Screenshot.viewport();
    }

    GoToCheckout() {
        browser.url(site + 'checkout/log-in');
        browser.waitUntil(() => {
            return browser.getUrl().includes("checkout");
        },5000);
        Screenshot.viewport();
        try {
            if (this.SignIn_Guest.isExisting() === true) {
                this.SignIn_Guest.click();
            }
            Checkout.deliveryTypeOptions[1].waitForExist(30000);
        } catch (e) {
        }
    }

    GoToWishlist() {
        let wishlistLink = this.wishlistLinks;
        wishlistLink[0].click();
        this.WishlistLoad.waitForDisplayed(60000)
    }
}

export default new Navigation();
