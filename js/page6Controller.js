 angular
        .module('app')
        .controller('page6Controller', page6Controller);
		
		    page6Controller.$inject = ['UserService', '$rootScope','$location'];

		function page6Controller(UserService,$rootScope,$location){
		
			
	        $rootScope.nextPage = function() { 
			
			$location.path('/quiz');

			};
			 $rootScope.prevPage = function() { 
			
			$location.path('/page1');

			};
		
		
		
		}