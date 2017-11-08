<?php

//=========================================================================================
// Config/Functions
//=========================================================================================
require "../../config.php";
require "../../functions.php";

//=========================================================================================
// Json Header
//=========================================================================================
header(JSON_HEADER);

//=========================================================================================
// Verifica se o mщtodo щ POST
//=========================================================================================
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	jsonStatus(2, "Mщtodo deve ser 'POST'");
}

//=========================================================================================
// Verifica a presenчa de uma query
//=========================================================================================
if (!isset($_POST['command'])) {
	jsonStatus(2, "Nenhum comando encontrado");
}

//=========================================================================================
// Verifica qual щ a query e direciona para a funчуo
//=========================================================================================
switch($_POST['command']) {

    case 'select':
		select();
	break;
	case 'totalGateway':
		totalGateway();
	break;
    case 'estoqueGateway':
         estoqueGateway();
    break;
    case 'estoqueCliente':
         estoqueCliente();
    break;
    case 'clienteGateway':
         clienteGateway();
    break;
    case 'desaparecidoGateway':
         desaparecidoGateway();
    break;
    case 'danificadoGateway':
         danificadoGateway();
    break;
    case 'totalListGateway':
         totalListGateway();
    break;
    case 'estoqueListGateway':
         estoqueListGateway();
    break;
    case 'clienteListGateway':
         clienteListGateway();
    break;
    case 'desaparecidoListGateway':
         desaparecidoListGateway();
    break;
    case 'danificadoListGateway':
         danificadoListGateway();
    break;
    case 'edit':
         edit();
    break;
	default:
		sendJson(statusJson(4, 'Nenhum commando reconhecido foi encontrado', ''), true);

}
function select(){
    $id = $_POST['id']; 
	
	$query = "select * from  equipamentos where id = '$id'";

    query($query);

}

function totalGateway(){
	
	$query = "select count(*) as total from  equipamentos";

    query($query);

}

function estoqueGateway(){
	
	$query = "select count(*) as total from  equipamentos where status = 'em estoque'";

    query($query);

}

function estoqueCliente(){
	
	$query = "select count(*) as total from  equipamentos where status = 'em estoque'";

    query($query);

}

function clienteGateway(){
	
	$query = "select count(*) as total from  equipamentos where status != 'em estoque' and status != 'desaparecido' and status != 'danificado'";

    query($query);

}

function desaparecidoGateway(){
	
	$query = "select count(*) as total from  equipamentos where status = 'desaparecido'";

    query($query);

}

function danificadoGateway(){
	
	$query = "select count(*) as total from  equipamentos where status = 'desaparecido'";

    query($query);

}

function totalListGateway(){
	
	$query = "select nome, mac, modelo, marcar, status, data, id from  equipamentos";

    query($query);

}

function estoqueListGateway(){
	
	$query = "select nome, mac, modelo, marcar, status, data from  equipamentos where status = 'em estoque'";

    query($query);

}

function clienteListGateway(){
	
	$query = "select nome, mac, modelo, marcar, status, data from  equipamentos where status != 'em estoque' and status != 'desaparecido' and status != 'danificado'";

    query($query);

}

function desaparecidoListGateway(){
	
	$query = "select nome, mac, modelo, marcar, status, data from  equipamentos where status = 'desaparecido'";

    query($query);

}

function danificadoListGateway(){
	
	$query = "select nome, mac, modelo, marcar, status, data from  equipamentos where status = 'danificado'";

    query($query);

}

function edit(){
    
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $mac = $_POST['mac'];
    $modelo = $_POST['modelo'];
    $marca = $_POST['marca'];
    $status = $_POST['status'];
	

	$query = "update equipamentos set nome = '$nome', mac = '$mac', modelo = '$modelo', marcar = '$marca', status = '$status' where id = '$id';";

    query($query);

}



