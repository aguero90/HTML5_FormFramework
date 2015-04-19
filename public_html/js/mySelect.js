
var MySingleSelect = function (select) {

    this.referredSelect = select;
    this.referredSelect.options = this.referredSelect.querySelectorAll("option");
    this.create();
};

MySingleSelect.prototype = {
    structure: null,
    selectedElement: null,
    /**
     * crea una struttura del seguente tipo:
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
     * dove, il numero di <li> dipende da quante <option> ha messo l'utente
     * nella <select> presa in input
     */
    create: function () {

        var span;
        var ul;
        var li;

        this.structure = document.createElement("div");
        this.structure.addClass("myFormSelect");

        span = document.createElement("span");
        span.innerHTML = "Seleziona un'opzione";
        span.addEventListener("click", this.openSelect.bind(this));

        this.structure.appendChild(span);
        ul = document.createElement("ul");
        this.structure.appendChild(ul);

        var options = this.referredSelect.querySelectorAll("option");

        for (var i = 0; i < options.length; i++) {

            li = document.createElement("li");
            li.innerHTML = options[i].innerHTML;
            ul.appendChild(li);

            li.addEventListener("click", this.optionSelected.bind(this));
        }

        document.addEventListener("click", this.closeSelect.bind(this));
    },
    openSelect: function (e) {

        this.structure.toggleClass("showOptions");
    },
    closeSelect: function (e) {

        // se non ho cliccato sul div o su un suo qualche figlio, chiudi la select
        if (e.target !== this.structure && !this.structure.contains(e.target)) {
            this.structure.removeClass("showOptions");
        }
    },
    optionSelected: function (e) {

        if (!this.selectedOption) {

            // CASO DI PARTENZA: non ho nessuna opzione scelta
            e.target.addClass("selected");
            this.selectedOption = e.target;

            // this.structure.firstChild == <span>
            this.structure.firstChild.innerHTML = e.target.innerHTML;

            for (var i = 0; i < this.referredSelect.options.length; i++) {

                if (e.target.innerHTML === this.referredSelect.options[i].innerHTML) {
                    this.referredSelect.options[i].selected = true;
                    break;
                }
            }

        } else if (this.selectedOption === e.target) {

            // CASO DI ANNULLAMENTO: ho un'opzione selezionata ma l'utente
            // ha cliccato su quella stessa opzione per deselezionarla
            e.target.removeClass("selected");
            this.selectedOption = null;

            // this.structure.firstChild == <span>
            this.structure.firstChild.innerHTML = "Seleziona un'opzione";

            for (var i = 0; i < this.referredSelect.options.length; i++) {

                if (e.target.innerHTML === this.referredSelect.options[i].innerHTML) {
                    this.referredSelect.options[i].selected = false;
                    break;
                }
            }

        } else {

            // CASO CLASSICO: l'utente sta cambiando l'opzione selezionata
            this.selectedOption.removeClass("selected");

            for (var i = 0; i < this.referredSelect.options.length; i++) {

                if (this.selectedOption.innerHTML === this.referredSelect.options[i].innerHTML) {

                    this.referredSelect.options[i].selected = false;

                } else if (e.target.innerHTML === this.referredSelect.options[i].innerHTML) {

                    this.referredSelect.options[i].selected = true;
                }
            }

            e.target.addClass("selected");
            this.selectedOption = e.target;

            // this.structure.firstChild == <span>
            this.structure.firstChild.innerHTML = e.target.innerHTML;
        }
    }

};

MySingleSelect.constructor = MySingleSelect;




var MyMultipleSelect = function (select) {

    this.referredSelect = select;
    this.referredSelect.options = this.referredSelect.querySelectorAll("option");
    this.create();
};

MyMultipleSelect.prototype = {
    structure: null,
    selectedElements: [],
    /**
     * crea una struttura del seguente tipo:
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
     * dove, il numero di <li> dipende da quante <option> ha messo l'utente
     * nella <select> presa in input
     */
    create: function () {

        var span;
        var ul;
        var li;

        this.structure = document.createElement("div");
        this.structure.addClass("myFormSelect");

        span = document.createElement("span");
        span.innerHTML = "Seleziona un'opzione";
        span.addEventListener("click", this.openSelect.bind(this));

        this.structure.appendChild(span);
        ul = document.createElement("ul");
        this.structure.appendChild(ul);

        var options = this.referredSelect.querySelectorAll("option");

        for (var i = 0; i < options.length; i++) {

            li = document.createElement("li");
            li.innerHTML = options[i].innerHTML;
            ul.appendChild(li);

            li.addEventListener("click", this.optionSelected.bind(this));
        }

        document.addEventListener("click", this.closeSelect.bind(this));
    },
    openSelect: function (e) {

        this.structure.toggleClass("showOptions");
    },
    closeSelect: function (e) {

        // se non ho cliccato sul div o su un suo qualche figlio, chiudi la select
        if (e.target !== this.structure && !this.structure.contains(e.target)) {
            this.structure.removeClass("showOptions");
        }
    },
    optionSelected: function (e) {


        if (this.selectedElements.indexOf(e.target) === -1) {

            // se non c'è lo metto
            this.selectedElements.push(e.target);

            for (var i = 0; i < this.referredSelect.options.length; i++) {

                if (e.target.innerHTML === this.referredSelect.options[i].innerHTML) {
                    this.referredSelect.options[i].selected = true;
                    break;
                }
            }

        } else {

            // se c'è lo rimuovo
            this.selectedElements.splice(this.selectedElements.indexOf(e.target), 1);

            for (var i = 0; i < this.referredSelect.options.length; i++) {

                if (e.target.innerHTML === this.referredSelect.options[i].innerHTML) {
                    this.referredSelect.options[i].selected = false;
                    break;
                }
            }
        }

        e.target.toggleClass("selected");

        // this.structure.firstChild == <span>
        switch (this.selectedElements.length) {
            case 0:
                this.structure.firstChild.innerHTML = "Seleziona un'opzione";
                break;
            case 1:
                this.structure.firstChild.innerHTML = this.selectedElements[0].innerHTML;
                break;
            default:
                this.structure.firstChild.innerHTML = this.selectedElements.length + " elementi selezionati";
        }
    }

};

MyMultipleSelect.constructor = MyMultipleSelect;








window.addEventListener("load", function (e) {

    var selects = document.querySelectorAll(".myForm select");

    var currentSelect;

    for (var i = 0; i < selects.length; i++) {

        if (selects[i].hasAttribute("multiple")) {

            currentSelect = new MyMultipleSelect(selects[i]);
        } else {

            currentSelect = new MySingleSelect(selects[i]);
        }

        selects[i].parentNode.insertBefore(currentSelect.structure, selects[i]);
    }
});

