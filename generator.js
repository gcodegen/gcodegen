/* global document, window */
var xInput, x, y, firstHole, secondHole;
const letters = ["M", "G", "X", "Y", "I", "J", "Q", "C", "Z", "D", "W", "B", "L", "A", "E"];

function myFunction() {
    "use strict";
    
    xInput = document.getElementById("sizeForm"),
    x = parseFloat(xInput.elements[0].value),
    y = parseFloat(xInput.elements[1].value);
        
    var screenHeight = window.innerHeight,
        screenWidth = window.innerWidth,
        optionsInput = document.getElementById("optionsForm"),
        jobNumber = optionsInput.elements[1].value,
        partNumber = optionsInput.elements[2].value,
        xPierce = x + 0.125,
        yHalf = y / 2,
        boxHeight = 50,
        conversionRate = y / x,
        boxWidth = conversionRate * boxHeight,
        partName = "part-" + partNumber,
        i = 0,
        doc = document;
    

                
    document.getElementById("boxModel").style.borderColor = "black";

    //Get DATE
    const date = new Date();
    var year = date.getFullYear();
    var month = ("0" + date.getMonth() + 1).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    let newDate = ((date.getMonth() + 1) + "/" + day + "/" + year)
    document.getElementById("date").innerHTML = newDate;
    let time = (date.getHours() + ":" +("0" + date.getMinutes()).slice(-2));
    document.getElementById("time").innerHTML = time;
    document.getElementById("createYear").innerHTML = year;
    document.getElementById("createMonth").innerHTML = month;
    document.getElementById("createDay").innerHTML = day;
            
    if ((boxWidth >= 35) && ((((x / y ) * 35) * screenWidth / 100) <= 0.75 * screenHeight)) 
       //doesnt work properly && (0.35 * screenWidth < 0.75 * screenHeight)) {
        { document.getElementById("boxModel").style.height = (x / y) * 35 + "vw";
        document.getElementById("boxModel").style.width = '35vw';
    }
    else {
        document.getElementById("boxModel").style.height = "50vh";
        document.getElementById("boxModel").style.width = boxWidth + "vh";
    }
                
    document.getElementById("partName").innerHTML = partName;
    document.getElementById("pierce-length").innerHTML = xPierce;
    let xReplace = document.getElementsByClassName("x");
    for (i = 0; i < xReplace.length ; i++) {
        xReplace[i].textContent = x;
    }
                
    let yReplace = document.getElementsByClassName("y");
    for (i = 0; i < yReplace.length ; i++) {
        yReplace[i].textContent = y;
    }
                
    let halfY = document.getElementsByClassName('y-half-width');
    for (i = 0; i < halfY.length ; i++) {
        halfY[i].innerHTML = yHalf;
    }
    
    var materialChoice = document.getElementById("materialName");
    var materialText = materialChoice.options[materialChoice.selectedIndex].text;
    document.getElementById("material").innerHTML = materialText;
    
    document.getElementById("job_identifier").innerHTML = jobNumber;
    document.getElementById("part_number").innerHTML = "part-" + partNumber;
    document.getElementById("humanReadableName").innerHTML = "Part " + partNumber;
    
    
    //Change background image/color based on material choice.
    //Also changes material code (useful for machine operator to reference)
    if (materialText == "22G Paintlock" || materialText == "Textured" || materialText == "22G Galvanized") {
        doc.getElementById("materialCode").innerHTML = "C-SECC0.8-L2-";
        document.getElementById("boxModel").style.backgroundImage = "none";
    }
    else if (materialText == "16G Paintlock") {
        document.getElementById("materialCode").innerHTML = "C-SECC1.6-L2-";
        document.getElementById("boxModel").style.backgroundImage = "none";
    }
    else if (materialText == "14G Paintlock") {
        document.getElementById("materialCode").innerHTML = "C-SECC2.0-L2-";
        document.getElementById("boxModel").style.backgroundImage = "none";
    }
    else if (materialText == "16G Galvanized") {
        document.getElementById("materialCode").innerHTML = "C-SPG1.6-L2-";
        document.getElementById("boxModel").style.backgroundImage = "none";
    }
    else if (materialText == "12G Galvanized") {
        document.getElementById("materialCode").innerHTML = "C-SPG2.6-L2-";
        document.getElementById("boxModel").style.backgroundImage = "none";
    }
    else if (materialText == "22G Stainless") {
        document.getElementById("materialCode").innerHTML = "C-SUS0.8-L2";
        document.getElementById("boxModel").style.backgroundImage = "url(ss.jpg)";
    }
    else if (materialText == "16G Stainless") {
        document.getElementById("materialCode").innerHTML = "C-SUS1.5-L2-";
        document.getElementById("boxModel").style.backgroundImage = "url(ss.jpg)";
    }
    else if (materialText == "14G Stainless") {
        document.getElementById("materialCode").innerHTML = "C-SUS2.0-L2-ETCH";
        document.getElementById("boxModel").style.backgroundImage = "url(ss.jpg)";
    }    
    else if (materialText == "22G Chrome") {
        document.getElementById("materialCode").textContent = "C-SUS0.8-L2";
        document.getElementById("boxModel").style.backgroundImage = "none";
    }   
    else {
        document.getElementById("materialCode").innerHTML = "";
        document.getElementById("boxModel").style.backgroundImage = "url(ss.jpg)";
    }
    
    addClass();
    calculateHoles();
}

//Following function copies "gCode" text content to clipboard
function copyDivToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("gCode"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}

//Following Function adds "letter" class to all G and M code commands
function addClass() {
    const gCode = document.getElementById("edit-code");
    const ifLetters = gCode.querySelectorAll("span.letters");
    if ( ifLetters.length == 0 ) {
        for (const letter of letters) {
            const replace = "\[" + letter + "]";
            const re = new RegExp(replace,"g");
            const code = document.getElementById("edit-code").innerHTML;
            var edited = code.replace(re, '<span class="letters">' + letter + '</span>');
            document.getElementById("edit-code").innerHTML = edited;
        }
    }
}

function addHoles() {
    myFunction();
    if ( document.getElementById("add-holes").value === "no-holes" ) {
            document.getElementById("add-holes").value = "with-holes";
            calculateHoles();
            addClass();   
            document.getElementById("add-holes-button").innerHTML = "Remove Hanging Holes";
    } else if (document.getElementById("add-holes").value === "with-holes") {
            document.getElementById("append-holes").innerHTML = "";
            document.getElementById("add-holes-button").innerHTML = "Add Hanging Holes";
            document.getElementById("add-holes").value = "no-holes";
    }
    

}

function calculateHoles() {
    
    if (document.getElementById("add-holes").value === "with-holes") {
        if (x >= 90) { 
            firstHole = (((x - 82)/2)-0.125);
            secondHole = ((x - firstHole)-0.25);
        } else if (x < 90 && x > 24) {
            firstHole = 4;
            secondHole = (x - firstHole);
        } else {
            firstHole = 0.25;
            secondHole = (x - firstHole);
        }
        document.getElementById("append-holes").innerHTML = 
            "E7<br>\
            G00G41X" + firstHole + "Y0.25<br>\
            M103<br>\
            G01X" + (firstHole + 0.125) + "Y0.25<br>\
            G03I-0.125J0<br>\
            M104<br>\
            G00G40<br>\
            G00G41X" + secondHole + "Y0.25<br>\
            M103<br>\
            G01X" + ( secondHole + 0.125 ) + "Y0.25<br>\
            G03I-0.125J0<br>\
            M104<br>\
            G00G40<br></span>";
            addClass();
        
        const holesCode = document.getElementById("append-holes");
        const ifHoles = holesCode.querySelectorAll("span.letter");
            if ( ifHoles.length == 0 && document.getElementById("add-holes").value === "with-holes" ) {
                for (const letter of letters) {
                    const replace = "\[" + letter + "]";
                    const re = new RegExp(replace,"g");
                    const code = document.getElementById("append-holes").innerHTML;
                    var edited = code.replace(re, '<span class="letters">' + letter + '</span>');
                    document.getElementById("append-holes").innerHTML = edited; }
        }
    } else {
        document.getElementById("append-holes").innerHTML = "";
    }
}
// listen to enter key to generate g code
document.addEventListener ('keydown', function(e){
    if (e.which === 13) myFunction();
})