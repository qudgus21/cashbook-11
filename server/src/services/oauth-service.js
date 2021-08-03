const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');
const axios = require('axios');
const { createHash, verifyPassword } = require('../utils/bcrypt');
const { createJWT } = require('../utils/jwt');
const dotenv = require('dotenv');

dotenv.config();


const client_id = process.env.GIT_CLIENT_ID
const client_secret = process.env.GIT_CLIENT_PASSWORD


const githubCallback = async (req, res, next) => {
    try {
        const reponseCode = req.body.code

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

        const id = data.login;
        

        const [user, isCreated] = await db.User.findOrCreate({
            where: { id },
            defaults: { password: createHash('github32!a~') }
        });
        
        const JWT = createJWT(user);
                
        const { code, message } = success.LOGIN;
        
        user.password = '';

        res.status(code).json({ message, user, JWT });

    } catch (e) {
        next(e); 
    }
}

module.exports = {
    githubCallback};