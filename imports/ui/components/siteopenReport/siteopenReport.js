import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './siteopenReport.html';
import {Sites} from '../../../api/sites';
import {name as SalesPhase} from '../salesPhase/salesPhase';

class SiteopenReport {
  constructor($scope, $reactive) {
    'ngInject';
    
$reactive(this).attach($scope);

this.searchText = '';
this.searchphaseText = '';
this.searchareaText = '';
this.searchplanText = '';

this.subscribe('sites', () => [{ 
},
this.getReactively('searchText')
]);


this.helpers({
     sites() {
        return Sites.find({
          salesstate : { $in: [ "Erf Oop",  "Opsie" ] }
        },{
        sort:{
          layoutnr : 1
        }
        });
      }
});

}
}

const name = 'siteopenReport';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  SalesPhase
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: SiteopenReport
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('siteopenReport', {
    url: '/siteopenReport',
    template: '<siteopen-report></siteopen-report>',
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