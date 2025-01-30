const allowRole =(allowRole)=>{
    return(req, res, next)=>{
        try{
            const loggedInUser = req.body || null;
            if(!loggedInUser){
                throw({code:401, message:"Please Log In first"})
            }else{
                const role = loggedInUser.role;
                if(typeof allowRole == 'string' && allowRole === role){
                    next();
                }else if(Array.isArray(allowedRole) && allowedRole.includes(role)){
                    next();

                }else{
                    next({code:403, message:"You donot have previlage to access this API"})
                }
            }

        }catch(exception){
            next(exception)
        }
    }
}

module.exports = allowRole;