import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import './userList.html';
import {name as UserUpdate} from '../userUpdate/userUpdate'

class UserList {
  constructor($scope, $reactive) {
    'ngInject';
 
$reactive(this).attach($scope);

this.subscribe('users');

this.helpers({
      users() {
        return Meteor.users.find({});
      }
    });
  }
}
 
const name = 'userList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  UserUpdate
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: UserList
})
 .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('userList', {
      url: '/userlist',
      template: '<user-list></user-list>'
    });
}