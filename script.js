const apiKey = 'd9234bcebc22b950a84753cff57b4ba8'; // Replace with your OpenWeatherMap API key
const apiUrl =
	'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
	const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

	if (response.status === 404) {
		document.querySelector('.error').style.display = 'block';
		document.querySelector('.weather').style.display = 'none';
	} else {
		var data = await response.json();

		// console.log(data);

		document.querySelector('.temp').innerHTML =
			Math.round(data.main.temp) + '°C';
		document.querySelector('.city').innerHTML = data.name;
		document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
		document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

		if (data.weather[0].main == 'Clouds') {
			weatherIcon.src = 'images/clouds.png';
		} else if (data.weather[0].main == 'Clear') {
			weatherIcon.src = 'images/clear.png';
		} else if (data.weather[0].main == 'Rain') {
			weatherIcon.src = 'images/rain.png';
		} else if (data.weather[0].main == 'Drizzle') {
			weatherIcon.src = 'images/drizzle.png';
		} else if (data.weather[0].main == 'Mist') {
			weatherIcon.src = 'images/mist.png';
		}

		document.querySelector('.weather').style.display = 'block';
		document.querySelector('.error').style.display = 'none';
	}
}

searchButton.addEventListener('click', () => {
	const city = searchBox.value;
	checkWeather(city);
});
