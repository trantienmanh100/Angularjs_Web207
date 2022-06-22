const app =angular.module("my_app",[]);
    //     app.controller("subjectCtrl",function($scope,$http){
    // $scope.list_subject =[];
    // $http.get('db/Subjects.js').then(function(reponse){
    //     $scope.list_subject =reponse.data;
    // })
    // });

    function show_message(){
        Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại',
            text: 'Tài khoản hoặc mật khẩu không chính xác',
           
          })
    }
    function message_register(){
        Swal.fire(
            'Good job!',
            'Đăng ký thành công, Vui lòng đăng nhập!',
            'success',
            // ConfirmButtonText:'ok'
          )
    }

    

     function myFunction($scope,$http){
        $scope.students = [];
        // $scope.studentCheck =localStorage.getItem("student")

        //edit info
        
        $scope.view =function(){
            var id =localStorage.getItem("student")
            
            $scope.index =index;
            $scope.student =angular.copy($scope.students[index]);
            console.log($scope.student)
        }

        //logout
        $scope.logout =function(){

           
            
            Swal.fire({
                title: 'Bạn có muốn đăng xuất không?',
                // showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Đăng xuất',
                
              }).then((result) => {
               
                if (result.isConfirmed) {
                  Swal.fire('Đăng xuất thành công!', '', 'success')
                  localStorage.setItem("student",'')
                } 
              })
            
        }


    
    
        const api = 'https://620fb24bec8b2ee28349bb7f.mockapi.io/api/tm/students';
        
        $scope.idst=-1;
        $scope.index=-1;
        $http.get(api) // gửi 1 request dạng get lên api;
                .then(function(response){
                    $scope.students =response.data;
                    console.log(response.data);
                    
                }) 
                .catch(function(error){
                    console.log(error);  
                   
                })
                $scope.onFormSubmit =function(event){
                    event.preventDefault();
                    var useName=$scope.username;
                    var password=$scope.password;
                    console.log(useName);
                    var check =true;
                    for (let index = 0; index < $scope.students.length; index++) {
                        if ($scope.students[index].username==useName && $scope.students[index].password==password) {
                            $scope.student=$scope.students[index];
                            $scope.idst=$scope.students[index].id;
                            
                            if($scope.students[index].role==true){
                                window.location.href="./admin.html"
                            }
                            else{
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Đăng nhập thành công!',
                                    text: 'Quay lại trang chủ!',
                                    showConfirmButton: false,
                                    closeOnClickOutside: false,
                                    allowOutsideClick: false,
                                    timer: 2000
                                });
                            }
                            $("#login").modal("hide");
                            check=false;
                            
                        }    
                        
                    }
                    localStorage.setItem("student",$scope.student.id)
                    if(check==true){
                       
                            show_message();
                        
                    }
                   }
                   $scope.onRegister =function(event){
                     event.preventDefault();
                    
                     $http.post(api,$scope.student)
                        .then(function(response){
                            
                            const student=response.data;
                            $scope.students.push(student)
                            
                            // window.location.href="./index.html"
                            message_register();
                        })  
                   }
                   $scope.edit =function(index){
                       $scope.index =index;
                       $scope.student =angular.copy($scope.students[index]);
                       console.log($scope.student)
                   }
                   $scope.delete=function(id,index){
                       console.log(index)
                       const deleteAPI =api+"/"+id
                       $http.delete(deleteAPI)
                        .then(function(respone){
                            $scope.students.splice(index,1)
                        })
                        clear();
                   }
                   $scope.clear=function(){
                    $scope.student={}
                    $scope.index=-1;
                   }
                   
                   $scope.cancel=function(event){
                    event.preventDefault();
                    if($scope.index == -1){
                        $scope.clear();
                    }else{
                        $scope.student=  angular.copy($scope.students[$scope.index]);
                    }
                    }

                   $scope.insert=function(event){
                    event.preventDefault();
                       $http.post(api,$scope.student)
                        .then(function(respone){
                            console.log(respone);
                                $scope.students.push(respone.data)
                        })
                   }
                   $scope.save=function(event){
                     event.preventDefault();
                     $scope.students[$scope.index]=$scope.student;
                     const apiPut=api+"/"+$scope.students[$scope.index].id;
                     $http.put(apiPut,$scope.students[$scope.index])
                        .then(function(response){
                        // console.log("Thêm mới thành công")    
                        })
                   }

                   $scope.updateInfor=function(event){
                       event.preventDefault();
                       if($scope.idst!=-1){

                        for (let index = 0; index < $scope.students.length; index++) {
                            if ($scope.students[index].id=$scope.idst) {
                               $scope.students[index].name=$scope.student.name;
                               $scope.students[index].SDT=$scope.student.SDT;
                               $scope.students[index].Email=$scope.student.Email;
                               const putApi= api+"/"+$scope.students[index].id;
                               console. log(putApi);
                              $http.put(putApi,$scope.students[index]).then(function(response){
                              console. log(response);
                              })
                              Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật thông tin thành công!',
                                text: 'HIHI!',
                                showConfirmButton: false,
                                closeOnClickOutside: false,
                                allowOutsideClick: false,
                                timer: 2000
                            });
                            $("#updateInfo").modal("hide");
                            }
                        }
                       }
                   }

                    


     }
     app.controller("apiCtrl",myFunction)
    //  //paging
    //  todos.controller("TodoController", function($scope) {
    //     $scope.filteredTodos = []
    //    ,$scope.currentPage = 1
    //    ,$scope.numPerPage = 10
    //    ,$scope.maxSize = 5;
     
    //    $scope.makeTodos = function() {
    //      $scope.todos = [];
    //      for (i=1;i<=1000;i++) {
    //        $scope.todos.push({ text:"todo "+i, done:false});
    //      }
    //    };
    //    $scope.makeTodos(); 
     
    //    $scope.numPages = function () {
    //      return Math.ceil($scope.todos.length / $scope.numPerPage);
    //    };
     
    //    $scope.$watch("currentPage + numPerPage", function() {
    //      var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    //      , end = begin + $scope.numPerPage;
     
    //      $scope.filteredTodos = $scope.todos.slice(begin, end);
    //    });
    //  });

     subFunction = function($scope,$http) {
         const api ="https://620fb24bec8b2ee28349bb7f.mockapi.io/api/tm/subjects"
        $scope.subjects=[];
        $http.get(api)
            .then(function(response){
                console. log(response.data);
                $scope.subjects =response.data; 
               console.log($scope.subjects.Quizs)
            }).catch(function(error){
                 console.error(error);
            })
            $scope.test = function(event) {
                event.preventDefault();
               var student = localStorage.getItem("student");
                if (student == '') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Bạn chưa đăng nhập!',
                        text: 'Hãy quay lại sau khi đăng nhập!'
                    });
                } else {
                    Swal.fire({
                        title: 'Bắt đầu thi?',
                        text: "Bạn đã sẳn sàng!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Có! Bắt đầu thi.',
                        cancelButtonText: 'Chưa'
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "./TracNghiem.html" ;
                        }
                    })
                }
            }

        
        }
        app.controller("subjectCtrl",subFunction)



      app.directive("validatePassword", function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attr, mCtrl) {
                    const fnValidate = function (value) {
                        if (value.length >= 6) {
                            mCtrl.$setValidity("check_pwd", true);
                        } else {
                            mCtrl.$setValidity("check_pwd", false);
                        }

                        return value;
                    }

                    mCtrl.$parsers.push(fnValidate);
                }
            };
        });
        app.directive("compareTo", function ()  
    {  
    return {  
        require: "ngModel",  
        scope:  
        {  
            confirmPassword: "=compareTo"  
        },  
        link: function (scope, element, attributes, modelVal)  
        {  
            modelVal.$validators.compareTo = function (val)  
            {  
                return val == scope.confirmPassword;  
            };  
            scope.$watch("confirmPassword", function ()  
            {  
                modelVal.$validate();  
            });  
        }  
    };  
});  


// app.config(function($routeProvider, $locationProvider){
//     $locationProvider.hashPrefix("");

//     $routeProvider
//         .when("/GioiThieu",{
//             templateUrl:'GioiThieu.html',
//             controller:'my_app'
//         })
//         // .when("/red/:name",{
//         //     templateUrl:'pages/red.html',
//         //     controller:"redController"
//         //     // template:'<div style="background-color:red;"> Red </div>'
//         // })
//         // .when("/green/:name",{
//         //     templateUrl:'pages/green.html',
//         //     controller:"greenController"
//         //     // template:'<div style="background-color:green;"> Green </div>'
//         // })
// });
        