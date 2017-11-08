window.onload = function () {
    totalGateway()
};

// Contagem total de Gateways
function totalGateway() {

    AjaxData = {
        url: "database.php",
        command: 'totalGateway'
    };

    AjaxFunction = {
        success: getotalGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function getotalGateway(data) {

    if (data) {

        $("#contGateway").html(data[0].total);

    }
    estoqueGateway();
}
// Contagem total de Gateways

// Contagem em estoque de Gateways
function estoqueGateway() {

    AjaxData = {
        url: "database.php",
        command: 'estoqueGateway'
    };

    AjaxFunction = {
        success: getestoqueGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function getestoqueGateway(data) {


    if (data) {

        $("#contestoque").html(data[0].total);

    }
    clienteGateway();
}
// Contagem em estoque de Gateways


// Contagem em clientes de Gateways
function clienteGateway() {

    AjaxData = {
        url: "database.php",
        command: 'clienteGateway'
    };

    AjaxFunction = {
        success: getclienteGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function getclienteGateway(data) {


    if (data) {

        $("#contcliente").html(data[0].total);

    }

    desaparecidoGateway();

}
// Contagem em clientes de Gateways


// Contagem Desaparecidos de Gateways
function desaparecidoGateway() {

    AjaxData = {
        url: "database.php",
        command: 'desaparecidoGateway'
    };

    AjaxFunction = {
        success: getdesaparecidoGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function getdesaparecidoGateway(data) {


    if (data) {

        $("#contDesaparecido").html(data[0].total);

    }
    danificadoGateway();
}
// Contagem Desaparecidos de Gateways

// Contagem danificados de Gateways
function danificadoGateway() {

    AjaxData = {
        url: "database.php",
        command: 'danificadoGateway'
    };

    AjaxFunction = {
        success: getdanificadoGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function getdanificadoGateway(data) {


    if (data) {

        $("#contdanificados").html(data[0].total);

    }
    totalListGateway();
}
// Contagem danificados de Gateways

// Contagem lista total de Gateways
function totalListGateway() {

    AjaxData = {
        url: "database.php",
        command: 'totalListGateway'
    };

    AjaxFunction = {
        success: gettotalListGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function gettotalListGateway(data) {

    if (data) {

        cdebug("Data Length: " + data.length);
        cdebug(data);

        var html = "";
        html += "<tr>\n";
        html += "<th>Nome</th>\n";
        html += "<th>Mac</th>\n";
        html += "<th>Marca</th>\n";
        html += "<th>Modelo</th>\n";
        html += "<th>Status</th>\n";
        html += "<th>Entrada</th>\n";
        html += "<th>A&ccedil;&atilde;o</th>\n";
        html += "</tr>\n";


        for (var i = 0; i < data.length; i++) {

            html += "<tr>\n";
            html += "<td>" + data[i].nome + "</td>\n";
            html += "<td>" + data[i].mac + "</td>\n";
            html += "<td>" + data[i].modelo + "</td>\n";
            html += "<td>" + data[i].marcar + "</td>\n";
            html += "<td>" + data[i].status + "</td>\n";
            html += "<td>" + data[i].data + "</td>\n";
            html += "<td><button class=\"btn btn-icon\" onclick='modaleditItem(" + data[i].id + ")'><i class=\"fa fa-pencil\"></i></button>\n";
            html += "<button class=\"btn btn-icon\" onclick='modaldeleteItem(" + data[i].id + ")'><i class=\"fa fa-trash\"></i></button></td>\n";
            html += "</tr>\n";
        }

        



    } else {

        $('#gateway_total').html("<td> sem equipamento</td>");

    }

    $('#gateway_total').html(html);
    estoqueListGateway();
}
// Contagem lista total de Gateways

// Contagem lista estoque de Gateways
function estoqueListGateway() {

    AjaxData = {
        url: "database.php",
        command: 'estoqueListGateway'
    };

    AjaxFunction = {
        success: getestoqueListGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function getestoqueListGateway(data) {

    if (data) {

        cdebug("Data Length: " + data.length);
        cdebug(data);

        var html = "";
        html += "<tr>\n";
        html += "<th>Nome</th>\n";
        html += "<th>Mac</th>\n";
        html += "<th>Marca</th>\n";
        html += "<th>Modelo</th>\n";
        html += "<th>Status</th>\n";
        html += "<th>Entrada</th>\n";
        html += "</tr>\n";


        for (var i = 0; i < data.length; i++) {

            html += "<tr>\n";
            html += "<td>" + data[i].nome + "</td>\n";
            html += "<td>" + data[i].mac + "</td>\n";
            html += "<td>" + data[i].modelo + "</td>\n";
            html += "<td>" + data[i].marcar + "</td>\n";
            html += "<td>" + data[i].status + "</td>\n";
            html += "<td>" + data[i].data + "</td>\n";
            html += "</tr>\n";
        }





    } else {

        html += "<tr>\n";
        html += "<td>Nenhum Equipamento</td>\n";
        html += "</tr>\n";

    }

    $('#gateway_estoque').html(html);
    clienteListGateway();
}
// Contagem lista estoque de Gateways

// Contagem lista cliente de Gateways
function clienteListGateway() {

    AjaxData = {
        url: "database.php",
        command: 'clienteListGateway'
    };

    AjaxFunction = {
        success: getclienteListGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function getclienteListGateway(data) {

    if (data) {

        cdebug("Data Length: " + data.length);
        cdebug(data);

        var html = "";
        html += "<tr>\n";
        html += "<th>Nome</th>\n";
        html += "<th>Mac</th>\n";
        html += "<th>Marca</th>\n";
        html += "<th>Modelo</th>\n";
        html += "<th>Status</th>\n";
        html += "<th>Entrada</th>\n";
        html += "</tr>\n";


        for (var i = 0; i < data.length; i++) {

            html += "<tr>\n";
            html += "<td>" + data[i].nome + "</td>\n";
            html += "<td>" + data[i].mac + "</td>\n";
            html += "<td>" + data[i].modelo + "</td>\n";
            html += "<td>" + data[i].marcar + "</td>\n";
            html += "<td>" + data[i].status + "</td>\n";
            html += "<td>" + data[i].data + "</td>\n";
            html += "</tr>\n";
        }





    } else if (data.length == 0) {

        html += "<tr>\n";
        html += "<td>Nenhum Equipamento</td>\n";
        html += "</tr>\n";

    }

    $('#gateway_cliente').html(html);
}
// Contagem lista cliente de Gateways

// Contagem lista desaparecido de Gateways
function desaparecidoListGateway() {

    AjaxData = {
        url: "database.php",
        command: 'desaparecidoListGateway'
    };

    AjaxFunction = {
        success: getdesaparecidoListGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function getdesaparecidoListGateway(data) {

    if (data) {

        cdebug("Data Length: " + data.length);
        cdebug(data);

        var html = "";
        html += "<tr>\n";
        html += "<th>Nome</th>\n";
        html += "<th>Mac</th>\n";
        html += "<th>Marca</th>\n";
        html += "<th>Modelo</th>\n";
        html += "<th>Status</th>\n";
        html += "<th>Entrada</th>\n";
        html += "</tr>\n";


        for (var i = 0; i < data.length; i++) {

            html += "<tr>\n";
            html += "<td>" + data[i].nome + "</td>\n";
            html += "<td>" + data[i].mac + "</td>\n";
            html += "<td>" + data[i].modelo + "</td>\n";
            html += "<td>" + data[i].marcar + "</td>\n";
            html += "<td>" + data[i].status + "</td>\n";
            html += "<td>" + data[i].data + "</td>\n";
            html += "</tr>\n";
        }





    } else {

        html += "<tr>\n";
        html += "<td>Nenhum Equipamento</td>\n";
        html += "</tr>\n";

    }

    $('#gateway_desaparecido').html(html);
}
// Contagem lista desaparecido de Gateways

// Contagem lista danificado de Gateways
function danificadoListGateway() {

    AjaxData = {
        url: "database.php",
        command: 'danificadoListGateway'
    };

    AjaxFunction = {
        success: getdanificadoListGateway,
    };

    ajaxQuery(AjaxData, AjaxFunction);
}

function getdanificadoListGateway(data) {

    if (data) {

        cdebug("Data Length: " + data.length);
        cdebug(data);

        var html = "";
        html += "<tr>\n";
        html += "<th>Nome</th>\n";
        html += "<th>Mac</th>\n";
        html += "<th>Marca</th>\n";
        html += "<th>Modelo</th>\n";
        html += "<th>Status</th>\n";
        html += "<th>Entrada</th>\n";
        html += "</tr>\n";


        for (var i = 0; i < data.length; i++) {

            html += "<tr>\n";
            html += "<td>" + data[i].nome + "</td>\n";
            html += "<td>" + data[i].mac + "</td>\n";
            html += "<td>" + data[i].modelo + "</td>\n";
            html += "<td>" + data[i].marcar + "</td>\n";
            html += "<td>" + data[i].status + "</td>\n";
            html += "<td>" + data[i].data + "</td>\n";
            html += "</tr>\n";
        }





    } else {
        html += "<tr>\n";
        html += "<td>Nenhum Equipamento</td>\n";
        html += "</tr>\n";
    }

    $('#gateway_danificado').html(html);
}
// Contagem lista danificado de Gateways

//modal edit 

function modaleditItem(data) {

    AjaxData = {
        url: "database.php",
        command: 'select',
        id: data
    };

    AjaxFunction = {
        success: geteditmodal,
    };

    ajaxQuery(AjaxData, AjaxFunction);




}

function geteditmodal(data) {
    var html = " ";
    var dados = " ";
    var data = data;
    if (data) {

        html += "<div class='modal fade'/ id='modaledit' tabindex='- 1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>/n";
        html += "<div class='modal-dialog role='document'>/n";
        html += "<div class='modal-content'>\n";
        html += "<div class='modal-header'>\n";
        html += "<h5 class='modal-title' id='editEquipamento'>Editar Equipamento</h5>\n";
        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>\n";
        html += "<span aria-hidden='true'>&times;</span>\n";
        html += "</button>\n";
        html += "</div>\n";
        html += "<div class='modal-body'>\n";
        html += "<form id='formEdit' >\n";
        html += "<div class='form-group'>\n";
        html += "<label>Nome</label>\n";
        html += "<input type='text' class='form-control' name='nome' aria-describedby='nomeHelp' value =" + data[0].nome + "> \n";
        html += "<label>Mac</label>\n";
        html += "<input type='text' class='form-control' name='mac' aria-describedby='nomeHelp' value =" + data[0].mac + "> \n";
        html += "<label >Modelo</label>\n";
        html += "<input type='text' class='form-control' name='modelo' aria-describedby='nomeHelp' value =" + data[0].modelo + "> \n";
        html += "<label >Marca</label>\n";
        html += "<input type='text' class='form-control' name='marcar' aria-describedby='nomeHelp' value =" + data[0].marcar + "> \n";
        html += "<label>Status</label>\n";
        html += "<input type='text' class='form-control' name='status' aria-describedby='nomeHelp' value ='" + data[0].status + "'> \n";
        html += "</div>\n";
        html += "</div>\n";
        html += "<div class='modal-footer'>\n";
        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button>\n";
        html += "<button type='submit' id='submit' value='submit' class='btn btn-primary'>Salvar</button>\n";
        html += "</form>\n";
        html += "</div>\n";
        html += "</div>\n";
        html += "</div >\n";

        $("#modal").html(html);
        $("#modaledit").modal().show;


        $("#submit").click(function (event) {
            event.preventDefault();
            dados = $("#formEdit").serializeArray();
            console.log(dados);
            editItem(data, dados);
        });


    }


}

// Editar equipamentos

function editItem(data, dados) {
    AjaxData = {
        url: "database.php",
        command: 'edit',
        id: data[0].id,
        nome: dados[0].nome,
        mac: dados[1].mac,
        modelo: dados[2].modelo,
        marca: dados[3].marcar,
        status: dados[4].status,
    };

    AjaxFunction = {
        success: getedit,
        error: erro
    };

    ajaxQuery(AjaxData, AjaxFunction);

}

function getedit() {

    alert("Atualização feita com sucesso!");
}

function erro() {

    alert("ouve um erro, não pode ser processada a atualização");
}