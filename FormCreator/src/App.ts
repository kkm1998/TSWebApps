import { Form } from './Form'
import './styles/styles.scss';


document.addEventListener('DOMContentLoaded', () => new App())
class App {
    constructor() {
        let formStudia = new Form('Studia')
       // formStudia.render()
        document.getElementById('Test')?.addEventListener('click', () => { formStudia.Test() })
    }
}