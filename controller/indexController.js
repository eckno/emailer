const _ = require('lodash');
const BaseController = require("./baseController");
const {empty, isObject, filter_var, isString} = require("../lib/utils/utils");
const Users = require("../models/Users");
const base = new BaseController();
const { v4: uuidv4 } = require('uuid');

//
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
        if(req.method === "POST"){
            const post = base.sanitizeRequestData(req.body); 
        }

        res.render("index", {
            title: "Welcome to E-Mailer",
            scripts: [
                "./auth/register.js"
            ]
        });
    }
}


module.exports = IndexController;