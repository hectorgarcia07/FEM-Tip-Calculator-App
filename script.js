const tipForm = document.getElementById("tip-form")
const submitBtn = document.getElementById("submit-btn")

//Is used to check if the user input is correct, then enables the submit btn.
tipForm.addEventListener('input', event => {
    let billInput = document.getElementById("bill").value 
    let numPeople = document.getElementById("num-people").value
    let percentAmout;

    //try getting the current selected tip-amount. set it to null if error occurs
    try {
        percentAmout = document.querySelector('input[name="tip-amount"]:checked').id
    } catch (error) {
        percentAmout = null;
    }

    if(isBillValid(billInput) && percentAmout && isNumPeopleValid(numPeople)){
        submitBtn.disabled = false;
    }else{
        submitBtn.disabled = true
    }

})

tipForm.addEventListener('submit', event => {
    event.preventDefault()
})

//check if the Bill is a positive currencty
//allows digits in the format of x+ or x+.xx
//where + is one or more 
function isBillValid(billInput){
    let regex = /^\d+$|^\d+(?:\.\d{2})$/
    return regex.test(billInput)
}

//check if it's a positive integer
function isNumPeopleValid(numPeople){
    let regex = /^\d+$/
    return regex.test(numPeople)
}

function isFormFilledOut(){
    
    console.log("BI", billInput, "PA", percentAmout, "NP", numPeople)
}

