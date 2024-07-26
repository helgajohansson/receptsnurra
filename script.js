
const inputs = document.querySelectorAll('#dataForm input');

        inputs.forEach((input, index) => {
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Prevent default form submission

                    // Check if there is a next input element
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus(); // Move focus to the next input
                    } else {
                        // If it's the last input, optionally submit the form or handle differently
                        document.getElementById('submitButton').focus();
                    }
                }
            });
        });


function calculate() {
    // Hämta värden från inmatningsfälten
    var amount = parseFloat(document.getElementById('amount').value);
    var dosage = document.getElementById('dosage').value;
    var expggr = parseFloat(document.getElementById('expggr').value);
    var startDate = formatDate("20"+(document.getElementById('startDate1').value));

    startDate = new Date(startDate); // convert to Date object

    dosage = splitInputX(dosage); // convert to int

    // SLUTDATUM, ej medräknat rest. Endast hela dagare
    let endDay = endDate(amount, dosage, expggr, startDate);
    
    // ANTAL PER DAG
    let perDay = amountPerDay(amount, dosage, expggr, startDate);

    var datestring = endDay.getFullYear()  + "-" + String(endDay.getMonth()+1).padStart(2,"0") + "-" + String(endDay.getDate()).padStart(2, '0');

    if (perDay > dosage) {
        document.getElementById('result').style.color = 'red';
    }
    if (perDay <= dosage) {
        document.getElementById('result').style.color = 'green';
    }

    // Visa resultatet
    document.getElementById('result').innerText = " Borde tagit slut: " + datestring + "\n\n Om medicin slut idag så har: " + Math.round(perDay*100)/100 + " styck/dag tagits sen ord. datum. ";
}

// datum medicin bör räcka till om daglig dos hålls
function endDate(amount, dosage, expggr, startDate) {
    var numberOfDays = Math.floor((amount*expggr)/dosage);
    let endDay = addDays(startDate, numberOfDays);
    return endDay
}

// dagens datum i en string med form yyyy-mm-dd
function todaysDate() {
    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return currentDate
}

// beräkna hur många tabletter per dag som använts sen "datum" till idag
function amountPerDay(amount, dosage, expggr, startDate) {
    const today = new Date();
    let perDay;
    let diff = daysBetween(today, startDate);

    perDay = (amount*expggr) / diff; 

    return perDay
}

// lägg till dagar på datum, returnerar nya datumet
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function daysBetween(date1,date2) {
    let dateOne = new Date(date1);
    let dateTwo = new Date(date2);
    let Difference_In_Time;
    
    // Calculating the time difference of two dates
    if (dateOne < dateTwo) {
        Difference_In_Time = dateTwo.getTime() - dateOne.getTime();
    } else {
        Difference_In_Time = dateOne.getTime() - dateTwo.getTime();
    }
    
    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    return Difference_In_Days
}

function formatDate(yyyymmdd) {
    if (yyyymmdd.length !== 8 || isNaN(yyyymmdd)) {
        return "Invalid input. Please enter a date in the format 'yyyymmdd'.";
    }

    let year = yyyymmdd.slice(0, 4);
    let month = yyyymmdd.slice(4, 6);
    let day = yyyymmdd.slice(6, 8);

    // Return formatted date in yyyy-mm-dd format
    return `${year}-${month}-${day}`;
}

function splitInputX(text) {
    let result;
    if (text.includes("x")) {
        let parts = text.split("x");
        result = parseInt(parts[0]) * parseInt(parts[1]);
    } else {
        result = parseInt(text);
    }
    return result
}   
