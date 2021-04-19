const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTagsData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }]
    });
    res.status(200).json(allTagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagsIdData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }]
    });
    if (!tagsIdData) {
      res.status(404).json({ message: 'No tags found' });
      return;
    }
    res.status(200).json(tagsIdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).jsono(newTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update({
      where: {
        id: req.params.id
      }
    });
    if (!updateTagData) {
      res.status(404).json({ message: 'No tags found' });
      return;
    }
    res.status(200).json(updateTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTagData = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!deleteTagData) {
      res.status(404).json({ message: 'no tags found' });
      return;
    }
    res.status(200).json(deleteTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
