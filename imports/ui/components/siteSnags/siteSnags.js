import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
 
import './siteSnags.html';
import { Snags } from '../../../api/snags';
import { Sites } from '../../../api/sites';
import {name as UserDropdown} from '../userDropdown/userDropdown';

class SiteSnags {
  constructor() {
    this.snag = {};

}

  contractorchange(user) {
       this.user = user;  
  }
  
submit() {
    this.snag.owner = Meteor.user()._id;
    this.snag.siteId = this.site._id;
    this.snag.userId = this.user.users;
    Snags.insert(this.snag);
    this.reset();
    }
    
      reset() {
    this.snag = {};
  }
}

const name = 'siteSnags';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  UserDropdown
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings:{
     site: '<' 
  },
  controllerAs: name,
  controller: SiteSnags
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('siteSnags', {
    url: '/siteSnags',
    template: '<site-snags></site-snags>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}