const tipForm = document.getElementById("tip-form")
const resetBtn = document.getElementById("submit-btn")
const billErrorMsg = document.getElementById("bill-error-msg")
const peopleErrorMsg = document.getElementById("people-error-msg")
const numPeople = document.getElementById("num-people")
const billInput = document.getElementById("bill")
const tipPerPersonNode = document.getElementById("tip-per-person")
const totalPerPersonNode = document.getElementById("total-per-person")
const customPercent = document.getElementById("custom-percent")
const tipErrorPercent = document.getElementById("tip-error-msg")

const BILL_REGEX = /^\d+$|^\d+(?:\.\d{2})$/
const NUM_REGEX = /^[1-9]\d*$/
const BILL_ERR_MSG = "Must be in USD format."
const NUM_ERR_MSG = "Must be positive"

//Is used to check if the user input is correct, then enables the submit btn.
tipForm.addEventListener('input', event => {
    let targetName = event.target.name
    let percentAmount;

    //enable button to reset at anytime
    resetBtn.disabled = false;

    //try getting the current selected tip-amount. set it to null if error occurs
    try {
        percentAmount = document.querySelector('input[name="tip-amount"]:checked').id
    } catch (error) {
        percentAmount = customPercent.value;
    }

    //if there is errors, display approrate message
    checkForErrors(targetName, event.target.type)

    //check to see if all inputs are valid, if not, don't do calculations
    if(isAllValid()){
        calculateTip(billInput.value, percentAmount, numPeople.value)
    }
    
})

//calculates tip with the help of currency.js
//Source: https://github.com/scurker/currency.js/
function calculateTip(bill, tip, numPeople){
    const totaltip = currency(Number(bill)).multiply((Number(tip) / 100))
    const tipPerPerson = totaltip.divide(Number(numPeople))
    const totalPerPerson = currency(Number(bill)).add(totaltip).divide(Number(numPeople))

    //displays the answer to the user
    totalPerPersonNode.innerText = totalPerPerson.format()
    tipPerPersonNode.innerText = tipPerPerson.format()
}


//Will return true if all user input is valid
function isAllValid(){
    return (
        BILL_REGEX.test(billInput.value) && 
        (NUM_REGEX.test(customPercent.value) || 
        document.querySelector('input[name="tip-amount"]:checked')) &&  
        NUM_REGEX.test(numPeople.value)
        )
}

//if custom percent is clicked, check if any other percent radio btn has been clicked
//if it is, uncheck it. then calculate input if all input is valid
customPercent.addEventListener("click", event => {
    let percentAmount;

    //try getting the current selected tip-amount. set it to null if error occurs
    try {
        percentAmount = document.querySelector('input[type="radio"][name="tip-amount"]:checked')
        percentAmount.checked = false
        
        //check to see if all inputs are valid, if not, don't do calculations
        if(isAllValid()){
            calculateTip(billInput.value, customPercent.value, numPeople.value)
        }
    } catch (error) {
        percentAmout = null;
    }

    
})

//Check if user's input is correct based on the name attribute
//if incorrect display error
function checkForErrors(inputName, inputType){
    if(inputName == "bill"){
        isInputValid(billInput, BILL_REGEX, BILL_ERR_MSG, billErrorMsg)
    }
    else if(inputName == "tip-amount"){
        if(inputType == "text"){
            isInputValid(customPercent, NUM_REGEX, NUM_ERR_MSG, tipErrorPercent)
        }else{
            tipErrorPercent.innerText = ""
        }
    }
    else if(inputName == "num-people"){
        isInputValid(numPeople, NUM_REGEX, NUM_ERR_MSG, peopleErrorMsg)
    }
}

/* 
Checks to see if user input is valid based on the regex, 
if invalid, show approprate error message
*/
function isInputValid(domNode, regex, errMessage, domErrorDiv){
    let isValid = regex.test(domNode.value)

    domErrorDiv.innerText = !isValid ? errMessage : ""
}

//on reset, it resets the form and it's error message
//resets input value to 0
resetBtn.addEventListener('click', event => {
    billErrorMsg.innerText = ""
    peopleErrorMsg.innerText = ""
    tipErrorPercent.innerText = ""
    totalPerPersonNode.innerText = "$0.00"
    tipPerPersonNode.innerText = "$0.00"

    resetBtn.disabled = true
})