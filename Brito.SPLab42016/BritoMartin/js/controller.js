angular.module('MyFinalWeb.MyController',[])

.controller('menuCtrl', function($scope, $auth, $state) {
	if($auth.isAuthenticated())
    {
      	$scope.usuarioLogeado = "Usuario: " + $auth.getPayload().nombre;
    }else{
    	$scope.usuarioLogeado = "Sin Identificar";
    }
	
	
})
.controller('loginCtrl', function($scope, $http, $auth, $state) {
	if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
	

	$scope.seleccion = true;
	
	$scope.usuarioLogeado = "Sin Identificar";
	$scope.usuario = {};
	$scope.varAdministrador = {
		mail:'admin@admin.com',
		nombre: 'admin',
		password: '321'
	};
	$scope.varComprador = {
		mail:'comp@comp.com',
		nombre: 'comprador',
		password: '123'
	};

	$scope.varVendedor = {
		mail:'vend@vend.com',
		nombre: 'vend',
		password: '321'
	};
	$scope.limpiarPerfiles = function(){
		document.getElementById('radio1').checked = false;
		document.getElementById('radio2').checked = false;
		document.getElementById('radio3').checked = false;

		$scope.mostrarSelect = true;
	};
	$scope.rellenar = function(param){
		switch(param){
			case "Administrador":
				$scope.mostrarSelect = false;
				$scope.mostrarInputs = true;
				$scope.selectedUser = 'Administrador';
				$scope.usuario = $scope.varAdministrador;
			break;
			case "Comprador":
				$scope.mostrarSelect = false;
				$scope.mostrarInputs = true;
				$scope.selectedUser = 'Paciente';
				$scope.usuario = $scope.varComprador;
			break;
			case "Vendedor":
				$scope.mostrarSelect = false;
				$scope.mostrarInputs = true;
				$scope.selectedUser = 'Doctor';
				$scope.usuario = $scope.varVendedor;
			default:
			break;
		}
			
		

		
	};

	$scope.registro = function(){
		$state.go('alta');
	};
        var loginOptions = {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
	$scope.logear = function(){	
		if($scope.usuario.mail === "" || $scope.usuario.password === "" || $scope.usuario.mail === undefined || $scope.usuario.password === undefined){
			alert("No se ingresaron datos");
		}else{
		    $auth.login({mail:$scope.usuario.mail,clave:$scope.usuario.password,nombre:$scope.usuario.nombre},loginOptions )
		    .then(function(respuestaAuth){
		      console.info("Respuesta", respuestaAuth); 
		      if($auth.isAuthenticated())
		      {
		      	var payload = $auth.getPayload();
		      	console.log(payload);
		      	if(payload.tipo === 'administrador'){
		      		$state.go('grillaUsuarios');
		      	}else if(payload.tipo === 'comprador'){
		      		$state.go('grillaProductos');
		      	}else if(payload.tipo === 'vendedor'){
		      		$state.go('gestionDeUsuarios');
		      	}else{
		      		$state.go('menu');
		      	}
		      	$scope.usuarioLogeado = payload.nombre;
		      	
		        //$state.go('usuario');//Ejemplo
		      }else{
		        $state.go('login');//ejemplo
		      }
		    
		    })
		    .catch(function(parametro){
		      console.info("Error Catch", parametro.error);
		    });
		/*$http.get('http://localhost/TPFinalServices/Datos/index.php/usuarios')
			.then(function(respuesta){
				console.log(respuesta);
			},function errorCallback(response) {        
	        //aca se ejecuta cuando hay errores
	        console.log( response);           
    	});*/
		}
	};

})
.controller('logoutCtrl',function($scope,$http,$auth,$state){
  $scope.desloguear = function(){
    if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
    $auth.logout()
    .then(function(){
      $state.go('login');
    });
  };
})
.controller('menuAdminCtrl',function($scope,$http,$auth,$state,ServiceGrillaAdmin){
    if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
    $scope.gestionarUsuarios = function(){
    	$state.go('gestionDeUsuarios');
    };
ServiceGrillaAdmin.getpacientes().then(function(respuesta){
        console.log(respuesta);
    },function(error) {
    console.log('unable to get the data', error);
  });
   
})
.controller('gestionDeUsuariosCtrl',function($scope,$http,$auth,$state,FactoryGrillaProductos,$q){
    if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
 

FactoryGrillaProductos.getproductos().then(function(respuesta){
        console.log(respuesta);
    },function(error) {
    console.log('unable to get the data', error);
  });
})
.controller('templateGrillaCtrl',function($scope,$http,$auth,$state,ServiceGrillaProductos){
    if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }

    ServiceGrillaProductos.getproductos().then(function(respuesta){
        $scope.ListadoProductos = respuesta;
    },function(error) {
    console.log('unable to get the data', error);
  });
    $scope.Borrar = function(id){
	    $http.delete('../2ParcialServices/Datos/index.php/borrarproducto/'+id)
	 	.then(function(respuesta) {     	
	 		console.log("Respuesta: "+respuesta);
	      	$state.go($state.current, {}, {reload: true});
	    },function errorCallback(response) {
	     		$scope.ListadoPersonas= [];
	     		console.log( response);
	 	 });
 	};

 	$scope.Modificar = function(id){
    $http.post("PHP/nexo.php",{datos:{accion :"traer",idPersona:id}})
       .then(function(respuesta) {     
            $scope.modificar = !$scope.modificar;
            var key = "data";
            $scope.nuevoNombre = respuesta[key].nombre;
            $scope.nuevoMail = respuesta[key].mail;
            $scope.nuevaClave = respuesta[key].clave;
            $scope.nuevoId = respuesta[key].id;
          },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });
  };
    /*$http.get('http://www.eihwazzz.com/TPFinalServices/Datos/index.php/usuarios')
 	.then(function(respuesta) {     	
 		console.log(respuesta.data);
      	 $scope.ListadoPersonas = respuesta.data;
    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);
 	 });*/
   
})
.controller('templateAltaCtrl',function($scope,$http,$auth,$state){
	//subirimagen
	$scope.perfiles = [
			{name:'Administrador', id:1},
			{name:'Comprador', id:2},
			{name:'Vendedor', id:3},
		  ];
		  
	$scope.perfilSeleccionado = 'Vendedor';
	
	
   
  	$scope.producto={};
	$scope.producto.nombre= "UnSO" ;
	$scope.producto.porcentaje= "10" ;

 $scope.Guardar=function(){
    $http.post('../2ParcialServices/Datos/index.php/insertarproducto',{producto:$scope.producto})
      	.then(function(respuesta) {       
        console.log("Respuesta: "+respuesta.data);  
        $state.go('grilla');    
        //console.info("informe", item, response, status, headers);
        //$state.go('grilla');
    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log(response);           
    });
  };


})

.controller('templateModificarCtrl', function($scope, $http, $state,$stateParams) {
  

 
  
})

.controller('templateGrillaProductosCtrl', function($scope, $http,$auth, $state,ServiceGrillaProductos,$stateParams) {
	if(!$auth.isAuthenticated())
	    {
	      $state.go('login');
	    }

	    ServiceGrillaProductos.getproductos().then(function(respuesta){
	        $scope.ListadoProductos = respuesta;
	    },function(error) {
	    console.log('unable to get the data', error);
	  });

})
.controller('templateGrillaUsuariosCtrl', function($scope, $http,$auth, $state,FactoryGrillaUsuarios,$stateParams) {
	if(!$auth.isAuthenticated())
	    {
	      $state.go('login');
	    }

	    FactoryGrillaUsuarios.getusuarios().then(function(respuesta){
        $scope.ListadoPersonas = respuesta;
    },function(error) {
    console.log('unable to get the data', error);
  });
});