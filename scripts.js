    var a, score=0;
    var modalBtn = document.querySelector('#addCountry'),
        modalWindow = document.querySelector('.modal-window'),
        cancelBtn = document.querySelector('#cancel'),
        createCountry = document.querySelector('#createCountry'),
        tab = document.querySelector(".countries"),
        table = document.querySelector("#sf"),
        delCountry = document.querySelector(".delCountry");

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
    for (var i = 0; i < country.countries.length; i++) {
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
    function disButton(){
        if(score > 0){
            delCountry.disabled = false;
        }else{
            delCountry.disabled = true;
        }
    };



// Выбор стран
function choseCountry() {
    var div = document.querySelectorAll('.dov');
    for(var i=0;i<div.length;i++){
        div[i].addEventListener("click", function () {
            if(this.classList.contains('del')){
                this.classList.remove('del');
                score--;
            }else{
                this.classList.add("del");
                score++;
                }
            disButton();
        })}
};
choseCountry();
// Удажление выбранных стран
function deleteCountry(){
    var delCountry = document.querySelectorAll(".del");
    for(var i=0;i<delCountry.length;i++){
        delCountry[i].remove();
    }
    score = 0;
    disButton();
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
var config = { attributes: false, childList: true, characterData: false };
// запускаем механизм наблюдения
observer.observe(target,  config);


    //Сортировка чекбоксом

    function sortColumn(e){
        var sortType = document.querySelector("#selectSort").value;
        if(sortType == 'country'){
            sortTable(0);
            console.log('country')
        }else if(sortType == 'capital') {
            sortTable(1);
            console.log('capital')
        }else{
            console.log('standart')
        }
    }

    function sortTable(type) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("sf");
        switching = true;
        while (switching) {
             switching = false;
            rows = table.getElementsByTagName("TR");
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[type];
                y = rows[i + 1].getElementsByTagName("TD")[type];
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            }
            if (shouldSwitch) {
                   rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }




