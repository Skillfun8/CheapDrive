const router =require('express').Router();

const controllerBolt = require('../controllers/boltMoloni.controller.js');
const controllerCompany = require('../controllers/company.controller.js');
const controllerCategory = require('../controllers/category.controller.js');
const controllerUber = require('../controllers/uberJasmin.controller.js');
const controllerKapten = require('../controllers/kaptenPipeDrive.controller.js');

//Bolt using moloni
router.get('/bolt/', controllerBolt.getPackages);
router.get('/company/', controllerCompany.getCompany);
router.get('/category/', controllerCategory.getCategory);

//Uber using Jasmin
router.get('/uber/', controllerUber.getPacotes);

//Kapten using Pipedrive
router.get('/kapten/', controllerKapten.getPackages);


module.exports = router;
