import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
 
import './snagsList.html';
import { name as SiteSnags} from '../siteSnags/siteSnags';
import {Snags} from '../../../api/snags';
import {Sites} from '../../../api/sites';
import {name as SnagCompleted} from '../snagCompleted/snagCompleted';
import {name as RemoveSnag} from '../removeSnag/removeSnag';
import {name as UserName} from '../userName/userName';

class SnagsList {
  constructor($scope, $reactive) {
    'ngInject';
    

$reactive(this).attach($scope);

this.subscribe('users');

this.subscribe('snags', () => {
    return [
      this.site._id  
    ]
});

this.sitenew = this.site;
  
this.subscribe('sites');

this.helpers({
    snags(){
        return Snags.find({});
    },
        user(){
                return Meteor.users.findOne({
                  _id : Meteor.userId() 
                });
        }
});
}

isAdmin(role){
    var admin = "Admin";
    return role === admin;
  }
}

const name = 'snagsList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  SiteSnags,
  SnagCompleted,
  RemoveSnag,
  UserName
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
      site: '<'
  },
  controllerAs: name,
  controller: SnagsList
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('snagsList', {
    url: 'snagsList',
    template: '<snags-list></snags-list>',
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