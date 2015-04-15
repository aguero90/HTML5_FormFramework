
/**
 *
 * <div class="myFormSelect">
 *     <span>Seleziona un'opzione</span>
 *         <ul>
 *             <li>Opzione 1</li>
 *             <li>Opzione 2</li>
 *                    ...
 *             <li>Opzione n</li>
 *         </ul>
 * </div>
 *
 */
var createMySelect = function (select) {

    var div;
    var ul;
    var el;

    div = document.createElement("div");
    div.addClass("myFormSelect");
    el = document.createElement("span");
    el.innerHTML = "Seleziona un'opzione";
    div.appendChild(el);
    ul = document.createElement("ul");
    div.appendChild(ul);

    var options = select.querySelectorAll("option");

    for (var i = 0; i < options.length; i++) {

        el = document.createElement("li");
        el.innerHTML = options[i].innerHTML;
        ul.appendChild(el);

        el.addEventListener("click", function (e) {
            this.toggleClass("selected");
        });
    }

    return div;

};


window.addEventListener("load", function (e) {

    var mySelect = document.querySelectorAll(".myForm select");

    debugger;

    for (var i = 0; i < mySelect.length; i++) {
        mySelect[i].parentNode.insertBefore(createMySelect(mySelect[i]), mySelect[i]);
    }
});

