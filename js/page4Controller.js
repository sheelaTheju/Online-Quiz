 angular
        .module('app')
        .controller('page4Controller', page4Controller);
		
		    page4Controller.$inject = ['UserService', '$rootScope','$location'];

		function page4Controller(UserService,$rootScope,$location){
		
			
	        $rootScope.nextPage = function() { 
			
			$location.path('/page5');

			};
			 $rootScope.prevPage = function() { 
			
			$location.path('/page3');

			};
		
		
		
		}