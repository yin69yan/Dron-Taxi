const Router = require('express');
const router = new Router();
const roleFunctionController = require('../controllers/roleFunctionController');
const roleCheck = require('../middleware/roleCheckingMiddleware');

router.get('/', roleCheck('ADMIN'), roleFunctionController.getAll);         //+
router.post('/', roleCheck('ADMIN'), roleFunctionController.create);        //+
router.delete('/:id', roleCheck('ADMIN'), roleFunctionController.delete);   //+

module.exports = router;