const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

const List = require('../models/list')

router.post('/lists', auth, async (req, res) => {
  const list = new List({
    ...req.body,
    owner: req.user._id
  })
  try {
    await list.save()
    res.status(201).send(list)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/lists', auth, async (req, res) => {
  try {
    const lists = await List.find({ owner: req.user._id }).populate('items.item')
    res.status(201).send(lists)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router