<?php

// Remover essa função ao habilitar o mbstring
//function mb_strtoupper($str) {
//    return $str;
//}

//=========================================================================================
// Debug
//=========================================================================================
function dblog($string, $clean) {

	$filename = 'database_log_' . date('YmdH') . '.txt';
	$datetime = date('d/m/Y H:i:s') . ' ';

	$BOM = "\xEF\xBB\xBF"; // UTF-8

	if (gettype($string) == 'string') {

		if ($clean) {

			file_put_contents($filename, $BOM . $datetime . $string . PHP_EOL);

		} else {

			file_put_contents($filename, $datetime . $string . PHP_EOL, FILE_APPEND);

		}

	} else {

		file_put_contents($filename, 'dblog(string, clean) {: O primeiro parâmetro não é uma string' . PHP_EOL, FILE_APPEND);

	}

}

//=========================================================================================
//
// JSON Functions
//
//=========================================================================================

//=========================================================================================
// JSON Status
//=========================================================================================
function jsonStatus($status, $msg, $data = null) {

	if (gettype($status) != "integer") {

		$json = array("status" => 2, "msg" => "JSON 'status' deve ser uma 'integer'");
		echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
		exit;

	// 0-Sucesso 1-Alerta 2-Erro 
	} else if ($status < 0 || $status > 2) {

		$json = array("status" => 2, "msg" => "JSON 'status' permitidos: 0-2");
		echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
		exit;

	}

	if (gettype($msg) != "string") {

		$json = array("status" => 2, "msg" => "JSON 'msg' deve ser uma 'string'");
		echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
		exit;

	}

	$json = array("status" => $status, "msg" => $msg, "results" => $data);
	echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
	exit;

}

//=========================================================================================
// JSON App
//=========================================================================================
function jsonApp($data, $group = null) {

	if (gettype($data) != "array") {

		$json = array("status" => 2, "msg" => "JSON 'data' deve ser uma 'array'");
		echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
		exit;

	}

	if (gettype($group) != "string") {

		echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
		exit;

	}

	$json[$group] = $data;
	echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
	exit;

}

//=========================================================================================
//
// Database Functions
//
//=========================================================================================

//=========================================================================================
// Post
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

//=========================================================================================
// Database Open Connection
//=========================================================================================
function openDB() {

	if (DB_ACTIVE == 'PRODUCTION') {

		$connection = mysqli_connect(DB_PRODUCTION, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

	} else {

		$connection = mysqli_connect(DB_DEVELOPMENT, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

	}

	if (!$connection) {
		dblog(SQL_NO_CONNECTION);
		jsonStatus(2, SQL_NO_CONNECTION);
	}

	if (mysqli_connect_errno()) {
		dblog(mysqli_connect_errno() . ' ' . mysqli_connect_error());
		jsonStatus(2, mysqli_connect_error());
	}

	return $connection;

}

//=========================================================================================
// Database Close Connection
//=========================================================================================
function closeDB($connection) {

	if (gettype($connection) == "object")
		mysqli_close( $connection);

}

//=========================================================================================
// Database Fetch Results
//=========================================================================================
function fetchResults($results) {

	if (gettype($results) == "object") {

		$arr = [];

		while ($row = mysqli_fetch_assoc($results)) {

			$arr[] = $row;

		}

		return $arr;

	} else {

		dblog("fetchResults: o tipo " . gettype($results) . " não é suportado");
		jsonStatus(2, "fetchResults: o tipo " . gettype($results) . " não é suportado");

	}

}

//=========================================================================================
// Fetch Results
//=========================================================================================
function fetch($result) {

	while ($array = mysqli_fetch_assoc($result)) {

		$json[] = $array;

	}

	return $json;

}

//=========================================================================================
// Database Free Results
//=========================================================================================
function freeResults($results) {

	if (gettype($results) == "object")
		mysqli_free_result($results);

}

//=========================================================================================
// SQL Select Connection
//=========================================================================================

function sqlSelect($query) {

	// Connection
	$connection = openDB();

	// Execute sql query
	$result = querySelect($connection, $query);
	
	// Fetch result to Json
	$json['result'] = fetch($result);
	
	//Success
	$json += jsonStatus(0, SQL_RESULTS_OK, '');

	freeResults($result);

	// Close sql connection
	closeDB($connection);

	sendJson($json, true);
	//return $result;

}

//=========================================================================================
// SQL Select Query
//=========================================================================================
function querySelect($connection, $query) {

	$maxconcat = "SET SESSION group_concat_max_len=4294967295";
	
	mysqli_query($connection, $maxconcat);
	
	$result = mysqli_query($connection, $query);

	if (mysqli_error($connection))
		sendJson(statusJson(2, mysqli_error($connection), mysqli_errno($connection)), true);

	if (mysqli_num_rows($result) == 0)
		sendJson(statusJson(1, SQL_RESULTS_EMPTY, ''), true);

	return $result;

}
//=========================================================================================
// Database SQL Query
//=========================================================================================
function query($query, $param = null, $option = null) {
	
	if (gettype($query) != "string") {
		dblog("query: o tipo " . gettype($query) . " não é suportado");
		jsonStatus(2, "query: o tipo " . gettype($query) . " não é suportado");
	}

	//Com conexão aberta
	if (gettype($param) == "object") {

		$results = mysqli_query($param, $query);

		if (mysqli_error($param)) {

			if ($option == "skip_errors")
				$data = false;
			else {
				dblog(mysqli_error($param));
				jsonStatus(2, mysqli_error($param));
			}
		}

		if (gettype($results) == "object") {

			$data = fetchResults($results);
			freeResults($results);

		} else {

			$data = mysqli_affected_rows($param);

		}

		return $data;

	//Sem conexão aberta
	} else {

		$connection = openDB();

		$results = mysqli_query($connection, $query);

		if (mysqli_error($connection)) {
			dblog(mysqli_error($connection));
			jsonStatus(2, mysqli_error($connection));
		}

		if (gettype($results) == "object") {

			if (gettype($param) == "string") {

				$data = fetchResults($results);
				jsonApp($data, $param);

			} else {

				$data = fetchResults($results);

			}

			freeResults($results);

		} else {

			$data = mysqli_affected_rows($connection);

		}

		closeDB($connection);

		jsonStatus(0, "Sucesso", $data);

	}

}

?>
