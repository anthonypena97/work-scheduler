var today = moment().format("[Today is] dddd MMMM Do[,] YYYY");
var time = moment().format("Ha");
var currentTime = moment(time, "Ha");
var hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]

populateHours = function () {

    $.each(hours, function (i) {

        var scheduleHour = moment(hours[i], "Ha");

        let hourBlock = $('<li>').addClass("list-group-item").text(hours[i]);

        // console.log(scheduleHour)
        // if hour block is in the past

        if (moment(currentTime).isAfter(scheduleHour)) {

            $(hourBlock).addClass("past");

            // if hour block is in the present
        } if (moment(currentTime).isSame(scheduleHour)) {

            $(hourBlock).addClass("present");

        } if (moment(currentTime).isBefore(scheduleHour)) {

            // if hour block is in the future
            $(hourBlock).addClass("future");

        }


        $('.list-group').append(hourBlock);

    })

};

updateToday = function () {
    $('#currentDay').text(today);
};

pageLoad = function () {

    updateToday();

    populateHours();

}

// PAGE LOAD - REFRESHES EVERY 30 MINS
setInterval(pageLoad(), (1000 * 60) * 30);