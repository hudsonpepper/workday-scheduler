// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// localStorage.clear();

$(function () {
  // Logs Time and Date at the top of the page
  let currentTime = dayjs().format('MM/DD/YYYY HH:mm');
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
    if(hourNum > currHour) {
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


  function logEvents(eventHistory) {
    for (let i = 0; i < $(".description").length; i++) {
      $($(".description")[i]).val(eventHistory[i]);
    }
  }
  logEvents(eventHistory);
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
