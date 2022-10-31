const Router = require('express');
const router = new Router();
const functionController = require('../controllers/functionController');
const roleCheck = require('../middleware/roleCheckingMiddleware');

router.get('/', roleCheck('ADMIN'), functionController.getAll);         //+
router.get('/:id', roleCheck('ADMIN'), functionController.getOne);      //+
router.post('/', roleCheck('ADMIN'), functionController.create);        //+
router.put('/:id', roleCheck('ADMIN'), functionController.update);      //+
router.delete('/:id', roleCheck('ADMIN'), functionController.delete);   //+

module.exports = router;