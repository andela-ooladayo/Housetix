'use strict';

// Accomodations controller
angular.module('accomodations').controller('AccomodationsController', ['$scope','$stateParams','$location', '$upload', 'Authentication', 'Accomodations','Agent','Photo',
	function($scope, $stateParams, $location, $upload, Authentication, Accomodations, Agent, Photo) {
		$scope.authentication = Authentication;
  	
		// Create new Accomodation
		$scope.create = function() {
			// Create new Accomodation object
			var accomodation = new Accomodations($scope.house);

			//set accomodation images to 64bit string files
			accomodation.image = $scope.stringFiles;

			//Save new accomodation
			accomodation.$save(function(response) {
                $scope.datas = response.image;
                $scope.house='';
                //Redirect page to Home Page
                $location.path('/');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
			});
		};

   	    $scope.onFileSelect = function ($files) {
   	    	//initial variables
            $scope.uploadProgress = 0;
            $scope.files = $files;
            $scope.stringFiles = [];

            //Use angular File reader to convert image into string
        	if ($scope.files) {
        		for (var i in $scope.files) {
        			//Accept only JPEG AND PNG format
	                if ($scope.files[i].type === 'image/jpeg' || $scope.files[i].type === 'image/png'){
	                    //Create new instance of filerader
	                    var reader = new FileReader();
	                    reader.onload = function(e) {
	                    	//Load the Image string into path
                            $scope.stringFiles.push({path: e.target.result});
	                    };
	                    reader.readAsDataURL($scope.files[i]);
	                    $scope.correctFormat = true; 
	                } else {
	                   $scope.correctFormat = false; 
	                }
	            }
            };

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

		

		// Delete existing image from the set of images
		$scope.deletePhoto = function(index) {
			//Create new instance of Photo delecting operation
			var photo = new Photo({ 
				accomodationId: $stateParams.accomodationId,
				index: index
			});

			photo.$save(function(response){
				console.log(response);
				$location.path('accomodations/');
			});
    	};
	

		
 
		//Update existing Accomodation
		$scope.update = function() {
			//initial variable
			var accomodation = $scope.accomodation;

			accomodation.$update(function() {
			$location.path('accomodations/' + accomodation._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	
		// Find a list of Accomodations
		$scope.find = function() {
			Accomodations.query(
				function success(response) {
					$scope.accomodations = response;
					$scope.photos=response.image;
				},
				function(errorResponse) {
					$scope.error = errorResponse.data.message;
				}
			);
		};

		// Find existing Accomodation
		$scope.findOne = function() {
			$scope.accomodation = Accomodations.get({ 
				accomodationId: $stateParams.accomodationId
			}), function(response){
				$scope.photos=$scope.accomodation.image;
			};	
		};

		//List accomodation by Current User
		$scope.profile = function() {
			 Agent.query(
			 	function success (response){
			
			});	
		};
	}
]);