const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: Product,
  })
    .then((categories) => {
      return res.status(200).json(categories);
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ err_categories: "Soemething wrong happened" });
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: Product,
  })
    .then((category) => {
      if (category) {
        return res.status(200).json(category);
      } else {
        return res.status(404).json("Category is empty");
      }
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ err_categories: "Soemething wrong happened" });
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((category) => {
      return res.status(200).json(category);
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ err_categories: "Soemething wrong happened" });
    });
});

router.put("/:id", (req, res) => {
  Category.update(
    {
      where: {
        id: req.params.id,
      },
    },
    {
      category_name: req.body.category_name,
    }
  )
    .then((affectedRow) => {
      if (affectedRow > 0) {
        return res.status(200).json("Successfully update the category");
      } else {
        return res.status(404).json("Category not found");
      }
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ err_categories: "Soemething wrong happened" });
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destory({
    where: {
      id: req.params.id,
    },
  })
    .then((numDeleted) => {
      if (numDeleted > 0) {
        return res.status(200).json("Category deleted successfully");
      } else {
        return res.status(404).json("Category not found");
      }
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ err_categories: "Soemething wrong happened" });
    });
});

module.exports = router;
