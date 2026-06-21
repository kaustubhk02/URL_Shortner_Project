const express = require('express'); // importing express

const {handleGenerateShortURL, handleRedirectUrl} = require('../controllers/urlController');
const router = express.Router();

router.post('/', handleGenerateShortURL);
router.get("/:shortID", handleRedirectUrl);

module.exports = router;