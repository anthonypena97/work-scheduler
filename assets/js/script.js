var today = moment().format("[Today is] dddd MMMM Do[,] YYYY");

updateToday = function () {
    $('#currentDay').text(today);
}

console.log(today);

updateToday();