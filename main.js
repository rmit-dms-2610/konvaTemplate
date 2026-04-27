// find our elements
const stageContainer = document.getElementById("stage-container");
const circleButton = document.getElementById("circle-button");
const imgUpload = document.getElementById("img-upload");
// find stage width
let stageContainerWidth = stageContainer.offsetWidth;
//console.log(stageContainerWidth);
// find stage height
let stageContainerHeight = stageContainer.offsetHeight;
//console.log(stageContainerHeight);
// set default circle colour
let circleColour = "red";
// save last uploaded image
let lastImageUploaded = null;

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

// list of features
// draw on canvas
// eraser
// colour select


// drawing feature
// feature analysis
// what is the user goal? trying to draw a picture
// what is the represented model? cursor on the canvas : defined canvas : brush select : brush on?
// colour? or would that be its own system?
// how does it behave?
// move our cursor onto canvas, press mouse button down, move mouse, release mouse button
// what is the implemented model? create a new line when mouse button down, add to that line when mouse moves
// how does it interact with other features?
// colour, images for the brush, eraser, uploaded image

// keep track of when button is held
let isDrawing = false;
let lastLine;

// user presses mouse button
function drawMouseDown(){
    isDrawing = true;
    const pos = stage.getPointerPosition();
    lastLine = new Konva.Line({
        stroke: "red",
        strokeWidth: 5,
        lineCap: "round",
        lineJoin: "round",
        points: [pos.x, pos.y, pos.x, pos.y]
    });
    firstLayer.add(lastLine);
}
// add function to mousedown event
stage.on("mousedown", drawMouseDown);

// user moves their mouse
function drawMouseMove(){
    //console.log(Date.now());
    // don't run if not drawing
    if(isDrawing === false){
        return;
    }
    // if isDrawing is true
    const pos = stage.getPointerPosition();
    let newPoints = lastLine.points().concat([pos.x, pos.y]);
    lastLine.points(newPoints);
}
// add function to mousemove event
stage.on("mousemove", drawMouseMove);

// user releases mouse button
function drawMouseUp(){
    isDrawing = false;
}
// add function to mouseup event
//stage.on("mouseup", drawMouseUp);
window.addEventListener("mouseup", drawMouseUp);


// feature analysis
// goal : user to upload their own image to use in canvas
// represented model : file input
// behaviour : user clicks button, selects file, accepts selection, add to canvas
// implemented model : convert file to URL, add to Konva as new Image object

// function for storing the image
function storeUploadedImage(e){
    lastImageUploaded = URL.createObjectURL(e.target.files[0]);
    console.log(lastImageUploaded);
    addImageURLToCanvas(lastImageUploaded);
}
imgUpload.addEventListener("change", storeUploadedImage);


// function for adding image to canvas
function addImageURLToCanvas(url){
    const imgObject = new Image();
    imgObject.onload = () => {
        if(imgObject.width > stage.width()){
            // do something to scale it
        }
        // this will run when img is loaded
        const konvaImage = new Konva.Image({
            x: stage.width() / 2,
            y: stage.height() /2,
            image: imgObject,
            width: 20,
            height: 20
        });
        firstLayer.add(konvaImage);
    }
    imgObject.src = url;
}