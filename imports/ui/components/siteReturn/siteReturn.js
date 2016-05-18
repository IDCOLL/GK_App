import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Sites } from '../../../api/sites';

import './siteReturn.html';


class SiteReturn {
  constructor($scope, $reactive) {
    'ngInject';
 
$reactive(this).attach($scope);

this.subscribe('sites');
//Building owners name screen to return owner name for sitelist
this.helpers({
      site() {
        return Sites.findOne({
            _id : this.siteid
        });
      }
    });
  }
}
  
 
const name = 'siteReturn';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    siteid: '<'
  },
  controllerAs: name,
  controller: SiteReturn
});
 