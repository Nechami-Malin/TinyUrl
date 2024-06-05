import express from 'express';
import links from '../models/links.js'; // Assuming links is the model for the link documents
import RedirectController from '../controllers/RedirectController.js';

const RedirectRouter = express.Router();

RedirectRouter.get("/:id", RedirectController.redirect);


export default RedirectRouter;
