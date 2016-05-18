import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import './snagssiteList.html';
import {Snags} from '../../../api/snags';
import {name as SnagCompleted} from '../snagCompleted/snagCompleted';
import {name as RemoveSnag} from '../removeSnag/removeSnag';
import {name as UserName} from '../userName/userName';

class SnagssiteList {
  constructor($scope, $reactive) {
    'ngInject';
    

$reactive(this).attach($scope);

this.subscribe('snags', () => {
    return [
      this.site._id  
    ]
});

//Show selected contractor jobs
this.helpers({
    snags(){
        return Snags.find({
            "siteId" : this.site._id             
        });
    }
});
}
}

const name = 'snagssiteList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  SnagCompleted,
  RemoveSnag,
  UserName
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
      site: '<'
      //,contractorid: '<'
  },
  controllerAs: name,
  controller: SnagssiteList
})