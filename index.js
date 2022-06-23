const mongoose = require('mongoose');



// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      "title": "Coca San Juan",
      "level": "Amateur Chef",
      "ingredients": [
      "18 g. levadura fresca de panadería",
      "70 g. de agua",
      "50 g. de azúcar blanca",
      "5 g. de sal",
      "75 g. de huevos M (1 ó 2 unidades)",
      "50 g. de mantequilla",
      "75 g. de piñones",
      "Ralladura 1/2 limón",
      "4 yemas de huevos grandes XL",
      "125 g. azúcar",
      "50 g. fécula de maíz",
      "La piel de un limón"],
      "cuisine": "Ticipal Catalan"
    })
  })

  .then((response) => {
    return Recipe.insertMany(data);
  })

  .then((response) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then(() => {
    console.log("Eliminado!");
    return Recipe.deleteOne({title: "Carrot Cake"})
    
  })

  .then((response) => { mongoose.connection.close()
})



  
  
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
