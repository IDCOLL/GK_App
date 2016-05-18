import { Meteor } from 'meteor/meteor';
import { Sites } from '../imports/api/sites';

/*Meteor.startup(() => {
  if (Sites.find().count() === 0) {
    const sites = [{
      'nr': 'F1',
      'layoutnr': '124352'
    }, {
      'nr': 'F2',
      'layoutnr': '345453'
    }, {
      'nr': 'F3',
      'layoutnr': '456534'
    }];
 
    sites.forEach((site) => {
      Sites.insert(site)
    });
  }
});*/