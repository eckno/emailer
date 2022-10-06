const _ = require('lodash');
const bcrypt = require("bcryptjs");
const {empty, isObject, isString} = require("../lib/utils/utils");
//
class BaseController {

    constructor(){
        this.mail_api ="";
    }

    /**
	 * standard fail response object
	 * @param res
	 * @param data
	 */
	static sendFailResponse(res, errors) {
		res.status(400).send({ success: false, errors });
	}

    	/**
	 * standard success response object
	 * @param res
	 * @param data
	 */
	static sendSuccessResponse(res, data) {
		res.status(201).send({ success: true, data });
	}

	static sanitizeRequestData(data) {
		if (!empty(data)) {
			_.forEach(data, (d, key) => {
				data[key] = this.recursivelySanitize(d);
			});
		}
		return data;
	}

	static recursivelySanitize(data) {
		if (isObject(data)) {
			_.forEach(data, (d, key) => {
				if (_.isString(d) && _.includes(d, "%") !== false) {
					data[key] = decodeURI(d);
				}
				if (isObject(d)) {
					data[key] = this.recursivelySanitize(d);
				}
			});
		} else if (_.isString(data)) {
			data = data.trim();
		}
		return data;
	}

	async hashPassword (pass) {
        //
        try{
            //
            if(!empty(pass)){
                //
                const password = pass;
                const saltRounds = 10;
          
                const hashedPassword = await new Promise((resolve, reject) => {
                    bcrypt.hash(password, saltRounds, function(err, hash) {
                        if (err) reject(err)
                        resolve(hash)
                    });
                 })
          
                return hashedPassword;
            }
        }
        catch (e) {
            //
            return "Oops! We can't process your request at this time, please try again later";
        }
      }

	  async saveUser(userDetails)
    {
        try{
            //
            if(!empty(userDetails)){
                //
                const save_user = await userDetails.save()
                .then(() => {
                    //
                    const data = {
                        success: true,
                        message: "You have successfully created your account. Login to continue"
                    }
                    //
                    return data;
                }).catch((err) => {
                    //
                    return err;
                })
    
                //
                return save_user;
            }else{
                //
                const data = {
                    success: false,
                    message: "Empty user: no user entry parsed"
                }
                //
                return data;
            }
        }
        catch (e) {
            //
            return "Oops! We can't process your request at this time, please try again later";
        }
    }
    
}

module.exports = BaseController;