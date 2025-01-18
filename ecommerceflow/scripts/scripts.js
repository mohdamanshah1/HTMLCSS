// Function to switch to the next step
function nextStep(stepId) {
    // Hide all steps
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));

    // Show the next step
    document.getElementById(stepId).classList.add('active');

    // If we're on the order summary step, update the summary with the entered data
    if (stepId === 'order-summary') {
        const address = document.getElementById('address').value;
        const card = document.getElementById('card').value;
        document.getElementById('summary-address').innerText = address;
        document.getElementById('summary-card').innerText = card;
    }
}

// Initial step: cart review
document.getElementById('cart-review').classList.add('active');
