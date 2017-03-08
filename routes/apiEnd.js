const express = require('express');

const router = express.Router();

const { postCarRelationClass, deleteCarRelationById, updateCarRelaction } = require('../controllers/end/carRelationClass');
const { postAccessories, deleteAccessories, updateAccessories } = require('../controllers/end/accessoriesClass');
const { getUser, getUserRoleAndModuleById } = require('../controllers/end/adUser');
const { getRoleById } = require('../controllers/end/adRole');

router.post('/carClass', (req, res) => {
  postCarRelationClass(req, res);
});
router.delete('/deleteCarRelation/:id', (req, res) => {
  deleteCarRelationById(req, res);
});

router.put('/updateCarRelaction', (req, res) => {
  updateCarRelaction(req, res);
});

router.delete('/deleteAccessories/:id', (req, res) => {
  deleteAccessories(req, res);
});
router.post('/Accessories', (req, res) => {
  postAccessories(req, res);
});
router.put('/updateAccessories/:id', (req, res) => {
  updateAccessories(req, res);
});

router.get('/getUser', (req, res) => {
  getUser(req, res);
});

router.get('/getUserRoleById/:id', (req, res) => {
  getUserRoleAndModuleById(req, res);
});

router.get('/getRoleById/:id', (req, res) => {
  getRoleById(req, res);
});

module.exports = router;
