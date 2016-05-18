import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './userRoles.html';

class UserRoles {
  constructor() {
    this.change();
   
   this.list = [
     {
         'id'     : '1',
         'role'  : 'Admin'
         
     },
     {
         'id'     : '2',
         'role'  : 'Verkope'
         
     }, 
     {
         'id'     : '3',
         'role'  : 'Kontrakteer'
         
     }   
   ];
}
 
  
 
  change() {
    this.onChange({
      roles:{
       [this.columntochange]: this.val   
      } 
    });
  }
}

const name = 'userRoles';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    onChange: '&',
    columntochange: "@",
    val:       "@"
  },
  controllerAs: name,
  controller: UserRoles
});
