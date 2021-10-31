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

router.patch('/items/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'note', 'image', 'category']
  const isUpdateValid = updates.every(update => allowedUpdates.includes(update))

  if (!isUpdateValid) return res.status(400).send({ error: 'Invalid updates!' })

  try {
    const item = await Item.findOne({ _id: req.params.id, owner: req.user._id });

    if (!item) return res.status(404).send();

    updates.forEach(update => item[update] = req.body[update])
    await item.save()
    res.send(item)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router