const express = require('express');
const servicesController = require('../../controllers/services/sevices.controller');
const upload = require('../../utils/middlewares/multer');

const servicesRouter = express.Router();

servicesRouter.get('/', servicesController.getServices);
servicesRouter.post('/', upload,servicesController.addService);
servicesRouter.put('/:id', upload, servicesController.updateService);
servicesRouter.delete('/:id', servicesController.deleteService);

module.exports = servicesRouter;