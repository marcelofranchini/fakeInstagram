const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");


const auth = require('../middlewares/auth')
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public", "posts"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
/* GET home page. */

router.get("/", authController.create);

router.get("/login", authController.create);
router.post("/login", authController.store);

router.get("/registro", userController.create);
router.post("/registro", userController.store);

router.get("/publicar",auth,postController.create);
router.post("/publicar",upload.any(), postController.store);



router.get("/home",auth,postController.index);


router.post("/comentar", auth, commentController.store);

router.delete('/delete/:publicationId',auth, postController.delete)

module.exports = router;
