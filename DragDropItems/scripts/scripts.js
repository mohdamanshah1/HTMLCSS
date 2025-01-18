const listOfItems = document.getElementById('list');
let draggedItem;

listOfItems.addEventListener('dragstart', e => {
    draggedItem = e.target;
    draggedItem.classList.add('dragging');
})

listOfItems.addEventListener('dragend', e => {
    draggedItem.classList.remove('dragging');
    draggedItem = "";
})

listOfItems.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement =
        getDragAfterElement(
            listOfItems,
            e.clientY);
    
    if (afterElement == null) {
        listOfItems.appendChild(
            draggedItem
        );
    }
    else {
        listOfItems.insertBefore(
            draggedItem,
            afterElement
        );
    }
});

const getDragAfterElement = (
    container, y
) => {
    const draggableElements = [
        ...container.querySelectorAll(
            "li:not(.dragging)"
        ),];

    return draggableElements.reduce(
        (closest, child) => {
            const box =
                child.getBoundingClientRect();
            const offset =
                y - box.top - box.height / 2;
            if (
                offset < 0 &&
                offset > closest.offset) {
                return {
                    offset: offset,
                    element: child,
                };
            }
            else {
                return closest;
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
        }
    ).element;
};

