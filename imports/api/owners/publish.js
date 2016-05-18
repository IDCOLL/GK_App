import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
 
import { Owners } from './collection';
 
if (Meteor.isServer) {
    Meteor.publish('owners', function(options,searchTextname,searchTextsurname) {  
    const selector = {
          _id: {
            $exists: true
          }};
    
    if (typeof searchTextname === 'string' && searchTextname.length) {
      selector.name = {
        $regex: `.*${searchTextname}.*`,
        $options : 'i'
      };
    }
    
    if (typeof searchTextsurname === 'string' && searchTextsurname.length) {
      selector.surname = {
        $regex: `.*${searchTextsurname}.*`,
        $options : 'i'
      };
    }
        
    return Owners.find(selector, options);   
    });
  }