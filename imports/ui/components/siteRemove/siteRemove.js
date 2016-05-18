import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './siteRemove.html';
import { Sites } from '../../../api/sites';
 
class SiteRemove {
  remove() {
    if(this.site){
        Sites.remove(this.site._id);
    }
  }
}
 
const name = 'siteRemove';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
    site: '<'
  },
  controllerAs: name,
  controller: SiteRemove
});