function checkInputValues(event) {
    let valueChanged = event.target.value.charAt(event.target.value.length - 1);

    if (valueChanged != "0" && valueChanged != "1") {
        valueChanged = event.target.value.slice(0, -1);
        event.target.value = valueChanged;
    }
}

function convertBinaryToDecimal() {
    let inputField = document.getElementsByClassName('input-field');
    let inputDisplay = document.getElementsByClassName('converted-binary-display');
    let binaryValues = inputField[0].value.split('');
    let decimalValue = 0;

    decimalValue = binaryValues.reduce((total, currentValue) => {
        return parseInt(total) * 2 + parseInt(currentValue);
    });

    inputDisplay[0].value = decimalValue;
}