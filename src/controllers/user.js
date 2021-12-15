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
  exports.updateUser = async (req, res) => {
    try {
          const  id  = req.user.id;
      
          await user.update({
            ...req.body,
            photo:req.files.photo[0].filename,
          }, {
            where: {
              id,
            },
          });
      
          res.send({
            status: "success",
            message: `Update user id: ${id} finished`,
            data: req.body,
          });
        } catch (error) {
          console.log(error);
          res.send({
            status: "failed",
            message: "Server Error",
          });
        }
  }
  exports.getUser = async (req, res) => {
    try {
      const id  = req.user.id;
  
      const data = await user.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
  
      res.send({
        status: "success",
        data: [data],
      });
    } catch (error) {
      console.log(error);
      res.send(500,{
        status: "failed",
        message: "Server Error",
      });
    }
  };
  