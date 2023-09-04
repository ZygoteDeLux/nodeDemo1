const express = require("express");
const app = express();

const mountains = [
    { id: 1, name: 'Mount Everest', height: 8848 },
    { id: 2, name: 'K2', height: 8611 },
    { id: 3, name: 'Kangchenjunga', height: 8586 }
  ];


app.get("/mountains", (req, res) => {

    res.send(mountains);

});

app.get("/mountains/:id", (req, res) => {

    const mountainId = parseInt(req.params.id, 10);
    const mountain = mountains.find(m => m.id === mountainId)

    if (mountain) {
        res.send(mountain);
      } else {
        res.status(404).send('Mountain not found');
      }
      

})


app.listen(8080);