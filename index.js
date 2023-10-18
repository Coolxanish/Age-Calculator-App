const dayInfo = document.querySelector(".day")
const monthInfo = document.querySelector(".month")
const yearInfo = document.querySelector(".year")
const submit = document.querySelector(".submit")
const dayError = document.querySelector(".dayError")
const monthError = document.querySelector(".monthError")
const yearError = document.querySelector(".yearError")
const label1 = document.querySelector(".label1")
const label2 = document.querySelector(".label2")
const label3 = document.querySelector(".label3")
const calculatedYear = document.querySelector(".calculatedYearNum")
const calculatedmonth = document.querySelector(".calculatedMonthNum")
const calculatedDay = document.querySelector(".calculatedDayNum")

const form = document.querySelector("form")

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

form.addEventListener("submit", function(e){
    e.preventDefault(e)
    if (dayInfo.value && monthInfo.value && yearInfo.value){
        calcYear()
        calcMonth()
        calcDay()
    }
    submitErrors()
})

function calcYear(){
    const yearOld = year - yearInfo.value;
    calculatedYear.textContent = yearOld
}

function calcMonth(){
    if (monthInfo.value < month) {
    const monthOld = month - monthInfo.value
    calculatedmonth.textContent = monthOld
    }
    else {
        const monthOld = monthInfo.value - month
        calculatedmonth.textContent = monthOld
    }
}

function calcDay(){
    const dayOld = day + (31-dayInfo.value)
    calculatedDay.textContent = dayOld
}




dayInfo.addEventListener("input", ()=>{
    if (dayInfo.validity.valid){
        dayError.textContent = ""
        stylingFunctions.label1Remove();
    }else {
        errors()
    }
})

monthInfo.addEventListener("input", ()=>{
    if (monthInfo.validity.valid){
        monthError.textContent = ""
        stylingFunctions.label2Remove()
    }else {
        errors()
    }
})

yearInfo.addEventListener("input", ()=>{
    if (yearInfo.validity.valid){
        yearError.textContent = ""
        stylingFunctions.label3Remove()
    }else {
        errors()
    }
})


function errors(){
    if (dayInfo.validity.rangeUnderflow || dayInfo.validity.rangeOverflow){
        dayError.textContent = "Must be a valid Date"
        stylingFunctions.label1Red();
    }

    if (monthInfo.validity.rangeUnderflow || monthInfo.validity.rangeOverflow){
        monthError.textContent = "Must be a valid month"
        stylingFunctions.label2Red();
    }

    if (yearInfo.validity.rangeOverflow){
        yearError.textContent = "Must be in the past"
        stylingFunctions.label3Red();
    }
}

function submitErrors() {
    
    if (dayInfo.validity.valueMissing){
        dayError.textContent = "This field is required"    
        stylingFunctions.label1Red();
    }

    if (monthInfo.validity.valueMissing){
        monthError.textContent = "This field is required"
        stylingFunctions.label2Red();
    }

    if (monthInfo.value == 4 || monthInfo.value == 6 || monthInfo.value == 9 || monthInfo.value == 11){
        if (dayInfo.value == 31){
            dayError.textContent = "Must be a valid date"
            stylingFunctions.label1Red()
            stylingFunctions.label2Red()
            stylingFunctions.label3Red()

            calculatedYear.textContent = "--"
            calculatedmonth.textContent = "--"
            calculatedDay.textContent = "--"
        }
        else {
            dayError.textContent = ""
            stylingFunctions.label1Remove()
            stylingFunctions.label2Remove()
            stylingFunctions.label3Remove()
        }
    }

    if (monthInfo.value == 2 && dayInfo.value > 28){
        dayError.textContent = "Must be a valid date"
        stylingFunctions.label1Red()
        stylingFunctions.label2Red()
        stylingFunctions.label3Red()

        calculatedYear.textContent = "--"
        calculatedmonth.textContent = "--"
        calculatedDay.textContent = "--"
    }else if (monthInfo.value == 1 || monthInfo.value == 3 || monthInfo.value == 5 || monthInfo.value == 7 || monthInfo.value == 8 || monthInfo.value == 10 || monthInfo.value == 12) {
        dayError.textContent = ""
        stylingFunctions.label1Remove()
        stylingFunctions.label2Remove()
        stylingFunctions.label3Remove()
    }

    if (yearInfo.validity.valueMissing){
        yearError.textContent = "This field is required"
        stylingFunctions.label3Red();
    }
}

function red(){

    function label1Red(){
        label1.style.color = "hsl(0, 100%, 67%)"
        dayInfo.style.borderColor = "hsl(0, 100%, 67%)"
        dayError.style.color = "hsl(0, 100%, 67%)"
    }

    function label2Red(){
        label2.style.color = "hsl(0, 100%, 67%)"
        monthInfo.style.borderColor = "hsl(0, 100%, 67%)"
        monthError.style.color = "hsl(0, 100%, 67%)"
    }

    function label3Red(){
        label3.style.color = "hsl(0, 100%, 67%)"
        yearInfo.style.borderColor = "hsl(0, 100%, 67%)"
        yearError.style.color = "hsl(0, 100%, 67%)"
    }

    function label1Remove(){
        label1.style.color = "hsl(0, 1%, 44%)"
        dayInfo.style.borderColor = "hsl(0, 0%, 94%)"
    }

    function label2Remove(){
        label2.style.color = "hsl(0, 1%, 44%)"
        monthInfo.style.borderColor = "hsl(0, 0%, 94%)"
    }

    function label3Remove(){
        label3.style.color = "hsl(0, 1%, 44%)"
        yearInfo.style.borderColor = "hsl(0, 0%, 94%)"
    }

    return { label1Red, 
             label2Red, 
             label3Red, 
             label1Remove, 
             label2Remove, 
             label3Remove 
            }
}

const stylingFunctions = red();