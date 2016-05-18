import { Meteor } from 'meteor/meteor';

var admin_ID = 'Wj4YQg33mQdhE4imp';//USe to give all access to admin

Meteor.users.allow({
  insert(userId, phasetrackrecord) {
    return userId;// && (phasetrackrecord.owner === userId || userId === admin_ID);
  },
  update(userId, phasetrackrecord, fields, modifier) {
    return userId;// && (phasetrackrecord.owner === userId || userId === admin_ID);
  },
  remove(userId, phasetrackrecord) {
    return userId;// && (phasetrackrecord.owner === userId || userId === admin_ID);
  }
});