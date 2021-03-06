var app = "";
var obj = "";

app = angular.module('mideUniversidades', ['angularUtils.directives.dirPagination']);

app.controller('mideUniversidadesController', function($scope, $http) {

    obj = {content: null};

    $http.get('http://aprende.colombiaaprende.edu.co/sites/default/files/naspublic/mide/json/base-mide.json').success(function(data) {
		console.log(data);
		obj.content = data;
    });

    $scope.tableResult=true;
    
    $scope.sort = function(keyname){
        $scope.sortKey  = keyname;
        $scope.reverse = !$scope.reverse;
    };
    
    $scope.searchByOtherFields = function() {

        var filterSearch = 0;
        var arrayObject = '';
        var numberFilterActive = 0;

		
        $scope.universities = [];

        var nameUniversity = document.getElementById('nameUniversity').value;
        var isAccredited = document.getElementById('isAccredited').value;
        var sector = document.getElementById('sector').value;
		var classification;
		try {
			classification = document.getElementById('classification').value;
		}catch(e){
			classification="";
		}
		var yearU;
		try{
			yearU=document.getElementById('yearU').value;
			console.log(yearU);
		}catch(e){
			yearU="";
		}
		console.log(yearU+" es el año seleccionado");
            
        if(nameUniversity == "" && isAccredited == "" && sector == "" && classification == "" && yearU ==""){
            alert("Favor seleccione al menos un criterio de busqueda.");
            return false;
        }

        if(nameUniversity)
            numberFilterActive += 1;
        if(isAccredited)
            numberFilterActive += 1;
        if(sector)
            numberFilterActive += 1;
        if(classification)
            numberFilterActive += 1;
		if(yearU)
			numberFilterActive += 1; 
		
		
		console.log(numberFilterActive);
        angular.forEach(obj.content, function(mide) {
            filterSearch = 0;
            arrayObject = {
                codeIes: mide.codeIes,
                nameUniversity: mide.nameUniversity,
                sector: mide.sector,
                classification: mide.classification,
                isAccredited: mide.isAccredited,
                score: mide.score,
                score_est: mide.score_est,
                productMide: mide.productMide,
				yearU: mide.yearU,
				yearT: mide.yearT
				
				
            };
			console.log(yearU);

            if(nameUniversity){
                if (mide.nameUniversity.indexOf(nameUniversity) > -1 || mide.nameUniversity.toUpperCase().indexOf(nameUniversity.toUpperCase()) > -1){
                    filterSearch += 1;
                }
            }

            if(isAccredited){
                if(isAccredited == mide.isAccredited)
                    filterSearch += 1;
            }

            if(sector){
                if(sector == mide.sector)
                    filterSearch += 1;
            }

            if(classification){
                if(classification == mide.classification)
                    filterSearch += 1;
            }
			
			if(yearU){
                if(yearU == mide.yearU)
                    filterSearch += 1;
            }
            if(filterSearch == numberFilterActive){
				$scope.tableResult=false;
                $scope.universities.push(arrayObject);
         
            }

        });
        
    };
});
