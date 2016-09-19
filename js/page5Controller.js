 angular
        .module('app')
        .controller('page5Controller', page5Controller);
		
		    page5Controller.$inject = ['UserService', '$rootScope','$location'];

		function page5Controller(UserService,$rootScope,$location){
		
			
	        $rootScope.nextPage = function() { 
			
			$location.path('/page6');

			};
			 $rootScope.prevPage = function() { 
			
			$location.path('/page4');

			};
		
		
		
		}