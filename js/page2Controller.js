 angular
        .module('app')
        .controller('page2Controller', page2Controller);
		
		    page1Controller.$inject = ['UserService', '$rootScope','$location'];

		function page2Controller(UserService,$rootScope,$location){
		
			$rootScope.nextPage = function() {

			$location.path('/page3');

			};
	        $rootScope.prevPage = function() { 
			
			$location.path('/page1');

			};
		
		
		
		}