const ApiError = require('../errors/apiError');
const {RoleFunction} = require('../models/models');

class RoleFunctionController {
    async getAll(req, res) {
        const roleFunctions = await RoleFunction.findAll();

        return res.json(roleFunctions);
    }

    async create(req, res, next) {
        const {roleId, functionId} = req.body;

        try {
            const roleFunction = await RoleFunction.create({
                roleId: roleId,
                functionId: functionId
            });

            return res.json(roleFunction);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;
        module.exports.checkRoleFunctionById(id, next);

        try {
            const status = await RoleFunction.destroy({where: {id}});

            return res.json(status);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async checkRoleFunctionById(id, next) {
        const roleFunction = await RoleFunction.findOne({where: {id}});
        
        if (!roleFunction) {
            return next(ApiError.badRequest('Роль-Функция с такими данными не найдена!'));
        }
        return roleFunction;
    }
}

module.exports = new RoleFunctionController();