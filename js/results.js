/*
 * IIFE to encapsulate code and avoid global variables
 */
(function(){

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("resultsCtrl", ResultsController);

    /*
     * injecting the custom service quizMetrics into the results controller 
     * using the $inject method.
     *
     * Injecting dependencies like this is done so as to avoid issues when 
     * uglifying the code. Function arguments will get shortened during the 
     * uglify process but strings will not. Therefore by injecting the argument
     * as strings in an array using the $inject method we can be sure angular 
     * still knows what we want to do.
     */
    ResultsController.$inject = ['quizMetrics', 'DataService','$scope','$http','$rootScope','$location'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function ResultsController(quizMetrics, DataService,$scope,$http,rootScope,$location){
        var vm = this;

		vm.openInvalidAns = false;
        $scope.sendQuiz = false;
        $scope.activeQues = 1;
        vm.hideLoginBox = false;
        /*
         * The pattern used in the controllers in this app puts all the 
         * properties and methods available to the view at the top of the 
         * function. Any methods are referenced as named functions which are 
         * defined at the bottom.
         *
         * This allows the interface of the controller to be seen at a glance. 
         * Which is not usually the case when defining methods as anon 
         * functions inline.
         */
        vm.quizMetrics = quizMetrics; // binding the object from factory to vm 
        vm.dataService = DataService;
        vm.getAnswerClass = getAnswerClass; // named function defined below
        vm.setActiveQuestion = setActiveQuestion; // named function defined below
        vm.reset = reset; // named function defined below
        vm.calculatePerc = calculatePerc; // named function defined below
        vm.activeQuestion = 0;
		vm.sendMail = sendMail;
        vm.goToNextQues = goToNextQues;
        vm.openIncorrectAns = openIncorrectAns;
        vm.changeToQuiz = changeToQuiz;
		
		function sendMail(){
		
	//	alert(rootScope.userEmail);
      //  alert(rootScope.name);
         var dataConfig = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            //http://test-mail-app.au-syd.mybluemix.net/sendMail
         var obj = {'email':rootScope.userEmail,'name':rootScope.name};
         console.log('obj ',obj);
		// $http.post('http://test-mail-app.au-syd.mybluemix.net/sendMail',obj)
              //   $http.post('http://test-mail-app.au-syd.mybluemix.net/sendMail',obj)
                 $http.post('http://online-quiz-mail.herokuapp.com/sendMail',obj)

            .success(function (data, status, headers, config) {
                $location.path("/final");
                return;
			/*alert('Your Certificate is send over the mail, kindly check your mail box…');*/
            })
            .error(function (data, status, header, config) {
			console.log('data ',data);
			alert('error');
            });
		
		}

        function calculatePerc(){
            /*
             * simply calculating the percentage of correct answers and returning the number

             */
			 
            return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
        }

        function setActiveQuestion(index){
            /*
             * setting active question on the results page
             */
            vm.activeQuestion = index;
        }

        function getAnswerClass(index){
            /*
             * returning the class to style the answer depending on whether it 
             * is right or wrong. quizMetrics can be referenced here without 
             * vm. as the object is passed by reference. We can manipulate 
             * the object directly here. vm. is only needed when it is being
             * manipulated by the view as the view does not have direct access
             * to the quizMetrics service. But as we are in the controller
             * we can directly manipulate it
             */

         //   console.log('a ',quizMetrics.correctAnswers[vm.activeQuestion]);
          //  console.log('b ',DataService.quizQuestions[vm.activeQuestion].selected);

            if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
                return "bg-success";
            }else if(index === DataService.quizQuestions[vm.activeQuestion].selected){
                return "bg-danger";
            }
        }

        function reset(){
            /*
             * reseting all the data. This includes reverting the results state
             * back to false which will return the view to the lists.
             *
             * Also all the variables on each question object is returned to 
             * the default state using the for loop to iterate through all 
             * questions.
             */
            quizMetrics.changeState("results", false);
            quizMetrics.numCorrect = 0;

            for(var i = 0; i < DataService.quizQuestions.length; i++){
                var data = DataService.quizQuestions[i]; //binding the current question to data to keep code clean

                data.selected = null;
                data.correct = null;
            }
        }
         function goToNextQues($index){

          
              var quizObj = {};
               quizObj.correctAnswers = DataService.correctAnswers;


                for(var i = $scope.activeQues; i < DataService.quizQuestions.length+1; i++){

                    console.log('i ',i);

                    if(i == 5){

                        $location.path('/page7');
                    }

                    if(DataService.quizQuestions[i].selected === DataService.correctAnswers[i]){
                     // console.log(1);
                      $scope.activeQues += 1; 
                    }
                    else{
                       //console.log(2); 
                       setActiveQuestion($scope.activeQues);
                       $scope.activeQues += 1;
                        
                       break;
                    }

                  

                }

        }

        function openIncorrectAns(){

                vm.openInvalidAns = true;
                vm.hideLoginBox = true;


        }

        function changeToQuiz(){

        
            reset();
            quizMetrics.changeState("quiz", true);

        }




    }

})();
