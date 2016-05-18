import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './statechangeReport.html';
import { Phasetrack } from '../../../api/phasetrack';
import { Sites } from '../../../api/sites';

import {name as SiteReturn} from '../siteReturn/siteReturn';

class StateChangeReport {
  constructor($scope, $reactive) {
    'ngInject';
 
$reactive(this).attach($scope);

this.startdate = new Date();
this.enddate = new Date();
console.log(this.startdate);
this.startsearch = this.getReactively('startdate');
this.endsearch = this.getReactively('enddate');
console.log(this.startsearch);

// Daterange filter
this.dateRangeFilter = function (property, startDate, endDate) {
    return function (item) {
        if (item[property] === null) return false;
 
        var itemDate = moment(item[property]);
        var s = moment(startDate, "DD-MM-YYYY");
        var e = moment(endDate, "DD-MM-YYYY");
 
        if (itemDate >= s && itemDate <= e) return true;
        return false;
    }
}

this.subscribe('phasetrack');
this.subscribe('sites');

this.Construction = "Konstruksie";

this.Sales = [
  "Erf Oop",
  "Opsie",
  "Verkoop",
  "Kontrak geteken",
  "Kontrak geteken LR"
];

this.Planning = [
  "Kontrak by Eagle",
  "Registrasie",
  "Plan na Argitek",
  "Plan Finalisering - Argitek",
  "Plan epos na Jos",
  "Kapitaalbydrae betaal",
  "Plan Muni ingedien",
  "Plan Muni goedgekeur",
  "Goedgek plan na Jos",
  "NHBRC registrasie",  
];

this.Final = [
  "Foutelys ontvang",
  "Foutelys afgehandel",
  "Okkupasie sertifikaat",
  "Intrek"
];

this.helpers({
    phaserecsales(){
      return Phasetrack.find({
        date :{$gte: this.getReactively('startdate'),
                $lt: this.getReactively('enddate')},
        phase : {$in:this.Sales}
      });
    },
        phaserecplanning(){
      return Phasetrack.find({
        date :{$gte: this.getReactively('startdate'),
                $lt: this.getReactively('enddate')},
        phase : {$in:this.Planning}        
      });
    },
        phasereccon(){
      return Phasetrack.find({
        date :{$gte: this.getReactively('startdate'),
                $lt: this.getReactively('enddate')},
        phase : {$regex: this.Construction}
      });
    },
     phasefinal(){
      return Phasetrack.find({
        date :{$gte: this.getReactively('startdate'),
                $lt: this.getReactively('enddate')},
        phase : {$in:this.Final}
      });
    },
    site(){
      return Sites.find({});
    }
});
}
}

const name = 'statechangeReport';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  SiteReturn
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: StateChangeReport
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('statechangeReport', {
    url: '/statechangeReport',
    template: '<statechange-report></statechange-report>',
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