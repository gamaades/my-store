const express = require('express');
const router = express.Router();
const usersServices = require("./../services/user.service")
const service = new usersServices();

router.get('/', (req, res) => {
  const users = service.find();
  res.json(users);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  res.json(user);
});

router.post("/", (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json({
    message: "Creado un nuevo usuario",
    data: newUser
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = service.update(id, body);
  res.json({
    message: "Actualización parcial de un usuario",
    data: user,
    id: id
  })
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const resp = service.delete(id);
  res.status(200).json({
    message: "Elimina un usuario",
    id: resp
  })
});

module.exports = router;
