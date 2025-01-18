let map, infoWindow;
let cityList = document.getElementById('cityList');

function initMap(success) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.58, lng: 77.33 },
        zoom: 12,
    });
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "";
    locationButton.classList.add("currentLocationButton");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                },
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }

    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
}

window.initMap = initMap;

document.getElementById('searchCity').addEventListener('input', async e => {
    const data = e.target.value.trim();
    if (!data) {
        cityList.innerHTML = '';
        return;
    }

    var resposnse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${data}&count=5&language=en&format=json`);

    var result = await resposnse.json();

    cityList.innerHTML = '';

    result.results.forEach(city => {
        const node = document.createElement('li');
        node.innerText = `${city.name}, ${city.admin1 ? city.admin1 + ',' : ""}${city.admin2 ? city.admin2 + ',' : ""}${city.admin3 ? city.admin3 + ',' : ""}${city.admin4 ? city.admin4 + ',' : ""}${city.country || ""}`;
        node.setAttribute('data-lat', city.latitude);
        node.setAttribute('data-lon', city.longitude);


        node.addEventListener('click', e => {
            const button = e.target;
            const pos = {
                lat: Number(button.dataset.lat),
                lng: Number(button.dataset.lon),
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
            cityList.innerHTML = '';
            searchCity.value = '';
        })

        cityList.appendChild(node);
    })

});
