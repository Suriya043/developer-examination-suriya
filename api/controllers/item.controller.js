const Item = require("../models/Item");

module.exports = {
  get_item: async (req, res) => {
    try {
      const result = await Item.find();
      res.json({
        status: "200",
        message: "OK",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  },
  get_item_by_id: async (req, res) => {
    try {
      const result = await Item.findById(req.params._id);
      res.json({
        status: "200",
        message: "OK",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  },
  insert_item: async (req, res) => {
    try {
      await Item.create(req.body);
      res.json({
        status: "200",
        message: "OK",
      });
    } catch (error) {
      res.json(error);
    }
  },
  update_item: async (req, res) => {
    try {
      const { id, name, price, quantity, description } = req.body;
      const result = await Item.findOneAndUpdate(
        { _id: id },
        {
          name: name,
          price: price,
          quantity: quantity,
          description: description,
        }
      );
      res.json({
        status: "200",
        message: "OK",
      });
    } catch (error) {
      res.json(error);
    }
  },
};
