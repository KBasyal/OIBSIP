require("dotenv").config()
const nodemailer= require("nodemailer")

class MailService{
    transport;
    constructor(){
        try{
            this.transport = nodemailer.createTransport({
                host:process.env.SMTP_HOST,
                port:process.env.SMTP_PORT,
                auth:{
                    user:process.env.SMTP_USER,
                    pass:process.env.SMTP_PASSWORD
                    
                }

            })

        }catch(exception){
            console.log(exception)
            throw new Error("Unable to connect to the Email Service")
            
        }
    }
    sendemail = async(to, subject, message, attachments)=>{
        try{
            const mailStatus =await this.transport.sendMail({
                to:to,
                from:process.env.SMTP_FROM,
                subject:subject,
                html:message,
                attachments:attachments
            })
            console.log(mailStatus)
            return mailStatus

        }catch(exception){
            console.log(exception)
            throw new Error("Error sending Email")

        }

    }

}

const mailSvc = new MailService()

module.exports = mailSvc