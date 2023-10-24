const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET all tags with associated Product data
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag, // This will include associated Products via ProductTag
          as: "products",
        },
      ],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single tag by ID with associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag, // This will include associated Products via ProductTag
          as: "products",
        },
      ],
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST: Create a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({ tag_name: req.body.tag_name });
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT: Update a tag's name by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: req.params.id },
      }
    );
    if (updatedTag[0] === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.json({ message: "Tag updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// DELETE: Delete a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!deletedTag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
