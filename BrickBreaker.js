var flag = 1; //배경화면 바꾸기 플래그
var imgUrl;

$(document).ready(function(){
  $("#startButton").on("click", intro);

  $('#startButton').hover(function(){
  $("#main-menu").fadeTo('slow', 0.1, function()
{
  if(flag ==1){
    imgUrl = 'url("background1.jpg")'
  }
  else if(flag==2){
    imgUrl = 'url("background2.jpg")'
  }
  else if(flag==3){
    imgUrl = 'url("background3.jpg")'
  }
  $("#main-menu").css('background-image',imgUrl);
}).fadeTo('slow', 1);
    }, 
    function() {
      $("#main-menu").css('background-image','none');}, 
  )

  //환경설정 - 배경화면 변경
  $("#next").click(function(){
    if($("#bgi").attr("src")=="background1.jpg"){
    ($("#bgi").attr("src","background2.jpg"));
    flag=2;
    }
    else if($("#bgi").attr("src")=="background2.jpg"){
      ($("#bgi").attr("src","background3.jpg"));
      flag=3;
      }
      else if($("#bgi").attr("src")=="background3.jpg"){
        ($("#bgi").attr("src","background1.jpg"));
        flag=1;
        }
  });
  $("#previous").click(function(){
    if($("#bgi").attr("src")=="background1.jpg"){
    ($("#bgi").attr("src","background3.jpg"));
    flag=3;
    }
    else if($("#bgi").attr("src")=="background2.jpg"){
      ($("#bgi").attr("src","background1.jpg"));
      flag=1;
      }
      else if($("#bgi").attr("src")=="background3.jpg"){
        ($("#bgi").attr("src","background2.jpg"));
        flag=2;
        }
  });

  //배경음악 설정
  if($('input[name="bgm"]:checked').attr('id')==select){
    $("#audio").attr("src","bgm1.mp3");
  }
  else if($('input[name="bgm"]:checked').attr('id')==select2){
    $("#audio").attr("src","bgm2.mp3");
  }

  //환경설정 창 닫기
  $("#okButton").click(function(){
    $("#setting").fadeOut("slow");
  });




  $("#intro p:nth-child(2)").on("click",gameMenu);
  $("#game1Button").on("click", game1);
  $("#game2Button").on("click", game2);
  $("#game3Button").on("click", game3);

  $("#menu1").on("click", game1);
  $("#menu2").on("click", game2);
  $("#menu3").on("click", game3);

  $("#settingIcon").on("click",showSetting);

});

//환경설정
function showSetting(){
  $("#setting").fadeIn("slow");
  $("#setting").addClass("popup");
  change_position($(".popup"));
  $("#setting").css("display","block");
}
//환경설정 팝업 위치설정
function change_position(obj){
  var l = ($(window).width()-obj.width())/2;
  var t = ($(window).height()-obj.height())/2;
  obj.css({top:t,left:l});
}
function intro(){
  $("#main-menu").css("display","none"); 
  $("#intro").fadeIn( 2000 );
}
function gameMenu(){
  $("#intro").css("display","none"); 
  $("#game-menu").fadeIn( 2000 );
}
function game1(){
  $("#game-menu").css("display","none"); 
  $("#game1").css("display","block"); 
  for_game1();
}
function game2(){
  $("#game-menu").css("display","none"); 
  $("#game2").css("display","block");
  for_game2();// <<<=====================고현규=============
}

  // ==============================이재호====================================
function game3(){ 
  $("#game-menu").css("display","none");
  $("#game3").css("display","block"); 

  var canvas_Width = screen.availWidth*7/10;
  var canvas_Height = screen.availHeight;
  var canvas;
  var ctx;
  var game3notice;
  var game3noticeButton;
  var current_character;
  var currentstage;
  var life;
  var trueBlock = new Array(4);
  var mouseEvent = function(ev){
    game.paddle.x = ev.offsetX - game.paddle.halfWidth;
    if(game.paddle.x < 0){
      game.paddle.x = 0;
    } else if(game.paddle.x + game.paddle.width > WIDTH){
      game.paddle.x = WIDTH - game.paddle.width;
    }
  };

  canvas = document.getElementById("game3canvas");
  ctx = canvas.getContext('2d');
  game3notice = $("#game3_notice");
  game3notice.fadeIn(2000);

  canvas.setAttribute('width', canvas_Width);
  canvas.setAttribute('height', canvas_Height);

  game3noticeButton = $("#game3_notice button");
  game3noticeButton.click(function(){
    game3notice.css("display","none");      //처음 알림창 확인버튼 클릭 핸들러
    initGameOption();
    startGame();
  })

  $("#game3_replay").click(function(){
    initGameOption();                       //다시하기 버튼 클릭이벤트 핸들러
    startGame();
  })

  function change_Character(){
    var str = "#game3_character"+life;
    current_character = $(str);             //캐릭터 바꾸기
    current_character.css({'top':'1%','right':'41%'});
  }

  function assignTrueBlock(){
    for(var i=0; i<4; i++){
      // trueBlock[i] = Math.floor(Math.random()*2); //0은 왼쪽 1은 오른쪽
      trueBlock[i] = 0;
    }
  }
  function initGameOption(){
    currentstage = 1;                   //게임 변수 초기화
    life = 5;
    assignTrueBlock();
    $("#game3_character5").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'top':'1%', 'right':'41%'});
    $("#game3_character4").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'bottom':'0', 'right':'45%'});
    $("#game3_character3").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'bottom':'0', 'right':'30%'});
    $("#game3_character2").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'bottom':'0', 'right':'15%'});
    $("#game3_character1").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'bottom':'0', 'right':'0'});
    $(".game3_block").css('display','block');
    current_character = $("#game3_character5");
  }

  function character_Jumping(state){
    var decideLR;
    var targetBlock_position;                        //캐릭터 점프
    var targetBlockid;
    var targetTop;
    var targetLeft;

    if(currentstage==4){
      current_character.animate({
        left: current_character.position().top + 100 + 'px'
      }, 2000, 'swing');
    }

    if(state == 'left'){
      decideLR = 'L';
      current_character.css('transform','scaleX(-1)');
    } else if(state == 'right'){
      decideLR = 'R';
      current_character.css('transform','scaleX(1)');
    }
    targetBlockid = ("#game3_block" + currentstage) + decideLR;
    targetBlock_position = $(targetBlockid).position();
    targetTop = targetBlock_position.top;
    targetLeft = targetBlock_position.left;

    current_character.animate({
      top: targetTop - 40 + 'px',
      left: targetLeft - 5 + 'px'
    }, 2000, 'swing');
  }

  function startGame() {
    game = new Game();
    canvas.focus();
    canvas.style.cursor = "none"; 

    canvas.addEventListener("mousemove", mouseEvent);
  }

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var BALL_RADIUS = 10;
  var PADDLE_WIDTH = 200;
  var PADDLE_HEIGHT = 15;
  var PADDLE_X = (WIDTH - PADDLE_WIDTH) / 2;
  var PADDLE_Y = HEIGHT - PADDLE_HEIGHT - 10;
  var PADDLE_SPEED = 7;
  var COLOR = "dodgerblue";


  class Ball { 
    constructor(x, y, radius, speed, angle, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speed = speed;
      this.setAngle(angle);
      this.color = color;
    }
  
    setAngle(angle) {
      var radian = angle / 180 * Math.PI;
      this.mx = this.speed * Math.cos(radian);
      this.my = this.speed * -Math.sin(radian);
    }
  
    move(k) {
      this.x += this.mx * k;
      this.y += this.my * k;
    }
  
    get collideX() {
      if (this.mx > 0) return this.x + this.radius;
      else return this.x - this.radius;
    }
  
    get collideY() {
      if (this.my > 0) return this.y + this.radius;
      else return this.y - this.radius;
    }
  
    collideWall(left, top, right) {
      if (this.mx < 0 && this.collideX < left) this.mx *= -1;
      if (this.mx > 0 && this.collideX > right) this.mx *= -1;
      if (this.my < 0 && this.collideY < top) this.my *= -1;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  class Paddle {
    constructor(x, y, width, height, speed, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.halfWidth = width / 2;
      this.height = height;
      this.speed = speed;
      this.color = color;
    }
  
    get center() { return this.x + this.halfWidth; }
  
    collide(ball) {
      var yCheck = () => this.y - ball.radius < ball.y && 
        ball.y < this.y + ball.radius;
      var xCheck = () => this.x < ball.x && ball.x < this.x + this.width;
      if (ball.my > 0 && yCheck() && xCheck()) {
        const hitPos = ball.x - this.center;
        var angle = 80 - (hitPos / this.halfWidth * 60); // 20 ~ 80
        if (hitPos < 0) angle += 20; // 100 ~ 160
        ball.setAngle(angle);
      }
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.closePath();
    }
  }

  class Bricks {
    constructor(rows, cols, x, y, width, height, color, bricktype) {
      this.rows = rows;
      this.cols = cols;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.brickWidth = width / cols;
      this.brickHeight = height / rows;
      this.count;
      // this.count = rows * cols;
      this.color = color;
      this.data = [];
      // for (var i = 0; i < rows; i++) {
      //   var line = new Array(cols);
      //   line.fill(1);
      //   this.data.push(line);
      // }
      if(bricktype=='left'){
        this.data = [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,1,1,1,0]];
        this.count = 1;
      } 
      else if(bricktype=='right'){
        this.data = [[1,1,1,0,0], [1,0,0,1,0], [1,1,1,0,0], [1,0,0,1,0], [1,0,0,1,0]];
        this.count = 12;
      }
    }
  
    collide(x, y) {
      var row = Math.floor((y - this.y) / this.brickHeight);
      var col = Math.floor((x - this.x) / this.brickWidth);
      if (row < 0 || row >= this.rows) return false;
      if (col < 0 || col >= this.cols) return false;
      if (this.data[row][col]) {
        this.data[row][col] = 0;
        this.count--;
        return true;
      }
      else return false;
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = "lightgray";
      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
          if (!this.data[r][c]) continue;
          var x = this.x + (this.brickWidth * c);
          var y = this.y + (this.brickHeight * r);
          ctx.beginPath();
          ctx.fillRect(x, y, this.brickWidth, this.brickHeight);
          ctx.strokeRect(x, y, this.brickWidth, this.brickHeight);
          ctx.closePath();
        }
      }
    }
  }

  class Game {
    constructor() {
      var ballSpeeds = 12;
      var brickSettings = [
        [5, 5, 200, 50, 350, 350, 'red', 'left'], //rows, cols, x, y, width, height, color
        [5, 5, WIDTH-450, 50, 350, 350, 'blue', 'right']
      ];
  
      this.state = "play";
      this.paddle = new Paddle(PADDLE_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,
        PADDLE_SPEED, COLOR);
      this.ball = new Ball(this.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,
        ballSpeeds, 90, COLOR);
      this.brickleft = new Bricks(...brickSettings[0]);
      this.brickright = new Bricks(...brickSettings[1]);
    }
  
    update() {
      if (this.state != "play") return;

      const DIV = 10;
      for (var i = 0; i < DIV; i++) {
        this.ball.move(1 / DIV);
        this.ball.collideWall(0, 0, WIDTH);
        this.paddle.collide(this.ball);
        if (this.brickleft.collide(this.ball.collideX, this.ball.y)) this.ball.mx *= -1;
        if (this.brickleft.collide(this.ball.x, this.ball.collideY)) this.ball.my *= -1;
        if (this.brickright.collide(this.ball.collideX, this.ball.y)) this.ball.mx *= -1;
        if (this.brickright.collide(this.ball.x, this.ball.collideY)) this.ball.my *= -1;
      }
  
      if (this.ball.y > HEIGHT + 50) this.state = "fall";
      if (this.brickleft.count == 0){
        this.state = "left";
      } 
      if (this.brickright.count == 0){
        this.state = "right";
      } 
    }
  
    draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.brickleft.draw(ctx);
      this.brickright.draw(ctx);
      this.paddle.draw(ctx);
      this.ball.draw(ctx);
    }
  }
  
  function drawText(text) {
    ctx.font = "bold 70px arial";
    ctx.fillStyle = "dodgerblue";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
  }

  var game = null;

  function mainLoop() {
    requestAnimationFrame(mainLoop);

    if (game) {
      game.update();
      game.draw();
      if(currentstage == 5){    //4개의 징검다리를 다 건넜을경우
        drawText("clear");
        canvas.removeEventListener("mousemove", mouseEvent);
        game = null;
        canvas.style.cursor = "Default";
      }
      else if(life == 0){       //목숨이 0인경우
        drawText("fail");
        canvas.removeEventListener("mousemove", mouseEvent);
        game = null;
        canvas.style.cursor = "Default";
      }
      else if(game.state == "fall"){    //공이 아래로 빠졌을경우
        life--;
        currentstage = 1;
        current_character.css('display','none');
        change_Character();
        startGame();
      }
      else if(game.state == "left" && trueBlock[currentstage-1] == 0){  //징검다리 성공
        game.state = 'stop';
        character_Jumping('left');
        currentstage++;
        setTimeout(startGame, 4000);
      }
      else if(game.state == "right" && trueBlock[currentstage-1] == 1){   //징검다리 성공
        game.state = 'stop';
        character_Jumping('right');
        currentstage++;
        setTimeout(startGame, 4000);
      }
      else if(game.state == "right"){
        game.state = 'stop';
        life--;
        character_Jumping('right');
        currentstage = 1;
        current_character.css('display','none');
        change_Character();
        setTimeout(startGame, 4000);
      }
      else if(game.state == "left"){
        game.state = 'stop';
        life--;
        character_Jumping('left');
        currentstage = 1;
        current_character.css('display','none');
        change_Character();
        setTimeout(startGame, 4000);
      }
    }
  }

  mainLoop();
}

// =====================황수빈 (GAME1 임시로 작업하고 있는거)==============================

function for_game1(){
  var canvas = document.getElementById("canvas_for_game1");
  var ctx = canvas.getContext("2d");
  var ballRadius = 10;
  var x = canvas.width/2;
  var y = canvas.height-30;
  var dx = 2;
  var dy = -2;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width-paddleWidth)/2;
  var rightPressed = false;
  var leftPressed = false;
  var brickRowCount = 5;
  var brickColumnCount = 3;
  var brickWidth = 75;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 30;
  var score = 0;
  var lives = 3;
  var background = new Image();
  background.src = "game1_wallpaper.jpeg";
  
  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function(){
      ctx.drawImage(background,0,0);   
  }
  
  var bricks = [];
  for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = true;
      }
      else if(e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = true;
      }
  }

  function keyUpHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = false;
      }
      else if(e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = false;
      }
  }

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
  }
  function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status == 1) {
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount) {
              alert("YOU WIN, CONGRATS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#e11880";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#e11880";
    ctx.fill();
    ctx.closePath();
  }
  function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status == 1) {
          var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#e11880";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#e11880";
    ctx.fillText("Score: "+score, 8, 20);
  }
  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#e11880";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if(y + dy < ballRadius) {
      dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      }
      else {
        lives--;
        if(!lives) {
          alert("GAME OVER");
          document.location.reload();
        }
        else {
          x = canvas.width/2;
          y = canvas.height-30;
          dx = 3;
          dy = -3;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
  }

  draw();
}


// =====================고현규==============================

function for_game2(){
  var canvas = document.getElementById("canvas_for_game2");
  var ctx = canvas.getContext("2d");
  var x = canvas.width/2;
  var y = canvas.height-40;
  var dx = 2;
  var dy = -2;
  var ballRadius = 12; //공의 반지름
  var paddleHeight = 12; //패들높이
  var paddleWidth = 180; //패들 폭
  var paddleX = (canvas.width-paddleWidth)/2; //패들 위치
  var rightPressed = false; // -> 버튼 눌림
  var leftPressed = false; // <- 버튼 눌림

  var brickRowCount = 3; //벽돌의 행 갯수
  var brickColumnCount = 5; //벽돌의 열 갯수
  var brickWidth = 150; //벽돌의 폭
  var brickHeight = 30; //벽돌의 높이
  var brickPadding = 10; //벽돌의 padding
  var brickOffsetTop = 10; //벽돌의 위쪽 여백
  var brickOffsetLeft = 10; //벽돌의 왼쪽 여백

  var score = 0;
  var scoreBoxFullWidth = 980;

  var lives = 10; //목숨갯수

  var canMove = true;

  function reset(again){
    x = canvas.width/2;
    y = canvas.height-40;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width-paddleWidth)/2; //패들 위치

    score = 0;

    lives = 10; //목숨갯수

    canMove = true;

    $("#scoreBox").css({"width":"0px"});

    if(again){
      startInterval();
    }
  }


  //벽돌 배치를 이차원 배열을 이용해서 함
  var bricks = [];
  for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1};
    }
  }

  document.addEventListener("keydown",keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  //document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e) {
    if(e.keyCode == 39) {
      rightPressed = true;
    }
    else if(e.keyCode == 37) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if(e.keyCode == 39) {
      rightPressed = false;
    }
    else if(e.keyCode == 37) {
      leftPressed = false;
    }
  }

  // function mouseMoveHandler(e){
  //   var relativeX = e.clientX = canvas.offsetLeft;
  //   if(relativeX > 0 && relativeX < canvas.width){
  //     paddleX = relativeX - paddleWidth/2;
  //   }
  // }

  function collisionDetection(){
    for(var c = 0; c < brickColumnCount; c++){
      for(var r = 0; r < brickRowCount; r++){
        var b = bricks[c][r];
        if(b.status == 1){
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            $("#scoreBox").animate({width:'+=65px'});
            if(score == brickRowCount*brickColumnCount){
              stopInterval();
              alert("You Win");
              //document.location.reload();
              //for_game2();
              var again = false;
              reset(again);

              // <<<<<<<================= 레벌 3 으로 넘어가는 시점

            }
          }
        }
      }
    }
  }

  // function drawSocre(){
  //   var s = "+=";
  //   s += scoreBoxFullWidth*(score/(brickRowCount*brickColumnCount));
  //   s+="px";
  //   $("#scoreBox").animate({width:'+=10px'});
  // }

  function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives : "+lives, canvas.width-65, 20);
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#e11880";
    ctx.fill();
    ctx.closePath();

  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);

    ctx.fillStyle = "#e11880";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks(){
    for(var c = 0; c < brickColumnCount; c++){
      for(var r = 0; r < brickRowCount; r++){
        if(bricks[c][r].status == 1){
          var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);

          ctx.fillStyle = "#e11880";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if(y + dy < ballRadius) {
        dy = -dy;
      }
      else if(y + dy > canvas.height-ballRadius) {
          if(x >= paddleX && x <= paddleX + paddleWidth) {
            if(x >= paddleX && x < paddleX + paddleWidth/3){
              dy = -(dy/Math.abs(dy));
              dx = -3;
            }else if(x >= paddleX + paddleWidth/3 && x < paddleX + (paddleWidth/3)*2){
              dy = -(dy/Math.abs(dy))*2;
              dx = (dx/Math.abs(dx))*2;
            }else{
              dy = -(dy/Math.abs(dy));
              dx = 3;
            }
          }
          else {
            lives--;
            $("#lifeBox").animate({width:'-=96px'});
            if(!lives){
              alert("GAME OVER");
              stopInterval();
              //document.location.reload();
              //for_game2();
              var again = true;
              reset(again);
            }
            else{
              x = canvas.width/2;
              y = canvas.height-30;
              dx = 2;
              dy = -2;
              paddleX = (canvas.width - paddleWidth)/2;
            }
          }
      }
      if(canMove){
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
          paddleX += 4;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 4;
        }
      }

      x += dx;
      y += dy;

      drawBricks();
      drawBall();
      drawPaddle();
      collisionDetection();
      //drawSocre();
      drawLives();

      //requestAnimationFrame(draw);
  }

  var countNum = 0;
  var texts = ["무","무궁","무궁화","무궁화","무궁화 꽃","무궁화 꽃","무궁화 꽃이","무궁화 꽃이","무궁화 꽃이 피","무궁화 꽃이 피었","무궁화 꽃이 피었습","무궁화 꽃이 피었습니","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!"]

  function textOut(){
    $("#textArea").text(texts[countNum]);
    countNum++;
    if(countNum == 13){
      canMove = false;
      $("#doll_img_for_game2").attr("src","doll_front.png");
      setTimeout(function(){
        countNum = 0;
        $("#doll_img_for_game2").attr("src","doll_back.png");
        canMove = true;
      },1200)
    }
  }

  var textInterval;

  var interv;

  function startInterval(){
    interv = setInterval(draw, 6);
    textInterval = setInterval(textOut,500);
  }
  function stopInterval(){
    clearInterval(interv);
    clearInterval(textInterval);
  }

  startInterval();
}

// =====================고현규============================= 
