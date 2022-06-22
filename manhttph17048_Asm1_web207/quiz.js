const app= angular.module("my_Quiz",[]);
function quizz($scope, $http, $rootScope) {
    // $rootScope.student.marks = 0;
    $scope.student={}
    $scope.isStart = true;
    const api="https://620fb24bec8b2ee28349bb7f.mockapi.io/api/tm/students";
    var acc= localStorage.getItem('student');
    
    $http.get(api+"/"+acc).then(function(response){
        // console.log(response.data);
        $scope.student=response.data
        $scope.student.marks=0
        console.log($scope.student.id)
        // console.log($scope.student)
    })
    console.log($rootScope.subjects)
    $scope.start = function () {
        $scope.isStart = true;
        dongho();
    }
    $scope.list_question = [];
    var id= localStorage.getItem('id')
    console.log(id)
    const adva="https://620b0628beee430017f38485.mockapi.io/ADVA";
    // $http.get("Quizs/"+id+".js").then(function (response)
    $http.get(adva).then(function (response)
     {
        console.log(response.data);
        $scope.list_question = response.data;
    });
    $scope.ketqua = [];
    $scope.batdau = 0;
   
    $scope.nopbai = true
    $scope.chamdiem = function () {
        console.log($scope.ketqua);
        console.log($scope.list_question);
        if($scope.ketqua.length == 0){
            alert("Bạn chưa chọn đáp án");
            return;
        }
        if ($scope.ketqua[$scope.batdau].answer == $scope.list_question[$scope.batdau].AnswerId) {
            $scope.message = "Đúng";
            $scope.thongbao = "success"
            $scope.student.marks++;
            $scope.nopbai=false;

        } else {
            $scope.message = "Sai";
            $scope.thongbao = "danger"
            $scope.nopbai=false;
        }
        // $scope.nopbai=false;
        $scope.ketqua = []
    };
    $scope.Next = function () {
        if ($scope.batdau < 9) {
            $scope.batdau++;
            $scope.nopbai = true;
            $scope.message = "";
            $scope.thongbao = ""
            
        }
    }
    var thoiluong = 600;
    function dongho() {
        thoiluong--;
        var phut = Math.floor(thoiluong / 60);
        var giay = thoiluong % 60;
        document.getElementById('sophut').innerHTML = '0'+ phut;
        document.getElementById('sogiay').innerHTML = giay;
        if(thoiluong > 0)
       mytime =  setTimeout(dongho, 1000);
    }
    dongho();
    $scope.history={}
    $scope.xacnhan=function(){
        $("#exampleModal").modal('hide');
        clearTimeout(mytime)
        var seconds=parseFloat(document.getElementById('sophut').innerHTML)*60+parseFloat(document.getElementById('sogiay').innerHTML)
        var time =600-seconds
        console.log(time);
        $scope.history.thoigian=time;
        $scope.history.mon="ADVA";
        $scope.history.diem=$scope.student.marks+"";
        $scope.history.Student=localStorage.getItem("student")
        console.log($scope.history)
        const apiHistory="https://620fb24bec8b2ee28349bb7f.mockapi.io/api/tm/historys";
        $http.post(apiHistory,$scope.history).then(function(response){
            Swal.fire({
                title: 'Kết thúc bài thi',
                text:"Điểm của bạn: "+$scope.history.diem+"   Thời gian làm bài: "+$scope.history.thoigian +"s" ,
                icon: 'success',
                // showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có! Rời bài thi.',
                // cancelButtonText: 'Chưa'
            }).then((result) => {
                if (result.value) {
                    window.location.href = "./index.html" ;
                }
            })
        //  alert("Điểm của bạn: "+$scope.history.diem+"   Thời gian còn lại: "+$scope.history.thoigian)
        //  window.location.href="./index.html"
     }
    
    )
 }
    // $scope.xacnhan = function(){
    //     $scope.history.thoigian =document.getElementById('sophut').innerHTML + "phut"+":"+ document.getElementById('sogiay').innerHTML+" giay";
    //     $scope.history.mon="ADVA"
    //     $scope.history.diem=$scope.student.marks+"";
    //     $scope.history.Student=$scope.student.id
    //     const apiHistory="https://620fb24bec8b2ee28349bb7f.mockapi.io/api/tm/historys";
    //     $http.post(apiHistory,$scope.history).then(function(response){
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Làm bài thi thành công!',
    //             text: ("Điểm của bạn: "+$scope.history.diem+"   Thời gian còn lại: "+$scope.history.thoigian),
    //             showConfirmButton: false,
    //             closeOnClickOutside: false,
    //             allowOutsideClick: false,
    //             timer: 2000
    //         }).then((result) => {
    //             if (result.value) {
    //                 window.location.href="./index.html" ;
    //                 $("#exampleModal").modal('hide');
    //     clearTimeout(mytime)
    //             }
    //         });
           
            
    //     }
    //        )
 
          
    // }
    // $scope.sos = [1,2,3,4,5,6,7,8,9,10];
    $scope.cau = function(so){
      
        console.log($scope.ketqua);
        console.log($scope.list_question);
        if($scope.ketqua.length == 0){
            alert("Bạn chưa chọn đáp án");
            return;
        }
        if ($scope.ketqua[$scope.batdau].answer == $scope.list_question[$scope.batdau].AnswerId) {
            $scope.message = "Đúng";
            $scope.thongbao = "success"
            $scope.student.marks++;

        } else {
            $scope.message = "Sai";
            $scope.thongbao = "danger"
        }
        $scope.nopbai = false;
        $scope.batdau = so - 1;
    }

}
app.controller("quizz",quizz)