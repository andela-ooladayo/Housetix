'use strict';

// Configuring the A module
angular.module('accomodations').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Accomodations', 'accomodations', 'dropdown', '/accomodations(/create)?');
		Menus.addSubMenuItem('topbar', 'accomodations', 'List Accomodations', 'accomodations');
		Menus.addSubMenuItem('topbar', 'accomodations', 'New Accomodation', 'accomodations/create');
		Menus.addMenuItem('topbar', 'Manage Property', 'property',  '/agent?');
		Menus.addMenuItem('topbar', 'List a Property', 'property',  '/agent');
	}
]);