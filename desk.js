img="";
status="";
objects=[];
function preload() {
    img=loadImage('https://img.buzzfeed.com/buzzfeed-static/static/2019-05/16/11/asset/buzzfeed-prod-web-06/sub-buzz-16328-1558019986-1.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto');
}

function setup() {
    canvas=createCanvas(640, 420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}
function modelLoaded() {
    console.log("DA MODAL IS LOADEDD!!!!!!!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error();
    }
    console.log(results);
    objects=results;
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="Status: Object(s) Detected";

            fill('#FF0000');
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label, objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}