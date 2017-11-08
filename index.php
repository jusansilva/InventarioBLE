<?php

    header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
    header("Pragma: no-cache"); // HTTP 1.0.
    header("Expires: 0"); // Proxies.

   session_start();
//if((!isset ($_SESSION['nome']) == true) and (!isset ($_SESSION['permissao']) == true))
//{
//    unset($_SESSION['nome']);
//    unset($_SESSION['permissao']);
//    header("location:login.php");
//}   
//$logado = $_SESSION['nome'];

  
	if (isset($_GET["s"]) && isset($_GET["p"])) {

		
		$session = $_GET["s"];
		$page = $_GET["p"];

        
	} else {

		$fx = true;
       
        $session = 'production';
        $page = 'form'; 

	}
      $url = "$session/$page.html";
    $ok = is_file($url);

    if(isset($_GET['destroy'])){    
        session_start(); 
        session_destroy(); 
        header("location:login.php");
    } 


    function page_content($ok, $url) {

        if ($ok)include($url);
        else echo "<h2>A p?gina solicitada n?o existe</h2>";

    }


    function customcss($ok, $session, $page) {
        
        if($ok && $session == 'dashboard' && $page == 'dash_setores'){
            echo "<link href=\"css/customBlack.css\" rel=\"stylesheet\">";
        }
    }

    function fromlogin() {

        if (isset($_SESSION["fx"]) && $_SESSION["fx"] == true) {
            
            $_SESSION["fx"] = false;
            echo "<div class=\"bgcolor animation-home\"></div>";

        }

    }
 ?>       
       
        
                        <?php page_content($ok, $url); ?>
       
      