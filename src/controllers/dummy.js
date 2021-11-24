exports.home = async (req, res) => {
    try {
        res.send({
            status:"success",
            message: "welcome"
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}