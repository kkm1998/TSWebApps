document.addEventListener('DOMContentLoaded', ()=>new App())
class App{
    constructor(){
        let x =new Form('Studia')
       x.render()
        document.getElementById('Send')?.addEventListener('click',()=>{x.createTable()})

    }
}