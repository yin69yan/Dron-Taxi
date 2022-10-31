const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authCheck = require('../middleware/authCheckingMiddleware');
const roleCheck = require('../middleware/roleCheckingMiddleware');

router.get('/auth', authCheck, userController.checkToken);          //+
router.get('/', roleCheck('ADMIN'), userController.getAll);         //+
router.get('/:id', roleCheck('ADMIN'), userController.getOne);      //+
router.post('/registration', userController.registration);          //+
router.post('/login', userController.login);                        //+
router.post('/', roleCheck('ADMIN'), userController.create);        //+
router.put('/:id', roleCheck('ADMIN'), userController.update);      //+
router.delete('/:id', roleCheck('ADMIN'), userController.delete);   //+

module.exports = router;