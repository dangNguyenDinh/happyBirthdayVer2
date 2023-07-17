//tao nen man hinh random so 
var randomNumberLine = document.querySelectorAll(".randomNumber");
var randomNumberLineCount = randomNumberLine.length;
var mainInterval = setInterval(()=>{   
    for(let i=0;i<randomNumberLineCount;i++){
        randomNumberLine[i].innerHTML = `${Math.floor(Math.random()*9)}`;
    }
},1000);

//music
function play() {
  var audio = document.getElementById("audio");
  audio.play();
}

document.querySelector("#start").onclick = ()=>{
    document.querySelector("#start").remove();
    document.querySelector("#password").style.display = "block";
}
document.querySelector("#password button").onclick = ()=>{
    if(document.querySelector("#password .password").value == "TRUONG MY TAM"){  //password here
        alert("dangVuDinh has just sent you a message.");
        document.querySelector("#password").remove();

        // random ngay sinh
       
        document.querySelector("#loading").style.display = "block"
        var num1 = document.querySelector("#loading .num1");
        var num2 = document.querySelector("#loading .num2");
        var num3 = document.querySelector("#loading .num3");
        var num4 = document.querySelector("#loading .num4");
        var num5 = document.querySelector("#loading .num5");
        var num6 = document.querySelector("#loading .num6");

        var isTrue1 = false;
        var isTrue2 = false;
        var isTrue3 = false;
        var isTrue4 = false;
        var isTrue5 = false;
        var isTrue6 = false;

        var interval1 = setInterval(()=>{
            num1.innerHTML = Math.floor(Math.random()*9);
            if(num1.textContent == '1'){
                clearInterval(interval1);
                isTrue1 = true;
            }
        },200);
        var interval2 = setInterval(()=>{
            num2.innerHTML = Math.floor(Math.random()*9);
            if(num2.textContent == '5'){
                clearInterval(interval2);
                isTrue2 = true;
            }
        },200);
        var interval3 = setInterval(()=>{
            num3.innerHTML = Math.floor(Math.random()*9);
            if(num3.textContent == '0'){
                clearInterval(interval3);
                isTrue3 = true;
            }
        },200);
        var interval4 = setInterval(()=>{
            num4.innerHTML = Math.floor(Math.random()*9);
            if(num4.textContent == '7'){
                clearInterval(interval4);
                isTrue4 = true;
            }
        },200);
        var interval5 = setInterval(()=>{
            num5.innerHTML = Math.floor(Math.random()*9);
            if(num5.textContent == '0'){
                clearInterval(interval5);
                isTrue5 = true;
            }
        },200);
        var interval6 = setInterval(()=>{
            num6.innerHTML = Math.floor(Math.random()*9);
            if(num6.textContent == '4'){
                clearInterval(interval6);
                isTrue6 = true;
            }
        },200);
        var trueInterval = setInterval(()=>{
            if(isTrue1 == true && isTrue2 == true && isTrue3 == true && isTrue4 == true && isTrue5 == true && isTrue6 == true){
                document.querySelector("#loading").style.display = "none";
                document.querySelector("#decoding").style.display = "block";
                setTimeout(()=>{
                    document.querySelector("#canvas").style.display = "block";
                    document.querySelector("#happy").style.display = "block";
                    play();
                    clearInterval(trueInterval);
                    clearInterval(mainInterval);
                    document.querySelector("#wrapper").style.display = "none";
                    document.querySelector("#decoding").style.display = "none";
                },5000);
                
            };

        },2000)
        

    }else{
        document.querySelector("#password").style.display = "none";
        document.querySelector("#wrongPassword1").style.display = "block";
        setTimeout(()=>{
            document.querySelector("#wrongPassword2").style.display = "block";
        },1000)
    }
}

//la cay
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    things = [],
    thingsCount = 124,
    mouse = {
      x: -100,
      y: -100
    },
    minDist = 150;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// object image
var image = new Image();
image.src = './assetForHappybirthday2/leaf.png';
// image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Love_heart_uidaodjsdsew.gif/1200px-Love_heart_uidaodjsdsew.gif';
// image.src = 'https://static.wixstatic.com/media/2cd43b_57438aebde5a4b0fa20c6880a9fafabf~mv2.png/v1/fill/w_320,h_272,fp_0.50_0.50/2cd43b_57438aebde5a4b0fa20c6880a9fafabf~mv2.png';

for (var i = 0; i < thingsCount; i++) {
  let opacity = Math.random() + 0.4;
  let thingWidth = (Math.floor(Math.random() * 20) + 20) * (opacity + 0.4);
  let thingHeight = image.naturalHeight / image.naturalWidth * thingWidth;
  let speed = Math.random() * 1 + 0.5;
  things.push({
    width: thingWidth,
    height: thingHeight,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - thingHeight,
    speed: speed,
    vY: speed,
    vX: 0,
    d: Math.random() * 1.2 - 0.6, // wind or something like that
    stepSize: (Math.random()) / 20,
    step: 0,
    angle: Math.random() * 180 - 90,
    rad: Math.random(),
    opacity: opacity,
    _ratate: Math.random() // ratate 正負
  });
}

function drawThings() {
  things.map((thing) => {
    ctx.beginPath();
    thing.rad = (thing.angle * Math.PI) / 180;
    ctx.save();
    var cx = thing.x + thing.width / 2;
    var cy = thing.y + thing.height / 2;
    ctx.globalAlpha = thing.opacity;
    ctx.setTransform(
      Math.cos(thing.rad),
      Math.sin(thing.rad),
      -Math.sin(thing.rad),
      Math.cos(thing.rad),
      cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
      cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
    );
    ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);
    ctx.restore();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawThings();
}

function update() {
  things.map((thing) => {
    var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);
    
    if (dist < minDist) {
      var force = minDist / (dist * dist),
          xcomp = (mouse.x - thing.x) / dist,
          ycomp = (mouse.y - thing.y) / dist,
          deltaV = force * 2; // deplay when hover mouse

      thing.vX -= deltaV * xcomp;
      thing.vY -= deltaV * ycomp;
      
      if (thing.d * xcomp > 0) {
        thing.d = 0 - thing.d;
      }
    } else {
      thing.vX *= .98;

      if (thing.vY < thing.speed) {
        thing.vY = thing.speed
      }

      thing.vX += Math.cos(thing.step += (Math.random() * 0.05)) * thing.stepSize;
    }
    
    thing.y += thing.vY;
    thing.x += thing.vX + thing.d;
    
    var _angle = Math.random() + 0.2;
    // stuff.angle += _angle;
    if (thing._ratate == 0) {
      thing.angle += _angle;
    } else {
      thing.angle -= _angle;
    }
    
    if (thing.y > canvas.height) {
      reset(thing);
    }

    if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
      reset(thing);
    }
  });
}

function reset(thing) {
  thing.opacity = Math.random() + 0.4;
  thing.width = (Math.floor(Math.random() * 20) + 20) * (thing.opacity + 0.4);
  thing.height = image.naturalHeight / image.naturalWidth * thing.width;
  thing.x = Math.floor(Math.random() * canvas.width);
  thing.y = 0 - thing.height;
  thing.speed = Math.random() * 1 + 0.5
  thing.vY = thing.speed;
  thing.vX = 0;
  // thing.angle = 0;
  // thing.size = 0;
  thing._ratate = Math.random();
}

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();

