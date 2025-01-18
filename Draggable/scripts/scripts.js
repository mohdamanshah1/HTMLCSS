$(function () {
    $("#draggable-resizable").draggable({
        containment: "#container"
    }).resizable({
        containment: "#container"
    });
});