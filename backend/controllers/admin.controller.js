const Admin = require("../models/admin.model");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Input admin details VALIDATION
const validateAdmin = (admin) => {
  const emailRegExp = /\S+@\S+\.\S+/;
  const passwordRegExp = "^[a-zA-Z0-9]{3,30}$";

  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().pattern(new RegExp(emailRegExp)).required(),
    password: Joi.string().pattern(new RegExp(passwordRegExp)).required(),
  });

  return schema.validate(admin);
};

// Login VALIDATION
function validateLogin(admin) {
  const emailRegExp = /\S+@\S+\.\S+/;
  const passwordRegExp = "^[a-zA-Z0-9]{3,30}$";

  const schema = Joi.object({
    email: Joi.string().pattern(new RegExp(emailRegExp)).required(),
    password: Joi.string().pattern(new RegExp(passwordRegExp)).required(),
  });

  return schema.validate(admin);
}

const checkEmail = (email) => {
  return Admin.findOne({ email: email }).then((result) => {
    return result;
  });
};

const createAdmin = async (req, res) => {
  if (req.body) {

    //check if user id is super admin

    const { error } = validateAdmin(req.body);

    if (error) return res.status(401).send(error.details[0].message);

    checkEmail(req.body.email).then(async (userExists) => {
      if (!userExists) {
        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newAdmin = new Admin({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          status: 1
        });

        await newAdmin
          .save()
          .then(async (data) => {
            res.status(200).send({ data: data });
          })
          .catch((error) => {
            res.status(500).send({ error: error.message });
          });
      } else {
        res
          .status(500)
          .send("Sorry, an admin already exists by this email.");
      }
    });
  }
};

const loginAdmin = async (req, res) => {
  if (req.body) {
    const { error } = validateLogin(req.body);

    if (error) return res.status(401).send(error.details[0].message);

    checkEmail(req.body.email).then(async (userExists) => {
      if (userExists) {
        //Verifying password
        const validPassword = await bcrypt.compare(
          req.body.password,
          userExists.password
        );
        if(userExists.status === 0) return res.status(400).send(`Administrator access for ${req.body.email} has been revoked.`);
        if (!validPassword) return res.status(400).send("Incorrect password!");

        //Check if superadmin
        if(userExists.status === 2){
          //Is Superadmin
          token = jwt.sign(
            { id: userExists._id, role: 3 },
            process.env.TOKEN_SECRET_SUPERADMIN
          );
        }else{
          //Is active admin
          token = jwt.sign(
            { id: userExists._id, role: 2 },
            process.env.TOKEN_SECRET_ADMIN
          );
        }

        res.header("auth-token", token);
        res.header("Access-Control-Expose-Headers", "auth-token");
        res.send(userExists._id);
      } else {
        res
          .status(500)
          .send(`Sorry, ${req.body.email} is not an administrator.`);
      }
    });
  }
};

const getAllAdmins = async (req, res) => {
  await Admin.find({})
  .populate("admins", "name email status")
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((error) => {
    res.status(500).send({ error: error.message });
  });
};

const updateAdminStatus = async (req, res) => {
  if (req.body) {
    await Admin.findByIdAndUpdate(req.body.id, 
      {status: req.body.status},
      {new: true, useFindAndModify: false,}
      )
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  getAllAdmins,
  updateAdminStatus
};
