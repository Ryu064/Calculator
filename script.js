//document.getElementById = Dom객체에서 속성의 id값""인 것을 가져오겠다.
//InnerText = html 태그를 해석하지 않고 텍스트를 그대로 출력해줌(있는 그대로를 출력)
function getHistory(){
	return document.getElementById("history-value").innerText;
}
//함수 getHistory 선언 id history-value의 값을 가져와 html태그를 해석하지않고 텍스트 그대로를 가져옴
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
//함수 printHistory(num) 선언 id history-value의 값을 가져와 html태그를 해석하지않고 텍스트 그대로를 가져오되, 텍스트는 숫자임
function getOutput(){
	return document.getElementById("output-value").innerText;
}
//함수 getOutput 선언 id output-value의 값을 가져와 html태그를 해석하지않고 텍스트 그대로를 가져옴
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
/*
함수 printOuput(num) 선언, 
만약 num이 ""과 같다면 ouput-value의 html태그를 해석하지않은 숫자를,
아니라면 getFomattedNumber(num)을 실행한다.
*/
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
/*
함수 getFormattedNumber(num)선언
만약 num이 -과 같다면
""을 불러온다
변수 n = Number(num) 선언
변수 value = 변수n을 미국지역의 숫자 표기 방식을 사용한다.
value를 불러온다.
*/
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}