
<!DOCTYPE html>
<html lang="pt-br">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">


     <title>Sistema ItechMed</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">
	<!-- Font Awesome CSS -->
    <link href="css/font-awesome.css" rel="stylesheet">
    <!-- Menu CSS -->
    <link href="css/menu.css" rel="stylesheet">
	<!-- Login CSS -->
    <link href="css/login.css" rel="stylesheet">
	<!-- Manifest -->
	<link rel="manifest" href="manifest.json">
    
</head>

<!-- Body -->
<body>

	<div id="bgcolor" class="bgcolor">
	</div>

	<div id="bg" class="bg animation-in">
	<div class="login-body">

		<div id="login-form" class="login-form">

			<div class="title"><center>ItechMed</center></small></span></div>

			<hr id="hr">

			<!-- form -->
			<form id="form" rule="form" autocomplete="off">
				<input type="hidden" id="command" name="command" value="select">
				<div class="input-group">
					<span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
					<input type="text" name="user" id="user" class="form-control" placeholder="LOGIN" aria-describedby="basic-addon1">
				</div>
				<br>
				<div class="input-group">
					<span class="input-group-addon" id="basic-addon1"><i class="fa fa-unlock"></i></span>
					<input type="password" name="password" id="password"  class="form-control" placeholder="SENHA" aria-describedby="basic-addon1">
				</div>
				<span id='mensagem'></span>
				
				<button type="submit" id="login" class="login">LOGIN</button>
			</form>
			<!-- /form -->

		</div>
		

	</div>
	</div>


    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.js"></script>
	
    <!-- Login JavaScript -->
    <script src="pages/modulos/login/login.js"></script>

	<!-- Core JavaScript -->
	<script src="js/main.js"></script>

	

	<!-- Sessão JavaScript -->
	<script id="session" name="login" data-page="login"></script>
	
	
</body>
<!-- Body -->

</html>
