	//=========================================================================================
	//
	// Ajax Select
	//
	//=========================================================================================
	function _select(elements) {
		
		// Set variables ==============================
		var data = {
			command: 'select'
		};

		var functions =	{
			success: createList
		};

		if (typeof elements != 'object') {

		elements = {
			loading: $('#loading'),
		}

		}
		// Set variables ==============================

		ajaxRequest(elements, data, functions);

	}

	//=========================================================================================
	//
	// Ajax Select Form
	//
	//=========================================================================================
	function _selectform(elements) {

		// Set variables ==============================
		var data = {
			command: 'selectform'
		};

		var functions =	{
			success: createForm,
			callback: _selectid
		};

		if (typeof elements != 'object') {
		
		elements = {
			loading: $('#loading'),
			disable: $('#salvar')
		}
		
		}
		// Set variables ==============================

		ajaxRequest(elements, data, functions);

	}

	//=========================================================================================
	//
	// Ajax Select ID
	//
	//=========================================================================================
	function _selectid(elements) {

		var id = location.search.split('id=')[1] || '';

		if (id) {

			$("#command").val('update');
			$("#id").val(id);

			// Set variables ==============================

				var data = {
					command: 'selectid',
					id: id
				};

				var functions =	{
					success: loadForm
				};

				if (typeof elements != 'object') {

				elements = {
					loading: $('#loading'),
					disable: $('#salvar')
				}

			}
			// Set variables ==============================

			ajaxRequest(elements, data, functions);

		}

	}

	//=========================================================================================
	//
	// Ajax Insert
	//
	//=========================================================================================
	function _insert(elements) {

		// Set variables ==============================
		var data =  $('#form').serialize();
		
		if (typeof elements != 'object') {

			elements = {
				loading: $('#loading'),
				disable: $('#salvar')
			}

		}
		// Set variables ==============================

		ajaxRequest(elements, data);

	}
	
	//=========================================================================================
	//
	// Ajax Delete
	//
	//=========================================================================================
	function _delete(button) {

		// Set variables ==============================
		var session = $("#session").attr('name');

		var data =	{
			command: 'delete',
			id: button.id
		};
		
		var elements = {
			loading: $('#loading'),
			disable: $(button),
			remove: $(button).closest('tr')

		}
		// Set variables ==============================

		ajaxRequest(elements, data);

	}

	//=========================================================================================
	//
	// Ajax Request Core
	//
	//=========================================================================================
	function ajaxRequest(elements, data, functions) {

        var session = $("#s").attr('name');
        var grupo = $("#g").attr('name');

		$.ajax({			
            url: 'pages/' + grupo + "/" + session + '/database.php',
			method: 'post',
			cache: false,
			dataType: 'json',
			data: data,
			beforeSend: function() {
				
				$('#alert-success').hide();
				$('#alert-warning').hide();
				$('#alert-danger').hide();

				console.log('Enviando solicitação...');

				if (typeof elements == 'object') {
			
					if (typeof elements.loading == 'object')
						elements.loading.removeClass('hidden');
					
					if (typeof elements.disable == 'object')
						elements.disable.prop("disabled", true);

				}

			},
			error: function(e) {			
				
				console.error(e);

				if (typeof elements == 'object') {
			
					if (typeof elements.loading == 'object')
						elements.loading.addClass('hidden');
					
					if (typeof elements.disable == 'object')
						elements.disable.prop("disabled", false);

				}

				$('#alert-danger').show();
				$("#full_content").css('opacity','1');

			},
			success: function(data) {

				switch(data['status'].code) {
					
					// Success
					case 0:
					
						console.log(data['status'].msg);

						if ($('#form') && $('#session').attr('data-page') != 'vincular') {

							//$('#form').trigger('reset');

						}

						if (typeof functions == 'object' && typeof functions.success == 'function') {
							functions.success(elements, data['result'], functions.callback);
							(elements.loading) ? elements.loading.addClass('hidden') : '';							
							console.log('Pronto!');

						} else {

							if (typeof elements == 'object') {

								if (typeof elements.loading == 'object')
										elements.loading.addClass('hidden');

								if (typeof elements.disable == 'object')
										elements.disable.prop("disabled", false);

								if (typeof elements.remove == 'object') {
										elements.remove.remove();
								}

							}

							$('#alert-success').show(); 

						}

					break;

					// No Results
					case 1:
					
						if (typeof functions == 'object' && typeof functions.success == 'function') {

							functions.success(elements, data['result'], functions.callback);
							(elements.loading)? elements.loading.addClass('hidden'): '';
							console.log('Pronto!');
						} else {

							console.log(data['status'].msg);							

							if (typeof elements == 'object') {

								if (typeof elements.loading == 'object')
									elements.loading.addClass('hidden');
									$("#full_content").css('opacity','1');

								if (typeof elements.disable == 'object')
									elements.disable.prop("disabled", false);
									
							}						
						}

					break;

					// Warning
					case 2:

						console.warn(data['status'].msg);

						if (data['status'].error == 1062) $('#alert-warning').show();
							else $('#alert-danger').show();

						if (typeof elements == 'object') {

							if (typeof elements.loading == 'object')
								(elements.loading)? elements.loading.addClass('hidden'): '';
								$("#full_content").css('opacity','1');

							if (typeof elements.disable == 'object')
								elements.disable.prop("disabled", false);

						}

					break;

					// Error
					default:

						console.error(data['status'].msg);			

						if (typeof elements == 'object') {

							if (typeof elements.loading == 'object')
								(elements.loading)? elements.loading.addClass('hidden'): '';
								$("#full_content").css('opacity','1');

							if (typeof elements.disable == 'object')
								elements.disable.prop("disabled", false);

						}

				}

			}

		});

	}

	//=========================================================================================
	//
	// Create List From SQL Select Results
	//
	//=========================================================================================
	function createList(elements, data, callback) {

		console.log('Processando resultado...');
		
		if (data) {

		var html = "";
		var ultimocontato = '';
		var check = "<i class=\"fa fa-check-square-o fa-2x\"></i>";
		var session = $("#session").attr('name');
        var page = $('#session').attr('data-page');
        $("#lista").css({ "display": "" });
        $("#info").css({ "display": "none" });

		for (var i = 0; i < data.length; i++) {
			
			html += "<tr id ="+i+">\n";
			var subnome = "";
			
			var keys = Object.keys(data[i]);
			for (var a = 0; a < keys.length; a++) {
				
				var key = keys[a];
				
				switch(key) {
					
					case 'subnome':

						subnome = data[i][key];

					break;

					case 'permissao':
					
						switch(data[i][key]){
							case '1':
							html += '<td>Usuário</td>';
							break;
							case '2':
							html += '<td>Administrador</td>';
							break;							
						}
					
					break;

					case 'categoria':
					
						switch(data[i][key]){
							case '1':
							html += '<td>Médico</td>';
							break;
							case '2':
							html += '<td>Técnico</td>';
							break;							
						}
					
					break;					

					case 'id':

					html += "<td>\n";
					html += (session == 'gateway' || session == 'equipamentos') ? (data[i]['setor'] || data[i]['beacon'])? "<button type='button' class=\"btn btn-default\" onclick='desvincular("+data[i][key]+")'><span class=\"fa fa-chain-broken\" aria-hidden=\"true\"></button></a>&nbsp;\n":"<button type='button' class=\"btn btn-default\" onclick='controleModal("+data[i][key]+")'><span class=\"fa fa-link\" aria-hidden=\"true\"></button></a>&nbsp;\n" : '';
					html += (session == 'pulseiras') ? (data[i]['paciente'])? "<button type='button' class=\"btn btn-default\" onclick='desvincular("+data[i][key]+")'><span class=\"fa fa-chain-broken\" aria-hidden=\"true\"></button></a>&nbsp;\n":"<button type='button' class=\"btn btn-default\" onclick='controleModal("+data[i][key]+")'><span class=\"fa fa-link\" aria-hidden=\"true\"></button></a>&nbsp;\n" : '';
					html += (page == 'vincular') ? '' : "<a href=\"?session=" + session + "&page=adicionar&id=" + data[i][key] + "\" id=\"" + data[i][key] + "\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></a>&nbsp;\n";
					html += "<button type=\"button\" id=\"" + data[i][key] + "\" ondblclick=\"_delete(this)\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>\n";
					html += "</td>\n";

					break;

					case 'nome':

					if (subnome) {
						
						var sub = "<br><small>" + subnome + "</small>";
						html += "<td><strong>" +  data[i][key] + "</strong>" + sub + "</td>\n";

					} else {

						html += "<td><strong>" +  data[i][key] + "</strong></td>\n";

					}

					break;
					case 'cpf':
					case 'jejum':
					case 'setor':
					case 'data':
					case 'mac':
					case 'setor':
					html += "<td>" +  (data[i][key] || '-') + "</td>\n";
					break;


					case 'descricao':
					html += "<td><small>" +  (data[i][key] || '') + "<small></td>\n";
					break;

					case 'empresa':
					case 'convenio':
					html += "<td>" +  (data[i][key] || 'PARTICULAR') + "</td>\n";
					break;

					case 'voucher':
					case 'urina':
					case 'fezes':
					case 'retorno':
					html += "<td>" +  ((data[i][key] == '1') ? check : '') + "</td>\n";
					break;

					case 'especialidade':
					html += "<td>" +  ((data[i][keys[a]] != null) ? data[i][keys[a]] : '-') + "</td>\n";
					break;

					case 'cor':
					html += "<td><span class='form-control' style='background-color:" +  data[i][keys[a]] + ";'></span></td>\n";
					break;

					case 'diferenca':
					if(data[i][key] > 30) {
						ultimocontato += i+";";
					}
					break;

					case 'ultimocontato':
					html += "<td>"+  ((data[i][keys[a]])?data[i][keys[a]]: 'Sem Dados') +"</td>\n";
					break;					

					default:
					html += "<td>" +  data[i][keys[a]] + "</td>\n";
					break;
				}

			}

			html += "</tr>\n";

		}

		$("#lista tbody").html(html);		
		ultimocontato = ultimocontato.split(";");
		ultimocontato.forEach(function(element) {
			$("#"+element).css("background-color", "#ffcbcb");
		}, this);
        } else {
            $("#lista").css({ "display": "none" });
            $("#info").css({ "display": "" });
        }

		if (typeof callback == 'function') {

			callback(elements);

		} else {

			if (typeof elements == 'object') {

				if (typeof elements.loading == 'object')
					elements.loading.addClass('hidden');
					$("#full_content").css('opacity','1');

				if (typeof elements.disable == 'object')
					elements.disable.prop("disabled", false);

			}			
			console.log('Pronto!');			

		}

	}

	//=========================================================================================
	//
	// Create Form Selectors
	//
	//=========================================================================================
	function createForm(elements, data, callback) {
		var data = data[0];
		var keys = Object.keys(data);
		var session = $('#session').attr('name');
		//var page = $('#session').attr('data-page');

		for (var i = 0; i < keys.length; i++) {

			var key = keys[i];

			var html = (session == 'acompanhamentos') ? "<option value=\"0\">Selecione</option>\n" : '';

			if (data[key]) {

				var options = data[key].split('¬');				

				for (var a = 0; a < options.length; a+=2) {
					id = ((options[a].indexOf('/') !== -1)? options[a].substring(0, options[a].indexOf('/')) : options[a]);
					espec = ((options[a].indexOf('/') !== -1)? options[a].substring(options[a].indexOf('/')+1, options[a].length) : null);
					html += "<option value=\"" +id+ ((espec)?"\" especialidade="+ espec+">" :'\">')+ options[a+1] +"</option>\n";

				}

			}
			$("#"+key).html(html);

		}

		if (typeof callback == 'function') {

			callback(elements);

		} else {

			if (typeof elements == 'object') {

				if (typeof elements.loading == 'object')
					elements.loading.addClass('hidden');
					$("#full_content").css('opacity','1');

				if (typeof elements.disable == 'object')
					elements.disable.prop("disabled", false);

			}

			console.log('Pronto!');

		}

	}
	
	//=========================================================================================
	//
	// Sub-menu
	//
	//=========================================================================================
		function link(url) {

		window.location.href = url;

	}

	//=========================================================================================
	//
	// Hoje
	//
	//=========================================================================================
		function hoje(type) {

			var d = new Date();
			var dia = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
			var mes = ((d.getMonth() + 1) < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
			var ano = d.getFullYear();

			var hoje = ano + '-' + mes + '-' + dia;

			return hoje;

	}

	    
	function permissao(funcao){
		
		permissao = $("#usuario").attr('data-permissao');

		if(permissao != 2){
			$("#title").html('Acesso não autorizado.');			
			if (funcao == 'selectid'){
				$("#form").hide();
			} 
		}
		else{
			switch (funcao) {
				case 'selectid':
					_selectid();					
				break;
				case 'select':
					select();
				break;
				}
		}
			
	}
