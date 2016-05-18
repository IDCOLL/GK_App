import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import './userName.html';


class UserName {
  constructor($scope, $reactive) {
    'ngInject';
 
$reactive(this).attach($scope);

this.subscribe('users');

this.helpers({
      users() {
        return Meteor.users.findOne({
            _id : this.userid
        });
      }
    });
  }
}
  
 
const name = 'userName';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    userid: '<'
  },
  controllerAs: name,
  controller: UserName
});
 