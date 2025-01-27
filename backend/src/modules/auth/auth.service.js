const {generateRandomString} = require("../../utilities/helper")
const bcrypt = require('bcryptjs');
const UserModel = require("../user/user.model");


class AuthService {
    transferRegisterData = (req) => {
        try {

            const payload = req.body
            payload.password = bcrypt.hashSync(payload.password, 10);
            payload.status = 'inactive'
            payload.activationToken = generateRandomString(100)

            if (req.file) {
                payload.image = req.file.filename
            }
            console.log(payload)
            return payload


        } catch (exception) {
            throw exception
        }


    }
    createUser= async(data)=>{
        try{
            const user = new UserModel(data)
            return await user.save()
            
        }catch(exception){
            throw exception
        }

    }
}

const authSvc = new AuthService()
module.exports = authSvc