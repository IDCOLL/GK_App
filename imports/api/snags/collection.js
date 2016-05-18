import { Mongo } from 'meteor/mongo';
 
export const Snags = new Mongo.Collection('snags');

var admin_ID = 'Wj4YQg33mQdhE4imp';//USe to give all access to admin

Snags.allow({
  insert(userId, snag) {
    return userId;// && (snag.owner === userId || userId === admin_ID);
  },
  update(userId, snag, fields, modifier) {
    return userId;// && (snag.owner === userId || userId === admin_ID);
  },
  remove(userId, snag) {
    return userId;// && (snag.owner === userId || userId === admin_ID);
  }
});