const router = require('express').Router()
const ReportController = require('../Controllers/ReportController');
const authentication = require('../Middlewares/authenctication');
const authorization = require('../Middlewares/authorization');

router.get('/', authentication, ReportController.getReports)
router.post('/', authentication, ReportController.addReport)
router.delete('/:id', authentication, authorization, ReportController.deleteReport)

module.exports = router