const ApiError = require('../errors/apiError');
const {Role} = require('../models/models');

class RoleController {
    async getAll(req, res) {
        const roles = await Role.findAll();

        return res.json(roles);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const role = await Role.findOne({where: {id}});

        return res.json(role);
    }

    async create(req, res, next) {
        const {system_name, simple_name, start_date, end_date} = req.body;
        module.exports.checkNames(system_name, simple_name, next);

        try {
            const role = await Role.create({
                system_name: system_name,
                simple_name: simple_name,
                start_date: start_date,
                end_date: end_date
            });

            return res.json(role);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        const {id} = req.params;
        module.exports.checkRoleById(id, next);

        const {system_name, simple_name, start_date, end_date} = req.body;
        module.exports.checkNames(system_name, simple_name, next);

        try {
            const role = await Role.update({
                system_name: system_name,
                simple_name: simple_name,
                start_date: start_date,
                end_date: end_date
            }, {where: {id}});

            return res.json(role);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;
        module.exports.checkRoleById(id, next);

        try {
            const status = await Role.destroy({where: {id}});

            return res.json(status);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async checkRoleById(id, next) {
        const role = await Role.findOne({where: {id}});
        
        if (!role) {
            return next(ApiError.badRequest('Роль с такими данными не найдена!'));
        }
    }

    async checkNames(system_name, simple_name, next) {
        if (!system_name || !simple_name) {
            return next(ApiError.badRequest('Название роли не задано!'));
        }

        if (!/.{3,}/.test(system_name) || !/.{3,}/.test(simple_name)) {
            return next(ApiError.badRequest('Название роли не подходит по критериям!'));
        }
    }
}

module.exports = new RoleController();