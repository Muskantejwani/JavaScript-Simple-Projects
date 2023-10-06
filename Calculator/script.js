let arrayValuesDisplay = [];
let arrayValuesCalculate = [];
let ans = 0;

function insertResult(result) {
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#result").insertAdjacentHTML("beforeend", `${result}`);
}

document.querySelector("#buttons").addEventListener('click', (e) => {

    console.log(e.target.classList[1]);
    if (e.target.classList[1] === 'btn-num') {
        arrayValuesCalculate.push(e.target.innerText*1);
        arrayValuesDisplay.push(e.target.innerText*1);
    }

    if (e.target.classList[2] === 'btn-sign') {
        changeSign();
    }
    
    if (e.target.classList[1] === "btn-dot") {
        arrayValuesCalculate.push('.');
        arrayValuesDisplay.push('.');
    }

    if (e.target.classList[1] === 'btn-special' && e.target.classList[3] != 'btn-none') {

    arrayValuesDisplay.push(e.target.innerText);
        
        if (e.target.classList[2] == 'btn-mult') {
            arrayValuesCalculate.push('*');
        } else if (e.target.classList[2] == 'btn-sqrt') {
            arrayValuesCalculate.push('Math.sqrt ');
            arrayValuesCalculate.push('(');
            arrayValuesDisplay.push('(');
        }
        //  
        else {
            arrayValuesCalculate.push(e.target.innerText);
        }
    }

    if (e.target.classList[2] === 'btn-Ans') {
        arrayValuesCalculate.push(ans);
        arrayValuesDisplay.push('Ans');
    }
    updateDisplay();
})

let modeOnlyDigitKey = 0;
function checkEXPMode(e) {
    if( (e.target.classList[1] != 'btn-num' &&
            e.target.classList[1] != 'btn-dot' &&
            e.target.classList[1] != 'btn-del') &&
            e.target.classList[2] != 'btn-sign') {
        if (modeOnlyDigitKey == 1) {
            console.log('entered EXP mode check?');
            arrayValuesCalculate.push('*1)');
            arrayValuesDisplay.push("</sup>");
            modeOnlyDigitKey = 0;
        };
    }
}

function updateDisplay() {
    if (arrayValuesCalculate[arrayValuesCalculate.length-2] == '*' && arrayValuesCalculate[arrayValuesCalculate.length-1] == '*') {
        arrayValuesDisplay.pop();
        arrayValuesCalculate.pop();
        document.querySelector("#display").innerText = arrayValuesDisplay.join('');
    } else {
            document.querySelector("#display").innerHTML = arrayValuesDisplay.join('');
    }
}

const availableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+','/', '-', '(', ')'];
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key == "Escape") {document.querySelector("#btn-AC").click();}
    else if (e.key == "Enter") {document.querySelector("#btn-equal").click();} 
    else if (e.key == 'Backspace') {document.querySelector("#Del").click();}
    else if (e.key == '*') { document.querySelector('.btn-mult').click();}
    else if (availableChars.indexOf(e.key) > -1) {

        if (availableChars.indexOf(e.key) <= 9) {
            arrayValuesCalculate.push(e.key*1);
            arrayValuesDisplay.push(e.key*1);
        } else {
            arrayValuesCalculate.push(e.key);
            arrayValuesDisplay.push(e.key);
        }
    }
    updateDisplay();
})

document.querySelector("#btn-AC").addEventListener('click', (e) => {
    arrayValuesCalculate = [];
    arrayValuesDisplay = [];
    inputVal = "";
    strNums = "";
    strFuns = "";
    result = 0;
    // saveToHistorial();
    document.querySelector("#display").innerHTML = "";
    document.querySelector("#result").innerHTML = "=";
})

document.querySelector("#Del").addEventListener('click', (e) => { 
    
    if (arrayValuesDisplay[arrayValuesDisplay.length - 1] == '</sup>') {
        arrayValuesCalculate.pop();
        arrayValuesDisplay.pop();
        modeOnlyDigitKey = 1;
    }
    if (arrayValuesDisplay[arrayValuesDisplay.length - 1] == 'x10<sup>') {
        modeOnlyDigitKey = 0;
    }

    arrayValuesCalculate.pop();
    arrayValuesDisplay.pop();
    
})

let expression = "";
let result = 0;
let found = "";
document.querySelector("#btn-equal").addEventListener('click', (e) => {
    checkEXPMode(e);
    expression = arrayValuesCalculate.join('');
    found = expression.match(/\d+(?=\()|\d+(?=M)/g); 
    expression = expression.replace(/\d+(?=\()|\d+(?=M)/g, `(${found})*`); 
    expression = expression.replace(/\)(?=\d+)/g, ")*"); 
    expression = expression.replace(/\)\(/g, ")*("); 
    expression = countParenthesesAndFix(expression);
    expression = expression.replace(/\s/g, '');
    calculate(expression);
    insertResult(result);
});

function calculate(expression) {
    try {
        result = eval(expression);
        ans = result;
        return result
    }
    catch(err) {
        result = "Error";
        return result
    } 
}

function countParenthesesAndFix(expression) {
    if (expression.match(/\(/g)) {
        let parenthesescount = 0;
        if (expression.match(/\)/g)) {
            parenthesescount = expression.match(/\(/g).length - expression.match(/\)/g).length
        }else {
            parenthesescount = expression.match(/\(/g).length;
        }
        while (parenthesescount > 0) {
            expression = expression.concat(')');
            parenthesescount = expression.match(/\(/g).length - expression.match(/\)/g).length
            
        }
    }
    return expression
}
