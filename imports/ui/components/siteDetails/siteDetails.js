import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './confirmationWindow.html'; 
import './siteDetails.html';
import {name as SnagsList} from '../snagsList/snagsList';
import { Sites } from '../../../api/sites';
import { Owners } from '../../../api/owners';
import { Phasetrack } from '../../../api/phasetrack';
import { name as BuildingPhases} from '../buildingPhases/buildingPhases';
import { name as OwnersAddButton } from '../ownersAddButton/ownersAddButton';
import { name as OwnersDropdown } from '../ownersDropdown/ownersDropdown';
import { name as PhaseList } from '../phaseList/phaseList';
import { name as SalesPhase } from '../salesPhase/salesPhase';
import { name as ConstructPhase } from '../constructPhase/constructPhase';
import { name as AreaDropdown } from '../areaDropdown/areaDropdown';
//import { name as SiteMap } from '../siteMap/siteMap'
 
class SiteDetails {
  constructor($stateParams, $scope, $reactive, $location, $anchorScroll,$mdDialog, $mdMedia) {
    'ngInject';
    
    $reactive(this).attach($scope);
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
        
    this.newphase = {};
    this.siteId = $stateParams.siteId;
   this.subscribe('sites');
   this.subscribe('users');
   this.subscribe('phasetrack');

   //var phaselength = this.site.phase.length();     
    this.helpers({
      site() {
          return Sites.findOne({
              _id: this.siteId
          });
      },
      sitecopy() {
          return Sites.findOne({
              _id: this.siteId
          });
      },   
    users() {
        return Meteor.users.find({});
      },
        user(){
                return Meteor.users.findOne({
                  _id : Meteor.userId() 
                });
        }
    }); 
    
    
    
    
    //console.log(this.site.marketinglrprice);
    //this.site.marketinglrprice = this.site.marketinglrprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  
 // numberWithCommas(x) {
//    console.log(x);
//    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//}
  
  scrolltotop(){
      console.log("scrolltotop");
      $location.hash('top');
      $anchorScroll();
  }
  
  phasechange(phase) {
       this.phase = phase;  
  }
  
    ownerchange(buyer) {
       this.buyer = buyer;  
      // this.site.buyer = buyer._id;  
  }
  
    areachange(area){
    this.site.area = area.area;
  }
  
    contractorchange(user) {
       this.user = user;  
  }
  
  isAdminSales(role){
    var admin = "Admin";
    var sales = "Verkope";
    return role === admin || role === sales;
  }
  
    isAdmin(role){
    var admin = "Admin";
    return role === admin;
  }

numberWithCommas(){
    test = this.site.marketinglrprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return this.site.marketinglrprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

setEmpty(e, value, rollback) {
    if (e.keyCode == 27) {
      e.preventDefault();
      if (rollback) {
        myForm[value].$rollbackViewValue();
      }
      model[value] = '';
    }
  }
  
  isConstruct(){
   return this.site.phase === "Konstruksie" || this.phase.phases === "Konstruksie";
  }
  
  isOption(){
   return this.site.phase === "Opsie" || this.phase.phases === "Opsie";
  }


save(event,site,phase,sitecopy) {
  var save_phasechange = true;
  is_sales_phase = false;
  
  var length_phasearray = this.site.phasearray.length;
  var local_phasearray = this.site.phasearray;
  
  var local_salesarray = this.site.salesarray;
  var length_salesarray = local_salesarray.length;
  var sales_state = this.site.salesstate;
  
  var local_constructarray = this.site.constructarray;
  var length_constructarray = local_constructarray.length;
  var construct_state = this.site.constructstate;
  
var saleslist = ["Erf Oop","Opsie","Verkoop","Kontrak geteken","Kontrak geteken LR"];

for(var i = 0 ; i <= saleslist.length; i++){
    if(this.phase.phases == saleslist[i])
   {
     is_sales_phase = true;
   }
 }
  
  var last_status = local_phasearray[length_phasearray - 1].status;  
  phasetosave = '';
  if(this.phase.phases != last_status && (this.phase.phases != "Konstruksie"))
  {
    //Save new array entry at end
    local_phasearray[length_phasearray] = {datestamp : new Date(),status : this.phase.phases};
    if(is_sales_phase)
    {
          local_salesarray[length_salesarray] = {datestamp : new Date(),status : this.phase.phases};
          sales_state = this.phase.phases;
    }  
      
      if(this.phase.phases == 'Kontrak geteken')
      {
        this.site.lifetime = false;
      }
      else if(this.phase.phases == 'Kontrak geteken LR')
      {
        this.site.lifetime = true;
      }
  }
  else if(this.phase.phases == "Konstruksie" && this.site.conprogress != this.sitecopy.conprogress)
  {
    phasetosave = "Konstruksie - " + this.sitecopy.conprogress+"%";
    local_phasearray[length_phasearray] = {datestamp : new Date(),status : phasetosave};
    local_constructarray[length_constructarray] = {datestamp : new Date(),status : phasetosave};
    construct_state = phasetosave;
  }
  
  user_option = this.site.useroption;
  if(this.phase.phases == "Opsie")
  {
    user_option = this.user._id;
  }
  
  if (this.buyer == undefined){
    localBuyer = this.site.buyer;
  }
  else {
    localBuyer = this.buyer.buyers;
  }
   
  if (this.user == undefined){
    localContractor = this.site.contractor;
  }
  else {
    localContractor = this.user.users;
  }

   this.$mdDialog.show({
   controller($mdDialog) {
   'ngInject';
    
    this.cancel = () => {
    $mdDialog.hide();
     }
    
    this.yes = () => {   
    this.phase = phase;
    this.site = site;
    this.sitecopy = sitecopy;  
    Sites.update({
      _id: this.site._id
    }, {
      $set: {
        nr: this.site.nr,
        layoutnr: this.site.layoutnr,
        sitesize: this.site.sitesize,
        gps: this.site.gps,
        buyer: localBuyer,//this.buyer.buyers,
        lifetime: this.site.lifetime,
        contractsigned: this.site.contractsigned,
        homesize: this.site.homesize,
        hometype: this.site.hometype,
        siteprice: this.site.siteprice,
        houseprice: this.site.houseprice,
        extrasprice: this.site.extrasprice,
        addextrasprice: this.site.addextrasprice,
        contractor: localContractor,
        constructdate: this.site.constructdate,
        public: this.site.public,
        phase: this.phase.phases,
        patiosize: this.site.patiosize,
        bedrooms: this.site.bedrooms,
        bathrooms: this.site.bathrooms,
        study: this.site.study,
        garages: this.site.garages,
        contractpricelr: this.site.contractpricelr,
        marketingfullprice: this.site.marketingfullprice,
        marketinglrprice: this.site.marketinglrprice,
        conprogress: this.sitecopy.conprogress,
        optiondate: this.site.optiondate,
        useroption: user_option,
        area: this.site.area,
        compcom: this.site.compcom,
        phasearray : local_phasearray,
        salesarray : local_salesarray,
        constructarray : local_constructarray,
        salesstate      : sales_state,
        constructstate  : construct_state 
      }
    }, (error) => {
      if (error) {
        console.log('Oops, unable to update the site...');
      } else {
        console.log('Done!');
      }
    });

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
    this.reset();
}
   
     reset(){
    this.newphase = {};
    
  }
}


 
const name = 'siteDetails';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  SnagsList,
  BuildingPhases,
  OwnersAddButton,
  OwnersDropdown,
  PhaseList,
  SalesPhase,
  ConstructPhase,
  AreaDropdown
 // SiteMap
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: SiteDetails
}).config(config,dateformat);

function dateformat($mdDateLocaleProvider) {
  'ngInject';
  
  $mdDateLocaleProvider.formatDate = function(date) {
    return date ? moment(date).format('DD-MM-YYYY') : '';
  };

  $mdDateLocaleProvider.parseDate = function(dateString) {
    var m = moment(dateString, 'DD-MM-YYYY', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };
};
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('siteDetails', {
    url: '/sites/:siteId',
        template: '<site-details></site-details>',
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
};