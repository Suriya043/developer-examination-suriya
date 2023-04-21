var router = require("express").Router();
const item_controllers = require("../controllers/item.controller");

router.get("/get_item", item_controllers.get_item);
router.get("/get_item_by_id/:_id", item_controllers.get_item_by_id);
router.post("/insert_item", item_controllers.insert_item);
router.post("/update_item", item_controllers.update_item);

module.exports = router;
