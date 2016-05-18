import { Mongo } from 'meteor/mongo';
 
export const Owners = new Mongo.Collection('owners');

var admin_ID = 'Wj4YQg33mQdhE4imp';//USe to give all access to admin

Owners.allow({
  insert(userId, ownere) {
    return userId;// && (ownere.owner === userId || userId === admin_ID);
  },
  update(userId, ownere, fields, modifier) {
    return userId;// && (ownere.owner === userId || userId === admin_ID);
  },
  remove(userId, ownere) {
    return userId;// && (ownere.owner === userId || userId === admin_ID);
  }
});