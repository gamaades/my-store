const express=require('express');
const productsServices = require("./../services/product.service");
const validatorHandler = require("./../Middlewares/validator.handler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("./../schemas/product.schema");
const router = express.Router();
const service = new productsServices();

router.get('/', async (req,res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter',(req,res)=>{
  res.send('Yo soy un filter');
});

router.get('/:id', validatorHandler(getProductSchema, "params"),  async (req,res, next)=>{
  try {
    const{id}=req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }


});

router.post("/", validatorHandler(createProductSchema, "body"), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    "message": "Creado un nuevo producto",
    "data": newProduct
  })
});

router.patch("/:id", validatorHandler(getProductSchema, "params"), validatorHandler(updateProductSchema, "body"),  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: "Actualización parcial de un producto",
      data: product,
      id: id
    })
  } catch (error) {
      next(error);
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "Actualización completa de un producto",
    data: body,
    id: id
  })
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const respuesta = await service.delete(id);
  res.status(200).json({
    message: "Elimina un producto",
    id: respuesta
  })
});

module.exports=router;
