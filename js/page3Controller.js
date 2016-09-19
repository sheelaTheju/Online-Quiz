 angular
        .module('app')
        .controller('page3Controller', page3Controller);
		
		    page3Controller.$inject = ['UserService', '$rootScope','$location'];

		function page3Controller(UserService,$rootScope,$location){
		
			
	        $rootScope.nextPage = function() { 
			
			$location.path('/page4');

			};
			 $rootScope.prevPage = function() { 
			
			$location.path('/page2');

			};
		
		
		
		}