const tipForm = document.getElementById("tip-form")
const resetBtn = document.getElementById("submit-btn")
const billErrorMsg = document.getElementById("bill-error-msg")
const peopleErrorMsg = document.getElementById("people-error-msg")
const numPeople = document.getElementById("num-people")
const billInput = document.getElementById("bill")
const tipPerPerson = document.getElementById("tip-per-person")
const totalPerPerson = document.getElementById("total-per-person")
const customPercent = document.getElementById("custom-percent")
const tipErrorPercent = document.getElementById("tip-error-msg")

let hasError = false

//Is used to check if the user input is correct, then enables the submit btn.
tipForm.addEventListener('input', event => {
    let newBillInput = billInput.value 
    let newNumPeople = numPeople.value
    let targetName = event.target.name
    let percentAmout;

    //enable button to reset at anytime
    resetBtn.disabled = false;

    //try getting the current selected tip-amount. set it to null if error occurs
    try {
        percentAmout = document.querySelector('input[name="tip-amount"]:checked').id
    } catch (error) {
        percentAmout = null;
    }

    //if there is errors, display approrate message
    //otherwise check if form has been filled out, if so, do the calculations
    hasError = checkForErrors(targetName, event.target.type) || false

    if(hasError){
        console.log("error")
    }
    


})

//if custom percent is clicked, check if any percent radio btn has been clicked
//if it is, uncheck it.
customPercent.addEventListener("input", event => {
    let percentAmout;
    //try getting the current selected tip-amount. set it to null if error occurs
    try {
        percentAmout = document.querySelector('input[type="radio"][name="tip-amount"]:checked')
        percentAmout.checked = false
    } catch (error) {
        percentAmout = null;
    }

})

//checks to see if the input accepts the users value
//if not display error
function checkForErrors(inputName, inputType){
    switch(inputName){
        case "bill":
            return isInputValid(billInput, /^\d+$|^\d+(?:\.\d{2})$/, "Must be in USD format.", billErrorMsg)
            break;
        case "tip-amount":
            if(inputType == "text"){
                return isInputValid(customPercent, /^\d+$/, "Must be positive", tipErrorPercent)
            }else{
                tipErrorPercent.innerText = ""
            }
            return true
            break
        case "num-people":
            return isInputValid(numPeople, /^\d+$/, "Must be positive", peopleErrorMsg)
            break
    }
}

/* 
Checks to see if user input is valid based on the regex, 
if invalid, show approprate error message
*/
function isInputValid(domNode, regex, errMessage, domErrorDiv){
    let isValid = regex.test(domNode.value)

    if(!isValid){
        domErrorDiv.innerText = errMessage
        domNode.classList.add("error-border")
    }else{
        domErrorDiv.innerText = ""
        domNode.classList.remove("error-border")
    }

    return isValid
}

//on reset, it resets the form and it's error message
resetBtn.addEventListener('click', event => {
    billErrorMsg.innerText = ""
    peopleErrorMsg.innerText = ""
    tipErrorPercent.innerText = ""

    resetBtn.disabled = true
})