const {user} = require("../../models");
const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.getUsers = async (req, res) => {
    try {
      const users = await user.findAll({
        
        attributes: {
          exclude: ["gender","photo", "status","password", "createdAt", "updatedAt"],
        },
      });
  
      res.send({
        status: "success",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };