import { Handler } from "@netlify/functions";
var jwt = require('jsonwebtoken');
const { MongoClient } = require("mongodb");


const handler: Handler = async (event, context) => {
  const uri = "mongodb+srv://samaty:FRC15I0YTyGZyNj9@cluster0.4bufuul.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  const token = event.body;
  const decoded = jwt.decode(token);
  const database = client.db('Oshop');  

    async function signin() {
    const users = database.collection('usersList');
    try {
      const query = { "email": decoded.sub };
      const update = { "$set": { 
        'name': decoded.name,
        'email': decoded.sub,
        'isAdmin': false
         }};
      const options = { "upsert": true };

      const registered = await users.findOne(query);
      if(registered) return registered;
      const user = await users.updateOne(query, update, options);
    } finally {
      await client.close();
    }
  };

  try {
    const res = await signin();
    return {
      statusCode: 200,
      body: JSON.stringify({ token: token, mailId: decoded.sub, name: decoded.name, isAdmin: res.isAdmin, userId:res._id })}
  } catch(err) {
      return {
        statusCode: 500,
        body: err.toString(),
      }
   }
}

export { handler };