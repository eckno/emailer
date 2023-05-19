const _ = require('lodash');
const BaseController = require("./baseController");
const {empty, isObject, filter_var, isString} = require("../lib/utils/utils");
const Users = require("../models/Users");
const base = new BaseController();
const { v4: uuidv4 } = require('uuid');

//
//const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const db = getFirestore();

class IndexController extends BaseController
{
    constructor(){
        super();
    }

    async registerAction(req, res)
    {
        if(req.method == "POST"){
            const post = IndexController.sanitizeRequestData(req.body);
            if(!empty(post) && !empty(post['email']))
            {
                if(!filter_var(_.trim(post["email"]), "FILTER_VALIDATE_EMAIL") || !isString(post["email"])){
                    //
                    data = {
                        success: false,
                        message: "Please enter a valid email address"
                    }
                    //
                    return IndexController.sendFailResponse(res, data);
                    }

                const user = new Users({
                    fullname: post['name'],
                    email: post['email'],
                    auth: post['password'],
                    urole: "user",
                    uid: uuidv4(),
                    api_key: uuidv4(),
                    public_key: uuidv4(),
                });
                
                const for_firestore = {
                    fullname: post['name'],
                    email: post['email'],
                    auth: post['password'],
                    urole: "user",
                    uid: user.uid,
                    api_key: user.api_key,
                    public_key: user.public_key,
                };

                const securedUser = await base.hashPassword(user.auth);
                if(!empty(securedUser)){
                    user.auth = securedUser;
                }
                const saveUser = await base.saveUser(user);
                const docRef = db.collection('users').doc(for_firestore.uid);
                await docRef.set(for_firestore);
                return IndexController.sendSuccessResponse(res, saveUser);
            }
        }

        res.render("register", {
            title: "Start sending emails to clients",
            scripts: [
                "./auth/register.js"
            ]
        });
    }

    async loginAction(req, res)
    {
        try {

            if(req.method === "POST"){
                let userid, errors = {}, response = {};
                const post = IndexController.sanitizeRequestData(req.body);
                if(empty(post['email']) || empty(post['password'])){
                    errors['account'] = "Please enter your email and password correctly !";
                }
                else{
                    const findUser = await db.collection("users").where("email", "==", post['email']).get();
                    if(findUser.empty) {
                        errors['account'] = "Invalid email address or password. Confirm details and retry"
                    }
                    else{
                        let userPass = "";
                        findUser.forEach(doc => {
                            userPass = doc.data().auth;
                            userid = doc.id;
                        });
                        
                        if(userPass !== post['password']){
                            errors['account'] = "Invalid email address or password. Confirm details and retry"
                        }
                    }
                }

                if ( !empty(errors) || empty(userid)) {
                    return IndexController.sendFailResponse(res, errors);
                }

                const userSession = {
                    userid,
                    loggedIn: true
                };
                
                if (req && req.session && !empty(userSession)) {
                    req.session.user = userSession;
                    req.session.save();
                    console.log("hi");
                }

                response['redirect_url'] ="/dashboard/smtp";
				response['msg'] ="User Authenticated";

                return IndexController.sendSuccessResponse(res, response);
            }
    
            res.render("index", {
                title: "Welcome to E-Mailer",
                scripts: [
                    "./auth/register.js"
                ]
            });
        } catch(e) {
            console.log(e.message);
            return IndexController.sendFailResponse(res, e.message);
        }
    }
}


module.exports = IndexController;