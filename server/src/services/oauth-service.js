const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');
const axios = require('axios');


const client_id = 'ac4c75cd733116b5db3b'
const client_secret = '586605b842f5d66df2914c497351ba58c9f0bb5c'


const githubCallback = async (req, res, next) => {
    try {
        const reponseCode = req.query.code

        const response = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                code:reponseCode,
                client_id,
                client_secret, 
            },
            {
                headers: {
                accept: 'application/json',
                },
            },
        );

        const token = response.data.access_token;


        const { data } = await axios.get('https://api.github.com/user', {
            headers: {
              Authorization: `token ${token}`,
            },
        });


        const id = data.email;
        
        console.log('data is...',data)

        const [user, isCreated] = await db.User.findOrCreate({
            where: { id },
            defaults: { password: createHash('github32!a~') }
        });
        
        console.log('user is...', user);
        console.log('isCreated is..', isCreated);

        if (!isCreated) {
        }

        // const { code, message } = success.DEFAULT_CREATE;

        // res.status(code).json({ message, user });





    } catch (e) {
        // next(e); 
    }
}

module.exports = {
    githubCallback};