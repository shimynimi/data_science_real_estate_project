//we want to load the locations 
function getRoomValue(){
    var uiRoom = document.getElementsByName("uiRoom");
    for(var i in uiRoom){
        if(uiRoom[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1; //invalid value
}
function getParkingValue(){
    var uiRoom = document.getElementsByName("uiParking");
    for(var i in uiRoom){
        if(uiRoom[i].checked){
            return parseInt(i);
        }
    }
    return -1; //invalid value
}
function getWarehouseValue(){
    var uiWarehouse = document.getElementsByName("uiWarehouse");
    for(var i in uiWarehouse){
        if(uiWarehouse[i].checked){
            return parseInt(i);
        }
    }
    return -1; //invalid value
}
function getElevatorValue(){
    var uiElevator = document.getElementsByName("uiElevator");
    for(var i in uiElevator){
        if(uiElevator[i].checked){
            return parseInt(i);
        }
    }
    return -1; //invalid value
}

function onPageLoad(){
    console.log("document loaded");
    var url= "http://127.0.0.1:5000/get_addresses";
    //this is for jquery
    $.get(url,function(data, status){
        console.log("got response for get_addresses request");
        if(data){
            var addresses = data.addresses;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
                for(var i in addresses){
                    var opt = new Option(addresses[i]);
                    $('#uiLocations').append(opt);
                }
        }

    });
}

function onClickedEstimatePrice(){
    console.log("Estimate Price button clicked");
    var sqm = document.getElementById("uiSqm");
    var room = getRoomValue();
    var parking = getParkingValue();
    var warehouse = getWarehouseValue();
    var elevator = getElevatorValue();
    var address = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url, {
        total_sqm: parseFloat(sqm.value),
        room:room,
        parking:parking,
        warehouse:warehouse,
        elevator:elevator,
        address:address.value
    },function(data,status){
        console.log(data.estimated_price);
        estPrice.innerHTML = " <h2> " + data.estimated_price;
        console.log(status);
    });
}

window.onload = onPageLoad;