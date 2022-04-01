const express = require("express");
const router = express.Router();

router.get("/tjanster", (req, res) => {
  const tjanster = [
    {
      title: "Diamant städning",
    },
    {
      title: "Basic städning",
    },
    {
      title: "Topp städning",
    },
    {
      title: "Fönster tvätt",
    },
  ];

  res.render("accounts/service", { tjanster });
});

module.exports = router;
