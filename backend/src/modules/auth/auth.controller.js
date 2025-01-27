const {transferRegisterData}= require("./auth.service.js")
const UserModel = require("../user/user.model");
const authSvc = require('./auth.service');
const mailSvc = require("../../services/mail.services.js")

class AuthController{
    register=async(req,res,next) =>{

        try{
            const data =authSvc.transferRegisterData(req)
            // to do : db store
            const registeredData = await authSvc.createUser(data);
            console.log("ther registered data is:",registeredData)
            await mailSvc.sendEmail(
                registeredData.email,
                "Activate your Account",
                `Dear ${registeredData.name} <br />
                <p> You have registered your account with username <strong> ${registeredData.email}</p>
                <p> Please click the link below or copy and paste the url in the browser to activate your account </p>
                <a href="${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}">
                ${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}</a></br>
                <p> Regards, </p>
                <p>${process.env.SMTP_FROM}</p>
                <p><small><em>please donot reply to thsi email via any mail service.</em></small></p>`
            )
            res.json({
                result:registeredData,
                message:"Register success",
                meta: null
            })

        }catch (exception){
            console.log(exception)
            next(exception)

        }

    }

  
}
const authCtrl = new AuthController
module.exports= authCtrl