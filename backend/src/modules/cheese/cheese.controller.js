const cheeseSvc = require("./cheese.service");

class CheeseController{
    create = async (req, res, next)=>{
        try{
            const payload = cheeseSvc.transformCreateData(req);
            const createdCheese = await cheeseSvc.store(payload);
            res.json({
                result:createdCheese,
                message: "cheese created successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }

    }
    index = async(req, res, next)=>{
        try{
          
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 15;

            const skip = (page - 1)*limit;
            let filter = {};
            if(req.query.search){
               
                filter = {
                    title: new RegExp(req.query.search, 'i')
                }
            }
            const data = await cheeseSvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await cheeseSvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"cheese List",
                meta:{
                    limit: limit,
                    page: page,
                    total :countData
                }
            })

        }catch(exception){
            next(exception)
        }
    }
    show= async(req, res , next) =>{
        try{
            const detail = await cheeseSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "Cheese Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await cheeseSvc.findOne({
                _id: req.params.id
            })
            const payload =cheeseSvc.transformUpdateData(req, existingData)
            const updateStatus = await cheeseSvc.update({_id: req.params.id}, payload)
            res.json({
                result: updateStatus,
                messsage:"Data updated",
                meta : null
                
            })

        }catch(exception){
            next(exception)
        }

    }
    delete= async(req, res, next)=>{
        try{
            const exists = await  cheeseSvc.findOne({_id : req.params.id})
            const status = await cheeseSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " Cheese deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await cheeseSvc.getForHome()
            res.json({
                result: list,
                message:"Cheese listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const cheeseCtrl = new CheeseController()
module.exports = cheeseCtrl;