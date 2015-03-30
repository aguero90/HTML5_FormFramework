

// Questo file contiene tutte quelle funzioni che possono risultare utili
// in qualsiasi momento oppure dei polyfill

// String
// =============================================================================

if (!String.contains) {

    /**
     * Polyfill per <code">String.contains()</code>
     * <br />
     * Questo metodo si limita a controllare se la stringa passata
     * come argomento compare almeno una volta.
     *
     * @param {String} subString
     * @returns {Boolean} <code>true</code> se contiene la stringa passata, <code>false</code> altrimenti
     */
    String.prototype.contains = function (subString) {

        return this.indexOf(subString) !== -1;
    };
}

// Element
// =============================================================================

/**
 * Helper per aggiungere rapidamente una classe ad un elemento del DOM
 *
 * @param {String} className
 * @returns {undefined}
 */
Element.prototype.addClass = function (className) {

    if (this.classList) {
        this.classList.add(className);
    } else if (!this.hasClass(className)) {
        // Explorer <= 9
        this.className += ' ' + className;
    }

//    VECCHIA IMPLEMENTAZIONE FUNZIONANTE
//
//    if (this.hasAttribute("class")) {
//        this.setAttribute("class", this.getAttribute("class") + " " + className);
//    } else {
//        this.setAttribute("class", className);
//    }

};

/**
 * Helper per rimuovere rapidamente una classe da un elemento del DOM
 *
 * @param {String} className
 * @returns {undefined}
 */
Element.prototype.removeClass = function (className) {

    if (this.classList) {
        this.classList.remove(className);
    } else {
        // Explorer <= 9
        this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

//    VECCHIA IMPLEMENTAZIONE FUNZIONANTE
//
//    if (this.hasClass(className)) {
//        var classArray = this.getAttribute("class").split(" ");
//        classArray.splice(classArray.indexOf(className), 1);
//        var newClass = classArray.join(" ");
//        this.setAttribute("class", newClass);
//    }
};


/**
 * Helper per aggiungere una classe ad un elemento del DOM se questa non è
 * già presente, altrimenti la rimuove.
 *
 * @param {String} className
 * @returns {undefined}
 */
Element.prototype.toggleClass = function (className) {

    if (this.classList) {
        this.classList.toggle(className);
    } else {
        // Explorer <= 9
        var classes = this.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        this.className = classes.join(' ');
    }

//    VECCHIA IMPLEMENTAZIONE FUNZIONANTE
//
//    this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
};

/**
 * Helper per controllare se una classe è presente nell'elemento del DOM
 *
 * @param {String} className
 * @returns {boolean} <code>true</code> se l'elemento del DOM ha la classe, <code>false</code> altrimenti.
 */
Element.prototype.hasClass = function (className) {

    if (this.classList) {
        return this.classList.contains(className);
    } else {
        // Explorer <= 9
        return (new RegExp('(^| )' + className + '( |$)', 'gi')).test(this.className);
    }

// VECCHIA IMPLEMENTAZIONE FUNZIONANTE
//    return this.hasAttribute("class") && this.getAttribute("class").contains(className);
};


Element.prototype.hasChild = function (element) {

    if (this.hasChildNodes()) {

        for (var i = 0; i < this.childNodes.length; i++) {

            if (this.childNodes[i] === element) {
                return true;
            }
        }
    }

    return false;

};


// Other
// =============================================================================


