const display = document.getElementById("display");

function appendToDisplay(input) {
    if (display.value === "Error") return;
    display.value += input;
    display.scrollLeft = display.scrollWidth;
    resizeDisplayFont();
}

function clearDisplay() {
    display.value = "";
    display.style.fontSize = window.innerWidth <= 600 ? "2.5rem" : "5rem";
}

function calculate() {
    if (display.value === "Error") return;
    try {
        display.value = math.evaluate(display.value);
        resizeDisplayFont();
    } catch (error) {
        display.value = "Error";
    }
}


document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (display.value === "Error" && key !== "Escape" && key !== "c" && key !== "C") {
        return;
    }

    if ((/\d/).test(key) || "+-*/.".includes(key)) {
        appendToDisplay(key);
    }
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }
    else if (key === "Backspace") {
        if (display.value === "Error") {
            clearDisplay();
        } else {
            display.value = display.value.slice(0, -1);
        }
    }
    else if (key === "Escape" || key.toLowerCase() === "c") {
        clearDisplay();
    }
});

function resizeDisplayFont() {
    const length = display.value.length;
    const isMobile = window.innerWidth <= 600;

    if (length > 16) {
        display.style.fontSize = isMobile ? "1.5rem" : "2rem";
    } else if (length > 10) {
        display.style.fontSize = isMobile ? "2.5rem" : "3rem";
    } else {
        display.style.fontSize = isMobile ? "4rem" : "5rem";
    }
}