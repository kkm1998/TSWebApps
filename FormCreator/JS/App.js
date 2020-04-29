"use strict";
document.addEventListener('DOMContentLoaded', () => new App());
class App {
    constructor() {
        var _a;
        let x = new Form('Studia');
        x.render();
        (_a = document.getElementById('Send')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => { x.createTable(); });
    }
}
