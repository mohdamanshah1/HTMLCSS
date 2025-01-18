const initialData = {
    labels: [
        "April", "May", "June", "July", "August",
        "September", "October", "November", "December",
        "January", "February", "March"
    ],
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Initialize all values to 0
    label: "Monthly Sales",
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    borderColor: "rgba(75, 192, 192, 1)",
};

const ctx = document.getElementById("salesChart").getContext("2d");

const salesChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: initialData.labels,
        datasets: [
            {
                label: initialData.label,
                data: initialData.data,
                backgroundColor: initialData.backgroundColor,
                borderColor: initialData.borderColor,
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

document.getElementById("inputForm").addEventListener("submit", e => {
    e.preventDefault();
    const selectedMonth = document.getElementById("monthSelect").value;
    const value = parseFloat(document.getElementById("valueInput").value);

    if (!isNaN(value)) {

        const index = salesChart.data.labels.indexOf(selectedMonth);
        if (index !== -1) {
            salesChart.data.datasets[0].data[index] += value;
        }
        salesChart.update();

        document.getElementById("valueInput").value = "";
    } else {
        alert("Please provide valid input!");
    }
});
