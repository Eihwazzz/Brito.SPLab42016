app.factory('FactoryGrillaProductos', function($http,$q){
  var productos = function(){
   var defer3 = $q.defer();
     $http.get('../2ParcialServices/Datos/index.php/productos').then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
  
    return{
      getproductos: productos,
    };
});
app.service('ServiceGrillaProductos', function($http,$q){
  var productos = function(){
   var defer3 = $q.defer();
     $http.get('../2ParcialServices/Datos/index.php/productos').then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
  
    return{
      getproductos: productos,
    };
});
app.factory('FactoryGrillaUsuarios', function($http,$q){
  var usuarios = function(){
   var defer3 = $q.defer();
     $http.get('../2ParcialServices/Datos/index.php/usuarios').then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
  
    return{
      getusuarios: usuarios,
    };
});