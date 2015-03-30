


/**
 * MyDatePicker per funzionare bene richiede una struttura del tipo
 *
 * <div>
 *  <input type="text" class="myDatePickerInput" />
 * </div>
 *
 * @type Function|Function
 */

// singleton
var MyDatePicker = (function () {

    var datePickerInput;
    var myDatePicker;
    var year;
    var month;
    var days;
    var previousMonth;
    var nextMonth;
    var activeDate;

    /**
     * Crea e restituisce la prima riga dell'header della tabella.
     * Cioè quella che contiene il mese, l'anno e le frecce per cambiare mese.
     *
     * <tr>
     *   <th id="previousMonth">
     *      <span>«</span>
     *   </th>
     *   <th id="monthAndYear">
     *      <span id="month"></span>
     *      <span id="year"></span>
     *   </th>
     *   <th id="nextMonth">
     *      <span>»</span>
     *   </th>
     * </tr>
     *
     * @returns {Element} la riga contenente mese, anno e la sua selezione
     */
    function createMyDatePickerMonthAndDay() {

        var th;
        var tr;
        var span;

        // prima riga
        tr = document.createElement("tr");
        // primo th
        previousMonth = document.createElement("th");
        previousMonth.setAttribute("id", "previousMonth");

        span = document.createElement("span");
        span.appendChild(document.createTextNode("«"));
        previousMonth.appendChild(span);
        tr.appendChild(previousMonth);
        // secondo th
        th = document.createElement("th");
        th.setAttribute("id", "monthAndYear");
        th.setAttribute("colspan", "5");
        // primo span
        month = document.createElement("span");
        month.setAttribute("id", "month");
        th.appendChild(month);
        // secondo span
        year = document.createElement("span");
        year.setAttribute("id", "year");
        th.appendChild(year);
        tr.appendChild(th);
        // terzo th
        nextMonth = document.createElement("th");
        nextMonth.setAttribute("id", "nextMonth");
        span = document.createElement("span");
        span.appendChild(document.createTextNode("»"));
        nextMonth.appendChild(span);
        tr.appendChild(nextMonth);
        return tr;
    }

    /**
     * Crea e restituisce la seconda riga dell'header della tabella.
     * Cioè quella che contiene i giorni della settimana.
     *
     * <tr>
     *   <th class="dayOfWeek">Lu</th>
     *   <th class="dayOfWeek">Ma</th>
     *   <th class="dayOfWeek">Me</th>
     *   <th class="dayOfWeek">Gi</th>
     *   <th class="dayOfWeek">Ve</th>
     *   <th class="dayOfWeek">Sa</th>
     *   <th class="dayOfWeek">Do</th>
     * </tr>
     *
     * @returns {Element} la riga contenente i giorni della settimana
     */
    function createMyDatePickerDaysOfWeek() {
        var tr = document.createElement("tr");
        var days = ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"];
        var th;
        for (var i in days) {
            th = document.createElement("th");
            th.addClass("dayOfWeek");
            th.appendChild(document.createTextNode(days[i]));
            tr.appendChild(th);
        }

        return tr;
    }

    /**
     * Crea e restituisce l'header della tabella.
     * Cioè le 2 righe che contengono mese, anno e giorno della settimana.
     *
     * <thead>
     *    <CONTENUTO PRIMA RIGA>
     *    <CONTENUTO SECONDA RIGA>
     * </thead>
     *
     * @returns {Element} l'header della tabella
     */
    function createMyDatePickerHead() {
        var thead = document.createElement("thead");
        thead.appendChild(createMyDatePickerMonthAndDay());
        thead.appendChild(createMyDatePickerDaysOfWeek());
        return thead;
    }

    /**
     * Crea e restituisce il corpo della tabella.
     * Cioè quello contenente in giorni del mese.
     * <br />
     * <br />
     * <strong>
     * NOTA: questo metodo crea 5 settimane ( cioè 5 righe della tabella )
     *       per un totale di 42 giorni che comprendono anche alcuni del mese
     *       precedente ed alcuni del mese successivo
     * </strong>
     *
     * <tbody>
     *
     *    <tr>
     *      <td class="day"></td>
     *      <td class="day"></td>
     *      <td class="day"></td>
     *      <td class="day"></td>
     *      <td class="day"></td>
     *      <td class="day"></td>
     *      <td class="day"></td>
     *    </tr>
     *    <LO SCHEMA QUI SOPRA E' DA RIPETERE ALTRE 5 VOLTE>
     *
     * </tbody>
     *
     * @returns {Element} il corpo della tabella, cioè quello contenente i giorni
     */
    function createMyDatePickerBody() {
        var tbody = document.createElement("tbody");
        var tr;
        days = [];
        for (var i = 0; i < 42; i++) {
            if ((i % 7) === 0) {
                if (i !== 0) {
                    tbody.appendChild(tr);
                }
                tr = document.createElement("tr");
            }
            days[i] = document.createElement("td");
            days[i].addClass("day");
            tr.appendChild(days[i]);
        }
        tbody.appendChild(tr);
        return tbody;
    }

    /**
     * Crea tutto il date picker a partire dalla struttura esterna.
     * Ritorna il container del picker.
     *
     *  <div id="myDatePicker">
     *      <table>
     *
     *          <CONTENUTO HEADER TABELLA>
     *
     *          <CONTENUTO BODY TABELLA>
     *
     *      </table>
     *  </div>
     *
     * @returns {Element} il div contenente il date picker
     */
    function createMyDatePickerStructure() {
        myDatePicker = document.createElement("div");
        myDatePicker.setAttribute("id", "myDatePicker");
        var table = document.createElement("table");
        table.appendChild(createMyDatePickerHead());
        table.appendChild(createMyDatePickerBody());
        myDatePicker.appendChild(table);
        return myDatePicker;
    }

    /**
     * Prende in input un intero da 0 a 11 e restituisce il valore in stringa
     * del mese corrispondente:
     * <ul>
     *    <li> 0 -> "Gennaio"</li>
     *    <li> 1 -> "Febbraio"</li>
     *    <li> 2 -> "Marzo"</li>
     *    <li> 3 -> "Aprile"</li>
     *    <li> 4 -> "Maggio"</li>
     *    <li> 5 -> "Giugno"</li>
     *    <li> 6 -> "Luglio"</li>
     *    <li> 7 -> "Agosto"</li>
     *    <li> 8 -> "Settembre"</li>
     *    <li> 9 -> "Ottobre"</li>
     *    <li>10 -> "Novembre"</li>
     *    <li>11 -> "Dicembre"</li>
     * </ul>
     *
     * @param {int} month
     * @returns {String} la stringa che rappresenta il mese
     */
    function getStringMonth(month) {
        switch (month) {
            case 0:
                return "Gennaio";
            case 1:
                return "Febbraio";
            case 2:
                return "Marzo";
            case 3:
                return "Aprile";
            case 4:
                return "Maggio";
            case 5:
                return "Giugno";
            case 6:
                return "Luglio";
            case 7:
                return "Agosto";
            case 8:
                return "Settembre";
            case 9:
                return "Ottobre";
            case 10:
                return "Novembre";
            case 11:
                return "Dicembre";
        }
    }

    /**
     * Imposta correttamente i giorni del mese e dell'anno passati,
     * facendo attenzione a notare le differenze tra i giorni del mese
     * precedente, quelli del mese successivo ed il giorno "attivo",
     * cioè quello selezionato dall'utente
     *
     * @param {int} newMonth il nuovo mese su cui impostare il calendario
     * @param {int} newYear il nuovo anno su cui impostare il calendario
     * @returns {undefined}
     */
    function generateMonth(newMonth, newYear) {

        month.val = newMonth;
        month.innerHTML = getStringMonth(month.val);

        year.val = newYear;
        year.innerHTML = year.val;

        var firstOfMonth = new Date(year.val, month.val, 1);

        for (var i = 0; i < days.length; i++) {
            // per ogni giorno ( tutti e 42 )

            // resetto la classe
            days[i].setAttribute("class", "day");

            // assegno all'attributo val dell'elemento del DOM la data
            days[i].val = new Date(firstOfMonth.getTime() - (((firstOfMonth.getDay() === 0 ? 6 : firstOfMonth.getDay() - 1) - i) * 24 * 60 * 60 * 1000));

            // scrivo il giorno nella tabella
            days[i].innerHTML = days[i].val.getDate();

            if (days[i].val.getMonth() < month.val) {

                // se è un giorno del mese precedente
                days[i].addClass("oldMonthDay");
            } else if (days[i].val.getMonth() > month.val) {

                // se è un giorno del mese successivo
                days[i].addClass("newMonthDay");
            }

            if (activeDate.getDate() === days[i].val.getDate()
                    && activeDate.getMonth() === days[i].val.getMonth()
                    && activeDate.getFullYear() === days[i].val.getFullYear()) {

                // se è il giorno "attivo" cioè quello cliccato dall'utente sul
                // date picker
                days[i].addClass("activeDate");
            }
        }
    }

    /**
     * Imposta il valore dell'input del picker su una specifica data nella forma
     * gg/mm/aaaa
     *
     * @param {Date} date la data su cui impostare il valore dell'input
     * @returns {undefined}
     */
    function setDatePickerInputValue(date) {

        // prendo il giorno
        var activeDay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

        // prendo il mese
        var activeMonth = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);

        // imposto il valore del campo di testo associato al date picker
        // come gg/mm/aaaa
        datePickerInput.value = activeDay + "/" + activeMonth + "/" + date.getFullYear();
    }

    /**
     * Si mette in ascolto dei giusti eventi per gestire l'interazione
     * con l'utente.
     *
     * @returns {undefined}
     */
    function setEventListenerToMyDatePicker() {

        // si mette in ascolto dell'evento "click" su tutto il documento.
        document.addEventListener("click", function (e) {

            if (e.target !== myDatePicker && datePickerInput.parentNode.hasChild(myDatePicker)) {

                // click fuori dal date picker ed è presente nel DOM
                // => lo rimuovo dal DOM
                datePickerInput.parentNode.removeChild(myDatePicker);
                e.stopPropagation();
            } else if (e.target === datePickerInput && !datePickerInput.parentNode.hasChild(myDatePicker)) {
                // è stato cliccato il campo di testo relativo al date picker
                // che non lo ha già attivo
                // => lo inizializzo e lo mostro

                // reimpostiamo il giorno attivo in base all'input
                if (datePickerInput.value && new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/([0-9]{4})").test(datePickerInput.value)) {
                    // se il valore contenuto nel campo di testo associato al
                    // date picker è valido, cioè esiste e metcha con l'espressione
                    // regolare definita ovvero è della forma gg/mm/aaaa
                    // => divido e metto nella forma mm/gg/aaaaa
                    // ( poichè l'oggetto Date JS vuole questo formato )
                    var dateArray = datePickerInput.value.split("/");
                    activeDate = new Date(dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2]);
                } else {
                    // altrimenti dico che il giorno selezionato è oggi
                    activeDate = new Date();
                }

                generateMonth(activeDate.getMonth(), activeDate.getFullYear());
                setDatePickerInputValue(activeDate);

                // ripulisco l'attributo classe da modifiche precedenti
                // NOTA: in questo modo è possibile dare animazioni diverse
                //       a seconda del datePickerInput
                myDatePicker.removeAttribute("class");
                if (datePickerInput.hasAttribute("data-animate")) {
                    // se l'input ha l'attributo "data-animate"
                    // => aggiungo l'animazione al date picker
                    myDatePicker.addClass("animated");
                    myDatePicker.addClass(datePickerInput.getAttribute("data-animate"));
                }

                datePickerInput.parentNode.appendChild(myDatePicker);
                e.stopPropagation();
            }
        });

        // si mette in ascolto del click sulla freccia del date picker che
        // dovrebbe mandare al mese precedente
        previousMonth.addEventListener("click", function (e) {
            // se il mese è Gennaio, vai a Dicembre dell'anno precedente,
            // altrimenti semplicemente decrementa il mese
            month.val == 0 ? generateMonth(11, (year.val - 1)) : generateMonth((month.val - 1), year.val);
            e.stopPropagation();
        });
        previousMonth.onselectstart = function () {
            return false;
        }; // explorer
        previousMonth.onmousedown = function () {
            return false;
        }; // mozilla & chrome

        // si mette in ascolto del click sulla freccia del date picker che
        // dovrebbe mandare al mese successivo
        nextMonth.addEventListener("click", function (e) {
            // se il mese è Dicembre, vai a Gennaio dell'anno successivo,
            // altrimenti semplicemente incrementa il mese
            month.val == 11 ? generateMonth(0, (year.val + 1)) : generateMonth((month.val + 1), year.val);
            e.stopPropagation();
        });
        nextMonth.onselectstart = function () {
            return false;
        }; // explorer
        nextMonth.onmousedown = function () {
            return false;
        }; // mozilla & chrome


        var dayClicked = function (e) {

            // NOTA: this si riferisce al giorno cliccato

            for (var i = 0; i < days.length; i++) {
                // per ogni giorno
                if (days[i].val.getDate() === activeDate.getDate()
                        && days[i].val.getMonth() === activeDate.getMonth()
                        && days[i].val.getFullYear() === activeDate.getFullYear()) {

                    // se la data corrisponde al vecchio giorno "attivo"
                    // allora rimuovo la classe
                    days[i].removeClass("activeDate");
                }
            }

            // imposto come nuovo giorno attivo quello appena selezionato
            activeDate = this.val;
            this.addClass("activeDate");

            setDatePickerInputValue(activeDate);

            e.stopPropagation();
        };


        for (var i = 0; i < days.length; i++) {
            // per ogni giorno

            // si mette in ascolto del click sul giorno
            days[i].addEventListener("click", dayClicked);

            days[i].onselectstart = function () {
                return false;
            }; // explorer
            days[i].onmousedown = function () {
                return false;
            }; // mozilla & chrome
        }
    }

    /**
     * Crea prima la struttura del date picker e dopo gli associa i giusti eventi.
     *
     * @returns {Element} ritorna il date picker con gli eventi agganciati
     */
    function createMyDatePicker() {
        createMyDatePickerStructure();
        setEventListenerToMyDatePicker();
        return myDatePicker;
    }


    return function (event) {

        // imposto l'elemento del DOM che è stato cliccato ( il target
        // dell'evento click ), cioè quello per cui creare e/o far apparire il
        // date picker
        datePickerInput = this;

        if (!myDatePicker) {

            // se il date picker non esiste già => crealo.
            // cioè se è la prima volta che viene chiamata new MyDatePicker();
            createMyDatePicker();
        }

        return myDatePicker;
    };
})();


window.addEventListener("load", function () {

    // DATE PICKER
    var datePickerInputs = document.querySelectorAll(".myDatePickerInput");

    for (var i = 0; i < datePickerInputs.length; i++) {

        // si mette in ascolto dell'evento click su ogni
        // elemento del DOM che ha classe ".myDatePickerInput"
        datePickerInputs[i].addEventListener("click", MyDatePicker);
    }
});

