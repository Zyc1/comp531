var ballImage = new Image();
ballImage.src = "ball.jpg";
var interval;


window.onload = function(){
	canvas = document.querySelector("canvas");
	c = canvas.getContext("2d");
	canvas_width = canvas.width;
	canvas_height = canvas.height;

	if(window.localStorage){
		if(localStorage.getItem('bestScore')==null)
			document.getElementById("bestScore").innerHTML = 0;
		else
			document.getElementById("bestScore").innerHTML = localStorage.getItem('bestScore');
		if(localStorage.getItem('maxCombo')==null)
			document.getElementById("maxCombo").innerHTML = 0;
		else
			document.getElementById("maxCombo").innerHTML = localStorage.getItem('maxCombo');
	}

	initializeConst();
	addListener();
	interval = setInterval(draw,100);
}

function initializeConst(){
	direction = [-1,1]
	ball_radius = 10;
	ball_velY = -15;
	ball_velX = direction[Math.round(Math.random())] * (Math.random()*10+2);
	ball_locX = 490;
	ball_locY = 580;
	ball_state = false;

	block_width = 40;
	block_height = 28;

	paddle_width = 100;
	paddle_height = 20;
	paddle_locX = 450;
	paddle_locY = 600;
	paddle_state = false;
	blocks = generateBlocks();
	blockList = generateBlockList();
	blocks_num = blockList.length;
	formerBlocksNum = blocks_num;
	combo = 0;
	maxScore = 0;

	comboUpdate = false;
}

function addListener(){
	canvas.addEventListener('click',gameStart);
	canvas.addEventListener('mousemove', function(event){paddleMove(event)});
}

function gameStart(){
	if((!ball_state)&&(!paddle_state)){
		level = document.getElementById("level").selectedIndex;
		if(level == 0) ball_velY = -15;
		else if(level == 1) ball_velY = -20;
		else if(level == 2) ball_velY = -25;
	}
	ball_state = true;
	paddle_state = true;
}

function paddleMove(event){
	if(paddle_state) paddle_locX = event.offsetX;
	if(paddle_locX + paddle_width > canvas_width) paddle_locX = canvas_width - paddle_width;
}

function generateBlocks(){
	var blocks = [];
	var row = 8;
	var num = 20;
	var maxNum = canvas_width/block_width;
	for(var i=0;i<row;i++){
		var firstX = (maxNum - num)/2 * block_width;
		var firstY = 50 + block_height * i;
		blocks.push({
			x: firstX,
			y: firstY,
			num: num,
		});
		if(i == row-2) num-=1;
		else num-=3;
	}
	return blocks;
}

function generateBlockList(){
	var blockList = [];
	for(var i=0;i<blocks.length;i++){
		for(var j=0;j<blocks[i].num;j++){
			var block = {
				locX: blocks[i].x+j*40,
				locY: blocks[i].y,
				exist: true,
			}
			blockList.push(block);
		}
	}
	return blockList;
}

function draw(){
	clearCanvas();
	//如果所有block均不存在则游戏通过
	if(blocks_num==0){
		//document.getElementById("score").innerHTML = maxScore + maxCombo * 5;
		showInfo("You Win");
	} 
	drawBlocks();
	drawBall();
	drawPaddle();

	ballMove();
	collision();
	calculateCombo();
}

function drawBlock(locX, locY){
	c.fillStyle = '#fcd3a5';
	c.strokeStyle = "gray";
	c.linewidth = 2;
	c.beginPath();
	c.rect(locX, locY, block_width, block_height);
	c.fill();
	c.stroke();
	c.closePath();
}

function drawBlocks(){
	for(var i=0;i<blockList.length;i++){
		if(blockList[i].exist) drawBlock(blockList[i].locX, blockList[i].locY);
	}
}

function drawBall(){
	c.drawImage(ballImage,ball_locX,ball_locY);
}

function drawPaddle(){
	c.fillStyle = "white";
	c.beginPath();
	c.rect(paddle_locX, paddle_locY, paddle_width, paddle_height);
	c.fill();
	c.closePath();
}

function ballMove(){
	if(ball_state){
		ball_locX += ball_velX;
		ball_locY += ball_velY;
	}
}

function collision(){
	ballWallCollision();
	ballPaddleCollision();
	ballBlockCollision();
}

function ballWallCollision(){
	if(ball_locX + 2*ball_radius > canvas_width || ball_locX < 0){
		ball_velX = -ball_velX;
	}
	if( ball_locY < 0){
		ball_velY = -ball_velY;
	}
	if(ball_locY + 2*ball_radius > canvas_height){
		//最后总分 = 击中的block个数 * 10 + combo * 5
		//maxScore  = maxScore + parseInt(document.getElementById("combo").innerHTML) * 5;
		// document.getElementById("score").innerHTML = maxScore;
		showInfo("Game Over");
	}
}

function ballPaddleCollision(){
	//collide with the top bar of paddle
	if(ball_locY + 2*ball_radius > paddle_locY &&
		ball_locX < paddle_width + paddle_locX &&
		ball_locX > paddle_locX - 2*ball_radius){
		ball_velY = -ball_velY;
		ball_locY = paddle_locY - 2*ball_radius;
		combo = 0;
	}
}

function ballBlockCollision(){
	for(var i=0;i<blockList.length;i++){
		if(blockList[i].exist)
			collide(blockList[i]);
	}
}

function collide(block){
	//撞block上下边(圆心进入block内则视为撞上下边)
	if((ball_locX <= block.locX + block_width - ball_radius)&&(ball_locX > block.locX - ball_radius) &&
		Math.abs(ball_locY+ball_radius - block.locY - block_height/2) < block_height/2 + ball_radius){
		block.exist = false;
		blocks_num--;
		maxScore += 10;
		combo++;
		document.getElementById("score").innerHTML = maxScore;
		ball_velY = -ball_velY;
	}
	//撞block右边及右顶角
	if((ball_locX > block.locX + block_width - ball_radius) && (ball_locX <= block.locX + block_width) &&
		Math.abs(ball_locY+ball_radius - block.locY - block_height/2) < block_height/2 + ball_radius){
		block.exist = false;
		blocks_num--;
		maxScore += 10;
		combo++;
		document.getElementById("score").innerHTML = maxScore;
		ball_velX = -ball_velX;
	}
	//撞block左边及左顶角
	if((ball_locX >= block.locX - 2*ball_radius) && (ball_locX < block.locX - ball_radius) &&
		Math.abs(ball_locY+ball_radius - block.locY - block_height/2) < block_height/2 + ball_radius){
		block.exist = false;
		blocks_num--;
		maxScore += 10;
		combo++;
		document.getElementById("score").innerHTML = maxScore;
		ball_velX = -ball_velX ;
	}
}

function calculateCombo(){
	if(ball_velY>0 && ball_locY > blockList[blocks_num - 1].locY){
		document.getElementById("combo").innerHTML = Math.max(document.getElementById("combo").innerHTML, combo);
	}
}

function showInfo(msg){
	clearInterval(interval);
	c.font = "50px Sanserif"
	c.fillStyle = "white"
	c.fillText(msg,390,350);
	maxScore = maxScore + parseInt(document.getElementById("combo").innerHTML) * 5;
	document.getElementById("score").innerHTML = maxScore;
	var maxCombo = Math.max(document.getElementById("maxCombo").innerHTML, document.getElementById("combo").innerHTML);
	var bestScore = Math.max(document.getElementById("bestScore").innerHTML, maxScore);
	window.localStorage.setItem('bestScore', bestScore);
	window.localStorage.setItem('maxCombo', maxCombo);
	document.getElementById("bestScore").innerHTML = bestScore;
	document.getElementById("maxCombo").innerHTML = maxCombo;
}

function restart(){
	document.getElementById("score").innerHTML = 0;
	document.getElementById("combo").innerHTML = 0;
	initializeConst();
	ball_state = false;
	paddle_state = false;
	interval = setInterval(draw,100);
}

function clearCanvas(){
	c.clearRect(0,0,canvas_width,canvas_height);
}
