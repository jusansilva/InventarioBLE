<?php
//=========================================================================================
//
// REQUEST_METHOD GET/POST Functions 28/09/2017
//
//=========================================================================================


//=========================================================================================
// Get Data
//=========================================================================================
function get($field, $option = null) {
	
	if (gettype($field) != 'string') {
		jsonStatus(2, "function post() {, o parâmetro 'field' deve ser uma string");
		exit;
	}

	if ($_SERVER['REQUEST_METHOD'] != 'GET') {
		jsonStatus(2, "Método deve ser 'GET'");
		exit;
	}
	
	if (!isset($_GET[$field])) {
		return "";
	}

	if ($option == "checked") {
		return "checked";
	} else {
		return  $_GET[$field];
	}

}

//=========================================================================================
// Post Data
//=========================================================================================
function post($field, $option = null) {
	
	if (gettype($field) != 'string') {
		jsonStatus(2, "function post() {, o parâmetro 'field' deve ser uma string");
		exit;
	}

	if ($_SERVER['REQUEST_METHOD'] != 'POST') {
		jsonStatus(2, "Método deve ser 'POST'");
		exit;
	}
	
	if (!isset($_POST[$field])) {
		return "";
	}

	if ($option == "checked") {
		return "checked";
	} else {
		return  $_POST[$field];
	}

}
?>