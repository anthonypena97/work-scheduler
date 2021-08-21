var today = moment().format("[Today is] dddd MMMM Do[,] YYYY");
var date = moment().format("MMM Do YYYY");
var time = moment().format("Ha");
var currentTime = moment(time, "Ha");
var hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var list = JSON.parse(localStorage.getItem('work-scheduler')) || [];
var updatedList = [];

populateHourBlocks = function () {

    $.each(hours, function (i) {

        var textDiv;
        var txt = "txt-" + i;

        var scheduleHour = moment(hours[i], "Ha");
        var id = "#" + i.toString();

        var hourContainer = $('<li>').attr('id', i).addClass("row time-block");
        $('.list-group').append(hourContainer);

        // WORK HOUR
        var hourDiv = $('<div>').addClass("col-sm-2 hour").text(hours[i]);
        $(id).append(hourDiv);

        // TEXT AREA BLOCK
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

saveText = function (id) {

    // save button id that is pushed when funtion is caleld
    id = id.slice(4);
    var textTarget = "#txt-" + id;
    var taskToDo = $(textTarget).val()

    console.log(taskToDo);

    var toDo = {
        id: id,
        toDo: taskToDo,
        date: date
    }

    list.push(toDo);

    localStorage.setItem('work-scheduler', JSON.stringify(list));

}

loadTasks = function () {

    for (i = 0; i < list.length; i++) {

        if (list[i].date === date) {

            var textArea = "#txt-" + list[i].id;
            var textContent = list[i].toDo;

            // target text area
            $(textArea).val(textContent);
            console.log(list[i]);

            updatedList.push(list[i]);

        }

    };

    list = updatedList;

};

updateToday = function () {

    $('#currentDay').text(today);

};

pageLoad = function () {

    updateToday();

    populateHourBlocks();

    loadTasks();

};

// PAGE LOAD - REFRESHES EVERY 30 MINS
setInterval(pageLoad(), (1000 * 60) * 30);