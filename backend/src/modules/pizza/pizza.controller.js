const pizzaSvc = require("./pizza.service");

class PizzaController{
    create = async (req, res, next)=>{
        try{
            const payload = pizzaSvc.transformCreateData(req);
            const createdPizza = await pizzaSvc.store(payload);
            res.json({
                result:createdPizza,
                message: "pizza created successfully",
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
            const data = await pizzaSvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await pizzaSvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"pizza List",
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
            const detail = await pizzaSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "Pizza Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await pizzaSvc.findOne({
                _id: req.params.id
            })
            const payload =pizzaSvc.transformUpdateData(req, existingData)
            const updateStatus = await pizzaSvc.update({_id: req.params.id}, payload)
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
            const exists = await  pizzaSvc.findOne({_id : req.params.id})
            const status = await pizzaSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " Pizza deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await pizzaSvc.getForHome()
            res.json({
                result: list,
                message:"Pizza listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const pizzaCtrl = new PizzaController()
module.exports = pizzaCtrl;