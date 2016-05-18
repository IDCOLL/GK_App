import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
 
import './phaseList.html';
import {Phasetrack} from '../../../api/phasetrack';
import {name as OwnerName} from '../ownerName/ownerName';

class PhaseList {
  constructor($scope, $reactive) {
    'ngInject';
    
$reactive(this).attach($scope);

this.subscribe('phasetrack', () => {
    return [
      this.siteid
    ]
});

console.log(this.specificstate);
if(this.specificstate == undefined)
{
  this.specificstate = '';
}
else if(this.specificstate == "Salesphase")
{
  this.specificstate = "Verkoop";
}
console.log(this.specificstate);


if(this.limitnr == undefined)
{
  this.limitnr = 0;
}

if(this.sortingasc == undefined)
{
  this.sortingasc = -1;
}

this.helpers({
    phases(){
        return Phasetrack.find({
            siteid : this.siteid
        },
      {
        sort:{
          date : this.sortingasc
        },
        limit : this.limitnr
      });
        //.sort({phase : -1});
    }
});
}

showDate(){
  return (this.specificstate === '');
}

}

const name = 'phaseList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  OwnerName
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
      siteid: '<',
      limitnr : '<',
      sortingasc : '<',
      specificstate : '@'
      //,contractorid: '<'
  },
  controllerAs: name,
  controller: PhaseList
})