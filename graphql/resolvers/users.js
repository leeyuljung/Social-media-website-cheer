const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');

module.exports = {
    Mutation: {
        async register(_, { registerInput: { username, password, passwordConfirm, email } }) {
            
            // 檢查 user 是否有註冊過
            const user = await User.findOne({ username });

            if(user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            // 將密碼加密
            password = await bcrypt.hash(password, 12);

            // 建立新 user 資料
            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            })

            // 存入 DB
            const res = await newUser.save();

            // 產生 JWT
            const token = jwt.sign({
                id: res._id,
                username: res.username,
                email: res.email
            }, SECRET_KEY, { expiresIn: '1h' })

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}