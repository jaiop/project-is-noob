song = "";
status = "";
objects = [];

function preload()
{
    song = loadSound("old_telephone.mp3");
}

function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,420);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded()
{
  console.log(" MODEL LOADED!");
  status = true;
  document.getElementById("status").innerHTML = "status : detecting objects";
}
function gotResult(error,results)
{
  if(error)
  {
    console.error(error);
  }
  console.log(results);
  objects = results;
}

function draw()              
{

  image(video, 0,0,640,420);
  
  if(status != "")
  {
    r = random(255);
    g = random(255);
    b = random(255);

    objectDetector.detect(video,gotResult);

    for(i = 0; i < objects.length; i++)
    {
      document.getElementById("status").innerHTML = "status : object detected";
      fill(r,g,b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

      if(objects[i].label == "person")
      {
        document.getElementById("baby_Info").innerHTML = "Baby Found";
        song.stop();
      }
      else
      {
          document.getElementById("baby_info").innerHTML = "Baby not found";
          song.play();
      }
    } 
    if(objects.length == 0)
    {
        document.getElementById("baby_info").innerHTML = "Baby not found";
        song.play();
    }
  }

}