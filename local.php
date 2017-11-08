<?php

	function query() {

	}

	echo "================================================================================================<br>";
	echo "Database Extensions<br>";
	echo "================================================================================================<br>";

	echo "mysqli:\t\t"	 . (extension_loaded("mysqli") ? "Instalado" : "Não Instalado") . "<br>";
	echo "sqlsrv:\t\t" 	 . (extension_loaded("sqlsrv") ? "Instalado" : "Não Instalado") . "<br>";
	echo "mssql:\t\t" 	 . (extension_loaded("mssql") ? "Instalado" : "Não Instalado") . "<br>";
	echo "odbc:\t\t" 	 . (extension_loaded("odbc") ? "Instalado" : "Não Instalado") . "<br>";
	echo "pdo_odbc:\t" 	 . (extension_loaded("pdo_odbc") ? "Instalado" : "Não Instalado") . "<br>";
	echo "pdo_sqlsrv:\t" . (extension_loaded("pdo_sqlsrv") ? "Instalado" : "Não Instalado") . "<p>";
	
	echo "================================================================================================<br>";
	echo "Database Connection<br>";
	echo "================================================================================================<br>";

    $serverName = "localhost\SQLEXPRESS";
    $database = "BSPRINT";
    $uid = 'sa';
    $pwd = 'bs@pr!nt146';

    try {

		$conn = new PDO( "sqlsrv:server=$serverName; Database=$database; ConnectionPooling=0", $uid, $pwd);

		$conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		
		echo "<p>Connected to SQL Server</p>\n";

		echo "<p>PDO::ATTR_PERSISTENT value:</p>\n";

		echo "<pre>";
		echo var_export($conn->getAttribute(PDO::ATTR_PERSISTENT), true);
		echo "</pre>";

		echo "<p>PDO::ATTR_DRIVER_NAME value:</p>\n";

		echo "<pre>";
		echo var_export($conn->getAttribute(PDO::ATTR_DRIVER_NAME), true);
		echo "</pre>";

		echo "<p>PDO::ATTR_CLIENT_VERSION value:</p>\n";

		echo "<pre>";
		echo var_export($conn->getAttribute(PDO::ATTR_CLIENT_VERSION), true);
		echo "</pre>";

		$query = "select top 5 * from estudoes";
		//$query = "delete from estudoes where IdEstudo = '500000000'";
		//$query = "select TABLE_NAME, COLUMN_NAME, DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where TABLE_CATALOG = '$database'";
		//$stmt = $conn->query($query);

		$stmt = $conn->prepare($query);
		$stmt->execute();

		if ($stmt->columnCount () == 0) {

			printf ("UPDATE, INSERT, DELETE: %d\n<br>", $stmt->rowCount ());

		} else {

			echo "SELECT<br>";

		}
		
		echo "<pre>";
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			print_r($row);
		}
		echo "</pre><p>";

		$stmt = null;
		$conn = null;

    } catch(PDOException $e) {

        echo "<br>Error connecting to SQL Server:<br>" . $e->getMessage() . "<p>";

    }

	echo "================================================================================================<br>";
	echo "Loaded Extensions<br>";
	echo "================================================================================================<br>";

	foreach(get_loaded_extensions() as $child) {

		echo $child . "<br>";

	}

?>