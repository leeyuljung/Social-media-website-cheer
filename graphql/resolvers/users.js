const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');

function generateToken(user) {
    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user);

            return{
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, { registerInput: { username, password, passwordConfirm, email } }) {

            // 驗證欄位格式及是否為空值
            const { errors, valid } = validateRegisterInput(username, password, passwordConfirm, email);
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

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
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}