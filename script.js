//document.getElementById = Dom객체에서 속성의 id값""인 것을 가져오겠다.
//InnerText = html 태그를 해석하지 않고 텍스트를 그대로 출력해줌(있는 그대로를 출력)
function getHistory(){
	return document.getElementById("history-value").innerText;
}
//history-value라는 id를 가진 dom element에 파라미터로 받은 num에 해당하는 값을 부여함
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
//getOutput 펑션 선언, output-value id를 불러와 출력
function getOutput(){
	return document.getElementById("output-value").innerText;
}
//printOutput(num) 펑션 선언, 만일 num이 ""일때 output-value id를 불러와 num에 해당하는 값을 출력함.
//아니라면 output-value id를 불러와 getFormattedNumber(num)에 해당하는 값을 출력함
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
//getFormattedNumber(num)펑션 선언
//만일 numdl "-"일때 ""을 돌려준다
//변수 n은 Number(num)
//변수 value는 n.toLocaleString("en") 미국식 숫자표현방식을 사용
//value의 값을 돌려준다.
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
//reverseNumberFormat(num) 펑션 선언
//Number(num의 값을 ,를 전부 공백으로 바꾼다)의 값을 돌려준다.
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
//변수 operator는 도큐멘트에서 id값이 operator에 해당하는 것을 불러온다.
//반복문 for(변수 i의값이 0일때, operator의 길이가 i보다 클때 i++을 실행시킨다.)
//operator[i]는 클릭시 function()을 실행시킨다.
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
//만일 이 id가 clear일 경우 printHistory("")와 printOutput("")을 실행..?
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
//아니고 만약 이 id가 backspace일 경우 reverseNumberFormat(getOutput()).toString() 을 변수 output에 대입한다.
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
//만일(output)일 경우 output은 output의 끝자리를 제외시키고 output을 출력한다.
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
//그것또한 아니라면 변수output은 getOutput()
//변수 history는 getHistory()로 선언
		else{
			var output=getOutput();
			var history=getHistory();
//만일 output이 ""이고 history가 ""일 때
			if(output==""&&history!=""){
//만약 매개변수가  history의 길이-1
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}

//만약 output이 ""과 같지않을때 혹은 history가 ""과 같지않을때
//output은 output이 ""라면 output을 실행시키고 아니라면 reverseNumberFormat(output)을 실행시킨다.
//history는 history+output이다.
// : 삼항연산자
// 
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;

//만일 이 id값이 = 일때
//result 변수는 eval(histroy의 문자열을 코드로 인식)
//result 출력
//printHistory는 ""을 출력
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
//아니라면 history는 histroy+this.id(마지막에 사용한 id)
//history란 에는 history 출력
//output란 에는 ""출력
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

//변수 number는 도큐멘트에서 id값이 number에 해당하는 것을 불러온다.
var number = document.getElementsByClassName("number");
//반복문 변수 i가 0일떄 number의 길이의 값이 i보다 크다면 i++을 실행
for(var i =0;i<number.length;i++){
//number[i]는 클릭시 function()을 실행시킨다.
	number[i].addEventListener('click',function(){
//변수 output을 reverseNumberFormat(getOutput()) 로 지정
		var output=reverseNumberFormat(getOutput());
//만일 output이 NaN(숫자가 아닐경우)
//output은 output+this.id으로 지정
//output 출력
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}