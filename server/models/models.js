const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role_system_name: {type: DataTypes.STRING, defaultValue: "USER", allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: true},
    middle_name: {type: DataTypes.STRING, allowNull: true},
    last_name: {type: DataTypes.STRING, allowNull: true},
    sex: {type: DataTypes.STRING, allowNull: true},
    phone: {type: DataTypes.STRING, unique: true, allowNull: true},
    photo: {type: DataTypes.STRING, unique: true, allowNull: true},
    date_of_birth: {type: DataTypes.DATE, allowNull: true},
    last_visit: {type: DataTypes.DATE, allowNull: true}
});

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    system_name: {type: DataTypes.STRING, unique: true, allowNull: false},
    simple_name: {type: DataTypes.STRING, allowNull: false},
    start_date: {type: DataTypes.DATE, allowNull: true},
    end_date: {type: DataTypes.DATE, allowNull: true}
});

const RoleFunction = sequelize.define('role_function', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const Function = sequelize.define('function', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    system_name: {type: DataTypes.STRING, unique: true, allowNull: false},
    simple_name: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.BOOLEAN}
});

Role.belongsToMany(Function, {through: RoleFunction});
Function.belongsToMany(Role, {through: RoleFunction});

module.exports = {User, Role, RoleFunction, Function};