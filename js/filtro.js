$("#des").on("input", function() {
    var filtro = event.target.value;
    if (filtro.length > 0) {
        var x = new RegExp("^" + filtro, "i");
        $("li").each(function(index) {
            var item = $("li")[index];
            testaExpressao(item, x);
        });
    } else {
        $("li").each(function(index) {
            var item = $("li")[index];
            item.classList.add("d-flex");
            item.classList.remove("d-none");
        });
    }
});


function testaExpressao(item, x) {
    if (x.test(item.childNodes[1].textContent)) {
        item.classList.add("d-flex");
        item.classList.remove("d-none");
    } else {
        item.classList.remove("d-flex");
        item.classList.add("d-none");
    }
}