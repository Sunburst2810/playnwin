const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Validation

// Load Bids Model
const Bids = require("../../models/Bids");
// Load User Model
const User = require("../../models/User");

// @route   GET api/bids/test
// @desc    Tests bids route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Bids Workss" }));

// @route   GET api/bids
// @desc    Get current users bids
// @access  Private
router.get(
  "/",
  passport.authenticate("user", { session: false }),
  (req, res) => {
    const errors = {};

    Bids.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(bids => {
        if (!bids) {
          errors.nobids = "There is no Bids for this user";
          return res.status(404).json(errors);
        }
        res.json(bids);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/bids/all
// @desc    Get all bids
// @access  Public
router.get("/all",
          passport.authenticate("admin", { session: false }), 
          (req, res) => {
  const errors = {};

  Bids.find({ EndGame : false }, 'Bets')
    .then(bids => {
      if (!bids) {
        errors.nobids = "There are no bid";
        return res.status(404).json(errors);
      }
      
      let bets = {
        0:{ possibleWin: 0, bid: 0 },
        1:{ possibleWin: 0, bid: 0 },
        2:{ possibleWin: 0, bid: 0 },
        3:{ possibleWin: 0, bid: 0 },
        4:{ possibleWin: 0, bid: 0 },
        5:{ possibleWin: 0, bid: 0 },
        6:{ possibleWin: 0, bid: 0 },
        7:{ possibleWin: 0, bid: 0 },
        8:{ possibleWin: 0, bid: 0 },
        9:{ possibleWin: 0, bid: 0 }
      };
      
        bids.forEach(function(e){
          e.Bets.forEach(function(el){

            let possibleWin = el.PossibleWin;
            let bid = el.BidAmount;
  
            if (el.BidNumber in bets) {
              let elem = bets[el.BidNumber];
              
              elem.possibleWin += possibleWin;
              elem.bid += bid;
              
              bets[el.BidNumber] = elem;
              
            }
          else {
            let bidData = {};
            bidData.PossibleWin = possibleWin;
            bidData.BidAmount = bid;
            bets[el.BidNumber] = elem;
          }
          });
        });

        if(bids.length === 0){
          res.json(-1);
        }else{
          res.json(bets);
        }
    })
    .catch(err => {console.log(err); res.status(404).json({ bids: "There are no bids" })});
    
});

// @route   POST api/bids
// @desc    Plcae Bids or edit Bids
// @access  Private
router.post(
  "/",
  passport.authenticate("user", { session: false }),
  (req, res) => {
    // Get fields
    const bidsFields = {};
    bidsFields.User = req.user.id;
    //if (req.body.numbers) bidsFields.numbers = req.body.numbers;
    if (req.body.money) bidsFields.CurrentBalance = req.body.money;
    if (req.body.totalBet) bidsFields.BetAmount = req.body.totalBet;
    //if (req.body.token) bidsFields.token = req.body.token;
    if (req.body.bets) bidsFields.Bets = req.body.bets;
    bidsFields.WinningNumber = 0;
    if(bidsFields.CurrentBalance === null || bidsFields.CurrentBalance  === undefined){
      bidsFields.CurrentBalance = 0;
    }
    //if (req.body.endGame) bidsFields.endGame = req.body.endGame;
    //if (req.body.win) bidsFields.win = req.body.win;
    //if (req.body.winningNumber) bidsFields.winningNumber = req.body.winningNumber;
    //if (req.body.moneyError) bidsFields.moneyError = req.body.moneyError;

    let errors = {};
    Bids.findOne({ User: req.user.id, Bets: req.body.bets, EndGame: false }).then(bids => {

      
      if (bids) {
        
        // Update
        Bids.findOneAndUpdate(
          { user: req.user.id },
          { $set: bidsFields }
        ).then(bids => {
          /*User.findOneAndUpdate(
            { user: req.user.id },
            { $set: { "Balance": bidsFields.CurrentBalance, "LastUpdatedDate": Date.now() } }
          ).then(x => {*/
            res.json(bids)
          //});
        });
        
      } else {
        // Check if handle exists
        //Bids.findOne({ bets: bidsFields.bets }).then(bids => {
        //  if (bids) {
        //    errors.numbers = "That number is already exists";
        //    res.status(400).json(errors);
        //  }else{
          // Save Bids
        new Bids(bidsFields).save().then(bids => {
          User.findByIdAndUpdate(
            { '_id': req.user.id },
            { $set: { "Balance": bidsFields.CurrentBalance, "LastUpdatedDate": Date.now() } }
          ).exec();
          res.json(bids)
        }).catch((x)=>{
          console.log(x);
        });
       //   }
        //});
      }
    });
  }
);

// @route   POST api/bids/update
// @desc    Plcae Bids or edit Bids
// @access  Private
router.put(
  "/update",
  passport.authenticate("user", { session: false }),
  (req, res) => {
    let winningNumber = 0;

    if (req.body.winningNumber) winningNumber = req.body.winningNumber;

    console.log(req.body);

    Bids.findOne({ User: req.user.id, EndGame: false }).then(bids => {
      if (bids) {
        // Update
        Bids.findOneAndUpdate(
          { User: req.user.id, EndGame: false },
          { $set: { "WinningNumber": winningNumber, "EndGame": true, "LastUpdatedDate": Date.now() }},
          { new: true }
        ).then(bids => {

          User.findByIdAndUpdate(
            { '_id': req.user.id },
            { $set: { "Balance": req.body.Balance, "LastUpdatedDate": Date.now() } }
          ).exec();

          res.json(bids)
        }).catch(err => res.status(409).json(err));
      }
    }).catch(err => res.status(409).json(err));
  }
);


// @route   GET api/bids/balance
// @desc    Return user balance
// @access  Private

router.get(
  "/balance",
  passport.authenticate("user", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        res.json(user.Balance);
      })
      .catch(err => res.status(404).json(err));
  }
);


module.exports = router;
