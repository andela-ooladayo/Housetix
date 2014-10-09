'use strict';

// Accomodations controller
angular.module('accomodations').controller('AccomodationsController', ['$scope', '$stateParams', '$location', '$upload', 'Authentication', 'Accomodations',
	function($scope, $stateParams, $location, $upload, Authentication, Accomodations ) {
		$scope.authentication = Authentication;

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
                
                 $location.path('/');
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
		                if ($scope.files[i].type === 'image/jpeg' || $scope.files[i].type === 'image/png' || $scope.files[i].size < 60000){
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

		// Update existing Accomodation
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
		$scope.editPhoto = function(){
			// $location.path('/editPhoto');
			Accomodations.get({ 
				accomodationId: $stateParams.accomodationId
				},
				function success(reply){
					$scope.datas=reply.image;
					console.log($scope.datas);
				}
				);

			};

		// Find a list of Accomodations
		$scope.find = function() {
			Accomodations.query(
				function success(response) {
					console.log(response);
					$scope.accomodations = response;
					console.log($scope.accomodations);
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
			});
		};

		$scope.search = function(){

		};
	}
]);