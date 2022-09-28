// global variables for Calculator
var expression = '';
var isResult = false;
var result = 0;
var numb = 0;
var expr = [];


function getSeason() {

    const season = ['winter', 'spring', 'summer', 'autumn'];
    const month = ['December','January','February','March','April','May','June','July','August','September','October','November'];
    const result = document.getElementById("resultSeason");

    let monthNumber = document.getElementById("month_number").value;

    monthNumber = (monthNumber == 12) ? 0 : monthNumber;
    let seasonNumber = parseInt(monthNumber/3);
    let article = (seasonNumber==3) ? ' is an ' : ' is a ';
        
    result.innerHTML =  month[monthNumber] + article + season[seasonNumber] +' month'
    
}


function getMaximum() {

    const result= document.getElementById("resultMax");
    const numb1 = document.getElementById("first_number").value;
    const numb2 = document.getElementById("second_number").value;
    const numb3 = document.getElementById("third_number").value;

    let max = (numb1 > numb2 ) ? numb1 : numb2;
    max = (max < numb3) ? numb3 : max;

    result.innerHTML = 'MAX('+ numb1 + ', '+ numb2 + ', ' +numb3 +') = '+ max;
}


function calculateExpression (array) {

    let arr = array;
    let operIndex = 0;

    // do multiplication or division 
    operIndex = arr.findIndex(element => element=='*' || element=='/');
    while (operIndex != -1) {
        if (arr[operIndex] == '*') {
            arr[operIndex-1] = arr[operIndex-1] * arr[operIndex+1];
        } else {
            if (arr[operIndex+1] != 0) {
                arr[operIndex-1] = arr[operIndex-1] / arr[operIndex+1];
            } else {
                return "Division by zero error";
            }
        }
        arr.splice(operIndex,2);
        operIndex = arr.findIndex(element => element=='*' || element=='/');
    }
    // do addition or subtraction
    operIndex = arr.findIndex(element => element=='+' || element=='-');
    while (operIndex != -1) {
        if (arr[operIndex] == '+') {
            arr[operIndex-1] = arr[operIndex-1] + arr[operIndex+1];
        } else {
            arr[operIndex-1] = arr[operIndex-1] - arr[operIndex+1];
        }
        arr.splice(operIndex,2);
        operIndex = arr.findIndex(element => element=='+' || element=='-');
    }
    return arr[0];
}

// event for all buttons of Calculator
document.getElementById('buttons').addEventListener('click', (event) => {

    const expression_field = document.getElementById('expression');
    const result_field = document.getElementById('result');

    if (event.target.nodeName != 'BUTTON') {
      return;
    }

    let symb = String(event.target.id).substring(1);;  // indicate which button is pressed

    if (isResult && event.target.id != 'bClear') {
        alert('To start new calculation press "Clear"');
    } else {
        switch (symb) {
            case 'Clear' : {
                // Clear button is pressed
                isResult = false;
                result = 0;
                expression = '';
                expr = [];
                numb = 0;
                break;
            }
            case '=' : {
                // calculate expression
                expr.push(numb);
                // call calculation function
                result = calculateExpression(expr);
                isResult = true;
                break;
            }
            default : {
                if (isNaN(symb)) {
                    // non-numeric button is pressed
                    if (expression!='') {
                        if (isNaN(expression.slice(-1))) {
                            // check if second non-numeric symbol is pressed
                            alert('Error! Numeric symbol is expected');
                        } else {
                            expression = expression + symb;
                            expr.push(numb);
                            expr.push(symb);
                            numb = 0;
                        }
                    } 
                    
                } else {
                    // numeric button is pressed
                    expression = expression + symb;
                    numb = numb * 10 + parseInt(symb)
                }
               
            }
        }
        expression_field.innerHTML = expression;
        result_field.innerHTML = (result != 0) ?  result : '';
    }
    
})

