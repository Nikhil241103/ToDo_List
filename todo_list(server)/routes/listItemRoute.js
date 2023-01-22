const express = require('express')
const router = express.Router()
const listItemController = require('../controllers/listItemsController')

router.route('/')
  .get(listItemController.getAllItems)
  .post(listItemController.createNewItem)
  .patch(listItemController.updateItem)
  .delete(listItemController.deleteItem)

module.exports = router