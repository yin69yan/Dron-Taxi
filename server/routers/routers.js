const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const roleFunctionRouter = require('./roleFunctionRouter');
const functionRouter = require('./functionRouter');

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/role_function', roleFunctionRouter);
router.use('/function', functionRouter);

module.exports = router;