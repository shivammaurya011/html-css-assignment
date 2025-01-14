const listItems = document.querySelectorAll("#list li");
let draggedItem = null;

// Add drag events to list items
listItems.forEach((item) => {
    // When drag starts
    item.addEventListener("dragstart", (e) => {
        draggedItem = item;
        setTimeout(() => {
            item.classList.add("dragging");
        }, 0);
    });

    // When drag ends
    item.addEventListener("dragend", () => {
        draggedItem = null;
        item.classList.remove("dragging");
    });

    // When an item is dragged over another
    item.addEventListener("dragover", (e) => {
        e.preventDefault();
        const list = item.parentNode;
        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement == null) {
            list.appendChild(draggedItem);
        } else {
            list.insertBefore(draggedItem, afterElement);
        }
    });
});

// Function to find the element to drop before
function getDragAfterElement(list, y) {
    const draggableElements = [...list.querySelectorAll(".draggable:not(.dragging)")];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}
