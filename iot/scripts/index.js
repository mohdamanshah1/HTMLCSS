const sensorURL = "scripts/data.json";
document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById("cards");

    try {
        const data = await fetchData(sensorURL);

        Object.keys(data).forEach((key) => {
            const item = data[key];
            const card = document.createElement("div");
            card.className = "card";
            card.setAttribute("data-key", key);

            const buttonId = `button-${key}`;
            const valueId = `value-${key}`;
            const statusId = `status-${key}`;

            card.innerHTML = `
          <h2>${key}</h2>
          <p id="${valueId}">${item.value}</p>
          <p>Status: <span id="${statusId}" class="status ${getStatusClass(item.status)}">${item.status}</span></p>
          <button id="${buttonId}" class="sensor-btn on" onclick="toggleSensor('${key}', '${buttonId}', '${valueId}', '${statusId}')">Turn Off</button>
        `;

            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading data:", error);
    }
});

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    return await response.json();
}

function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case "normal":
        case "optimal":
        case "healthy":
            return "good";
        case "high":
            return "warning";
        case "low":
        case "danger":
            return "danger";
        default:
            return "";
    }
}

async function toggleSensor(key, buttonId, valueId, statusId) {
    const button = document.getElementById(buttonId);
    const valueElement = document.getElementById(valueId);
    const statusElement = document.getElementById(statusId);

    if (button.classList.contains("on")) {
        button.classList.remove("on");
        button.classList.add("off");
        button.textContent = "Turn On";
        valueElement.textContent = "--";
        statusElement.textContent = "--";
        statusElement.className = "status";
    } else {
        try {
            const data = await fetchData(sensorURL);
            const sensorData = data[key]; // Get the specific sensor data

            if (sensorData) {
                valueElement.textContent = sensorData.value;
                statusElement.textContent = sensorData.status;
                statusElement.className = `status ${getStatusClass(sensorData.status)}`;

                button.classList.remove("off");
                button.classList.add("on");
                button.textContent = "Turn Off";
            } else {
                console.error(`Sensor data for key "${key}" not found.`);
            }
        } catch (error) {
            console.error("Error re-fetching data:", error);
        }
    }
}
