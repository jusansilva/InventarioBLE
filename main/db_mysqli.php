<?php
//=========================================================================================
//
// MYSQLI Database Functions 28/09/2017
//
//=========================================================================================


//=========================================================================================
// MYSQLI Database Open Connection
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
// MYSQLI Database Close Connection
//=========================================================================================
function closeDB($connection) {

	if (gettype($connection) == "object")
		mysqli_close($connection);

}

//=========================================================================================
// MYSQLI Database Fetch Results
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
// MYSQLI Database Free Results
//=========================================================================================
function freeResults($results) {

	if (gettype($results) == "object")
		mysqli_free_result($results);

}

//=========================================================================================
// MYSQLI Database SQL Query
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

		//SELECT
		if (gettype($results) == "object") {

			$data = fetchResults($results);
			freeResults($results);

		//INSERT, UPDATE, DELETE
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

		//SELECT
		if (gettype($results) == "object") {

			if (gettype($param) == "string") {

				$data = fetchResults($results);
				jsonApp($data, $param);

			} else {

				$data = fetchResults($results);

			}

			freeResults($results);

		//INSERT, UPDATE, DELETE
		} else {

			$data = mysqli_affected_rows($connection);

		}

		closeDB($connection);

		jsonStatus(0, "Sucesso", $data);

	}

}
?>