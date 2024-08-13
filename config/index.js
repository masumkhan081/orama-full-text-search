const mongoose = require('mongoose');


const PORT = 3000;
const mongodb_uri = "mongodb+srv://masumkhan:pddrgj3q@cluster0.4bvf3.mongodb.net/";


function innitDB() {
      mongoose.connect(mongodb_uri, {
      }).then(() => {
            console.log('Connected to MongoDB');
      }).catch(err => {
            console.error('Connection error', err);
      });
}

module.exports = {PORT,mongodb_uri,innitDB}