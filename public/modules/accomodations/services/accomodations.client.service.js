'use strict';

//Accomodations service used for communicating with the accomodations REST endpoints
angular.module('accomodations').factory('Accomodations', ['$resource',
	function($resource) {
		return $resource('accomodations/:accomodationId', {
			accomodationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);