import express from 'express';
import links from '../models/links.js'; // Assuming links is the model for the link documents
import RedirectController from '../controllers/RedirectController.js';

const RedirectRouter = express.Router();

// RedirectRouter.get('/link/:linkId/clicks', async (req, res) => {
//     try {
//         const { linkId } = req.params;
//         const link = await links.findById(linkId);

//         if (!link) {
//             return res.status(404).json({ message: 'Link not found' });
//         }

//         const clicksByTarget = link.targetValues.map(target => {
//             return {
//                 target: target.value,
//                 clicksCount: target.clicksCount || 0
//             };
//         });

//         res.json({ clicksByTarget });
//     } catch (e) {
//         res.status(400).json({ message: e.message });
//     }
// });

RedirectRouter.get("/:id", RedirectController.redirect);


export default RedirectRouter;
