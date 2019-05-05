const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const AdminDO = require("../../models/AdminDirectOrder");
const passport = require("passport");
const refCode = require('order-id')('mysecret');



// @route   GET api/orders/test
// @desc    Tests order route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Order Works" }));


// @route   GET api/orders/getUsers
// @desc    Get Users For Balance Transfer
// @access  Public
router.get(
    "/getUsers",
    passport.authenticate("admin", { session: false }),
    (req, res) => {
        User.find({IsActive: true}, 'Name Balance Email', () =>{
        }).then((user)=>{
            return res.status(200).json(user);
        });
    }
);


// @route   GET api/orders/updateBalance
// @desc    Tests order route
// @access  Public
router.put(
    "/updateBalance",
    passport.authenticate("admin", { session: false }),
    (req, res) => {
        req.body.forEach(element => {
            let userID = element._id;
            User.findOneAndUpdate(
                { '_id': userID, IsActive: true },
                { $set: { "Balance": element.Balance, "LastUpdatedDate": Date.now() } },
                { new: true }
            ).then(() => {
                // Create order object for insertion.
                
                var order = new AdminDO({
                    User: userID,
                    Amount: element.Balance,
                    ReferenceNumber: refCode.generate()
                });

                //After successfull updation insert new record into orders book.
                AdminDO.create(order).then(x => {
                    console.log(x)
                }).catch(err => {
                    console.log(err);
                });
            });
        });
        return res.status(200).json({ msg: "Balance Updated" });
    }
);


module.exports = router;