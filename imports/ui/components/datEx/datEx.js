import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './datEx.html';
import { Sites } from '../../../api/sites';

import { name as OwnerName} from '../ownerName/ownerName';
import { name as UserName} from '../userName/userName';
import { name as PhaseList } from '../phaseList/phaseList';

class DatEx {
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
    sites(){
      return Sites.find({
      },{
        sort:{
          layoutnr : 1
        }
      });
    }
});
}

LR(lewensreg){
  if(lewensreg)
  {
    return "Lewensreg";
  }
  else if(lewensreg == false)
  {
    return "Eie Titel"
  }
}
}

const name = 'datEx';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  OwnerName,
  UserName,
  PhaseList
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: DatEx
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('datEx', {
    url: '/datEx',
    template: '<dat-ex></dat-ex>',
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