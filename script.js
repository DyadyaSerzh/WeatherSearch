let query = "мукачево"
let src = `http://api.openweathermap.org/data/2.5/weather?q=${query}&lang=ru&units=metric&appid=b271b682992be5163f554d1fc1a3df12`
let searchForm = document.querySelector('.searchForm')
searchForm.addEventListener('submit', query1)
let dateId = document.querySelector('.date')
let date = new Date();
let weather = document.querySelector('.weather')
let relateWeather = document.querySelector('.relateWeather')
dateId.innerHTML = date.toGMTString()
let queryArr = ['киев', 'мукачево']
let title = document.querySelector('h1')
let body = document.querySelector('body')
title.innerText = 'Погода ' + query


function query1(e) {
    e.preventDefault()
    query = document.querySelector('.town').value
    document.querySelector('.town').value = ''
    response(query)
}

// fetch('https://api.unsplash.com/search/photos?query=wanderlust')
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//         return data
//     });

// рисуем погоду
function createEl(el, cl = '', txt = '') {
    let element = document.createElement(el)

    // element.style = ('class = "test"')
    if (cl != '') element.classList.add(cl)
    if (txt != '') element.innerHTML = txt
        // console.log(element);
    return (element)
}

function response(query) {
    title.innerText = 'Погода ' + query
    src = `http://api.openweathermap.org/data/2.5/weather?q=${query}&lang=ru&units=metric&appid=b271b682992be5163f554d1fc1a3df12`
    fetch(src)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            weather.innerHTML = ''
            console.log(data);
            console.log(data.weather[0].icon);
            let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                // document.querySelector('.weather').innerHTML = `<img src="${weatherIcon}" alt=""></img>`
            let weatherName = data.weather[0].description
            let feelsLike = data.main.feels_like
            let humidity = data.main.humidity
            let temp = data.main.temp
            let temp_max = data.main.temp_max
            let temp_min = data.main.temp_min
            let weatherLink = createEl('div', '', '')
            weatherLink.innerHTML = innerHTML = `<img src="${weatherIcon}" alt=""></img>`
            weather.append(weatherLink)
            weather.append(createEl('p', "", weatherName))
            weather.append(createEl('p', null, ('влажность воздуха ' + humidity + '%')))
            weather.append(createEl('p', null, ('температура ' + temp + 'C')))
            weather.append(createEl('p', null, ('ощущается как ' + feelsLike + 'C')))
            weather.append(createEl('p', null, 'максимальная температура ' + temp_max + 'C'))
            weather.append(createEl('p', null, 'минимальная температура ' + temp_min + 'C'))
            return data
        });
    saveQuery(query)
    printRelateQuery()
    showPhoto(query)
}

// запоминаем запросы
function saveQuery(query) {
    for (i = 0; i < queryArr.length; i++) {
        if (queryArr[i] == query) {
            queryArr.splice(i, 1)
        }
    }
    queryArr.unshift(query)
    if (queryArr.length >= 5) {
        queryArr.pop()
    }
    let arr1 = JSON.stringify(queryArr)
    localStorage.setItem('relateQuery', arr1)
    console.log(JSON.parse(arr1))
}
// print relateQuery
function printRelateQuery() {
    if (JSON.parse(localStorage.getItem('relateQuery')) != null) {
        queryArr = JSON.parse(localStorage.getItem('relateQuery'))

    }
    relateWeather.innerHTML = ''
    for (i = 0; i < queryArr.length; i++) {
        let relDiv = createEl('div', 'relQuery', queryArr[i])
        relateWeather.append(relDiv)
    }

    console.log(queryArr)
}
printRelateQuery()
    // listen relateWeather
relateWeather.addEventListener('click', e => {
        if (e.target.classList.contains('relQuery')) {
            response(e.target.innerText)
        }
    })
    //получение геоданных
function geo() {
    navigator.geolocation.getCurrentPosition(
        function(position) {

            let coordLat = position.coords.latitude
            let coordLon = position.coords.longitude
            console.log(coordLat, coordLon)
        }
    );

}
// обращение к пиксабэй
const url = 'https://pixabay.com/api/?key=23641816-dcf4d4f9c34852472448f65fc&page=1&per_page=12&q='

function showPhoto(query) {
    console.log(query)
    fetch(url + query).then(response1 => {
        return response1.json()
    }).then(response2 => {
        console.log(response2)
        const contentObject = response2.hits
            // var src = contentObject[2].webformatURL
        body.style.backgroundImage = 'url(' + src + ')';
        let i = 0
        setTimeout(slideCity, 2000)

        function slideCity() {

            if (i < contentObject.length) {
                var src = contentObject[i].webformatURL
                body.style.backgroundImage = 'url(' + src + ')';
                i++
            }
            setTimeout(slideCity, 2000)
        }

    })
}