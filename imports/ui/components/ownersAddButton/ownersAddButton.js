import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './ownersAddButton.html';
import './ownersAddModal.html';
import { name as OwnersAdd } from '../ownersAdd/ownersAdd';
 
class OwnersAddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';
 
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
  }
 
  open(event) {
    this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';
        
        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'ownersAddModal',
      templateUrl: `imports/ui/components/${name}/ownersAddModal.html`,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}
 
const name = 'ownersAddButton';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  OwnersAdd
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: OwnersAddButton
});