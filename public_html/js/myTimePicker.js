
var MyTimePicker = (function () {

    var timePickerInput;
    var myTimePicker;
    var hoursUp;
    var hoursValue;
    var hoursDown;
    var minutesUp;
    var minutesValue;
    var minutesDown;

    /**
     * Crea e restituisce un div che rappresenta la selezione delle ore
     *
     * <div id="hours">
     *      <span>˄</span>
     *      <p></p>
     *      <span>˅</span>
     * </div>
     *
     * @returns {Element} un div che rappresenta la selezione delle ore
     */
    function createMyTimePickerHours() {
        var div = document.createElement("div");
        div.setAttribute("id", "hours");
        hoursUp = document.createElement("span");
        hoursUp.appendChild(document.createTextNode("˄"));
        div.appendChild(hoursUp);
        hoursValue = document.createElement("p");
        div.appendChild(hoursValue);
        hoursDown = document.createElement("span");
        hoursDown.appendChild(document.createTextNode("˅"));
        div.appendChild(hoursDown);
        return div;
    }

    /**
     * Crea e restituisce un div che rappresenta la selezione dei minuti
     *
     * <div id="minutes">
     *      <span>˄</span>
     *      <p></p>
     *      <span>˅</span>
     * </div>
     *
     * @returns {Element} un div che rappresenta la selezione dei minuti
     */
    function createMyTimePickerMinutes() {
        var div = document.createElement("div");
        div.setAttribute("id", "minutes");
        minutesUp = document.createElement("span");
        minutesUp.appendChild(document.createTextNode("˄"));
        div.appendChild(minutesUp);
        minutesValue = document.createElement("p");
        div.appendChild(minutesValue);
        minutesDown = document.createElement("span");
        minutesDown.appendChild(document.createTextNode("˅"));
        div.appendChild(minutesDown);
        return div;
    }

    /**
     * Crea e restituisce la struttura del date picker
     *
     * <div id="myDatePicker">
     *
     *     <CONTENUTO SELEZIONE ORE>
     *
     *     <CONTENUTO SELEZIONE MINUTI>
     *
     * </div>
     *
     * @returns {Element} il time picker
     */
    function createMyTimePickerStructure() {

        myTimePicker = document.createElement("div");
        myTimePicker.setAttribute("id", "myTimePicker");
        myTimePicker.appendChild(createMyTimePickerHours());
        myTimePicker.appendChild(createMyTimePickerMinutes());
        return myTimePicker;
    }

    /**
     * Imposta le ore e i minuti in base ai parametri passati come argomenti.
     *
     * @param {int|String} hours
     * @param {int|String} minutes
     * @returns {undefined}
     */
    function setMyTimePickerValue(hours, minutes) {

        hoursValue.val = hours;
        hoursValue.val <= 9 ? hoursValue.innerHTML = "0" + hoursValue.val : hoursValue.innerHTML = hoursValue.val;

        minutesValue.val = minutes;
        minutesValue.val <= 9 ? minutesValue.innerHTML = "0" + minutesValue.val : minutesValue.innerHTML = minutesValue.val;

        timePickerInput.value = hoursValue.innerHTML + ":" + minutesValue.innerHTML;
    }

    /**
     * Si mette in ascolto dei giusti eventi per gestire l'interazione
     * con l'utente.
     *
     * @returns {undefined}
     */
    function setEventListenerToMyTimePicker() {

        // si mette in ascolto dell'evento "click" su tutto il documento.
        document.addEventListener("click", function (e) {
            if (e.target !== myTimePicker && timePickerInput.parentNode.hasChild(myTimePicker)) {

                // click fuori dal time picker ed è presente nel DOM
                // => lo rimuovo dal DOM
                timePickerInput.parentNode.removeChild(myTimePicker);
                e.stopPropagation();
            } else if (e.target === timePickerInput && !timePickerInput.parentNode.hasChild(myTimePicker)) {
                // è stato cliccato il campo di testo relativo al time picker
                // che non lo ha già attivo
                // => lo inizializzo e lo mostro

                // reimpostiamo il tempo in base all'input
                if (timePickerInput.value && new RegExp("([01][0-9]|2[0-3]):([0-5][0-9])").test(timePickerInput.value)) {

                    // se il valore contenuto nel campo di testo associato al
                    // time picker è valido, cioè esiste e metcha con l'espressione
                    // regolare definita ovvero è della forma hh:mm
                    // => divido ed imposto i valori del time picker
                    var timeArray = timePickerInput.value.split(":");
                    setMyTimePickerValue(parseInt(timeArray[0]), parseInt(timeArray[1]));
                } else {
                    // altrimenti metto il default
                    var date = new Date();
                    setMyTimePickerValue(date.getHours(), date.getMinutes());
                }


                // ripulisco l'attributo classe da modifiche precedenti
                // NOTA: in questo modo è possibile dare animazioni diverse
                //       a seconda del timePickerInput
                myTimePicker.removeAttribute("class");
                if (timePickerInput.hasAttribute("data-animate")) {
                    // se l'input ha l'attributo "data-animate"
                    // => aggiungo l'animazione al time picker
                    myTimePicker.addClass("animated");
                    myTimePicker.addClass(timePickerInput.getAttribute("data-animate"));
                }

                timePickerInput.parentNode.appendChild(myTimePicker);
                e.stopPropagation();
            }
        });

        // si mette in ascolto del click sulla freccia del time picker che
        // dovrebbe incrementare le ore
        hoursUp.addEventListener("click", function (e) {

            // se il valore dell'ora è 23
            // => metto a 0, altrimenti incremento semplicemente il valore
            if (hoursValue.val >= 23) {

                setMyTimePickerValue(0, minutesValue.val);
            } else {

                setMyTimePickerValue(hoursValue.val + 1, minutesValue.val);
            }

            e.stopPropagation();
        });
        hoursUp.onselectstart = function () {
            return false;
        }; // explorer
        hoursUp.onmousedown = function () {
            return false;
        }; // mozilla & chrome

        // si mette in ascolto del click sulla freccia del time picker che
        // dovrebbe decrementare le ore
        hoursDown.addEventListener("click", function (e) {

            // se il valore dell'ora è 0
            // => metto a 23, altrimenti decremento semplicemente il valore
            if (hoursValue.val <= 0) {

                setMyTimePickerValue(23, minutesValue.val);
            } else {

                setMyTimePickerValue(hoursValue.val - 1, minutesValue.val);
            }

            e.stopPropagation();
        });
        hoursDown.onselectstart = function () {
            return false;
        }; // explorer
        hoursDown.onmousedown = function () {
            return false;
        }; // mozilla & chrome

        // si mette in ascolto del click sulla freccia del time picker che
        // dovrebbe incrementare i minuti
        minutesUp.addEventListener("click", function (e) {

            // se il valore dei minuti è 59
            // => metto a 0, altrimenti incremento semplicemente il valore
            if (minutesValue.val >= 59) {

                setMyTimePickerValue(hoursValue.val, 0);
            } else {

                setMyTimePickerValue(hoursValue.val, minutesValue.val + 1);
            }

            e.stopPropagation();
        });
        minutesUp.onselectstart = function () {
            return false;
        }; // explorer
        minutesUp.onmousedown = function () {
            return false;
        }; // mozilla & chrome

        // si mette in ascolto del click sulla freccia del time picker che
        // dovrebbe decrementare i minuti
        minutesDown.addEventListener("click", function (e) {

            // se il valore dei minuti è 0
            // => metto a 59, altrimenti decremento semplicemente il valore
            if (minutesValue.val <= 0) {

                setMyTimePickerValue(hoursValue.val, 59);
            } else {

                setMyTimePickerValue(hoursValue.val, minutesValue.val - 1);
            }

            e.stopPropagation();
        });
        minutesDown.onselectstart = function () {
            return false;
        }; // explorer
        minutesDown.onmousedown = function () {
            return false;
        }; // mozilla & chrome
    }

    /**
     * Crea prima la struttura del time picker e dopo gli associa i giusti eventi.
     *
     * @returns {Element} ritorna il time picker con gli eventi agganciati
     */
    function createMyTimePicker() {

        createMyTimePickerStructure();
        setEventListenerToMyTimePicker();
        return myTimePicker;
    }


    return function (event) {

        // imposto l'elemento del DOM che è stato cliccato ( il target
        // dell'evento click ), cioè quello per cui creare e/o far apparire il
        // time picker
        timePickerInput = event.target;
        ;

        if (!myTimePicker) {
            console.log("createMyTimePicker()");
            // se il time picker non esiste già => crealo.
            // cioè se è la prima volta che viene chiamata new MyTimePicker();
            createMyTimePicker();
        }

        return myTimePicker;
    };
})();


window.addEventListener("load", function () {

    // TIME PICKER
    var timePickerInputs = document.querySelectorAll(".myTimePickerInput");

    for (var i = 0; i < timePickerInputs.length; i++) {

        // si mette in ascolto dell'evento click su ogni
        // elemento del DOM che ha classe ".myDatePickerInput"
        timePickerInputs[i].addEventListener("click", MyTimePicker);
    }
});

