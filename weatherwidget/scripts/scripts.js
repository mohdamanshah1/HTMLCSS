const currentWeather = document.querySelector('.currentWeather');

const forecastWrapper = document.querySelector('.forecastWrapper');

function populateForecast(data) {
    console.log(data);
    currentWeather.innerHTML = '';
    currentWeather.innerHTML = ` <h2>${data.name}</h2>
            <p>
                <span>
                    ${(data.main.temp - 270.15).toFixed(1)}℃
                </span>
                <span>
                    ${data.weather[0].main}
                </span>
            </p>
            <p>
                <span>
                    Wind Speed: ${data.wind.speed}
                </span> 
                <span>
                Wind Direction: ${data.wind.deg}°
                </span>
            </p>`
}


getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("geolocation not supported");
    }
}


async function showPosition(position) {

    const endPoint = "https://api.openweathermap.org/data/2.5/weather";
    const apiKey = "ccea5957421af76b1a078ab873490646";
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url = `${endPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    try {
        const result = await fetch(url);
        const data = await result.json();
        if (result.ok) {
            populateForecast(data);
        }
        else {
            console.log('error occurred');
        }
    }
    catch (err) {
        console.log(err);
    }

}

function showError(error) {
    alert('error in getting location');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

