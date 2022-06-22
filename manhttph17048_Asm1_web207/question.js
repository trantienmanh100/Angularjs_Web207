const app =angular.module("question_app",[]);
 questionFunction=function($scope,$http){
     const api ="https://620b0628beee430017f38485.mockapi.io/ADVA";
     $scope.questions =[];
     $http.get(api).then(function(response){
         $scope.questions =response.data;
         console. log($scope.questions);
     })
     $scope.edit =function(index){
         $scope.index=index;
         $scope.question =angular.copy($scope.questions[index]);
         $scope.question.Answers[0] =  JSON.stringify($scope.questions[index].Answers[0]);
            $scope.question.Answers[1] =  JSON.stringify($scope.questions[index].Answers[1]);
            $scope.question.Answers[2] =  JSON.stringify($scope.questions[index].Answers[2]);
            $scope.question.Answers[3] =  JSON.stringify($scope.questions[index].Answers[3]);   
     }
     $scope.save=function(){
        $scope.question.Answers[0]= JSON.parse($scope.question.Answers[0])
        $scope.question.Answers[1]=  JSON.parse($scope.question.Answers[1])
        $scope.question.Answers[2] =JSON.parse($scope.question.Answers[2])
        $scope.question.Answers[3] =JSON.parse($scope.question.Answers[3])
          $scope.questions[$scope.index]= $scope.question;
          const putApi= api+"/"+$scope.questions[$scope.index].id;
          console.log($scope.questions[$scope.index].id);
          console.log(putApi);
          $http.put(putApi,$scope.questions[$scope.index]).then(function(response){
              console. log(response);
              Swal.fire(
                'Good job!',
                'Lưu thành công!',
                'success',
                // ConfirmButtonText:'ok'
              )
              $scope.clear()
              })
              
              
      }
      $scope.cancel=function(){
        if($scope.index == -1){
            $scope.clear();
        }else{
            $scope.question=  angular.copy($scope.questions[$scope.index]);
        }
    }
    $scope.clear=function(){
        $scope.question={};
        $scope.index=-1
    }
    $scope.insert=function(){
      $scope.question.Answers[0]= JSON.parse($scope.question.Answers[0])
      $scope.question.Answers[1]=  JSON.parse($scope.question.Answers[1])
      $scope.question.Answers[2] =JSON.parse($scope.question.Answers[2])
      $scope.question.Answers[3] =JSON.parse($scope.question.Answers[3])
        $http.post(api,$scope.question).then(function(response){
            
            const qs =response.data; 
            $scope.questions.push(qs);
            Swal.fire(
                'Good job!',
                'Thêm thành công!',
                'success',
                // ConfirmButtonText:'ok'
              )
        })
        $scope.clear();
    }
    $scope.delete=function(index,id){
        const deleteApi= api+"/"+id;
        $http.delete(deleteApi).then(function(response){
            
            $scope.questions.splice(index,1);
            Swal.fire(
                'Good job!',
                'Xóa thành công!',
                'success',
                // ConfirmButtonText:'ok'
              )
        })
       
        $scope.clear();
    }
    $scope.onFormSubmit=function(event){
        event.preventDefault();
       }
 }
 app.controller("quesCtrl",questionFunction)