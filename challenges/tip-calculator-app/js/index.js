// =========================== //// =========================== //
const btn5 = document.getElementById("5");
const btn10 = document.getElementById("10");
const btn15 = document.getElementById("15");
const btn25 = document.getElementById("25");
const btn50 = document.getElementById("50");
const customPercent = document.getElementById("custom-percent");

const txtTotalBill = document.getElementById("total-bill");
const txtTotalPeople = document.getElementById("total-people");

const txtTotalTip = document.getElementById("txt-total-tip");
const txtTotalFinal = document.getElementById("txt-total-final");

const btnReset = document.getElementById("btn-reset");

let totalBill = 0;
let actualPercentage = 0;
let totalPeople = 0;

// =========================== //// =========================== //
const resetEverything = () => {

    totalBill = 0;
    actualPercentage = 0;
    totalPeople = 0;

    txtTotalTip.innerText = "$0.00";
    txtTotalFinal.innerText = "$0.00";
    txtTotalBill.value = "";
    txtTotalPeople.value = "";
    customPercent.value = "";

    removeClassFromElements();
};

const removeClassFromElements = () => {

    btn5.classList.remove("btn__selected");
    btn10.classList.remove("btn__selected");
    btn15.classList.remove("btn__selected");
    btn25.classList.remove("btn__selected");
    btn50.classList.remove("btn__selected");
}

const modifyPercentage = (e, isButton) => {

    let value = parseFloat(e.target.value);

    actualPercentage = (value < 0 || isNaN(value)) ? 0 : value;

    removeClassFromElements();

    if (isButton) {
        e.target.classList.add("btn__selected");
    }

    showFinalBill();
};

const showFinalBill = () => {

    if (totalPeople === 0 || totalBill === 0) {
        txtTotalTip.innerText = "$0.00";
        txtTotalFinal.innerText = "$0.00";
        return;
    }

    let auxTotalTip = (totalBill * (actualPercentage / 100)) / totalPeople;
    
    let totalPerPerson = (totalBill / totalPeople) + auxTotalTip;

    txtTotalTip.innerText = "$" + auxTotalTip.toFixed(2);
    txtTotalFinal.innerText = "$" + totalPerPerson.toFixed(2);
}

// =========================== //// =========================== //
window.onload = () => {

    btn5.addEventListener("click", e => modifyPercentage(e, 1));
    btn10.addEventListener("click", e => modifyPercentage(e, 1));
    btn15.addEventListener("click", e => modifyPercentage(e, 1));
    btn25.addEventListener("click", e => modifyPercentage(e, 1));
    btn50.addEventListener("click", e => modifyPercentage(e, 1));
    customPercent.addEventListener("keyup", e => modifyPercentage(e, 0));

    txtTotalBill.addEventListener("keyup", e => {

        try {
            let value = parseFloat(e.target.value);
    
            totalBill = (value < 0 || isNaN(value)) ? 0 : value;

            showFinalBill();
        }
        catch (error) {
            console.log(error);
            return;
        }
    });

    txtTotalPeople.addEventListener("keyup", e => {

        try {
            let value = parseInt(e.target.value);
    
            totalPeople = (value < 0|| isNaN(value)) ? 0 : value;

            showFinalBill();
        }
        catch (error) {
            console.log(error);
            return;
        }
    });

    btnReset.addEventListener("click", resetEverything);
};