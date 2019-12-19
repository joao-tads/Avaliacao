var urlGet = "https://tads-kitchen.herokuapp.com/items";
var urlPost = "https://tads-kitchen.herokuapp.com/item/create";
var urlRemove = "https://tads-kitchen.herokuapp.com/item/remove/";

$("#Inserir").on("click", function() {
    addItem();
});

$("#Atualizar").on("click", function() {
    esvaziaLista();
    atualizaDados();
});

$("ul").on("dblclick", function() {
    apagarItem(event.target);

});

function apagarItem(item) {
    var num = item.textContent[0];
    $.get(urlRemove + num, function() {
        limparLista();
        atualizaDados();
    });
}

function addItem() {
    var descricaoItem = $("#des")[0].value;
    var precoItem = $("#valor")[0].value;
    var objeto = JSON.stringify({ description: descricaoItem, price: precoItem });
    $.post(
        urlPOST,
        objeto,
        function() {
            limparLista();
            atualizaDados();
        }
    );
    $("#des")[0].value = "";
    $("#valor")[0].value = "";
}

function limparLista() {
    $("#list").empty();
}

function atualizaDados() {
    $.get(
        urlGET,
        function(data) {
            enviarLista(data);
        }
    );
}

function enviarLista(data) {
    var lista = $("#list")[0];
    var texto = template(data);
    lista.innerHTML = texto;
}

function criaItem(data) {
    var string = "";

    string = template(data.id, data.description, data.price);

    return string;
}

function template(data) {
    return data.map((item) => `<li class="list-group-item d-flex justify-content-between align-items-center"><span>${item.id}</span><span>${item.description}</span><span class="badge badge-primary badge-pill">R$ ${item.price}</span></li>`).join("");
}