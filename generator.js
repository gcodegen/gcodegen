/* global document, window */
function myFunction() {
    "use strict";
    
    var xInput = document.getElementById("sizeForm"),
        x = parseFloat(xInput.elements[0].value),
        screenHeight = window.innerHeight,
        screenWidth = window.innerWidth,
        y = parseFloat(xInput.elements[1].value),
        optionsInput = document.getElementById("optionsForm"),
        jobNumber = optionsInput.elements[1].value,
        partNumber = optionsInput.elements[2].value,
        xPierce = x + 0.125,
        yHalf = y / 2,
        boxHeight = 50,
        conversionRate = y / x,
        boxWidth = conversionRate * boxHeight,
        partName = "part-" + partNumber,
        i = 0;
                
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
    document.getElementById("pierceLength").innerHTML = xPierce;
    let xReplace = document.getElementsByClassName("x");
    for (i = 0; i < xReplace.length ; i++) {
        xReplace[i].innerHTML = x;
    }
                
    let yReplace = document.getElementsByClassName("y");
    for (i = 0; i < yReplace.length ; i++) {
        yReplace[i].innerHTML = y;
    }
                
    let halfY = document.getElementsByClassName('yHalfWidth');
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
        document.getElementById("materialCode").innerHTML = "C-SECC0.8-L2-";
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
        document.getElementById("materialCode").innerHTML = "C-SUS0.8-L2";
        document.getElementById("boxModel").style.backgroundImage = "none";
    }   
    else {
        document.getElementById("materialCode").innerHTML = "";
        document.getElementById("boxModel").style.backgroundImage = "url(ss.jpg)";
    }

}

function copyDivToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("gCode"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}

document.addEventListener ('keydown', function(e){
    if (e.which === 13) myFunction();
})