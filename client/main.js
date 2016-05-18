import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import {name as Gkmanage } from '../imports/ui/components/gkmanage/gkmanage';

function onReady() {
  angular.bootstrap(document, [
    Gkmanage
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}