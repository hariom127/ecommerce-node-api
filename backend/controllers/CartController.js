const Cart = require("../models/cart");
// const ErrorHandler = require("../ulits/errorHandler");

/*
| Create cart
| /api/v1/cart/create
*/
exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      // if cart already exist for user

      const isItemExist = cart.cartItem.find(
        (c) => c.product == req.body.cartItem.product
      );
      let condition;
      let update;
      if (isItemExist) {
        condition = {
          user: req.user._id,
          "cartItem.product": req.body.cartItem.product,
        };
        update = {
          $set: {
            "cartItem.$": {
              ...req.body.cartItem,
              quntity: isItemExist.quntity + req.body.cartItem.quntity,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItem: req.body.cartItem,
          },
        };
      }

      Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });
        if (_cart) return res.status(200).json({ cart: _cart });
      });
    } else {
      const newCart = new Cart({
        user: req.user._id,
        cartItem: req.body.cartItem,
      });
      // console.log(req.body.cartItem);
      newCart.save((error, newCart) => {
        if (error) return res.status(400).json({ error });
        if (newCart) return res.status(200).json({ newCart });
      });
    }
  });
};
