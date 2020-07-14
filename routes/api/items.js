const express = require("express");
const router = express.Router();

const db = require("../../models");
const validateUrlInput = require("../../validation/details");
const getDetails = require("../../Utils/scraper");
const getAsin = require("../../Utils/getAsin");

router.get("/:id", async (req, res) => {
  try {
    const user = await db.User.findById(req.params.id)
      .populate("items.itemRef")
      .lean();

    let items = [];

    user.items.forEach((element) => {
      let item = {
        id: element._id,
        name: element.name,
        date: element.date,
        target: element.target,
        url: element.itemRef.url,
        asin: element.itemRef.asin,
        current: element.itemRef.current,
        itemId: element.itemRef._id,
      };
      items.push(item);
    });

    return res.json(items);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:userId/:itemId", async (req, res) => {
  try {
    const user = await db.User.findById(req.params.userId).populate(
      "items.itemRef"
    );

    for (let item of user.items) {
      if (item._id == req.params.itemId) {
        return res.json(item);
      }
    }
  } catch (error) {
    return res.json(error);
  }
});

router.post("/:id/addItem", async (req, res) => {
  try {
    let item = await db.Item.findOne({ asin: req.body.asin });

    if (item) {
      if (!item.users.includes(req.params.id)) {
        item.users.push(req.params.id);
      }
      await item.save();
      await db.User.findByIdAndUpdate(req.params.id, {
        $addToSet: {
          items: {
            name: req.body.name,
            target: req.body.target,
            itemRef: item._id,
          },
        },
      });
    } else {
      const newItem = new db.Item({
        name: req.body.itemName,
        asin: req.body.asin,
        url: req.body.url,
        current: req.body.current,
        users: [req.params.id],
      });
      item = await newItem.save();
      await db.User.findByIdAndUpdate(req.params.id, {
        $push: {
          items: {
            name: req.body.name,
            target: req.body.target,
            itemRef: item._id,
          },
        },
      });
    }
    res.redirect(`/api/${req.params.id}`);
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/:userId/:itemId", async (req, res) => {
  try {
    await db.User.findByIdAndUpdate(req.params.userId, {
      $pull: { items: { itemRef: req.params.itemId } },
    });

    const item = await db.Item.findByIdAndUpdate(req.params.itemId, {
      $pull: { users: req.params.userId },
    });
    if (item.users.length === 1) {
      await db.Item.deleteOne({ _id: req.params.itemId });
    }
    return res.json(item);
  } catch (error) {
    return res.json(error);
  }
});

router.post("/:userId/edit/:itemId", async (req, res) => {
  try {
    let user = await db.User.findById(req.params.userId);

    for (let item of user.items) {
      if (item._id == req.params.itemId) {
        item.name = req.body.name;
        item.target = req.body.target;
        break;
      }
    }

    await user.save();
    res.redirect(`/api/${req.params.userId}`);
  } catch (error) {
    return res.json(error);
  }
});

router.post("/getDetails", async (req, res) => {
  try {
    const { errors, isValid } = validateUrlInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const asin = getAsin(req.body.url);
    const item = await db.Item.findOne({ asin: asin });
    if (item) {
      if (item.users.includes(req.body.id)) {
        return res.status(400).json({ url: "Item already exists" });
      } else {
        const details = {
          name: item.name,
          url: req.body.url,
          asin: item.asin,
          price: item.current,
        };
        return res.json(details);
      }
    } else {
      const details = await getDetails(req.body.url);
      if (!details.price) {
        return res
          .status(400)
          .json({ url: "Cannot extract price information" });
      }
      return res.json(details);
    }
  } catch (error) {
    return res.status(400).json({ url: "Cannot extract item information" });
  }
});

module.exports = router;
