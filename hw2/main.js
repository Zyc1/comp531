var count1 = 0;
var count2 = 0;
var count3 = 0;
var inertvalId1;
var intervalId2;
var intervalId3;


function getRandom(){
	return Math.random() * 4 + 1;
}

var buttonClick = function(name){
	var button = document.getElementById(name);
	if(button.value == "Stop"){
		button.value = "Start";
		if(name == "button1") clearInterval(intervalId1);
		else if(name == "button2") clearInterval(intervalId2);
		else clearInterval(intervalId3);
	}
	else if(button.value == "Start"){
		button.value = "Stop";
		if(name == "button1") intervalId1 = setInterval(changeImg1, getRandom()*1000);
		else if(name == "button2") intervalId2 = setInterval(changeImg2, getRandom()*1000);
		else intervalId3 = setInterval(changeImg3, getRandom()*1000);
	}
}


function changeImg1(){
	var button1 = document.getElementById("button1");
	if(button1.value == "Stop"){
		var children = document.getElementById("td1").children;
		var num = children.length - 2;
		children[count1 % num].style = "display: none";
		count1++;
		children[count1 % num].style = "visibility: visible";
	}
}

function changeImg2(){
	var button2 = document.getElementById("button2");
	if(button2.value == "Stop"){
		var children = document.getElementById("td2").children;
		var num = children.length - 2;
		children[count2 % num].style = "display: none";
		count2++;
		children[count2 % num].style = "visibility: visible";
	}
}

function changeImg3(){
	var button3 = document.getElementById("button3");
	if(button3.value == "Stop"){
		var children = document.getElementById("td3").children;
		var num = children.length - 2;
		children[count3 % num].style = "display: none";
		count3++;
		children[count3 % num].style = "visibility: visible";
	}
}

intervalId1 = setInterval(changeImg1, getRandom()*1000);
intervalId2 = setInterval(changeImg2, getRandom()*1000);
intervalId3 = setInterval(changeImg3, getRandom()*1000);
