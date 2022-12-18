import { Handler } from "@netlify/functions";
import { find } from "rxjs";
const { MongoClient } = require("mongodb");
const BSON = require('bson');


const handler: Handler = async (event, context) => {
  const uri = "mongodb+srv://samaty:FRC15I0YTyGZyNj9@cluster0.4bufuul.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const database = client.db('Oshop');  
  const carts = database.collection('shopping-carts');

  const cartId = event.queryStringParameters['id'];


  async function getCart() {
    try {
          const query = {'_id': BSON.ObjectId(cartId)};
          let res = await carts.findOne(query);
          return {
            statusCode: 200,
            body: JSON.stringify(res),
            }
        } catch(err) {
            return {
              statusCode: 500,
              body: err.toString(),
      }
        } finally {
            await client.close();
          }
        }

    return getCart();
}

export { handler };