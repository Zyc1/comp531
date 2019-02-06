var nameInput;
var emailInput;
var telInput;
var zipInput;
var passwordInput;
var confirmInput;

var initName;
var initEmail;
var initTel;
var initZip;
var initPassword;
var initConfirm;

var nameMsg;
var emailMsg;
var telMsg;
var zipMsg;
var passwordMsg;
var confirmMsg;

var emailPattern = /^([A-Za-z0-9_\-])+\@([A-Za-z0-9_\-])+[\.]{0,1}[A-Za-z]{0,4}/;
var telPattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
var zipPattern = /[1-9]{1}[0-9]{4}/;

var confirmation = true;

window.onload = function(){
	nameInput = document.getElementById("nameInput");
	emailInput = document.getElementById("emailInput");
	telInput = document.getElementById("telInput");
	zipInput = document.getElementById("zipInput");
	passwordInput = document.getElementById("passwordInput");
	confirmInput = document.getElementById("confirmInput");

	initName = document.getElementById("initName");
	initEmail = document.getElementById("initEmail");
	initTel = document.getElementById("initTel");
	initZip = document.getElementById("initZip");
	initPassword = document.getElementById("initPassword");
	initConfirm = document.getElementById("initConfirm");

	nameMsg = document.getElementById("nameMsg");
	emailMsg = document.getElementById("emailMsg");
	telMsg = document.getElementById("telMsg");
	zipMsg = document.getElementById("zipMsg");
	passwordMsg = document.getElementById("passwordMsg");
	confirmMsg = document.getElementById("confirmMsg");
}

//hide the third colomn of table before each update operation
function clear(){
	nameMsg.style = "display: none;";
	emailMsg.style = "display: none;";
	telMsg.style = "display: none;";
	zipMsg.style = "display: none;";
	passwordMsg.style = "display: none;";
	confirmMsg.style = "display: none;"; 
	confirmation = true;
}

//validate email, phone number, password and zip code
function validation(){
	if(emailInput.value!="" && !emailPattern.test(emailInput.value)){
		emailMsg.innerHTML = "* Please check your email pattern";
		emailMsg.style = "visibility: visible; color: red;";
		confirmation = false;
	}

	if(telInput.value!="" && !telPattern.test(telInput.value)){
		telMsg.innerHTML = "* Please check your phone number pattern";
		telMsg.style = "visibility: visible; color: red;";
		confirmation = false;
	}

	if(zipInput.value!="" && !zipPattern.test(zipInput.value)){
		zipMsg.innerHTML = "* Please check your zip code pattern";
		zipMsg.style = "visibility: visible; color: red;";
		confirmation = false;
	}

	if((passwordInput.value==""&& confirmInput.value!="")|| (passwordInput.value!=""&& confirmInput.value=="")){
		passwordMsg.innerHTML = "* You must enter both password and confirmation for updating your password."
		confirmMsg.innerHTML = "* You must enter both password and confirmation for updating your password."
		passwordMsg.style = "visibility: visible; color: red;";
		confirmMsg.style= "visibility: visible; color: red;";
		confirmation = false;
	}
	else if(passwordInput!=""&&confirmInput.value!=""&&passwordInput.value != confirmInput.value){
		passwordMsg.innerHTML = "* The password and confimation do not match. Please re-enter."
		confirmMsg.innerHTML = "* The password and confimation do not match. Please re-enter."
		passwordMsg.style = "visibility: visible; color: red;";
		confirmMsg.style = "visibility: visible; color: red;";
		confirmation = false;
	}


	if(nameInput.value != "" && confirmation){
		nameMsg.innerHTML = "* Update Display Name from "+initName.innerHTML+" to "+nameInput.value;
		nameMsg.style = "visibility: visible";
		initName.innerHTML = nameInput.value;
		nameInput.value = "";
	}
}

//update the information using user input
function update(){
	clear();
	validation();
	if(nameInput.value != "" && confirmation){
		nameMsg.innerHTML = "* Update Display Name from "+initName.innerHTML+" to "+nameInput.value;
		nameMsg.style = "visibility: visible";
		initName.innerHTML = nameInput.value;
		nameInput.value = "";
	}



	if(emailInput.value != ""&& confirmation){
		emailMsg.innerHTML = "* Update Display Name from "+initEmail.innerHTML+" to "+emailInput.value;
		emailMsg.style = "visibility: visible;";
		initEmail.innerHTML = emailInput.value;
		emailInput.value = "";
	}
	
	if(telInput.value != ""&& confirmation){
		telMsg.innerHTML = "* Update Display Name from "+initTel.innerHTML+" to "+telInput.value;
		telMsg.style = "visibility: visible";
		initTel.innerHTML = telInput.value;
		telInput.value = "";
	}

	if(zipInput.value != ""&& confirmation){
		zipMsg.innerHTML = "* Update Display Name from "+initZip.innerHTML+" to "+zipInput.value;
		zipMsg.style = "visibility: visible";
		initZip.innerHTML = zipInput.value;
		zipInput.value = "";
	}

	if(passwordInput.value != ""&& confirmation){
		passwordMsg.innerHTML = "* Update Display Name from "+initPassword.innerHTML+" to "+passwordInput.value;
		passwordMsg.style = "visibility: visible";
		initPassword.innerHTML = passwordInput.value;
		passwordInput.value = "";
	}
	if(confirmInput.value != ""&& confirmation){
		confirmMsg.innerHTML = "* Update Display Name from "+initConfirm.innerHTML+" to "+confirmInput.value;
		confirmMsg.style = "visibility: visible";
		initConfirm.innerHTML = confirmInput.value;
		confirmInput.value = "";
	}

}