    var a;
    var modalBtn = document.querySelector('#addCountry'),
        modalWindow = document.querySelector('.modal-window'),
        cancelBtn = document.querySelector('#cancel'),
        createCountry = document.querySelector('#createCountry'),
        tab = document.querySelector(".countries");

function sendAjax(url){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.addEventListener('load',()=>{
            resolve(JSON.stringify(xhr.response));
        });
        xhr.addEventListener('error', () =>{
            reject();
        })
        xhr.send();
    })
}

sendAjax("countries.json").then(function(response) {
    console.log(response);
    return JSON.parse(response);
}).then(function(data) {
     a = data;
    var country = a;
    for (var i = 0; i <= 8; i++) {
        var d = document.createElement("tr");
        d.className = "dov";
        d.innerHTML = `<td>` + country.countries[i].name + `</td> <td>` + country.countries[i].capital + `</td>`;
        tab.appendChild(d);
        console.log(country.countries[i].name);
    }
});


    // Показываем модальное окно

    modalBtn.addEventListener("click", function(){
        modalWindow.style.display = "block";
    });
    // Закрываем модальное окно
    cancelBtn.addEventListener("click", function(){
        event.preventDefault();
        modalWindow.style.display = "none";
    });
    // Создание новой страны
    createCountry.addEventListener("click", function(){
        event.preventDefault();
        var countryName = document.querySelector('#countryName').value;
        var capitalName = document.querySelector('#capitalName').value;
        var d = document.createElement("tr");
        d.className = "dov";
        d.innerHTML = `<td>` + countryName + `</td> <td>` + capitalName + `</td>`;
        tab.appendChild(d);
        modalWindow.style.display = 'none';
    });



// Выбор стран
function choseCountry() {
    var div = document.querySelectorAll('.dov');
    for(var i=0;i<div.length;i++){
        div[i].addEventListener("click", function () {
            if(this.classList.contains('del')){
                this.classList.remove('del');
            }else{
                this.classList.add("del");
            }
        })}
};
choseCountry();
// Удажление выбранных стран
function deleteCountry(){
    var delCountry = document.querySelectorAll(".del");
    for(var i=0;i<delCountry.length;i++){
        delCountry[i].remove();
    }
}

//Фильтруем таблицу
function filter (phrase, _id){
    var words = phrase.value.toLowerCase().split(" ");
    var table = document.getElementById("sf");
    var ele;
    for (var r = 1; r < table.rows.length; r++){
        ele = table.rows[r].innerHTML.replace(/<[^>]+>/g,"");
        var displayStyle = 'none';
        for (var i = 0; i < words.length; i++) {
            if (ele.toLowerCase().indexOf(words[i])>=0)
                displayStyle = '';
            else {
                displayStyle = 'none';
                break;
            }
        }
        table.rows[r].style.display = displayStyle;
    }
}
// Создаем наблюдателя за изменениями в dom
// выбираем нужный элемент
var target = document.querySelector('tbody');
// создаем новый экземпляр наблюдателя
var observer = new MutationObserver(function() {
 choseCountry();
 });
// создаем конфигурации для наблюдателя
var config = { attributes: false, childList: true, characterData: true };
// запускаем механизм наблюдения
observer.observe(target,  config);

