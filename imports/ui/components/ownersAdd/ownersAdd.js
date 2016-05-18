import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
 
import './ownersAdd.html';
import { Owners } from '../../../api/owners';
 
class OwnersAdd {
    constructor() {
        this.owner = {};
    }


submit() {
    this.owner.owner = Meteor.user()._id;
    Owners.insert(this.owner);
    this.reset();
    
   if(this.done) {
      this.done();
    }    
}
     
      reset() {
    this.owner = {};
  }
  
  
}
 
const name = 'ownersAdd';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    done: '&?'
  },
  controllerAs: name,
  controller: OwnersAdd
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('ownersAdd', {
    url: '/ownersadd',
    template: '<owners-add></owners-add>',
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