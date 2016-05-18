import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './phasesReport.html';
import {Sites} from '../../../api/sites';
import {name as PhaseList} from '../phaseList/phaseList';
import {name as SalesPhase} from '../salesPhase/salesPhase';
import {name as ConstructPhase} from '../constructPhase/constructPhase';

class PhasesReport {
  constructor($scope, $reactive) {
    'ngInject';
    
$reactive(this).attach($scope);

this.searchText = '';
this.searchphaseText = '';
this.searchareaText = '';
this.searchplanText = '';

this.subscribe('sites', () => [{ 
},
this.getReactively('searchText'),
this.getReactively('searchphaseText'),
this.getReactively('searchareaText'),
this.getReactively('searchplanText'),
]);


this.helpers({
     sites() {
        return Sites.find({},{
            sort : {layoutnr : 1}
        });
      }
});

}
}

const name = 'phasesReport';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  PhaseList,
  SalesPhase,
  ConstructPhase
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: PhasesReport
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('phasesReport', {
    url: '/phasesReport',
    template: '<phases-report></phases-report>',
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