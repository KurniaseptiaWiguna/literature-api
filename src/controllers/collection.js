const {collection,user,literature} = require("../../models")

exports.addCollection =async (req, res) => {
    const id = req.user.id;
    try {
        const newCollection = await collection.create({
            userId: id,
            ...req.body,

        })
        let literatureData = await literature.findOne({
            where: {
                id: newCollection.literatureId,
            },
            attributes: {
                exclude: ["createdAt","updatedAt","status"]
            }
        });
        let userData = await user.findOne({
            where: {
                id: newCollection.userId,
            },
            attributes: {
                exclude: ["createdAt","updatedAt","status","password","photo"]
            }
        });
        res.send({
            status: "success", 
            message: "add collection finished",
            data:[
                {
                    id:literatureData.id,
                    title: literatureData.title,
                    userId:userData,
                    publication_date: literatureData.publication_date,
                    pages: literatureData.pages,
                    ISBN: literatureData.isbn,
                    author: literatureData.author,
                    attache: literatureData.attacment
                }
            ]
        })
    } catch (error) {
        
    }
};
exports.getCollections = async (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    try {
        
        const collectionData = await collection.findAll({
            where:{
                userId: userId,
            },
            include: [
                {
                    model:literature,
                    as: "literature",
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
                        exclude: ["createdAt","updatedAt","status"]
                    }
                }
            ]
        })
        if(collectionData.length < 1){
            return res.send({
                message: "no data found"
            })
        }
        
        
        res.send({
            status: "success",
            data:collectionData
        })
    } catch (error) {
        console.log(error);
        res.send(500,{
            status: "failed",

        })
    }

}
exports.collect = async (req, res) => {
    const id = req.params.id;
    try {
        res.send({
            message: id
        })
    } catch (error) {
        
    }
}