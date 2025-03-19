import { addNewPharmacy } from "./addLoja";

let lojasData = [];
let editando = false;
let lojaId = null;
let apiurl = 'http://127.0.0.1:5000/lojas'

window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(apiurl);
    const dados = await.response.json();
    lojasData = dados;
    addNewPharmacyPharmacy();
})