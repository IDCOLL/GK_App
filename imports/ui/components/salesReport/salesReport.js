import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './salesReport.html';
import { Sites } from '../../../api/sites';

import { name as OwnerName} from '../ownerName/ownerName';
import { name as PhaseList } from '../phaseList/phaseList';
import { name as SalesPhase } from '../salesPhase/salesPhase';
import { name as ConstructPhase } from '../constructPhase/constructPhase';

// NEW
function Excel($window) {
  'ngInject';
 
  const uri = 'data:application/vnd.ms-excel;base64,';
  const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
 
  const base64 = (s) => {
    return $window.btoa(unescape(encodeURIComponent(s)));
  };
 
  const format = (s, c) => {
    return s.replace(/{(\w+)}/g, (m, p) => {
      return c[p];
    });
  };
 
  return {
    tableToExcel(tableId, worksheetName) {
      const table = angular.element(tableId);
      const ctx = {
        worksheet: worksheetName,
        table: table.html()
      };
 
      return uri + base64(format(template, ctx));
    }
  };
}

class SalesReport {
  constructor($scope, $reactive, $window, $timeout, Excel) {
    'ngInject';
    
$reactive(this).attach($scope);
this.$window = $window;
this.$timeout = $timeout;
this.Excel = Excel;

this.searchText = '';
this.searchphaseText = '';
this.searchplanText = '';
this.searchareaText = '';

this.subscribe('sites', () => [{ 
},
  this.getReactively('searchText'),
  this.getReactively('searchphaseText'),
  this.getReactively('searchplanText'),
  this.getReactively('searchareaText')
]);


this.helpers({
    sitelist(){
      return Sites.find({
        //constructdate : {$exists : true}
      },{
        sort:{
          layoutnr : 1
        }
      });
    }/*,
    sitelist2(){
      return Sites.find({
        constructdate : {$exists : false}
      },{
        sort:{
          layoutnr : 1
        }
      });
    } */
});

this.exportHref = {};
}

  exportToExcel(tableId) {
    this.exportHref = this.Excel.tableToExcel(tableId, 'sheet name');
    this.$timeout(function() {
      location.href = this.exportHref;
    }, 100); //     trigger download
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

const name = 'salesReport';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  OwnerName,
  PhaseList,
  SalesPhase,
  ConstructPhase
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: SalesReport
})
.factory('Excel', Excel) // NEW
.config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('salesReport', {
    url: '/salesReport',
    template: '<sales-report></sales-report>',
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