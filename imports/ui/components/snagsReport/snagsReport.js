import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import './snagsReport.html';
import {Sites} from '../../../api/sites';
import {name as SnagssiteList} from '../snagssiteList/snagssiteList'

class SnagsReport {
  constructor($scope, $reactive) {
    'ngInject';
    

$reactive(this).attach($scope);

this.subscribe('sites');

this.helpers({
     sites() {
        return Sites.find({},{
            sort : this.getReactively('sort')
        });
      }
});

}
}

const name = 'snagsReport';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  SnagssiteList
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: SnagsReport
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('snagsReport', {
    url: '/snagsReport',
    template: '<snags-report></snags-report>',
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