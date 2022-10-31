const Router = require('express');
const router = new Router();
const roleController = require('../controllers/roleController');
const roleCheck = require('../middleware/roleCheckingMiddleware');

router.get('/', roleCheck('ADMIN'), roleController.getAll);         //+
router.get('/:id', roleCheck('ADMIN'), roleController.getOne);      //+
router.post('/', roleCheck('ADMIN'), roleController.create);        //+
router.put('/:id', roleCheck('ADMIN'), roleController.update);      //+
router.delete('/:id', roleCheck('ADMIN'), roleController.delete);   //+

module.exports = router;