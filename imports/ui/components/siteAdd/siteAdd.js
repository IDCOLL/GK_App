import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
 
import './siteAdd.html';
import './confirmationWindow.html';
import { Sites } from '../../../api/sites';
import { name as OwnersAddButton } from '../ownersAddButton/ownersAddButton';
import { name as OwnersDropdown } from '../ownersDropdown/ownersDropdown';
 
class SiteAdd {
    constructor($mdDialog, $mdMedia) {
        'ngInject';
        
        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia;
        this.site = {};
    }


submit(event,site) {      
       if (this.buyer == undefined){
       localBuyer = "";
       }
       else {
       localBuyer = this.buyer.buyers;
        }
       
       var phasearray = []; 
       phasearray[0] = {datestamp : new Date(), status : "Erf Oop"};
       var salesarray = [];
       salesarray[0] = {datestamp : new Date(), status : "Erf Oop"};

        
        this.$mdDialog.show({
        controller($mdDialog) {
        'ngInject';
        
        this.cancel = () => {
          $mdDialog.hide();
        }
        
        this.yes = () => {
          site.owner = Meteor.user()._id;
          site.buyer = localBuyer;
          site.phase = "Erf Oop";
          site.phasearray = phasearray;
          site.salesarray = salesarray;
          site.salesstate = "Erf Oop";
          site.constructarray = [];
          Sites.insert(site);
          $mdDialog.hide();
        }
      },
      controllerAs: 'confirmationWindow',
      templateUrl: `imports/ui/components/${name}/confirmationWindow.html`,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
    }   
 
     areachange(area){
    this.site.area = area.area;
  }
 
 ownerchange(buyer) {
       this.buyer = buyer;  
      // this.site.buyer = buyer._id;  
  }
   
      reset() {
    this.site = {};
  }
}
 
const name = 'siteAdd';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  OwnersAddButton,
  OwnersDropdown
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: SiteAdd
}).config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('siteAdd', {
    url: '/siteadd',
    template: '<site-add></site-add>',
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