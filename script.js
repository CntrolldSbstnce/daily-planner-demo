$(function () {
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  function createTimeBlocks() {
    for (let hour = 9; hour <= 17; hour++) {
      var displayHour = hour <= 12 ? hour : hour - 12;
      var amPm = hour < 12 ? 'AM' : 'PM';
      var timeBlock = $('<div>').addClass('row time-block').attr('id', `hour-${hour}`);
      var hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(`${displayHour}${amPm}`);
      var textArea = $('<textarea>').addClass('col-8 col-md-10 description');
      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').append($('<i>').addClass('fas fa-save'));
      timeBlock.append(hourDiv, textArea, saveBtn);
      $('.container-lg.px-5').append(timeBlock);
    }
  }

  function updateTimeBlocks() {
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').replace('hour-', ''));
      if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  function saveEvent() {
    var hourId = $(this).parent().attr('id');
    var eventText = $(this).siblings('.description').val();
    localStorage.setItem(hourId, eventText);
  }

  function loadEvents() {
    $('.time-block').each(function () {
      var hourId = $(this).attr('id');
      var eventText = localStorage.getItem(hourId);
      if (eventText !== null) {
        $(this).find('.description').val(eventText);
      }
    });
  }

  createTimeBlocks();
  updateTimeBlocks();
  loadEvents();
  setInterval(updateTimeBlocks, 60000);
  $(document).on('click', '.saveBtn', saveEvent);
});