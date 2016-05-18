import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
 
import { Sites } from './collection';

//var user = Meteor.user();//USe to give all access to admin
 
if (Meteor.isServer) {
  Meteor.publish('sites', function(options,searchString,searchphaseString,searchplanText,searchareaText,buyer) {
    const selector = {
      $or: [{
        // the public sites
        $and: [{
          public: true
        }, {
          public: {
            $exists: true
          }
        }]
      }
      , {
        // when logged in user is the owner
       // $and: [{
       //   owner: this.userId
       // }, {
          owner: {
            $exists: true
          }
       // }]
      }
      ]
    };
    //Soek vir erf nommer
    if (typeof searchString === 'string' && searchString.length) {
      selector.nr = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }
    
    
    //Soek vir die fase van huise
    if (typeof searchphaseString === 'string' && searchphaseString.length) {
      selector.phase = {
        $regex: `.*${searchphaseString}.*`,
        $options : 'i'
      };
    }
    
    //Soek vir die tipe huis
    if (typeof searchplanText === 'string' && searchplanText.length) {
      selector.layoutnr = {
        $regex: `.*${searchplanText}.*`,
        $options : 'i'
      };
    }
    
    //Soek vir oord
    if (typeof searchareaText === 'string' && searchareaText.length) {
      selector.area = {
        $regex: `.*${searchareaText}.*`,
        $options : 'i'
      };
    }
    
        //Soek koper
    if (typeof buyer === 'string' && buyer.length) {
      selector.buyer = {
        $regex: `.*${buyer}.*`,
        $options : 'i'
      };
    }
    

    
    Counts.publish(this, 'numberOfSites', Sites.find(selector), {
    noReady: true
    });
    
    return Sites.find(selector, options);
    //selector
    
    //See if admin is logged in, has rights to view all
    /*if(userrole === "'Admin'")
    {         
       return Sites.find({},options);
    }
   else
   {
        return Sites.find(selector, options);
   }*/
  });
}