<?php
include_once 'JWT.php';
include_once 'ExpiredException.php';
include_once 'BeforeValidException.php';
include_once 'SignatureInvalidException.php';
include_once 'Usuario.php';
include_once 'productos.php';


header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
/*header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');*/



$objDatos = json_decode(file_get_contents("php://input"));

$persona = Usuario::TraerUnUsuario($objDatos->mail, $objDatos->clave);

if ($persona->id == false){
	// header('HTTP/1.1 401 Usuario o clave incorrecto');
	// header('url=clave.html');
	echo false;
}
else{


$token = array(
		    "id" => $persona->id,
		    "mail" => $persona->correo,
		    "nombre" => $persona->nombre,
		    "tipo" => $persona->tipo,
		     "exp" => time() + 900
		    // "iat" => 1356999524,
		    // "nbf" => 1357000000
		    		);

		 $token = Firebase\JWT\JWT::encode($token, 'tokenMed');
		
		$array['tokenMed'] = $token;

	//$auth = new Auth($idUser);

	echo json_encode($array);
}
