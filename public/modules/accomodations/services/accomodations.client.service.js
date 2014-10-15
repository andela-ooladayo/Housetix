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
]).factory('Search', ['$resource',
	function($resource) {
		return $resource('/search');
	}
]).factory('Agent', ['$resource',
	function($resource) {
		return $resource('users/accomodation',
			{
				update:{
					method:'PUT'
				}
			});
	}
]).factory('Photo', ['$resource',
	function($resource){
		return $resource('/accomodations/:accomodationId/editPhoto', {
			accomodationId: '@accomodationId'
		},
			{
				update:{
					method:'PUT'
				}
			});
	}
]);