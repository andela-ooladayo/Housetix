'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','$location', 'Search','$anchorScroll',
	function($scope, Authentication, $location, Search, $anchorScroll) {

		 // This provides Authentication context.
		$scope.authentication = Authentication

  		// Search by Clicking any of the cities
		$scope.nearSearch = function(locate){
			$scope.locate = locate
			Search.query({ 
				location: $scope.locate
				},
				function (reply){
					console.log(reply)
					$scope.accomodation=reply;
					$scope.photos=reply.image;	
					$location.hash('displaySearch');
        			$anchorScroll();
				},
				function (res){
					$scope.error = res.message;
					$location.hash('displaySearch');
        			$anchorScroll();
				});
		};

		// On Keydown open Search Section
		$scope.openSearch = function(){
			$location.path('/search');
		}

		$scope.gotoBottom = function() {
        	// set the location.hash to the id of
        	// the element you wish to scroll to.
        	$location.hash('displaySearch');
        	// call $anchorScroll()
        	$anchorScroll();
      	};

		// Search by Location
		$scope.search = function(){
			Search.query({ 
				location: $scope.inputBox.toLowerCase()
				},
				function (response){
					$scope.accomodation=response;
					$scope.photos=response.image;	
				},
				function error (res){
					$scope.error = res.message;
				}
			);
		};
	}
]);