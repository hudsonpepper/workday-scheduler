// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// localStorage.clear();

$(function () {
  // Logs Time and Date at the top of the page
  let currentTime = dayjs().format('MM/DD/YYYY [@] HH:mm');
  $("#currentDay").text(currentTime);

  // Deals with Local Storage Initialization
  var eventHistory = localStorage.getItem("eventHistory");
  if (eventHistory === null) {
    eventHistory = [, , , , , , , ,];
    localStorage.setItem("eventHistory", JSON.stringify(eventHistory));
  }
  else {
    eventHistory = JSON.parse(eventHistory);
  }

  // Event Listener: Clear Calendar Button
  $("#clearCal").on("click", function () {
    eventHistory = [, , , , , , , ,];
    localStorage.setItem("eventHistory", JSON.stringify(eventHistory));
    logEvents(eventHistory);
  })

  // Event Listener: 
  $(".saveBtn").on("click", function () {
    console.log("click");
    // Logs Hour Number
    let hourNum = $(this).parent().data("number")
    console.log("Hour Number Clicked", hourNum);
    let currHour = Number(dayjs().format('H'));
    console.log("Hour of the day", currHour);
    if (hourNum > currHour) {
      console.log("Future");
    }
    else if (hourNum == currHour) {
      console.log("Present");
    }
    else {
      console.log("Past")
    }
    // Logs text content
    let textContent = $(this).parent().children().eq(1).val()
    console.log(textContent);
    eventHistory[hourNum - 9] = textContent;
    console.log(eventHistory)
    localStorage.setItem("eventHistory", JSON.stringify(eventHistory));
  });

  // Logs Local History Events to relevant text boxes
  function logEvents(eventHistory) {
    for (let i = 0; i < $(".description").length; i++) {
      $($(".description")[i]).val(eventHistory[i]);
    }
  }
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
  logEvents(eventHistory);
});
