import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import './reportsMain.html';

import { name as SnagsReport} from '../snagsReport/snagsReport';
import { name as PhasesReport} from '../phasesReport/phasesReport';
import { name as SalesReport} from '../salesReport/salesReport';
import { name as StateChangeReport} from '../statechangeReport/statechangeReport';
import { name as SiteopenReport} from '../siteopenReport/siteopenReport';
import { name as DatEx} from '../datEx/datEx';

class ReportsMain {
  constructor($scope, $reactive) {
    'ngInject';
    
 $reactive(this).attach($scope);

this.helpers({
          user(){
                return Meteor.users.findOne({
                  _id : Meteor.userId() 
                });
        },
        isLoggedIn() {
        return !!Meteor.userId();
        }
});
}

  isSales(role){
    var admin = "Verkope";
    return this.isLoggedIn && role === admin;
  }
  
    isAdmin(role){
    var admin = "Admin";
    return this.isLoggedIn && role === admin;
  }
}
  
  const name = 'reportsMain';
  
  //create module
  export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  SnagsReport,
  PhasesReport,
  SalesReport,
  StateChangeReport,
  SiteopenReport,
  DatEx
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: ReportsMain
})
 .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('reportsMain', {
      url: '/reportsMain',
      template: '<reports-main></reports-main>'
    });
}