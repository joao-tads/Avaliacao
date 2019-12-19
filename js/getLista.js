var urlCards = "https://tads-kitchen.herokuapp.com/cards";
var urlCrearte = "https://tads-kitchen.herokuapp.com/card/create";
var urlToggle = "https://tads-kitchen.herokuapp.com/card/toggle/";
var atualizar = setInterval(temporizador, 5000);

$("#newCartao").on("click", function() {
    $.get(urlCrearte);
});

$("ul").on("click", function() {
    alternar(event.target);
});

function temporizador() {
    limparLista();
    atualizaDados();
}

function alternar(item) {
    var num = item.childNodes[0].textContent;
    $.get(urlToggle + num);
}

function atualizaDados() {
    $.get(
        urlCards,
        function(data) {
            preencheLista(data);
        }
    );
}

function esvaziaLista() {
    $("#list").empty();
}

function preencheLista(data) {
    var lista = $("#list")[0];
    data.map(function(dado) {
        var item = criaItem(dado);
        lista.innerHTML = item + lista.innerHTML;
    });
}

function criaItem(data) {
    var string = "";
    var classe = "";

    if (data.status == "off") {
        classe = "list-group-item-danger";
    } else {
        classe = "list-group-item-success";
    }

    string = template(data.number, data.status, classe);

    return string;
}

function template(number, status, classe) {
    return `<li class="list-group-item d-flex justify-content-between align-items-center ${classe}">${number}<span class="badge badge-primary badge-pill">${status}</span></li>`
}