import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Owners } from '../../../api/owners';

import './ownerName.html';


class OwnerName {
  constructor($scope, $reactive) {
    'ngInject';
 
$reactive(this).attach($scope);

this.subscribe('owners');
//Building owners name screen to return owner name for sitelist
this.helpers({
      owners() {
        return Owners.findOne({
            _id : this.buyerid
        });
      }
    });
  }
}
  
 
const name = 'ownerName';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    buyerid: '<'
  },
  controllerAs: name,
  controller: OwnerName
});
 