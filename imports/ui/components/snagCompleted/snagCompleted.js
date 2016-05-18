import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
 
import './snagCompleted.html';
import { Snags } from '../../../api/snags';
 
class SnagCompleted {
  constructor($scope, $reactive){
    'ngInject';
    
    $reactive(this).attach($scope);
    
    this.subscribe('snags', () => {
    return [
      this.snag.siteId 
    ]
    });
    
    this.snagId = this.snag._id;
    
      this.helpers({
      snag() {
          return Snags.findOne({
              _id: this.snagId
          });
      }
      });
  }
  
  save() {
    Snags.update({
        _id : this.snag._id
    },{
       $set:{
       completed: this.snag.completed,
       datecompleted: new Date(),
       closeduserid: Meteor.userId()
       //this.snag.completed 
       }
    });
    }
  }

 
const name = 'snagCompleted';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
    snag: '<'
  },
  controllerAs: name,
  controller: SnagCompleted
});