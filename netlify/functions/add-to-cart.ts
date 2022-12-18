import { Handler } from "@netlify/functions";
import { find } from "rxjs";
const { MongoClient } = require("mongodb");
const BSON = require('bson');


const handler: Handler = async (event, context) => {
  const uri = "mongodb+srv://samaty:FRC15I0YTyGZyNj9@cluster0.4bufuul.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const database = client.db('Oshop');  
  const carts = database.collection('shopping-carts');

  const cart = JSON.parse(event.body);
  const { cartId, product, quantity } = cart

  async function addToCart() {
    try {
          const query = {'_id': BSON.ObjectId(cartId)};
          let c = await carts.findOne(query);
          const exist = c.items.map(item => item.product._id).includes(product._id);
          let p = c.items.find(item => item.product._id == product._id);
          let count = p ? p.quantity : 0;

          let update;
          let res;
          if (!exist && quantity>0) {
            update = { 
              $push: { 'items': {
                product: product,
                quantity: quantity
              }},
              $inc: { 'count': quantity }
            };
              res = await carts.findOneAndUpdate(query, update, { returnDocument: "after" });
          } else
              if (exist && quantity>0) {
              update = {
                $set: { 'items.$[item].quantity' : quantity },
                $inc: {  'count': quantity - count }
              };
              const options = {
                returnDocument: "after",
                arrayFilters: [{
                  "item.product._id": product._id
                }]
              };
              res = await carts.findOneAndUpdate(query, update, options);
          } else {
            update = {
              $pull: { 'items': { product: product }},
              $inc: {  'count': quantity - count }

            }
            res = await carts.findOneAndUpdate(query, update)
          }
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

    return addToCart();
}

export { handler };