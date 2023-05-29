const { empty, isString } = require('../lib/utils/utils');

const Authenticated = async (req, res, next) => {

    try {
		if (empty(req.session) || empty(req.session.user) || req.session.user === undefined) {
			return res.redirect('/');
		}
        next();
    }
    catch(ex){
        console.log(ex.message);
    }
}

module.exports = Authenticated;