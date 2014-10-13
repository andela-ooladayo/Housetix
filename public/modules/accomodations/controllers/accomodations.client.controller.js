'use strict';

// Accomodations controller
angular.module('accomodations').controller('AccomodationsController', ['$scope', '$stateParams','$location', '$upload', 'Authentication', 'Accomodations','Agent','Photo',
	function($scope, $stateParams, $location, $upload, Authentication, Accomodations, Agent, Photo) {
		$scope.authentication = Authentication;

		$scope.initializeSearch = function(){
    		var address = (document.getElementById('location'));
    		var autocomplete = new google.maps.places.Autocomplete(address);
		      autocomplete.setTypes(['geocode']);
		    console.log(google)
		    google.maps.event.addListener(autocomplete, 'place_changed', function() {
		      	var place = autocomplete.getPlace();
		      	if (!place.geometry) {
		            return;
		      	}
		    	$scope.place = place.formatted_address;
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

		// Create new Accomodation
		$scope.create = function() {
			// Create new Accomodation object
			var accomodation = new Accomodations($scope.house);
			accomodation.image = $scope.stringFiles;
			// console.log($scope.house);
			accomodation.$save(function(response) {
                 
                 $scope.datas = response.image;
                 console.log($scope.datas);
                 $scope.house='';
                
                 // $location.path('/');
            }, function(error) {
                  console.log(error);
			});
		};

   	    $scope.onFileSelect = function ($files) {
            $scope.uploadProgress = 0;
            $scope.files = $files;
            $scope.stringFiles = [];

            // console.log($scope.files); 
        	if ($scope.files) {
        		for (var i in $scope.files) {
        			console.log($scope.files);
	                if ($scope.files[i].type === 'image/jpeg' || $scope.files[i].type === 'image/png'){
	                    var reader = new FileReader();
	                    reader.onload = function(e) {
                            $scope.stringFiles.push({path: e.target.result});
	                    };
	                    reader.readAsDataURL($scope.files[i]);
	                    $scope.correctFormat = true; 
	                } else {
	                	alert('error');

	                   $scope.correctFormat = false; 
	                }
	            }
            }

          };
          

		// Remove existing Accomodation
		$scope.remove = function(accomodation) {
			if (accomodation) { 
				accomodation.$remove();

				for (var i in $scope.accomodations) {
					if ($scope.accomodations [i] === accomodation) {
						$scope.accomodations.splice(i, 1);
					}
				}
			} else {
				$scope.accomodation.$remove(function() {
					$location.path('accomodations');
				});
			}
		};
		$scope.deletePhoto = function() {
			var accomodation = $scope.accomodation;
			
			accomodation.$update(function (response) {
	
				console.log(response);
			});
				
				
			// }, function(errorResponse) {
			// 	$scope.error = errorResponse.data.message;
			// };

		};
 
		//Update existing Accomodation
		$scope.update = function() {

			var accomodation = $scope.accomodation;
			console.log($scope.accomodation);
			accomodation.$update(function() {
				
				$location.path('accomodations/' + accomodation._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Edit Accomodation Pictures
		// $scope.editPhoto = function(){
		// 	// $location.path('/editPhoto');
		// 	Accomodations.get({ 
		// 		accomodationId: $stateParams.accomodationId
		// 		},
		// 		function success(reply){
		// 			$scope.accomodation=reply;
		// 			console.log($scope.accomodation);
		// 		}
		// 		);

		// 	};

		// Find a list of Accomodations
		$scope.find = function() {
			Accomodations.query(
				function success(response) {
					console.log(response);
					$scope.accomodations = response;
					$scope.photos=response.image;
					console.log($scope.photos);
				},
				function(err) {
					console.log(err);
				}
			);
		};

		// Find existing Accomodation
		$scope.findOne = function() {
			$scope.accomodation = Accomodations.get({ 
				accomodationId: $stateParams.accomodationId
			}), function(response){
				$scope.photos=$scope.accomodation.image;
				console.log($scope.photos);
			};	
		};
		$scope.profile = function() {
			 Agent.query(
			 	function success (response){
				
				console.log(response);
			});	
		};


	}
]);