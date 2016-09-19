 angular
        .module('app')
        .controller('finalController', finalController);
		
		    page6Controller.$inject = ['UserService', '$rootScope','$location'];

		function page6Controller(UserService,$rootScope,$location){
		
			
	        $rootScope.nextPage = function() { 
			
			$location.path('/quiz');

			};
			
		
		
		
		}