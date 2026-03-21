const express = require('express');
const servicesController = require('../../controllers/services/sevices.controller');
const upload = require('../../utils/middlewares/multer');
const useAuth = require('../../utils/middlewares/useAuth');

const servicesRouter = express.Router();

servicesRouter.get('/', servicesController.getServices);
servicesRouter.post('/', useAuth, upload,servicesController.addService);
servicesRouter.put('/:id',useAuth, upload, servicesController.updateService);
servicesRouter.delete('/:id', useAuth, servicesController.deleteService);

module.exports = servicesRouter;