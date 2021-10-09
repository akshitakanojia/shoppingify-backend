const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

const Item = require('../models/item')

router.post('/items', auth, async (req, res) => {
  const item = new Item({
    ...req.body,
    owner: req.user._id
  })
  try {
    await item.save()
    res.status(201).send(item)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/items', auth, async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user._id })
    if (!items) {
      return res.status(404).send()
    }
    res.send(items)
  } catch (error) {
    console.log(error);
    res.status(500).send()
  }
})

module.exports = router