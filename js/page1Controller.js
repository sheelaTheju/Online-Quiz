 angular
        .module('app')
        .controller('page1Controller', page1Controller);
		
		    page1Controller.$inject = ['UserService', '$rootScope','$location'];

		function page1Controller(UserService,$rootScope,$location){
		
			$rootScope.nextPage = function() {

			$location.path('/page2');

			};
	        $rootScope.prevPage = function() { 
			
			$location.path('/');

			};
		
		
		
		}