const elements = document.querySelectorAll('.interactable');
const detailsPanel = document.getElementById('details-panel');

elements.forEach(element => {
  element.addEventListener('mouseenter', (event) => {
    const description = event.target.getAttribute('data-description');
    detailsPanel.textContent = description;
    detailsPanel.style.display = 'block';
  });

  element.addEventListener('mouseleave', () => {
    detailsPanel.style.display = 'none';
  });

  element.addEventListener('mousedown', () => {
    detailsPanel.textContent = "Long press detected!";
    detailsPanel.style.display = 'block';
  });
});
