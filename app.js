const api = "https://api.exchangerate-api.com/v4/latest/USD"; // api
const from = document.querySelector(".from select")
const to = document.querySelector(".to select")
const result = document.querySelector('msg')
const button = document.querySelector("form button")
const dropdowns = document.querySelectorAll(".dropdown select")
for ( let select of dropdowns){
    for (let code in countryList){
        let option = document.createElement('option')
        option.innerHTML= code
        option.value= code
        select.append(option)
    }
    select.addEventListener('change',(e)=>{
        update_flag(e.target);
    })
}
const update_flag =(element)=>{
    let code = element.value
    let country_code = countryList[code];
    let new_src= `https://flagsapi.com/${country_code}/flat/64.png`  // api to change image according to option
    let img = element.parentElement.querySelector("img")
    img.src = new_src;// new source of image
}
button.addEventListener("click", async (e)=>{
    e.preventDefault();
    let amount = document.querySelector('form input')
    let amount_value = Number(amount.value)
    if (amount_value===""|| amount_value<0){
        amount_value = 1;
        amount.value = '1';
    }
//api dont work with capital letter thats why lower case
    let responce = await fetch(api);
    let data = await responce.json();
    let rate = data["rates"];
    let ratio = rate[to.value]/rate[from.value]
    money = amount_value*ratio
    console.log(typeof money)
    
    msg.innerHTML  = `${amount_value} ${from.value} = ${money.toFixed(4)} ${to.value}`

})