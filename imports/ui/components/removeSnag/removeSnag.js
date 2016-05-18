import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './removeSnag.html';
import { Snags } from '../../../api/snags';
 
class RemoveSnag {
  remove() {
    if(this.snag){
        Snags.remove(this.snag._id);
    }
  }
}
 
const name = 'removeSnag';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
    snag: '<'
  },
  controllerAs: name,
  controller: RemoveSnag
});