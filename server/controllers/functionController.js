const ApiError = require('../errors/apiError');
const {Function} = require('../models/models');

class FunctionController {
    async getAll(req, res) {
        const functions = await Function.findAll();

        return res.json(functions);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const func = await Function.findOne({where: {id}});

        return res.json(func);
    }
    
    async create(req, res, next) {
        const {system_name, simple_name, status} = req.body;
        module.exports.checkNames(system_name, simple_name, next);

        try {
            const func = await Function.create({
                system_name: system_name,
                simple_name: simple_name,
                status: status
            });

            return res.json(func);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        const {id} = req.params;
        module.exports.checkFunctionById(id, next);

        const {system_name, simple_name, status} = req.body;
        module.exports.checkNames(system_name, simple_name, next);

        try {
            const func = await Function.update({
                system_name: system_name,
                simple_name: simple_name,
                status: status
            }, {where: {id}});

            return res.json(func);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;
        module.exports.checkFunctionById(id, next);

        try {
            const status = await Function.destroy({where: {id}});

            return res.json(status);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async checkFunctionById(id, next) {
        const func = await Function.findOne({where: {id}});
        
        if (!func) {
            return next(ApiError.badRequest('Функция с такими данными не найдена!'));
        }
    }

    async checkNames(system_name, simple_name, next) {
        if (!system_name || !simple_name) {
            return next(ApiError.badRequest('Название функции не задано!'));
        }

        if (!/.{3,}/.test(system_name) || !/.{3,}/.test(simple_name)) {
            return next(ApiError.badRequest('Название функции не подходит по критериям!'));
        }
    }
}

module.exports = new FunctionController();