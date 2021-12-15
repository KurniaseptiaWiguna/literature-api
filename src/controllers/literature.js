const {literature,user} = require('../../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.addLiterature = async (req, res) => {
    const userId = req.user.id;
    try{
        const newLiterature = await literature.create({
            title:req.body.title,
            userId:userId,
            publication_date: req.body.publication_date,
            pages: req.body.pages,
            isbn:req.body.isbn,
            author:req.body.author,
            attachment:req.files.file[0].filename,
            status:"Waiting Approve"
        });
        let literatureData = await literature.findOne({
            where: {
                id: newLiterature.id,
            },
            
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        });
        let userData = await user.findOne({
            where:{
                id:literatureData.userId,
            },
            attributes: {
                exclude: ["createdAt","updatedAt","status","photo"]
            },
        });
        console.log(req.files.file[0].filename)
        res.send(200, {
            status: "success",
            data: {
                id:literatureData.id,
                title: literatureData.title,
                userId:userData,
                publication_date: literatureData.publication_date,
                pages: literatureData.pages,
                ISBN: literatureData.isbn,
                author: literatureData.author,
                attache: literatureData.attachment,
                status: literatureData.status
            }
        })
    }catch(error){
        console.log(error);
        res.send(500,{
            error: error,
        })
    }
}
exports.getLiterature = async (req, res) => {
    const id = req.params.id
    try {
        const literatureData = await literature.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        });
        let userData = await user.findOne({
            where:{
                id:literatureData.userId,
            },
            attributes: {
                exclude: ["createdAt","updatedAt","status","photo"]
            },
        });
        res.send(200, {
            status: "success",
            data:[{
                id:literatureData.id,
                title: literatureData.title,
                userId:userData,
                publication_date: literatureData.publication_date,
                pages: literatureData.pages,
                ISBN: literatureData.isbn,
                author: literatureData.author,
                attachment: literatureData.attachment,
                status: literatureData.status
            }]
        })
    } catch (error) {
        console.log(error);
        res.send(500,{
            error: error,
        })
    }
};
exports.getUserLiterature = async (req, res) => {
    const userId = req.user.id
    try {
        const literatureData = await literature.findAll({
            where: {
                userId :userId
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        });
        let userData = await user.findOne({
            where:{
                id:userId,
            },
            attributes: {
                exclude: ["createdAt","updatedAt","status","photo"]
            },
        });
        res.send(200, {
            status: "success",
            data:literatureData
        })
    } catch (error) {
        console.log(error);
        res.send(500,{
            error: error,
        })
    }
};
exports.allLiterature= async (req, res) => {
    try {
        let literatureData = await literature.findAll({
            where:{
                status: "Approved"
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        });
        literatureData = JSON.parse(JSON.stringify(literatureData));
        literatureData = literatureData.map((item) => {
            return { ...item, attachment: "http://localhost:5000/uploads/" + item.attachment }
        })
        res.send({
            msg:"success",
            data:literatureData
        })
    } catch (error) {
        console.log(error)
        res.send(500,{
            msg: "failed"
        })
    }
}
exports.searchLiterature = async (req, res) => {
    const title = req.params.title;
    const searchTitle = `%${title}%`;

    try {
        const literatureData = await literature.findAll({
            where: {
                title: {
                    [Op.like]: searchTitle
                },
                status: "Approved"
            },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt","updatedAt","status","password","photo"]
                    }
                }
            ],
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        });
        
            res.send(200, {
                status: "success",
                data: literatureData
            })
            // res.send({
            //     data:searchTitle
            // })
        
        
        
    } catch (error) {
        console.log(error);
        res.send(500,{
            error: error,
        })
    }
};
exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const newData =await literature.update(req.body,{
            where: {
                id,
            },
        })
        const literatureData = await literature.findOne({
            where: {
                id:id,
            }
        });
        res.send({
            status:"success",
            message: "update status finish",
            data: literatureData,
        })
    } catch (error) {
        console.log(error);
    res.send(500,{
      status: "failed",
      message: "Server Error",
    });
    }
}
exports.getAllLiterature= async (req, res) => {
    try {
        let literatureData = await literature.findAll({
            
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        });
        literatureData = JSON.parse(JSON.stringify(literatureData));
        literatureData = literatureData.map((item) => {
            return { ...item, attachment: item.attachment }
        })
        res.send({
            msg:"success",
            data:literatureData
        })
    } catch (error) {
        console.log(error)
        res.send(500,{
            msg: "failed"
        })
    }
}