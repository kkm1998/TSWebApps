"use strict";
document.addEventListener('DOMContentLoaded', () => new App());
class App {
    constructor() {
        var _a;
        let formStudia = new Form('Studia');
        formStudia.render();
        (_a = document.getElementById('Test')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => { formStudia.Test(); });
    }
}
