import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Owners } from '../../../api/owners';

import './ownersUpdate.html';

class OwnersUpdate {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);

    
   this.ownerId = $stateParams.ownerId;
    
   this.subscribe('owners');
        
    this.helpers({
      owner() {
          return Owners.findOne({
              _id: this.ownerId
          });
      }
        });
  }
  save() {
    Owners.update({
      _id: this.owner._id
    }, {
      $set: {
        name: this.owner.name,
        surname: this.owner.surname,
        phone: this.owner.phone,
        email: this.owner.email,
        id: this.owner.id,
        representave: this.owner.representave,
        nominatedsickarea: this.owner.nominatedsickarea,
        family: this.owner.family,
        familycell: this.owner.familycell,
        familyemail: this.owner.familyemail,
        coupled: this.owner.coupled,
        comments: this.owner.comments
      }
    }, (error) => {
      if (error) {
        console.log('Oops, unable to update the site...');
      } else {
        console.log('Done!');
      }
    });
  }
} 

const name = 'ownersUpdate';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: OwnersUpdate
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('ownersUpdate', {
    url: '/owners/:ownerId',
        template: '<owners-update></owners-update>',
  });
}