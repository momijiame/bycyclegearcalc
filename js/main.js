
var numOfRearGears = 11;
var numOfFrontGears = 3;

var cranksetList = [
    {
        name: "Shimano double 46-36T",
        value: "46-36"
    },
    {
        name: "Shimano double 50-34T",
        value: "50-34"
    },
    {
        name: "Shimano double 52-36T",
        value: "52-36"
    },
    {
        name: "Shimano double 52-38T",
        value: "52-38"
    },
    {
        name: "Shimano double 52-39T",
        value: "52-39"
    },
    {
        name: "Shimano double 53-39T",
        value: "53-39"
    },
    {
        name: "Shimano triple 52-30T",
        value: "52-39-30"
    }
];

var cassetteSprocketList = [
    {
        name: "Shimano 10speed 11-21T",
        value: "11-12-13-14-15-16-17-18-19-21"
    },
    {
        name: "Shimano 10speed 11-23T",
        value: "11-12-13-14-15-16-17-19-21-23"
    },
    {
        name: "Shimano 10speed 11-25T",
        value: "11-12-13-14-15-17-19-21-23-25"
    },
    {
        name: "Shimano 10speed 11-27T",
        value: "11-12-13-14-15-17-19-21-24-27"
    },
    {
        name: "Shimano 10speed 11-28T",
        value: "11-12-13-14-15-17-19-21-24-28"
    },
    {
        name: "Shimano 10speed 12-25T",
        value: "12-13-14-15-16-17-19-21-23-25"
    },
    {
        name: "Shimano 10speed 12-30T",
        value: "12-13-14-15-17-19-21-24-27-30"
    },
    {
        name: "Shimano 11speed 11-23T",
        value: "11-12-13-14-15-16-17-18-19-21-23"
    },
    {
        name: "Shimano 11speed 11-25T",
        value: "11-12-13-14-15-16-17-19-21-23-25"
    },
    {
        name: "Shimano 11speed 11-28T",
        value: "11-12-13-14-15-17-19-21-23-25-28"
    },
    {
        name: "Shimano 11speed 11-32T",
        value: "11-12-13-14-16-18-20-22-25-28-32"
    },
    {
        name: "Shimano 11speed 12-25T",
        value: "12-13-14-15-16-17-18-19-21-23-25"
    },
    {
        name: "Shimano 11speed 11-28T",
        value: "12-13-14-15-16-17-19-21-23-25-28"
    }
];

var chartJson = {
    title: {
        text: "ギア比",
        x: -20
    },
    xAxis: {
        title: {
            text: "歯数 (T)"
        }
        // categories: ["12", "13", "14", ...]
    },
    yAxis: {
        title: {
            text: "ギア比"
        }
    },
    legend: {
        verticalAlign: "bottom",
        borderWidth: 0
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: true
        }
    },

    series: [
        /*
        {
            name: "50T",
            data: [4.8, ...]
        },
        {
            name: "34T",
            data: [2.8, ...]
        }
        */
    ]
};

$(function () {

    _.each(cranksetList, function(entry) {
        var optionDOM = $("<option>", {
            value: entry["value"]
        }).html(entry["name"]);
        $("#crankset-selector").append(optionDOM);
    });

    _.each(cassetteSprocketList, function(entry) {
        var optionDOM = $("<option>", {
            value: entry["value"]
        }).html(entry["name"]);
        $("#cassette-sprocket-selector").append(optionDOM);
    });

    var sprocketSelectedValue = $("#cassette-sprocket-selector").children(':selected').val();
    var sprocketToothesList = sprocketSelectedValue.split("-");
    _.each(_.range(numOfRearGears), function(i) {
        var divColumnDOM = $("<div>").addClass("span1");
        var divControlGroupDOM = $("<div>", {
            id: "divControlGroupFrontGear" + (i + 1) + "S"
        }).addClass("control-group");
        var divControlsDOM = $("<div>").addClass("controls");
        var inputRearGearDOM = $("<input>", {
            type: "text",
            placeholder: (i + 1) + "S",
            id: "inputRearGear" + (i + 1) + "S",
            value: sprocketToothesList[i]
        }).addClass("input-block-level");
        divColumnDOM.append(divControlGroupDOM);
        divControlGroupDOM.append(divControlsDOM);
        divControlsDOM.append(inputRearGearDOM);

        $("#div-front-gears").append(divColumnDOM);
    });

    var cranksetSelectedValue = $("#crankset-selector").children(':selected').val();
    var cranksetToothesList = cranksetSelectedValue.split("-");
    _.each(_.range(numOfFrontGears), function(i) {
        var divRowDOM = $("<div>").addClass("row");
        var divColumnDOM = $("<div>").addClass("span1");
        var divControlGroupDOM = $("<div>", {
            id: "divControlGroupRearGear" + (i + 1) + "S"
        }).addClass("control-group");
        var divControlsDOM = $("<div>").addClass("controls");
        var inputFrontGearDOM = $("<input>", {
            type: "text",
            placeholder: (i + 1) + "S",
            id: "inputFrontGear" + (i + 1) + "S",
            value: cranksetToothesList[i]
        }).addClass("input-block-level");
        divColumnDOM.append(divControlGroupDOM);
        divControlGroupDOM.append(divControlsDOM);
        divControlsDOM.append(inputFrontGearDOM);
        divRowDOM.append(divColumnDOM);

        _.each(_.range(numOfRearGears), function(j) {
            var divColumnDOM = $("<div>").addClass("span1");
            var divControlGroupDOM = $("<div>", {
                id: "divControlGroupGearRatio" + (i + 1) + "x" + (j + 1)
            }).addClass("control-group");
            var divControlsDOM = $("<div>").addClass("controls");
            var inputGearRatioDOM = $("<input>", {
                type: "text",
                id: "inputGearRatio" + (i + 1) + "x" + (j + 1),
                readonly: true
            }).addClass("input-block-level");
            divColumnDOM.append(divControlGroupDOM);
            divControlGroupDOM.append(divControlsDOM);
            divControlsDOM.append(inputGearRatioDOM);
            divRowDOM.append(divColumnDOM);
        });
        $("#div-gears").append(divRowDOM);
    });

    var divRowDOM = $("<div>").addClass("row");
    var divColumnDOM = $("<div>").addClass("span12");
    var divControlGroupDOM = $("<div>", {
        id: "divControlGroupRearGearS"
    }).addClass("control-group error");
    var divControlsDOM = $("<div>").addClass("controls");
    var spanMessageDOM = $("<span>", {
        id: "spanMessage"
    }).addClass("help-block");
    divColumnDOM.append(divControlGroupDOM);
    divControlGroupDOM.append(divControlsDOM);
    divControlsDOM.append(spanMessageDOM);
    divRowDOM.append(divColumnDOM);
    $("#div-gears").append(divRowDOM);

    var divRowDOM = $("<div>").addClass("row");
    var divColumnDOM = $("<div>").addClass("span1");
    var inputButtonDOM = $("<input>", {
        type: "button",
        id: "input-button-apply",
        value: "反映"
    }).addClass("btn btn-large btn-primary");
    divColumnDOM.append(inputButtonDOM);
    divRowDOM.append(divColumnDOM);
    $("#div-gears").append(divRowDOM);

    $("#input-button-apply").bind("click", function() {
        _.each(_.range(numOfFrontGears), function(i) {
            _.each(_.range(numOfRearGears), function(j) {
                var divControlGroupGearRatioDOM = $("#divControlGroupGearRatio" + (i + 1) + "x" + (j + 1));
                divControlGroupGearRatioDOM.removeClass();
                divControlGroupGearRatioDOM.addClass("control-group");
            });
        });
        var rearGearToothesList = [];
        chartJson["series"] = [];
        _.each(_.range(numOfFrontGears), function(i) {
            function getInputDecoratorClass(value) {
                if (value < 2.0) {
                    return "info";
                }
                if (value < 3.0) {
                    return "success";
                }
                if (value < 4.0) {
                    return "warning";
                }
                return "error";
            }
            var frontGearToothes = $("#inputFrontGear" + (i + 1) + "S").val();
            var gearRatioList = [];
            _.each(_.range(numOfRearGears), function(j) {
                var inputGearRatioDOM = $("#inputGearRatio" + (i + 1) + "x" + (j + 1));
                inputGearRatioDOM.val("");
                var rearGearToothes = $("#inputRearGear" + (j + 1) + "S").val();
                if (!frontGearToothes || !rearGearToothes) {
                    return;
                }
                var gearRatio = (frontGearToothes / rearGearToothes).toFixed(2);
                inputGearRatioDOM.val(gearRatio);
                var divControlGroupGearRatioDOM = $("#divControlGroupGearRatio" + (i + 1) + "x" + (j + 1));
                divControlGroupGearRatioDOM.addClass(getInputDecoratorClass(gearRatio));
                gearRatioList.push(parseFloat(gearRatio));
                rearGearToothesList.push(rearGearToothes);
            });
            chartJson["series"].push({
                name: frontGearToothes + "T",
                data: gearRatioList
            });
        });
        chartJson["xAxis"]["categories"] = rearGearToothesList;

        $("#container").highcharts(chartJson);
    });

    $("#cassette-sprocket-selector").bind("change", function() {
        var selectedValue = $("#cassette-sprocket-selector").children(':selected').val();
        var sprocketToothesList = selectedValue.split("-");
        _.each(_.range(numOfRearGears - sprocketToothesList.length), function(i) {
            var inputRearGear = $("#inputRearGear" + (numOfRearGears - i) + "S");
            inputRearGear.val("");
        });
        _.each(sprocketToothesList, function(value, i) {
            var inputRearGear = $("#inputRearGear" + (i + 1) + "S");
            inputRearGear.val(value);
        });
    });

    $("#crankset-selector").bind("change", function() {
        var selectedValue = $("#crankset-selector").children(':selected').val();
        var cranksetToothesList = selectedValue.split("-");
        _.each(_.range(numOfFrontGears - cranksetToothesList.length), function(i) {
            var inputFrontGear = $("#inputFrontGear" + (numOfFrontGears - i) + "S");
            inputFrontGear.val("");
        });
        _.each(cranksetToothesList, function(value, i) {
            var inputFrontGear = $("#inputFrontGear" + (i + 1) + "S");
            inputFrontGear.val(value);
        });
    });
});
