	//=========================================================================================
	// Menu
	//=========================================================================================
    $("#menu-toggle").click( function(e) {

        e.preventDefault();
        $("#wrapper").toggleClass("toggled");

    });
	
	function menu(url) {

        $("#wrapper").removeClass("toggled");
		$("#full_content").css('opacity','0');

		setTimeout(function(){ window.location.href = url; }, 500);

	}