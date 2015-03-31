
var myForm = function (form) {

    var inputsFile = form.querySelectorAll("input[type='file']");

    for (var i = 0; i < inputsFile.length; i++) {

        inputsFile[i].addClass("myFormInputFile");
        inputsFile[i].parentNode.insertBefore(createMyFormInputFile(inputsFile[i]), inputsFile[i]);
    }

};

/**
 * Crea la struttura dell'input file e gli associa gli eventi.
 *
 * <div class="myFormInputFile">
 *      <button type="button">Sfoglia...</button>
 *      <span class="myFormSelectedFile">Seleziona il file...</span>
 * </div>
 *
 * @argument {Element} input l'input da sostituire
 * @returns {undefined}
 */
var createMyFormInputFile = function (input) {

    var myFormInputFile;
    var el;

    // creiamo la struttura
    myFormInputFile = document.createElement("div");
    myFormInputFile.addClass("myFormInputFile");
    el = document.createElement("button");
    el.setAttribute("type", "button");
    el.appendChild(document.createTextNode("Sfoglia..."));
    myFormInputFile.appendChild(el);
    el = document.createElement("span");
    el.addClass("myFormSelectedFile");
    el.appendChild(document.createTextNode("Seleziona il file..."));
    myFormInputFile.appendChild(el);

    // associamo gli handler
    myFormInputFile.addEventListener("click", function (e) {
        input.dispatchEvent(new MouseEvent('click'));
    });

    return myFormInputFile;

};


window.addEventListener("load", function (e) {

    var myForms = document.querySelectorAll(".myForm");

    for (var i = 0; i < myForms.length; i++) {
        myForm(myForms[i]);
    }
});


