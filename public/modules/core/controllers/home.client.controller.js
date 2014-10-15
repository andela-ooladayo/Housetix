'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Search',
	function($scope, Authentication, Search) {

		 // This provides Authentication context.
		$scope.authentication = Authentication;

		// This initialialize address auto-complete context
		 $scope.initializeSearch = function(){
    		var address = (document.getElementById('inputBox'));
    		var autocomplete = new google.maps.places.Autocomplete(address);
		    autocomplete.setTypes(['geocode']);
		    console.log(google)
		    google.maps.event.addListener(autocomplete, 'place_changed', function() {
		      	var place = autocomplete.getPlace();
		      	if (!place.geometry) {
		            return;
		      	}
		    	$scope.place = place.city;
		     	var address = '';
	      		if (place.address_components) {
	        		address = [
		         	 	(place.address_components[0] && place.address_components[0].short_name || ''),
		          		(place.address_components[1] && place.address_components[1].short_name || ''),
		          		(place.address_components[2] && place.address_components[2].short_name || '')
	        		].join(' ');
	      		}
    		});
  		};

  		// Search by Location
		$scope.search = function(){
			Search.query({ 
				location: $scope.inputBox
				},
				function (reply){
					$scope.accomodation=reply;
					$scope.photos=reply.image;	
				},
				function (res){
					$scope.error = res.message;
				});
		};
	}
]);