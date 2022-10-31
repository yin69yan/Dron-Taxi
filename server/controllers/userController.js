const ApiError = require('../errors/apiError');
const uuid = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const {User} = require('../models/models');

const generateJWT = (id, login, role) => {
    return jwt.sign({id, login, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}; 

class UserController {
    async checkToken(req, res) {
        const token = generateJWT(req.user.id, req.user.login, req.user.role_system_name);

        return res.json({token});
    }

    async getAll(req, res) {
        const users = await User.findAll();

        return res.json(users);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const user = await User.findOne({where: {id}});

        return res.json(user);
    }

    async registration(req, res, next) {
        const {login, password, role_system_name} = req.body;
        
        module.exports.checkLP(login, password, next);
        module.exports.checkLogin(login, next);
        module.exports.checkPassword(password, next);

        try {
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({login, password: hashPassword, role_system_name});
            const token = generateJWT(user.id, user.login, user.role_system_name);

            return res.json({token});
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async login(req, res, next) {
        const {login, password} = req.body;
        module.exports.checkLP(login, password, next);

        let user = await User.findOne({where: {login}});
        if (!user) {
            return next(ApiError.badRequest('Пользователь с такими данными не найден!'));
        }

        const passwordsCompare = bcrypt.compareSync(password, user.password);
        module.exports.comparePasswords(passwordsCompare, next);

        const token = generateJWT(user.id, user.login, user.role_system_name);

        await User.update({last_visit: moment().format()}, {where: {login}});

        return res.json({token});
    }

    async create(req, res, next) {
        const {login, password, role_system_name, first_name, 
            middle_name, last_name, sex, phone, date_of_birth} = req.body;
        
        module.exports.checkLP(login, password, next);
        module.exports.checkLogin(login, next);
        module.exports.checkPassword(password, next);
        module.exports.checkSex(sex, next);
        module.exports.checkPhone(phone, next);

        const {photo} = req.files;
        let fileName;
        if (photo) {
            fileName = uuid.v4() + ".jpg";
            photo.mv(path.resolve(__dirname, '..', 'static', fileName));
        }
        
        try {
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                login: login,
                password: hashPassword,
                role_system_name: role_system_name,
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                sex: sex,
                phone: phone,
                date_of_birth: date_of_birth,
                photo: fileName
            });

            return res.json(user);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        const {id} = req.params;
        module.exports.checkUserById(id, next);
        const {password, role_system_name, first_name, 
            middle_name, last_name, sex, phone, date_of_birth} = req.body;
        
        module.exports.checkPassword(password, next);
        module.exports.checkSex(sex, next);
        module.exports.checkPhone(phone, next);

        const {photo} = req.files;
        let fileName;
        if (photo) {
            fileName = uuid.v4() + ".jpg";
            photo.mv(path.resolve(__dirname, '..', 'static', fileName));
        }
        
        try {
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.update({
                password: hashPassword,
                role_system_name: role_system_name,
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                sex: sex,
                phone: phone,
                date_of_birth: date_of_birth,
                photo: fileName
            }, {where: {id}});

            return res.json(user);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;
        module.exports.checkUserById(id, next);

        try {
            const status = await User.destroy({where: {id}});

            return res.json(status);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async checkUserById(id, next) {
        const user = await User.findOne({where: {id}});
        
        if (!user) {
            return next(ApiError.badRequest('Пользователь с такими данными не найден!'));
        }
    }
    
    async checkLP(login, password, next) {
        if (!login || !password) {
            return next(ApiError.badRequest('Логин или пароль не были введены!'));
        }
    }
    
    async checkLogin(login, next) {
        if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(login)) {
            return next(ApiError.badRequest('Логин не подходит по критериям!'));
        }

        const user = await User.findOne({where: {login}});
        if (user) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует!'));
        }
    }
    
    async checkPassword(password, next) {
        if (!/(?=.*[A-Z])(?=.*\d)\w{6,}/.test(password)) {
            return next(ApiError.badRequest('Пароль не подходит по критериям!'));
        }
    }

    async comparePasswords(passwordsCompare, next) {
        if (!passwordsCompare) {
            return next(ApiError.badRequest('Указан неверный пароль!'));
        }
    }
    
    async checkSex(sex, next) {
        if (!['male', 'female'].includes(sex)) {
            return next(ApiError.badRequest('Неверно указан пол!'));
        }
    }
    
    async checkPhone(phone, next) {
        if (!/^\d{11}$/.test(phone)) {
            return next(ApiError.badRequest('Неверно указан номер телефона!'));
        }
    }   
}

module.exports = new UserController();