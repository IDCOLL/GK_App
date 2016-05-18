import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Sites = new Mongo.Collection('sites');

var admin_ID = 'Wj4YQg33mQdhE4imp';//USe to give all access to admin

Sites.allow({
  insert(userId, party) {
    return userId;// && (party.owner === userId || userId === admin_ID);
  },
  update(userId, party, fields, modifier) {
    return userId;// && (party.owner === userId || userId === admin_ID);
  },
  remove(userId, party) {
    return userId;// && (party.owner === userId || userId === admin_ID);
  }
});