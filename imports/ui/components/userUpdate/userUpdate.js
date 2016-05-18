import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './userUpdate.html';
import { name as UserRoles} from '../userRoles/userRoles';

class UserUpdate {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);
    
   this.userId = $stateParams.userId;
    
   this.subscribe('users');
        
    this.helpers({
      user() {
          return Meteor.users.findOne({
              _id: this.userId
          });
      }
        });
  }
  rolechange(role) {
  this.role = role;
}
  
  save() {
    if (this.role == undefined){
    localBuyer = this.user.profile.role;
    }
     else {
     localBuyer = this.role.roles;
    }
    
    
    this.user.profile.role = localBuyer;
    Meteor.users.update({
      _id: this.user._id
    }, {
      $set: {
        profile: this.user.profile,
      }
    }, (error) => {
      if (error) {
        console.log('Oops, unable to update the user...');
      } else {
        console.log('Done!');
      }
    });
  }
  

  
}
 

const name = 'userUpdate';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  UserRoles
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: UserUpdate
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('userUpdate', {
    url: '/users/:userId',
        template: '<user-update></user-update>',
  });
}