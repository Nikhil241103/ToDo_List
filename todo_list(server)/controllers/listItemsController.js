const ListItem = require('../models/ListItem')

// @desc Get all list items
// @route GET /list
const getAllItems = async (req, res) => {
  // Get all items from MongoDB
  const list = await ListItem.find().lean()

  // If no list
  if (!list?.length) {
    return res.status(400).json({ message: 'No list found' }) // 400: Bad request
  }

  res.status(200).json(list)
}

// @desc Create new list item
// @route POST /list
const createNewItem = async (req, res) => {
  const { title } = req.body
  // confirm data
  if (!title) {
    return res.status(400).json({ message: 'Please enter title for new list item.' }) // 400: Bad request
  }

  // check for duplicate title
  const duplicate = await ListItem.findOne({ title }).lean().exec()
  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate title!' }) // 409: conflict
  }

  const item = ListItem.create({ title, start: new Date() })
  if (item) { // Created 
    return res.status(201).json({ message: 'New list item created' }) // 201: request fulfilled (created)
  } else {
    return res.status(400).json({ message: 'Invalid list item received' })
  }
}

// @desc Update a list item
// @route PATCH /list
const updateItem = async (req, res) => {
  const { id, completed } = req.body
  if (!id || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Something went wrong.' })
  }

  // Confirm item exists, to update
  const item = await ListItem.findById(id).exec()
  if (!item) {
    return res.status(400).json({ message: 'List item not found' })
  }

  item.completed = completed
  if (completed) {
    item.end = new Date()
  }
  const updatedItem = await item.save()

  res.status(200).json(`${updatedItem.title} updated`)
}

// @desc Delete a list item
// @route DELETE /list
const deleteItem = async (req, res) => {
  const { id } = req.body
  // Confirm id
  if (!id) {
    return res.status(400).json({ message: 'List item id required' })
  }

  // Confirm list item exists, to delete
  const item = await ListItem.findById(id).exec()
  if (!item) {
    return res.status(400).json({ message: 'List item not found' })
  }

  const result = await item.deleteOne()
  const reply = `List item ${result.title} with ID ${result.id} deleted`
  res.json(reply)
}

module.exports = {
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem
}