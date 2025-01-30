const BannerModel = require("./banner.model");

class BannerService {
    transformCreateData = (req)=>{
        try{
            
            const data = {...req.body}
            if(!req.file){
                throw({code:400, message: "Image is required"})
            }else{
                data.image = req.file.filename;
            }
            data.createdBy = req.authUser._id;
            return data

        }catch(exception){
            throw(exception)
        }
    }
    store = async(data)=>{
        try{
            const banner = new BannerModel(data);
            return await banner.save()

        }catch(exception){
            throw(exception)
        }
    }
}

const bannerSvc = new BannerService();
module.exports = bannerSvc;