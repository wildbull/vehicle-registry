
function warningMessage(message){
  $('.messageAlert').html(message);
  $('.messageAlertContainer').attr("class", "messageAlertContainer alert alert-danger")
  $('.messageAlertContainer').show();
};

function successMessage(message){
  $('.messageAlert').html(message);
  $('.messageAlertContainer').attr("class", "messageAlertContainer alert alert-success")
  $('.messageAlertContainer').show();
};

function closeAlert() {
  $('.messageAlertContainer').hide();
};

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function adjustNavbar(){
    var addr = getCookie("ownerAddress");
  if (addr == ""){
    $('.private').hide();
    $('#hidden-when-logged').show();
    // zilch
  } else {
    $('.private').show();
    $('#hidden-when-logged').hide();
  };
};

$(document).ready(function () {
    adjustNavbar();
    PopulateVehicles();
    GetAdmin();
 });
debugger;
var vehicleRegistry = VehicleRegistry.deployed();
console.log("The contract:", vehicleRegistry);

window.login = function () {
    document.cookie = "ownerAddress=" + $("#Account").val();
    window.location = "registry.html";
};

window.logout = function () {
    document.cookie = "ownerAddress=";
    window.location = "index.html";
};


window.RegisterVehicle = function () {
    debugger;
    let make = $("#make").val();
    let model = $("#model").val();
    let year = $("#year").val();
    let color = $("#color").val();
    let licensePlate = $("#licensePlate").val();
    let VIN = $("#VIN").val();

    let ownerAddress = getCookie("ownerAddress");
    let commission = 1;

    VehicleRegistry.deployed().then(function(contractInstance){
        contractInstance.RegisterVehicle(make, model, year, color, licensePlate, VIN, { value: web3.toWei(commission, 'ether'), gas: 1400000, from: ownerAddress }).then(function () {
            successMessage("Vehiclehas been registered and added to <a href=\"registry.html\">your vehicles</a>.");
        }).catch(function (e) {
            warningMessage(e);
        });
    });
    


};

window.PopulateVehicles = function(){
    VehicleRegistry.deployed().then(function(contractInstance){
        contractInstance.NumberOfVehicles.call().then(function (NumberOfVehicles) {
            let ownerAddress = getCookie("ownerAddress");
            $("#itemTable").empty();

            for (let i = 0; i < NumberOfVehicles; i++)
            {
                contractInstance.vehicles.call(i).then(function (vehicle) {
                    if (window.location.pathname.toString() == "/registry.html")
                        iterateVehicles(vehicle, ownerAddress);
                    else if (window.location.pathname.toString() == "/registered_vehicles.html")
                        iterateVehicles(vehicle, null);


                });

            }


        });
    }).catch(function (e) {
            warningMessage(e);
        });
};

function iterateVehicles(vehicle, ownerAddress)
{
    let owner = vehicle[1];
    let make = vehicle[2];
    let model = vehicle[3];
    let year = vehicle[4];
    let color = vehicle[5];
    let licensePlate = vehicle[6];
    let VIN = vehicle[7];

    if(ownerAddress!=null && owner==ownerAddress || ownerAddress==null)
    {
    let owner_t = "<td>" + owner + "</td>";
    let make_t = "<td>" + make + "</td>";
    let model_t = "<td>" + model + "</td>";
    let year_t = "<td>" + year + "</td>";
    let color_t = "<td>" + color + "</td>";
    let licensePlate_t = "<td>" + licensePlate + "</td>";
    let VIN_t = "<td>" + VIN + "</td>";

    let resultRow = make_t +model_t + year_t + color_t +licensePlate_t + VIN_t
    if (ownerAddress == null)
    {
        resultRow += owner_t;
    }

    resultRow = "<tr>" + resultRow + "</tr>";
    $("#itemTable").append(resultRow);
    }


}

window.GetAdmin = function () {
    VehicleRegistry.deployed().then(function (contractInstance) {
        contractInstance.admin.call().then(function (admin) {
            document.cookie = "adminAccount=" + admin;

        });
    });
};