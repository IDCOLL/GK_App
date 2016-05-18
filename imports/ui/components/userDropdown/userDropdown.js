import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import './userDropdown.html';


class UserDropdown {
  constructor($scope, $reactive) {
    'ngInject';
 
$reactive(this).attach($scope);

this.subscribe('users');

var kontrakteer = "Kontrakteer";

this.helpers({
      users() {
        return Meteor.users.find({
          "profile.role" : kontrakteer
        });
      }
    });
  }
   
   
change() {
    this.onChange({
      users:{
       [this.property]: this.pp   
      } 
    });
  } 
  
}
 
const name = 'userDropdown';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    onChange: '&',
    property: "@",
    pp:       "@"
  },
  controllerAs: name,
  controller: UserDropdown
});
 