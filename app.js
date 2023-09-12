const express = require("express");
const app = express();

app.use(express.json());

let currentID = 3;

const mountains = [
    { id: 1, name: 'Mount Everest', height: 8848 },
    { id: 2, name: 'K2', height: 8611 },
    { id: 3, name: 'Kangchenjunga', height: 8586 }
  ];


app.get("/mountains", (req, res) => {

    res.send({data: mountains});

});

app.get("/mountains/:id", (req, res) => {

    const mountainId = parseInt(req.params.id, 10);
    const mountain = mountains.find(m => m.id === mountainId)

    if (mountain) {
        res.send({data: mountain});
      } else {
        res.status(404).send('Mountain not found');
      }
    

});

//?id=?&name=Himmelbjerget&height=147


/*

app.post("/mountains", (req, res) => {

  //deconstruct query
  const { id, name, height } = req.query; 



    if (id && name && height) {

      //convert id and height to numbers
      const mountainId = parseInt(id, 10);
      const mountainHeight = parseInt(height, 10);

      //check if a mountain with the same id already exists
      const existingMountain = mountains.find(m => m.id === mountainId);

      if (existingMountain) {
        res.status(400).send('Mountain with the same ID already exists');
      } 
      else {
        const newMountain = { id: mountainId, name, height: mountainHeight };
        mountains.push(newMountain);
        res.status(201).send({ data: newMountain });
    }
  } 
    else {
    res.status(400).send('Invalid request parameters');
  }

});
*/



app.post("/mountains", (req, res) => {

  console.log(req.body);
  const newMountain = req.body;
  newMountain.id = ++currentID;
  mountains.push(newMountain);

  res.send({data: newMountain});

});

/*
app.patch("/mountains", (req, res) => {

  //deconstruct query
  const {id, name, height} = req.query;

  //if id, name or height 
  if(id && name || height){

    //convert id and height to numbers
    const mountainId = parseInt(id, 10);
    const mountainHeight = parseInt(height, 10);

    //find the index of the object in the mountains array with the corosponding id.
    const index = mountains.findIndex(m => m.id === mountainId);

    //if the index exists
    if(index !== -1){
      //checks if the name parameter of the query exists, 
      //it then sets the object of the given index name to the query parameter
      if(name) mountains[index].name = name;
      //checks if the height parameter of the query exists,
      //it then sets the object of the given index height to the query parameter
      if(height) mountains[index].height = mountainHeight;
      //sends the updated object
      res.send({data : mountains[index]});
    } 
    else {
      res.status(404).send('Mountain not found');
    }
  }
  else {
    res.status(400).send('Invalid request parameters');
  }
  
});



app.delete("/mountains", (req, res) => {

  //deconstruct query
  const { id } = req.query; 

  //if id exists
  if (id) {

    const mountainId = parseInt(id, 10);

    //index of the given mountain found by id.
    const index = mountains.findIndex(m => m.id === mountainId);

    //if index of the object exists
    if (index !== -1) {
      //delete the object and assigns it to deletedMountains
      const deletedMountains = mountains.splice(index, 1)[0];
      //sends the deletedMountains objects to client
      res.send({ data: deletedMountains });
    } else {
      res.status(404).send('Mountain not found');
    }
  } else {
    res.status(400).send('Invalid request parameters');
  }
});

*/
app.patch("/mountains/:id", (req, res) =>{

  let foundIndex = mountains.findIndex((mountain) => mountain.id === Number(req.params.id));

  if(foundIndex === -1){
    res.status(404).send({error: "could not find mountain by id"});
  }else{

    mountains[foundIndex] = {...mountains[foundIndex], ...req.body, id: Number(req.params.id)} ;

    res.send({data: mountains[foundIndex]});
  }

 
});


app.delete("/mountains/:id", (req, res) =>{

  let foundIndex = mountains.findIndex((mountain) => mountain.id === Number(req.params.id))

  if(foundIndex === -1){
    res.send({error: "could not find mountain by id"})
  }else {
    mountains = mountains.splice(foundIndex, 1);
    res.send({data: Number(req.params.id)});
  }
});

const PORT = 8080;

app.listen(PORT, (error) =>{

  if(error){
    console.log("Error starting the server", error);
    return;
  }

  console.log("Server is running on port", PORT)
});