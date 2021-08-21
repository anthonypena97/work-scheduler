var today = moment().format("[Today is] dddd MMMM Do[,] YYYY");
var time = moment().format("Ha");
var currentTime = moment(time, "Ha");
var hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]

saveText = function (id) {
    id = id.slice(4);
    var textTarget = "#txt-" + id;
    console.log($(textTarget).val());
}

populateHourBlocks = function () {

    $.each(hours, function (i) {

        var scheduleHour = moment(hours[i], "Ha");
        var id = "#" + i.toString();

        var hourContainer = $('<li>').attr('id', i).addClass("row time-block");
        $('.list-group').append(hourContainer);

        // WORK HOUR
        var hourDiv = $('<div>').addClass("col-sm-2 hour").text(hours[i]);
        $(id).append(hourDiv);

        var textDiv;

        var txt = "txt-" + i;

        // TEXT AREA

        // if hour block is in the past
        if (moment(currentTime).isAfter(scheduleHour)) {

            textDiv = $('<textarea>').addClass("col-8 description past").attr('id', txt);
            $(id).append(textDiv);

            // if hour block is in the present
        } if (moment(currentTime).isSame(scheduleHour)) {

            textDiv = $('<textarea>').addClass("col-8 present").attr('id', txt);
            $(id).append(textDiv);

        } if (moment(currentTime).isBefore(scheduleHour)) {

            // if hour block is in the future
            textDiv = $('<textarea>').addClass("col-8 future").attr('id', txt);
            $(id).append(textDiv);

        }
        var btn = "btn-" + i;

        // SAVE BUTTON
        var saveDiv = $('<i>').addClass("col-md-2 saveBtn").attr('id', btn).text("save");
        $(id).append(saveDiv);

        // add event listener for save button
        var saveBtn = document.querySelector("#" + btn)
        saveBtn.addEventListener("click", function (event) {

            saveText(event.target.id);

        })


    })

};

updateToday = function () {
    $('#currentDay').text(today);
};

pageLoad = function () {

    updateToday();

    populateHourBlocks();

};

// $("#btn").on("click", function (event) {
//     console.log("hello")
//     console.log(event);
// })

// PAGE LOAD - REFRESHES EVERY 30 MINS
setInterval(pageLoad(), (1000 * 60) * 30);