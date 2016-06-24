<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require '../vendor/autoload.php';
require '../PHP/clases/AccesoDatos.php';
include_once '../PHP/clases/JWT.php';
include_once '../PHP/clases/ExpiredException.php';
include_once '../PHP/clases/BeforeValidException.php';
include_once '../PHP/clases/SignatureInvalidException.php';
include_once '../PHP/clases/Usuario.php';
include_once '../PHP/clases/productos.php';

 header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Headers: Origin, X-Requested-With, text/plain, Content-Type, Accept, X-ACCESS_TOKEN, Access-Control-Allow-Origin, application/x-www-form-urlencoded, Authorization,Engaged-Auth-Token'); 
/*
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});
$app->post('/insertarproducto[/]', function($request, $response, $args) {
    $body = $request->getBody();
    //$objDatos = json_decode(file_get_contents("php://input"));
    //Cualquiera de los 2 sirve :)
    $input = json_decode($body); 
        $ultimoId = Producto::InsertarProducto($input->producto);
        $answer = array( 'answer' => 'Producto Ingresado!' );
        $json = json_encode( $answer );
        return $json;    
});
$app->delete('/borrarproducto[/{idproducto}]', function ($request, $response, $args) {
    //ARREGLAR EL METODO BORRARADMINISTRADOR ME PARECE QUE ES
    //var_dump();
    $body = $request->getBody();
    //var_dump($body);
    $input = json_decode($body); 
    //var_dump($input->idusuario->data);
    $objDatos = json_decode(file_get_contents("php://input"));
    //var_dump($args['iduser']);
    Producto::BorrarProducto($args['idproducto']);

    echo $args['idproducto'];
});
$app->post('/subirimagen[/]', function ($request, $response, $args) {


});
$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');

$app->get('/getusuarios[/]', function ($request, $response, $args) {
	
        $listado = Paciente::TraerTodosLosPacientes();
        return json_encode($listado);

});

$app->get('/productos[/]', function ($request, $response, $args) {
	$listado = Producto::TraerTodosLosProductos();
	return json_encode($listado);
});
$app->get('/usuarios[/]', function ($request, $response, $args) {
    $listado = Usuario::TraerTodosLosUsuarios();
    return json_encode($listado);
});


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
