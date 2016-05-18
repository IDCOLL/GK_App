import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
 
import './salesPhase.html';
import {Phasetrack} from '../../../api/phasetrack';

class SalesPhase {
  constructor($scope, $reactive) {
    'ngInject';
    
$reactive(this).attach($scope);

this.subscribe('phasetrack', () => {
    return [
      this.siteid
    ]
});

var searchlist = ["Erf Oop","Opsie","Verkoop","Kontrak geteken","Kontrak geteken LR"];


this.helpers({
    phases(){
        return Phasetrack.find({
            siteid : this.siteid,
            phase : {$in:searchlist}
        },
      {
        sort:{
          date : -1
        },
        limit : 1
      });
    }
});
}

}

const name = 'salesPhase';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
      siteid: '<'
  },
  controllerAs: name,
  controller: SalesPhase
})