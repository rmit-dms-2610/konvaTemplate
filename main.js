// find our elements
const stageContainer = document.getElementById("stage-container");
const circleButton = document.getElementById("circle-button");
// find stage width
let stageContainerWidth = stageContainer.offsetWidth;
//console.log(stageContainerWidth);
// find stage height
let stageContainerHeight = stageContainer.offsetHeight;
//console.log(stageContainerHeight);
// set default circle colour
let circleColour = "red";

// create the konva stage
const stage = new Konva.Stage({
    container: "konva-stage",
    width: stageContainerWidth,
    height: stageContainerHeight
});

// create our layer
const firstLayer = new Konva.Layer();


// add the layer to our stage
stage.add(firstLayer);

// add interaction to button
function drawNewCircle(){
    const circle = new Konva.Circle({
        x: stage.width() * Math.random(),
        y: stage.height() * Math.random(),
        radius: 50 * Math.random(),
        fill: circleColour
    });
    // add the circle to our first layer
    firstLayer.add(circle);
}

circleButton.addEventListener("click", drawNewCircle);

// add drawing feature
let isPainting = false;
let lastLine;

function drawMouseDown(){
    isPainting = true;
    const pos = stage.getPointerPosition();
    lastLine = new Konva.Line({
        stroke: 'red',
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round',
        points: [pos.x, pos.y, pos.x, pos.y]
    });
    firstLayer.add(lastLine);
}

stage.on("mousedown", drawMouseDown);

function drawMouseMove(){
    if(!isPainting) {
        return;
    }
    const pos = stage.getPointerPosition();
    const newPoints = lastLine.points().concat([pos.x, pos.y]);
    lastLine.points(newPoints);
}

stage.on("mousemove", drawMouseMove);

function drawMouseUp(){
    isPainting = false;
}

window.addEventListener("mouseup", drawMouseUp);