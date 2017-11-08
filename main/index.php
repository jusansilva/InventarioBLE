<?php

require '../config.php';
require 'logs.php';
require 'json.php';
require 'getpost.php';
require 'db_mysqli.php';
require 'db_pdo_sqlsrv.php';
require 'connection_bsprint.php';

echo '<pre>';

//MYSQL
$connection = openDB();
$mysql_query = "select * from beacons limit 1";
$results['mysqli'] = query($mysql_query, $connection);

//SQLSERVER
$connection = sqlserver_openDB();
$sqlserver_query = "select top 1 * from estudoes";
$results['sqlserver'] = sqlserver_query($sqlserver_query, $connection);

print_r($results);

echo '</pre>';
?>