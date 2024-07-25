
function calculate() {
    // Hämta värden från inmatningsfälten
    var input1 = parseFloat(document.getElementById('input1').value) || 0;
    var input2 = document.getElementById('input2').value || 0;
    var input3 = parseFloat(document.getElementById('input3').value) || 0;
    //var input4 = document.getElementById("input4").value;
    var input5 = "20"+(document.getElementById('input5').value);

    //let fulldate = "20"+input5;

    let input4 = formatDate(input5);
    let input2_int = splitInputX(input2);


    let slutDag = slutDatum(input1,input2_int,input3,input4);

    var datestring = slutDag.getFullYear()  + "-" + String(slutDag.getMonth()+1).padStart(2,"0") + "-" + String(slutDag.getDate()).padStart(2, '0');

    var perDag = antalPerDag(input1,input2_int,input3,input4);

    // Visa resultatet
    document.getElementById('result').innerText = "Slutdatum: " + datestring + ",  antal tagna per dag: " + Math.round(perDag*100)/100;
}

// datum medicin bör räcka till om daglig dos hålls
function slutDatum(amount, dosage, expggr, datum) {
    var antalDagar = (amount*expggr)/dosage;
    var firstDay = new Date(datum);
    let slutDag = addDays(firstDay,antalDagar);
    return slutDag
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
function antalPerDag(amount, dosage, expggr, datum) {
    const today = new Date();
    const ordDate = new Date(datum);
    let diff = daysBetween(today,ordDate);
    let perDag = (amount*expggr)/diff;
    return perDag
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
    
    // Calculating the time difference
    // of two dates
    let Difference_In_Time = dateOne.getTime() - dateTwo.getTime();

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
    if (text.includes("x")) {
        let parts = text.split("x");
        let product = parseInt(parts[0]) * parseInt(parts[1]);
        return product
    } else {
        return parseInt(text)
    }
    
}   
