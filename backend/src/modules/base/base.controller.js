const baseSvc = require("./base.service");

class BaseController{
    create = async (req, res, next)=>{
        try{
            const payload = baseSvc.transformCreateData(req);
            const createdBase = await baseSvc.store(payload);
            res.json({
                result:createdBase,
                message: "base created successfully",
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
            const data = await baseSvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await baseSvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"base List",
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
            const detail = await baseSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "Base Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await baseSvc.findOne({
                _id: req.params.id
            })
            const payload =baseSvc.transformUpdateData(req, existingData)
            const updateStatus = await baseSvc.update({_id: req.params.id}, payload)
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
            const exists = await  baseSvc.findOne({_id : req.params.id})
            const status = await baseSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " Base deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await baseSvc.getForHome()
            res.json({
                result: list,
                message:"Base listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const baseCtrl = new BaseController()
module.exports = baseCtrl;