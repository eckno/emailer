const _ = require('lodash');
const BaseController = require("./baseController");
const {empty, isObject, filter_var, isString} = require("../lib/utils/utils");
const Users = require("../models/Users");
const base = new BaseController();
const { v4: uuidv4 } = require('uuid');


class AdminController extends BaseController
{
    constructor(){
        super();
    }

    async indexAction(req, res){
        return console.log("heyo");
    }
}

module.exports = AdminController;