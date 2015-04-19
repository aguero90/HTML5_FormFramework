
var MyInputFile = function (inputFile) {

    this.referredInputFile = inputFile;
    this.create();
};

MyInputFile.prototype = {
    structure: null,
    /**
     * Crea la struttura dell'input file e gli associa gli eventi.
     *
     * <div class="myFormInputFile">
     *      <button type="button">Sfoglia...</button>
     *      <span class="myFormSelectedFile">Seleziona il file...</span>
     * </div>
     */
    create: function () {

        var el;

        // creiamo la struttura
        this.structure = document.createElement("div");
        this.structure.addClass("myFormInputFile");
        el = document.createElement("button");
        el.setAttribute("type", "button");
        el.appendChild(document.createTextNode("Sfoglia..."));
        this.structure.appendChild(el);
        el = document.createElement("span");
        el.addClass("myFormSelectedFile");
        el.appendChild(document.createTextNode("Seleziona il file..."));
        this.structure.appendChild(el);

        // associamo gli handler
        this.structure.addEventListener("click", this.onClick.bind(this));
        this.referredInputFile.addEventListener("change", this.fileSelected.bind(this));
    },
    onClick: function (e) {

        // scateniamo l'evento click sull'input
        // così da far aprire la finestra per la scelta del file
        this.referredInputFile.click();
    },
    fileSelected: function (e) {

        if (e.target.files.length > 0) {

            debugger;

            this.structure.lastChild.innerHTML = e.target.files[0].name;

        } else {

            this.structure.lastChild.innerHTML = "Seleziona il file...";
        }
    }
};







window.addEventListener("load", function (e) {

    var inputsFile = document.querySelectorAll(".myForm input[type='file']");

    var currentInputFile;

    for (var i = 0; i < inputsFile.length; i++) {

        currentInputFile = new MyInputFile(inputsFile[i]);

        inputsFile[i].parentNode.insertBefore(currentInputFile.structure, inputsFile[i]);
    }
});


