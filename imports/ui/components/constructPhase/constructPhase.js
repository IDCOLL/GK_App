import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
 
import './constructPhase.html';
import {Phasetrack} from '../../../api/phasetrack';

class ConstructPhase {
  constructor($scope, $reactive) {
    'ngInject';
    
$reactive(this).attach($scope);

this.subscribe('phasetrack', () => {
    return [
      this.siteid
    ]
});

this.helpers({
    phases(){
        return Phasetrack.find({
            siteid : this.siteid,
            phase : { $regex: /^Konstruksie - /}
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

const name = 'constructPhase';
 
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
  controller: ConstructPhase
})