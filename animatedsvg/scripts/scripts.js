
animate();

function animate() {
    window.requestAnimationFrame(animate);
    const hourHand = document.getElementById('hour');
    const minuteHand = document.getElementById('minute');
    const secondHand = document.getElementById('second');


    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    hourHand.setAttribute("transform", `rotate(${(360 / 12) * hour})`);
    minuteHand.setAttribute("transform", `rotate(${(360 / 60) * minute})`);
    secondHand.setAttribute("transform", `rotate(${(360 / 60) * second})`);
}