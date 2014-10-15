'use strict';

//Setting up route
angular.module('accomodations').config(['$stateProvider',
	function($stateProvider) {
		// Accomodations state routing
		$stateProvider.
		state('listAccomodations', {
			url: '/accomodations',
			templateUrl: 'modules/accomodations/views/list-accomodations.client.view.html'
		}).
		state('createAccomodation', {
			url: '/accomodations/create',
			templateUrl: 'modules/accomodations/views/create-accomodation.client.view.html'
		}).
		state('viewAccomodation', {
			url: '/accomodations/:accomodationId',
			templateUrl: 'modules/accomodations/views/view-accomodation.client.view.html'
		}).
		state('editAccomodation', {
			url: '/accomodations/:accomodationId/edit',
			templateUrl: 'modules/accomodations/views/edit-accomodation.client.view.html'
		}).
		state('editPhoto', {
			url: '/accomodations/:accomodationId/editPhoto',
			templateUrl: 'modules/accomodations/views/edit-photo.client.view.html'
		}).
		state('search', {
			url:'/search',
			templateUrl:'modules/accomodations/views/search-accomodation.client.view.html'
		}).
		state('myrent',{
			url:'/myrent',
			templateUrl:'modules/accomodations/views/myrent-accomodation.client.view.html'
		});
		
	}
]);