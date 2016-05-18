import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';
import { Owners } from '../../../api/owners';

import './ownersList.html';
import {name as OwnersUpdate} from '../ownersUpdate/ownersUpdate'

class OwnersList {
  constructor($scope, $reactive) {
    'ngInject';
 
$reactive(this).attach($scope);

this.searchTextname = '';
this.searchTextsurname = '';

this.subscribe('owners', () => [{ 
},
this.getReactively('searchTextname'),
this.getReactively('searchTextsurname')
]);

this.helpers({
      owner() {
        return Owners.find({
        },{
          sort : {
            surname : 1
          }
        });
      }
    });
  }
}
 
const name = 'ownersList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  OwnersUpdate
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: OwnersList
})
 .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('ownersList', {
      url: '/ownerslist',
      template: '<owners-list></owners-list>'
    });
}