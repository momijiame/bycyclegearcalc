
var numOfRearGears = 11;
var defaultRearToothesList = [11, 12, 13, 14, 15, 17, 19, 21, 23, 25];

var numOfFrontGears = 3;
var defaultFrontToothesList = [52, 39];

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
            value: defaultRearToothesList[i]
        }).addClass("input-block-level");
        divColumnDOM.append(divControlGroupDOM);
        divControlGroupDOM.append(divControlsDOM);
        divControlsDOM.append(inputRearGearDOM);

        $("#div-front-gears").append(divColumnDOM);
    });

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
            value: defaultFrontToothesList[i]
        }).addClass("input-block-level");
        divColumnDOM.append(divControlGroupDOM);
        divControlGroupDOM.append(divControlsDOM);
        divControlsDOM.append(inputFrontGearDOM);
        divRowDOM.append(divColumnDOM);

        _.each(_.range(numOfRearGears), function(j) {
            var divColumnDOM = $("<div>", {"class": "span1"});
            var inputRearGearDOM = $("<input>", {
                type: "text",
                id: "inputGearRatio" + (i + 1) + "x" + (j + 1),
                readonly: true
            }).addClass("input-block-level");
            divColumnDOM.append(inputRearGearDOM);
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
        var rearGearToothesList = [];
        chartJson["series"] = [];
        _.each(_.range(numOfFrontGears), function(i) {
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
});