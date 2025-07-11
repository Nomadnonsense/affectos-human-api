const express = require('express');
const router = express.Router();

router.post('/emotion', async (req, res) => {
  const { input, persona } = req.body;

  let emotion = "neutral";
  let response = "Hmm, that's interesting.";

  if (input.toLowerCase().includes("sad") || input.toLowerCase().includes("rejected")) {
    emotion = "sad";
    response = "That really sucks… I know how much that meant to you.";
  } else if (input.toLowerCase().includes("happy") || input.toLowerCase().includes("promotion")) {
    emotion = "happy";
    response = "That's awesome! You totally deserve that win.";
  }

  return res.json({ emotion, response, persona });
});

module.exports = router;
