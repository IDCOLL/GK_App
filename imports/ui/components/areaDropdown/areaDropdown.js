import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './areaDropdown.html';

class AreaDropdown {
  constructor() {
    this.change();
   
   this.list = [
     {
         'id'     : '1',
         'description'  : 'Rif'
         
     },
     {
         'id'     : '2',
         'description'  : 'Grootbrak'
         
     }, 
     {
         'id'     : '3',
         'description'  : 'Glen'
         
     },
     {
         'id'     : '4',
         'description'  : 'Rheebok'
         
     },
      {
         'id'     : '5',
         'description'  : 'George'
         
     }  
   ];
}
 
  
 
  change() {
    this.onChange({
      area:{
       [this.property]: this.pp   
      } 
    });
  }
}

const name = 'areaDropdown';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    onChange: '&',
    property: "@",
    pp:       "@"
  },
  controllerAs: name,
  controller: AreaDropdown
});
