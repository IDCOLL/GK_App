import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import './sitesList.html';
import { Sites } from '../../../api/sites';
import { Users } from '../../../api/sites';

import { name as SitesSort } from '../sitesSort/sitesSort';
import { name as SiteAdd } from '../siteAdd/siteAdd';
import { name as SiteRemove } from '../siteRemove/siteRemove';
import { name as UserList } from '../userList/userList';
import { name as OwnersList } from '../ownersList/ownersList';
import { name as OwnerName} from '../ownerName/ownerName';
import { name as ReportsMain} from '../reportsMain/reportsMain';
import { name as UserName} from '../userName/userName';

class SitesList {
  constructor($scope, $reactive) {
    'ngInject';
    
 $reactive(this).attach($scope);

this.perPage = 10;
    this.page = 1;
    this.sort = {
      nr: 1
    };
   
  this.buyer = ''; 
  this.searchText = '';
  this.searchphaseText = '';
  this.searchplanText = '';
  this.searchareaText = '';
  
  this.subscribe('users');
  
    this.subscribe('sites', () => [{
      limit: parseInt(this.perPage),
      skip: parseInt((this.getReactively('page') - 1) * this.perPage),
      sort: this.getReactively('sort')
    },this.getReactively('searchText')
     ,this.getReactively('searchphaseText')
     ,this.getReactively('searchplanText')
     ,this.getReactively('searchareaText')
     ,this.getReactively('buyer.buyers')
    ]);
    
this.helpers({
      sites() {
        return Sites.find({},{
            sort : {layoutnr : 1}
        });
      },
        user(){
                return Meteor.users.findOne({
                  _id : Meteor.userId() 
                });
        },
      sitesCount() {
        return Counts.get('numberOfSites');
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      }
    });
  
}
  isOwner(site) {
    return this.isLoggedIn && site.owner === this.currentUserId;
  }
  
  hasRole(role){
    return (role != undefined);
  }
  
      ownerchange(buyer) {
       this.buyer = buyer;  
      console.log(this.buyer);
  }
  
  isAdmin(role){
    var admin = "Admin";
    return this.isLoggedIn && role === admin;
  }
  
  isSales(role){
    var admin = "Verkope";
    return this.isLoggedIn && role === admin;
  }

  pageChanged(newPage) {
    this.page = newPage;
  }
  
  sortChanged(sort) {
    this.sort = sort;
  }
  
    isOption(phase){
   return phase === "Opsie";
  }
  
  isConstruct(phase){
    return phase === "Konstruksie";
  }
}
  
  const name = 'sitesList';
  
  //create module
  export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  SitesSort,
  SiteAdd,
  SiteRemove,
  UserList,
  OwnersList,
  OwnerName,
  ReportsMain,
  UserName
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: SitesList
})
 .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('sites', {
      url: '/sites',
      template: '<sites-list></sites-list>'
    });
}