'use strict';

(function() {
	// Accomodations Controller Spec
	describe('Accomodations Controller Tests', function() {
		// Initialize global variables
		var AccomodationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Accomodations controller.
			AccomodationsController = $controller('AccomodationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Accomodation object fetched from XHR', inject(function(Accomodations) {
			// Create sample Accomodation using the Accomodations service
			var sampleAccomodation = new Accomodations({
				name: 'New Accomodation'
			});

			// Create a sample Accomodations array that includes the new Accomodation
			var sampleAccomodations = [sampleAccomodation];

			// Set GET response
			$httpBackend.expectGET('accomodations').respond(sampleAccomodations);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.accomodations).toEqualData(sampleAccomodations);
		}));

		it('$scope.findOne() should create an array with one Accomodation object fetched from XHR using a accomodationId URL parameter', inject(function(Accomodations) {
			// Define a sample Accomodation object
			var sampleAccomodation = new Accomodations({
				name: 'New Accomodation'
			});

			// Set the URL parameter
			$stateParams.accomodationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/accomodations\/([0-9a-fA-F]{24})$/).respond(sampleAccomodation);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.accomodation).toEqualData(sampleAccomodation);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Accomodations) {
			// Create a sample Accomodation object
			var sampleAccomodationPostData = new Accomodations({
				name: 'New Accomodation'
			});

			// Create a sample Accomodation response
			var sampleAccomodationResponse = new Accomodations({
				_id: '525cf20451979dea2c000001',
				name: 'New Accomodation'
			});

			// Fixture mock form input values
			scope.name = 'New Accomodation';

			// Set POST response
			$httpBackend.expectPOST('accomodations', sampleAccomodationPostData).respond(sampleAccomodationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Accomodation was created
			expect($location.path()).toBe('/accomodations/' + sampleAccomodationResponse._id);
		}));

		it('$scope.update() should update a valid Accomodation', inject(function(Accomodations) {
			// Define a sample Accomodation put data
			var sampleAccomodationPutData = new Accomodations({
				_id: '525cf20451979dea2c000001',
				name: 'New Accomodation'
			});

			// Mock Accomodation in scope
			scope.accomodation = sampleAccomodationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/accomodations\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/accomodations/' + sampleAccomodationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid accomodationId and remove the Accomodation from the scope', inject(function(Accomodations) {
			// Create new Accomodation object
			var sampleAccomodation = new Accomodations({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Accomodations array and include the Accomodation
			scope.accomodations = [sampleAccomodation];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/accomodations\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAccomodation);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.accomodations.length).toBe(0);
		}));
	});
}());