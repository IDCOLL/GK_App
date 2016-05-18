import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './buildingPhases.html';

class BuildingPhases {
  constructor() {
    this.change();
   
   this.list = [
     {
         'id'     : '1',
         'phase'  : 'Erf Oop'
         
     },
     {
         'id'     : '2',
         'phase'  : 'Opsie'
         
     }, 
     {
         'id'     : '3',
         'phase'  : 'Verkoop'
         
     },
     {
         'id'     : '4',
         'phase'  : 'Kontrak geteken'
         
     },
     {
         'id'     : '28',
         'phase'  : 'Kontrak geteken LR'
         
     },
     {
         'id'     : '5',
         'phase'  : 'Kontrak by Eagle'
         
     },
     {
         'id'     : '6',
         'phase'  : 'Registrasie'
         
     },
     {
         'id'     : '7',
         'phase'  : 'Plan na Argitek'
         
     },     
     {
         'id'     : '8',
         'phase'  : 'Plan Finalisering - Argitek' 
     },
     {
         'id'     : '29',
         'phase'  : 'Plan epos na Jos' 
     },     
     {
         'id'     : '12',
         'phase'  : 'Kapitaalbydrae betaal' 
     },
     {
         'id'     : '10',
         'phase'  : 'Plan Muni ingedien' 
     },
     {
         'id'     : '11',
         'phase'  : 'Plan Muni goedgekeur' 
     },
     {
         'id'     : '30',
         'phase'  : 'Goedgek plan na Jos' 
     },         
     {
         'id'     : '14',
         'phase'  : 'NHBRC registrasie' 
     },     
     {
         'id'     : '17',
         'phase'  : 'Konstruksie' 
     },
     {
         'id'     : '24',
         'phase'  : 'Foutelys ontvang' 
     },
     {
         'id'     : '25',
         'phase'  : 'Foutelys afgehandel' 
     },
     {
         'id'     : '26',
         'phase'  : 'Okkupasie sertifikaat' 
     },
     {
         'id'     : '27',
         'phase'  : 'Intrek' 
     }                     
   ];
}
 
  
 
  change() {
    this.onChange({
      phases:{
       [this.property]: this.pp   
      } 
    });
  }
}

const name = 'buildingPhases';
 
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
  controller: BuildingPhases
});
