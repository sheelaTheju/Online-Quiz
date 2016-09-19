(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','$rootScope'];
    function LoginController($location, AuthenticationService, FlashService,$rootScope) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $rootScope.name = vm.username;
                   /*alert(vm.password);*/
                   if(vm.password == "mphasis1234"){
                     $location.path('/page1');
                   }
                   else{
                     alert('password is incorrect');
                     vm.dataLoading = false;
                     return;
                   }
                /*if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }*/
            });
        };
    }

})();
