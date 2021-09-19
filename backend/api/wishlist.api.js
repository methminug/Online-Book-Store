const express = require("express");
const router = express.Router();
const wishlistcontroller = require("../controllers/wishList.controller");
const verifyAdmin = require("../routers/verifyTokenAdmin")
const verifyBuyer = require("../routers/verifyTokenBuyer")

//Add proper routing nouns
module.exports = () => {
    router.post('/:id', verifyBuyer, wishlistcontroller.addWishListItem);
    router.get('/:id', wishlistcontroller.getWishListItems);
    router.get('/search/:name', wishlistcontroller.searchWishList);
    router.get('/buy/wishitem/:itemid/:boughtstate', wishlistcontroller.buyProductFromWishList);
    router.delete('/:listid/:itemid', verifyBuyer, wishlistcontroller.deleteWishListItem);
    router.put('/:listid/:liststate', verifyBuyer, wishlistcontroller.updateisPrivate);
    router.get('/top/wish/items', verifyAdmin, wishlistcontroller.getTopFiveProducts);
    router.get('/report/:month/:year', verifyAdmin, wishlistcontroller.genarateReport);
    return router;
}