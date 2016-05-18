import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
 
import { Phasetrack } from './collection';
//import { Sites } from '../sites/collection';

var admin_ID = 'Wj4YQg33mQdhE4imp';//USe to give all access to admin
 
if (Meteor.isServer) {
    Meteor.publish('phasetrack', function(siteid) {
       const selector = {
              
              _id : {
                 $exists: true
              }
            };
          
          //if(siteid){
         //   selector.siteid = {
         //     siteid : siteid
         //   };
         // }
         
          
          return Phasetrack.find({});
    });
  }