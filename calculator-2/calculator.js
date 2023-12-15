let currentDisplay = '';
document.querySelector('#display').value = currentDisplay;

function appendToDisplay(value) {
    currentDisplay += value;
    document.querySelector('#display').value = currentDisplay;
}

function clearDisplay() {
    currentDisplay = '';
    document.querySelector('#display').value = currentDisplay;
}


function calculate() {
    try {
        currentDisplay = eval(currentDisplay);
        document.querySelector('#display').value = currentDisplay;
    } catch (error) {
        document.querySelector('#display').value = 'Error';
    }
}
