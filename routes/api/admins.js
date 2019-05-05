const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Admin model
const Admin = require("../../models/Admin");


function callMe(){
    var admin1 = new Admin({
      Name: 'Aditya',
      Email: 'test@test.com',
      Password:'$2a$10$tgFuqeTQL3vEN5pxGm.l2uLQANYQcDnDiNuOPFUbTnWqUuqNGI8jS',
      ProfilePic:'',
      IsActive:true,
      RegistrationDate: Date.now()
    });

    Admin.create(admin1).then(x=>{console.log(x)}).catch(err=>{console.log(err);});

    // admin1.save(function (err, book) {
    //   if (err) return console.error(err);
    //   console.log(book.name + " saved to bookstore collection.");
    // });
  //});
}

// @route   GET api/admins/test
// @desc    Tests admins route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Admin Works" }));

// @route   POST api/admins/register
// @desc    Register Admin
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(admin => {
    if (admin) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/admins/login
// @desc    Login Admin / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //callMe();

  // Find admin by email
  Admin.findOne({ Email: email, IsActive: true }).then(admin => {
    // Check for user
    if (!admin) {
      return res.status(404).json({ email: "Admin not found" });
    }

    // Check Password
    bcrypt.compare(password, admin.Password).then(isMatch => {
      if (isMatch) {
        // Admin Matched

        const payload = {
          id: admin.id,
          name: admin.name,
          avatar: admin.avatar
        }; // Create jwt payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    }).catch(err=>{
      console.log(err);
      return res.status(500).json({ Error: err });
    });
  });
});

module.exports = router;
