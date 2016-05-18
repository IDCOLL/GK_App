import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Owners } from '../../../api/owners';

import './ownersDropdown.html';


class OwnersDropdown {
  constructor($scope, $reactive) {
    'ngInject';
 
$reactive(this).attach($scope);

this.subscribe('owners');

this.helpers({
      buyer() {
        return Owners.find({
        },{
          sort : {
            surname : 1
          }
        });
    }
  });
   
  }  
change() {
    this.onChange({
      buyers:{
       [this.property]: this.pp   
      } 
    });
  } 
  
}

 
const name = 'ownersDropdown';
 
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
  controller: OwnersDropdown
});
 