(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
           /* .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })*/

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
				.when('/page1', { templateUrl : 'template/page1.html', controller  : 'page1Controller' ,
                controllerAs: 'vm'})
			.when('/page2', { templateUrl : 'template/page2.html', controller  : 'page2Controller',
                controllerAs: 'vm' })
			.when('/page3', { templateUrl : 'template/page3.html', controller  : 'page3Controller' ,
                controllerAs: 'vm'})
			.when('/page4', { templateUrl : 'template/page4.html', controller  : 'page4Controller',
                controllerAs: 'vm' })
			.when('/page5', { templateUrl : 'template/page5.html', controller  : 'page5Controller',
                controllerAs: 'vm' })	
			.when('/page6', { templateUrl : 'template/page6.html', controller  : 'page6Controller',
                controllerAs: 'vm' })
			.when('/page7', { templateUrl : 'template/page7.html',
                controllerAs: 'vm' })
			.when('/final', { templateUrl : 'template/final.html',
                controllerAs: 'vm' })
			.when('/page9', { templateUrl : 'template/page9.html', controller  : 'page9Controller',
                controllerAs: 'vm' })
			.when('/page10', { templateUrl : 'template/page10.html', controller  : 'page10Controller',
                controllerAs: 'vm' })
				.when('/quiz', { templateUrl : 'template/quiz.html',
                controllerAs: 'vm' })
		
            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();