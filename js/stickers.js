const dragStart = (event) => {
  const style = window.getComputedStyle(event.target, null);
  const str =
    parseInt(style.getPropertyValue("left")) -
    event.clientX +
    "," +
    (parseInt(style.getPropertyValue("top")) - event.clientY) +
    "," +
    event.target.id;
  event.dataTransfer.setData("Text", str);
};

const drop = (event) => {
  event.preventDefault();
  const offset = event.dataTransfer.getData("Text").split(",");
  const dm = document.getElementById(offset[2]);
  dm.style.left = event.clientX + Number(offset[0]) + "px";
  dm.style.top = event.clientY + Number(offset[1]) + "px";
  return false;
};

const dragOver = (event) => {
  event.preventDefault();
  return false;
};

document.addEventListener("DOMContentLoaded", () => {
  const dragContainers = Array.from(
    document.querySelectorAll(".drag-container")
  );
  const draggables = Array.from(
    document.querySelectorAll(".drag-container [draggable]")
  );
  dragContainers.forEach((container) => {
    container.addEventListener("drop", drop);
    container.addEventListener("dragover", dragOver);
  });
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart, false);
  });
});
