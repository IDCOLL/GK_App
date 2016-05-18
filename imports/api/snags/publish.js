import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
 
import { Snags } from './collection';
//import { Sites } from '../sites/collection';

var admin_ID = 'Wj4YQg33mQdhE4imp';//USe to give all access to admin
 
if (Meteor.isServer) {
    Meteor.publish('snags', function(siteid) {  
    if(siteid)
    {
      return Snags.find({ siteId: siteid });
    }
    else
    {
      return Snags.find({ })
    }  
         
    });
  }