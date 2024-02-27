// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Function to display current date at the top of the calendar
  function displayCurrentDate() {
    // Set the text of the element with id "currentDay" to the current date
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  }

  // Function to generate time blocks for standard business hours
  function generateTimeBlocks() {
    // Select the container element where time blocks will be appended
    var container = $(".container-fluid");
    // Loop through standard business hours (9am to 5pm)
    for (var i = 9; i <= 17; i++) {
      // Generate hour string in AM/PM format
      var hour = i < 12 ? i + "AM" : i == 12 ? "12PM" : (i - 12) + "PM";
      // Create unique id for each time block
      var hourId = "hour-" + i;
      // Create a new time block div element
      var timeBlock = $("<div>")
        .attr("id", hourId) // Set id attribute
        .addClass("row time-block") // Add classes for styling
        .addClass(getTimeBlockColor(i)); // Apply color class based on current time
      // Create hour column div with hour text
      var hourCol = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(hour);
      // Create textarea element for event description
      var textarea = $("<textarea>")
        .addClass("col-8 col-md-10 description")
        .attr("rows", 3)
        .val(localStorage.getItem(hourId)); // Set value from local storage
      // Create save button with icon
      var saveBtn = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      // Append hour column, textarea, and save button to time block
      timeBlock.append(hourCol, textarea, saveBtn);
      // Append time block to container
      container.append(timeBlock);
    }
  }

  // Function to determine time block color based on current hour
  function getTimeBlockColor(hour) {
    var currentHour = dayjs().hour();
    // Compare current hour with time block hour and return appropriate class
    if (hour < currentHour) {
      return "past"; // Past time block
    } else if (hour === currentHour) {
      return "present"; // Present time block
    } else {
      return "future"; // Future time block
    }
  }

  // Event listener for save button click
  $(".container-fluid").on("click", ".saveBtn", function() {
    // Get the parent time block of the clicked save button
    var timeBlock = $(this).parent();
    // Extract hour id from time block
    var hourId = timeBlock.attr("id");
    // Get event text from description textarea
    var eventText = timeBlock.find(".description").val();
    // Save event text in local storage with hour id as key
    localStorage.setItem(hourId, eventText);
  });

  // Call functions to initialize the planner
  displayCurrentDate(); // Display current date
  generateTimeBlocks(); // Generate time blocks
});