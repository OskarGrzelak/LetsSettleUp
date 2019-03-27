var MAINAPP = (function(app, dom, data) {

    const listenEvents = function() {

        dom.mainDOM.addEventListener('click', function(e) {
            if(e.target.closest('.main__header .icon')) {
                dom.removeWindow(dom.currentWindowID);
                dom.updateCurrentWindowID('next');
                dom.renderWindow(dom.currentWindowID);
                dom.displayElement(dom.mainDOM.children[0]);
            }
        });

        dom.mainDOM.addEventListener('click', function(e) {
            if(e.target.closest('.btn--next')) {
                data.saveData(dom.currentWindowID);
                dom.removeWindow(dom.currentWindowID);
                setTimeout(function() {
                    dom.updateCurrentWindowID('next');
                    dom.renderWindow(dom.currentWindowID);
                    dom.displayElement(dom.mainDOM.children[0]);
                }, 900);
            }
        });

        dom.mainDOM.addEventListener('click', function(e) {
            if(e.target.closest('.btn-back')) {
                data.saveData(dom.currentWindowID);
                dom.removeWindow(dom.currentWindowID);
                setTimeout(function() {
                    dom.updateCurrentWindowID('back');
                    dom.renderWindow(dom.currentWindowID);
                    dom.displayElement(dom.mainDOM.children[0]);
                }, 900);
                console.log(data.calculationData);
            }
        });

        dom.mainDOM.addEventListener('click', function(e) {
            const checkLabel = e.target.closest('.check-label');
            if(checkLabel) {
                const checkIcon = checkLabel.children[0];
                if (checkIcon.classList.contains('icon-check')) {
                    checkIcon.classList.replace('icon-check', 'icon-close');
                    checkIcon.innerHTML = '<use xlink:href="assets/img/symbol-defs.svg#icon-close"></use>';
                } else {
                    checkIcon.classList.replace('icon-close', 'icon-check');
                    checkIcon.innerHTML = '<use xlink:href="assets/img/symbol-defs.svg#icon-check"></use>';
                }
            }
        });

        dom.mainDOM.addEventListener('click', function(e) {
            if(e.target.closest('.btn--new-expense')) {
                document.querySelector('.expenses').insertAdjacentHTML('beforeend', dom.addNewExpense());
            }
        });

        dom.mainDOM.addEventListener('click', function(e) {
            if (e.target.closest('.btn--calculate')) {
                data.saveData(dom.currentWindowID);
                // calculate
            }
        });
    };

    

    window.addEventListener('load', function() {
        dom.mainDOM.insertAdjacentHTML('afterbegin', dom.generateHeaderWindow());
        listenEvents();
    });

    return app

})(MAINAPP || {}, UTIL.dom, UTIL.data);