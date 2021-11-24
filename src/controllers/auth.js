const {user} = require('../../models');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
    email: Joi.string().email().min(6),
    password: Joi.string().min(6),
  });
  console.log(req.body.email);
  console.log(req.body.password)
  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
      const userExist = await user.findOne({
          where: {
            email: req.body.email,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
  
    
    // compare password between entered from client and from database
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    // check if not valid then return response with status 400 (bad request)
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "credential is invalid",
      });
    }

    // generate token
    const token = jwt.sign({ id: userExist.id,status: userExist.status }, process.env.TOKEN_KEY);

    res.status(200).send({
      msg: "success",
      username: userExist.email,
      token : token
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.register = async (req, res) => {
  const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(6).required(),
      fullname: Joi.string().min(5).required(),
      gender: Joi.string().required(),
      phone: Joi.string().min(11).required(),
      address: Joi.string().required(),
      
  })

  const {error} = schema.validate(req.body);

  if (error)
  return res.status(400).send({
    error: {
      message: error.details[0].message,
    },
  });

try {
  const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if(userExist){
        return res.send({
            status: "failed",
            message: "already exist"
        })
    }
  const salt = await bcrypt.genSalt(10);
  // we hash password from request with salt
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await user.create({
      email: req.body.email,
      password: hashedPassword,
      fullname: req.body.fullname,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      photo: "default-profile.png",
      status: "user"
  });
  
  const token = jwt.sign({ id: user.id,status: user.status }, process.env.TOKEN_KEY);

  res.send({
    msg: "success",
    token: token 
  });
} catch (error) {
  console.log(error);
  res.send({
    status: "failed",
    message: "Server Error",
  });
}
};