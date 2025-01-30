const bannerSvc = require("./banner.service")

class BannerController{
    create =async(req, res, next)=>{
        try{
            console.log("I am here in service")
            const payload = bannerSvc.transformCreateData(req)
            const createdBanner = await bannerSvc.store(payload);
            res.json({
                result:createdBanner,
                message:"Banner created successfully",
                meta : null
            })
            

        }catch(exception){
            next(exception)
        }
        
    }

}
const bannerCtrl = new BannerController()
module.exports = bannerCtrl;