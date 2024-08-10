var reservedSeats = {
    record1: {
        seat : "b19",
        owner : {
            fname : "Joe",
            lname : "Smith"
        }
    },
    record2: {
        seat : "b20",
        owner : {
            fname : "Blade",
            lname : "Smith"
        }
    },
    record3: {
        seat : "b21",
        owner : {
            fname : "Sam",
            lname : "Smith"
        }
    },
    record4: {
        seat : "b22",
        owner : {
            fname : "Karl",
            lname : "Smith"
        }
    }
}

function makeRows(sectionLenght, rowLenght, placement){
    const rows = ["a","b","c","d","e","f","g","h"]
    let html = "";
    let counter = 1;

    rows.forEach( eachRow => {
        switch (placement) {
            case "left":
                html += `<div class= "label">${eachRow}</div>`;
                break;
            case "right":
                counter = counter + (rowLenght - sectionLenght) //1 +12
                break;
        
            default:
                counter = counter + ((rowLenght - sectionLenght) / 2)//9
                break;
        }

        for (let i = 0; i < sectionLenght; i++) {
            html += `<div class="a" id="${eachRow + counter}">${counter}</div>`;
            counter++
        }

        switch (placement) {
            case "left":
                counter = counter + (rowLenght - sectionLenght) //4+12 =16
                break;
            case "right":
                html += `<div class= "label">${eachRow}</div>`;
                break;
        
            default:
                counter = counter + ((rowLenght - sectionLenght) / 2)
                break;
        }
    });
    document.getElementById(placement).innerHTML = html;
}
makeRows(3, 15, "left");
makeRows(9,15, "middle");
makeRows(3, 15, "right");

(function(){
    "use strict";

    let selectSeats = [];
    const seats = document.querySelectorAll('.a');

    for(const key in reservedSeats) {
        if (reservedSeats.hasOwnProperty(key)) {
            const obj = reservedSeats[key];
            document.getElementById(obj.seat).className = 'r'
            document.getElementById(obj.seat).innerHTML = "R";
        }
        
    }

    seats.forEach(function(seat){
        seat.addEventListener('click', ()=> {
            seatSelectionProcess(seat.id);
        })
    });

    function seatSelectionProcess(thisSeat){
        if (!document.getElementById(thisSeat).classList.contains('r')) {
            var index = selectSeats.indexOf(thisSeat);
        if (index > -1) {
            selectSeats.splice(index, 1)
            document.getElementById(thisSeat).className = "a";
        }
        else{
            selectSeats.push(thisSeat);
            document.getElementById(thisSeat).className = "s";
        }
        manageConfirmForm();
    }
}

        
//Add Event Listener for the reserve button to open te form
    document.getElementById('reserve').addEventListener('click', (event) =>{
        document.getElementById('resform').style.display= "block";
        event.preventDefault();
    });
    document.getElementById('cancel').addEventListener('click', (event) =>{
        document.getElementById('resform').style.display = "none";
        event.preventDefault();
    });

    function manageConfirmForm(){
    if(selectSeats.length > 0) {
        document.getElementById('confirmres').style.display = "block";

        if (selectSeats.length === 1) {
            document.getElementById('selectSeats').innerHTML = `You have selected the seat number <br> <a id="seatNumber">${selectSeats[0].toUpperCase()}</a><br> Add Info to proceed the reservation`
        }else {
            let seatString = selectSeats.toString().toUpperCase();
            seatString = seatString.replace(/,/g,", ");
            seatString = seatString.replace(/,(?=[^,]*$)/, ' and');
            document.getElementById('selectSeats').innerHTML = `You have selected the seat numbers <br> <a id="seatNumber">${seatString}</a> . <br> Add Info to proceed the reservation`
        }
        
    }else {
        document.getElementById('confirmres').style.display = "none";
        document.getElementById('selectSeats').innerHTML = `You need to select some seats to reserve. <br> <a href = "#" id = "error">Close</a> this dialog box and pick at least one seat`;

        document.getElementById('error').addEventListener('click', () => {
            document.getElementById('resform').style.display = "none";
        })
    }
}
    manageConfirmForm();


    document.getElementById('confirmres').addEventListener('submit', (evt) =>{
        evt.preventDefault();
        procesReservation();

    })

    function procesReservation(){
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        let counter = 1;
        let nextRecord = '';

        selectSeats.forEach( thisSeat => {
            document.getElementById(thisSeat).className = "r";
            document.getElementById(thisSeat).innerHTML = "R";
            
            nextRecord = `record${hardCodeRecords + counter}`;
            reservedSeats[nextRecord] = {
                seat : thisSeat,
                owner : {
                    fname:fname,
                    lname:lname
                }
            };
            counter++;
            
        });
        
        document.getElementById('resform').style.display = "none";
        selectSeats = [];
        manageConfirmForm();
    }
}());





