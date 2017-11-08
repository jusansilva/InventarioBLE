//=========================================================================================
// Log/Debug CONSTANT
//=========================================================================================
const ENABLE_LOG = 1;
const ENABLE_DEBUG = 0;
const NO_RESULTS = "Nenhum resultado encontrado";

//=========================================================================================
// Custom Console Log
//=========================================================================================
function clog(log) {
	if (ENABLE_LOG) console.log(log);
}

//=========================================================================================
// Custom Console Debug
//=========================================================================================
function cdebug(log) {
	if (ENABLE_DEBUG) console.log(log);
}

//=========================================================================================
// getDate() Hoje
//=========================================================================================
function hoje(format) {

	var date = new Date();
	var day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
	var month = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
	var year = date.getFullYear();
	var fulldate = '';

	switch(format) {
		
		case 'DDMMYYYY':
			fulldate = day + '' + month + '' + year;
		break;
		case 'DD-MM-YYYY':
			fulldate = day + '-' + month + '-' + year;
		break;
		case 'DD/MM/YYYY':
			fulldate = day + '/' + month + '/' + year;
		break;

		case 'YYYYMMDD':
			fulldate = year + '' + month + '' + day;
		break;
		case 'YYYY-MM-DD':
			fulldate = year + '-' + month + '-' + day;
		break;
		case 'YYYY/MM/DD':
			fulldate = year + '/' + month + '/' + day;
		break;
		default:
			fulldate = year + '' + month + '' + day;

	}

	return fulldate;

}

//=========================================================================================
// Window Events
//=========================================================================================
window.onload = resizer();
window.addEventListener("resize", resizer);
window.addEventListener("submit", submit);

//=========================================================================================
// Reload No Cache
//=========================================================================================
function nochace() {
	window.location.reload(true);
}

//=========================================================================================
// Show Password
//=========================================================================================
function showPassword(input) {
	if (input) input.type = "text";
}

//=========================================================================================
// Hide Password
//=========================================================================================
function hidePassword(input) {
	if (input) input.type = "password";
}

//=========================================================================================
// On Submit
//=========================================================================================
function submit(e) {

	e.preventDefault();

	var form = e.target;

	if (!form) {

		clog("submit(e) {\nNenhum formulário encontrado");
		return;

	}

	var url = form.action;

	if (!url) {

		clog("submit(e) {\nNenhuma url encontrada");
		return;

	}

	var command = form.getAttribute("data-command");

	if (!command)
		command = "salvar";

	cdebug("Database URL: " + url + "\nCommand: " + command);

	var data = $(form).serialize();

	if (data) {

		data = "command=" + command + "&" + data;
		cdebug("Form Serialized: " + data);

		ajaxPost(data, url);

	} else {

		clog("submit(e) {\nNenhuma informação encontrada no formulário");

	}

}

//=========================================================================================
// Hide By ID
//=========================================================================================
function hide(id) {

	byid(id).style.display = "none";

}

//=========================================================================================
// Search Box
//=========================================================================================
function search() {

	var str = byid("search").value;

	if (str.length > 2) {

		byid("search-box").style.display = "block";

	}

}

//=========================================================================================
// Open Menu
//=========================================================================================
function openMenu() {

	byid("menu").style.width = "250px";

}

//=========================================================================================
// Close Menu
//=========================================================================================
function closeMenu() {

	byid("menu").style.width = "0px";

}

//=========================================================================================
// Resizer
//=========================================================================================
function resizer() {

	var w = window.innerWidth;

	if (w <= 1140) responsive("xs", true); else responsive("xs", false);

	if (w <= 960) responsive("lg", true); else responsive("lg", false);

	if (w <= 720) responsive("md", true); else responsive("md", false);

	if (w <= 540) responsive("sm", true); else responsive("sm", false);

}

//=========================================================================================
// Responsive
//=========================================================================================
function responsive(classname, active) {

	var obj = byclass(classname);

	if (obj.length > 0) {

		if (active) {

			for (var i=0; i < obj.length; i++) {
				
				if (!obj[i].hasAttribute("maximized")) {

					var tag = obj[i].tagName;

					if (tag == "DIV") {

						obj[i].style.display = "block";
						obj[i].style.textAlign = "left";

					}

					obj[i].style.width = "100%";
					obj[i].style.marginLeft = "0px";
					obj[i].setAttribute("responsive","");

				}

			}

		} else {

			for (var i=0; i < obj.length; i++) {
				
				if (!obj[i].hasAttribute("maximized")) {

					obj[i].style = null;
					obj[i].removeAttribute("responsive");
					
				}

			}

		}

	}

}

//=========================================================================================
// Select Element By ID
//=========================================================================================
function byid(id) {

	return document.getElementById(id);

}

//=========================================================================================
// Select Element By ClassName
//=========================================================================================
function byclass(classname) {

	return document.getElementsByClassName(classname);

}

//=========================================================================================
// Select THEAD by TABLE
//=========================================================================================
function thead(el) {

	if (typeof el == "string")
		return document.getElementById(el).getElementsByTagName('thead')[0];

	else if (typeof el == "object")
		return el.getElementsByTagName('thead')[0];

	else 
		return false;

}

//=========================================================================================
// Select TBODY by TABLE
//=========================================================================================
function tbody(el) {

	if (typeof el == "string")
		return document.getElementById(el).getElementsByTagName('tbody')[0];

	else if (typeof el == "object")
		return el.getElementsByTagName('tbody')[0];

	else 
		return false;

}

//=========================================================================================
// Ajax Query
//=========================================================================================
function ajaxPost(data, url) {

	if (typeof data != "string") {

		alertModal("ajaxPost(data, url) {\nO parâmetro 'data' deve ser uma 'string'", "Erro do Sistema");
		return;

	}

	if (typeof url != "string") {

		alertModal("ajaxPost(data, url) {\nO parâmetro 'url' deve ser uma 'string'", "Erro do Sistema");
		return;

	}

	$.ajax({
		url: url,
		method: 'POST',
		cache: false,
		dataType: 'json',
		data: data,
		beforeSend: function() {
			beforeSend();
		},
		error: function(data) {
			afterSend();
			dataError(data);
		},
		success: function(data) {
			afterSend();

			switch (data.status) {

				case 0:
					dataSuccess(data.results);
				break;
				case 1:
					dataWarning(data.msg);
				break;
				case 2:
					dataError(data.msg);
				break;
				default:
					dataInvalid(data);

			}

		}
	});

}

//=========================================================================================
// Ajax Query
//=========================================================================================

function ajaxQuery(ajaxData, ajaxFunctions) {
   
	if (typeof ajaxData == "object") {

		if (typeof ajaxData.url != "string") {

            alertModal("ajaxQuery(ajaxData, ajaxFunctions) {\n'ajaxData.url' não está definido", "Erro do Sistema");
			return;

		}
		
		if (typeof ajaxData.command != "string") {

			alertModal("ajaxQuery(ajaxData, ajaxFunctions) {\n'ajaxData.command' não está definido", "Erro do Sistema");
			return;

		}

	} else {

		alertModal("ajaxQuery(ajaxData, ajaxFunctions) {\nO parâmetro 'ajaxData' deve ser do tipo 'object'", "Erro do Sistem");
		return;

	}

	//Custom Functions
	if (typeof ajaxFunctions == "object") {

		var success	= (typeof ajaxFunctions.success	== 'function') ? ajaxFunctions.success	: dataSuccess;
		var	warning	= (typeof ajaxFunctions.warning	== 'function') ? ajaxFunctions.warning	: dataWarning;
		var error	= (typeof ajaxFunctions.error	== 'function') ? ajaxFunctions.error	: dataError;
		var invalid	= (typeof ajaxFunctions.invalid	== 'function') ? ajaxFunctions.invalid	: dataInvalid;
		var id 		= ajaxFunctions.id || '';

	//Default Functions
	} else {

		var success	= dataSuccess;
		var warning	= dataWarning;
		var error	= dataError;
		var invalid	= dataInvalid;
		var id 		= '';

    }
    
	// Star Time
	var startTime = new Date();

    $.ajax({
		url: ajaxData.url,
		method: 'POST',
		cache: false,
		dataType: 'json',
		data: ajaxData,
		beforeSend: function() {
            beforeSend();
            
		},
		error: function(data) {
			afterSend();
            dataError(data);
           

		},
		success: function(data) {

			// End Time
			var endTime = ((new Date() - startTime) / 1000) + " seg.";
			clog(endTime);

			afterSend();

			switch (data.status) {

				case 0:
					success(data.results, id);
				break;
				case 1:
					warning(data.msg);
				break;
				case 2:
					error(data.msg);
				break;
				default:
					invalid(data);

			}

		}

	});
    

}

//=========================================================================================
// Ajax Before Send
//=========================================================================================
function beforeSend() {
}

//=========================================================================================
// Ajax After Send
//=========================================================================================
function afterSend() {

}

//=========================================================================================
// Ajax Data Success
//=========================================================================================
function dataSuccess(data) {

	console.log(data);
   

}

//=========================================================================================
// Ajax Data Warning
//=========================================================================================
function dataWarning(data) {

	alertModal(data, "Aviso do Sistema");

}

//=========================================================================================
// Ajax Data Error
//=========================================================================================
function dataError(data) {

	alertModal(data, "Erro do Sistema");

}

//=========================================================================================
// Ajax Data Invalid
//=========================================================================================
function dataInvalid(data) {

	alertModal(data, "Falha Crítica do Sistema");

}

function boxMinimize(btn) {

	var box = btn.parentElement.parentElement;
	var icon = btn.firstChild;
	var className = icon.className;

	if (className == "fa fa-chevron-up") {

		icon.className = "fa fa-chevron-down";
		box.style.height = "42px";

	} else {

		icon.className = "fa fa-chevron-up";
		box.style.height = null;

	}

}

function boxMaximize(btn, canvas) {

	var col = btn.parentElement.parentElement.parentElement;
	var icon = btn.firstChild;

	if (!col.hasAttribute("responsive")) {

		if (col.hasAttribute("maximized")) {

			col.style = null;
			icon.className = "fa fa-chevron-right";
			col.removeAttribute("maximized");

		} else {

			col.style.display = "block";
			col.style.width = "100%";
			col.style.marginLeft = "0px";
			icon.className = "fa fa-chevron-left";
			col.setAttribute("maximized", "");

		}

	}

	if (typeof canvas == "string") {

		try {

			window[canvas].resize();

		} catch(e) {

			console.warn("'" + canvas + "'" + " não é um gráfico válido.\n" + e);

		}

	}

}

function boxClose(btn) {

	var box = btn.parentElement.parentElement;
	box.style.display = "none";

}

function menuLink(group, session, page) {

	if (typeof group == "string" || typeof session == "string" || typeof page == "string") {

		byid("menu").style.width = "0";

		var url = "?g=" + group + "&s=" + session + "&p=" + page;

		setTimeout(function() {

			location.href = url;

		}, 500);

	}

}

function link(group, session, page) {

	if (typeof group == "string" || typeof session == "string" || typeof page == "string") {

		var url = "?g=" + group + "&s=" + session + "&p=" + page;
		location.href = url;

	}

}

//=========================================================================================
// Get Data: Object[Key] Validation
//=========================================================================================
function getdata(object, key, option) {

	if (typeof object !=  'object') {

		clog('function getdata(object, key, option){\nPrimeiro parâmetro não é um object');
		return;

	}

	if (typeof key !=  'string') {

		clog('function getdata(object, key, option){\nSegundo parâmetro não é uma string');
		return;

	}

	if (key in object) {

		value = object[key];

	} else {

		clog('function getdata(array, string, option){\nA key ' + key + ' não existe no object');
		return '';

	}
	
	if (option == 'strong' || option == 'bold') {

		value = '<strong>' + (value || '') + '</strong>';

	} else if (option == 'mac' && value.length == 12) {

		value = value.substr(0,2) + ":" + value.substr(2,2) + ":" + value.substr(4,2) + ":" + value.substr(6,2) + ":" + value.substr(8,2) + ":" + value.substr(10,2);

	}

	return (value || '');

}

//=========================================================================================
// Open Modal
//=========================================================================================
function openModal(param) {

	if (typeof param == 'string') {

		var element = byid(param);

		if (element)
			element.style.display = "block";	

	} else if (typeof param == 'object') {

		param.style.display = "block";

	} else {

		var element = byid('modal');

		if (element)
			element.style.display = "block";

	}

}

//=========================================================================================
// Close Modal
//=========================================================================================
function closeModal(param) {

	if (typeof param == 'object') {

		var element = param.target;

		if (element) {

			var close = element.hasAttribute('close-modal');

			if (close)
				element.style.display = "none";

		}

	} else if (typeof param == 'string') {

		var element = byid(param);

		if (element)
			element.style.display = "none";

	}

}

//=========================================================================================
// Alert Modal
//=========================================================================================
function alertModal(msg, title) {
	

	if (msg && typeof title == 'string') {

		if (msg.responseText)
			msg = msg.responseText;

		clog(title);
		clog(msg);

		var modal = byid('modal-alert');

		if (modal) {

			var header = byid('modal-alert-header');
			var content = byid('modal-alert-content');

			if (header && content) {

				header.innerText = title;
				content.innerText = msg;

				openModal(modal);

			}

		}

	} else {

		clog("alertModal(msg, title) {\n'msg' deve estar definida\n'title' deve ser uma string");

	}

}

//=========================================================================================
// Check For Mobile Devices
//=========================================================================================
function ismobile() {
	
	if (navigator.userAgent) {

		var devices = ["Android", "iPhone", "iPad", "iPod", "Windows Phone"];
		var match = false;

		for (var i=0; i < devices.length; i++) {

			if (navigator.userAgent.match(devices[i])) {
				match = true;
			}

		}

		return match;
	
	} else {

		return false;

	}

}