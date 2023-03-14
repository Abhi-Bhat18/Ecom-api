import expess from "express";
import multer from "multer";
import { uploadProduct, getImg,getProducts,getAProduct } from "../controllers/productController.js";
const router = expess.Router();

const upload = multer({ dest: "uploads/" });

router.get("", getProducts);
router.get('/:id',getAProduct)
router.post("/upload", upload.single("file"), uploadProduct);
router.get("/img/:filename", getImg);
export default router;
