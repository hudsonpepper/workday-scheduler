// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// localStorage.clear();

$(function () {
  // Logs Time and Date at the top of the page
  let currentTime = dayjs().format('MM/DD/YYYY [@] HH:mm');
  $("#currentDay").text(currentTime);

  // Deals with Local Storage Initialization/Retrieval
  var eventHistory = localStorage.getItem("eventHistory");
  if (eventHistory === null) {
    eventHistory = [, , , , , , , ,];
    localStorage.setItem("eventHistory", JSON.stringify(eventHistory));
  }
  else {
    eventHistory = JSON.parse(eventHistory);
  }
  // Logs Local History Events to relevant text boxes
  function logEvents(eventHistory) {
    for (let i = 0; i < $(".description").length; i++) {
      $($(".description")[i]).val(eventHistory[i]);
    }
  }
  logEvents(eventHistory);
  // Colors According to Current Time and Time on Section
  function colorEvents() {
    let textBoxes = $(".description");
    let currHour = Number(dayjs().format('H'));
    for (let i = 0; i < textBoxes.length; i++) {
      let hourNum = $(textBoxes[i]).parent().data("number");
      if (hourNum > currHour) {
        // Future Condition
        $(textBoxes[i]).addClass('future');
        $(textBoxes[i]).removeClass('past present');
      }
      else if (hourNum == currHour) {
        // Present Condition
        $(textBoxes[i]).addClass('present');
        $(textBoxes[i]).removeClass('past future');
      }
      else {
        // Past Condition
        $(textBoxes[i]).addClass('past');
        $(textBoxes[i]).removeClass('present future');
      }
    }
  }
  colorEvents();

  // Refeshes every 30 seconds
  function setTime() {
    var timerInterval = setInterval(function () {
      currentTime = dayjs().format('MM/DD/YYYY [@] HH:mm');
      $("#currentDay").text(currentTime);
      colorEvents();
    }, 30000)
  }
  // Event Listener: Clear Calendar Button
  $("#clearCal").on("click", function () {
    eventHistory = [, , , , , , , ,];
    localStorage.setItem("eventHistory", JSON.stringify(eventHistory));
    logEvents(eventHistory);
  })

  // Event Listener: Save Button
  $(".saveBtn").on("click", function () {
    // Logs Hour Number
    let hourNum = $(this).parent().data("number")
    // Logs text content
    let textContent = $(this).parent().children().eq(1).val();
    eventHistory[hourNum - 9] = textContent;
    localStorage.setItem("eventHistory", JSON.stringify(eventHistory));
  });

  setTime();

});
