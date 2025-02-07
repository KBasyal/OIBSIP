const sauceSvc = require("./sauce.service");

class SauceController{
    create = async (req, res, next)=>{
        try{
            const payload = sauceSvc.transformCreateData(req);
            const createdSauce = await sauceSvc.store(payload);
            res.json({
                result:createdSauce,
                message: "sauce created successfully",
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
            const data = await sauceSvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await sauceSvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"sauce List",
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
            const detail = await sauceSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "Sauce Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await sauceSvc.findOne({
                _id: req.params.id
            })
            const payload =sauceSvc.transformUpdateData(req, existingData)
            const updateStatus = await sauceSvc.update({_id: req.params.id}, payload)
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
            const exists = await  sauceSvc.findOne({_id : req.params.id})
            const status = await sauceSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " Sauce deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await sauceSvc.getForHome()
            res.json({
                result: list,
                message:"Sauce listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const sauceCtrl = new SauceController()
module.exports = sauceCtrl;