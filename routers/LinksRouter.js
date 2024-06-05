import express from 'express'
import LinksController from '../controllers/LinksController.js'

const LinkRouter = express.Router()

LinkRouter.get('/', LinksController.getList)

LinkRouter.get('/:id', LinksController.getById)

LinkRouter.get("/:id/click", LinksController.getClicksByLink);

LinkRouter.post('/', LinksController.add)

LinkRouter.put('/:id', LinksController.update)

LinkRouter.delete('/:id', LinksController.delete)

export default LinkRouter