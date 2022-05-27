const router = require('express').Router();
const animalsRoutes = require('./animalsRoutes');
const zookeepersRoutes = require('./zookeepersRoutes');

router.use(animalsRoutes);
router.use(zookeepersRoutes)

module.exports = router;