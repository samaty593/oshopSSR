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
  const { cartId, item, value } = cart
 
  async function incQuantity() {
    let update, options;

    try {
          const query = {'_id': BSON.ObjectId(cartId)};
          let c = await carts.findOne(query);
          let qty = c.items.find(it => it.product._id === item.product._id).quantity;
          if(qty === 1 && value === -1) {
            console.log(qty+'  '+value)
            update = {
              $inc: { 'count': value },
              $pull: { 'items': { product: item.product }},
            };
            options = { returnDocument: "after" }
          } else {
            update = {
              $inc: { 'items.$[item].quantity': value, 'count':value },
            };
            options = {
              returnDocument: "after",
              arrayFilters: [{
                "item.product._id": item.product._id
              }]
            };
          };
       
          let res = await carts.findOneAndUpdate(query, update, options);
          return {
            statusCode: 200,
            body: JSON.stringify(res.value),
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

    return incQuantity();
}

export { handler };