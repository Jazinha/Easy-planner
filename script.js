
function convertTime(t) {
  const day_season = t.slice(Math.max(t.length - 2, 0));
  var r = parseInt(t.substring(0, t.length - 2));
  
  if (day_season == "PM" && r != 12)
  {
    r = r + 12;
  }
  return r;
}

$(function () {
  hours = ['hour-8', 'hour-9', 'hour-10', 'hour-11', 'hour-12', 'hour-13', 'hour-14', 'hour-15', 'hour-16', 'hour-17']
  
  hours.map(hour => {
    const note = localStorage.getItem(hour);
    if (note != null) {
      const current_note = $(`#${hour} textarea`);
      current_note.text(note);
    }
  })

  $(".saveBtn").click(function () {
    const time_id = $(this).parent().attr('id');
    const note = $(`#${time_id} textarea`).val();
    localStorage.setItem(time_id, note);
  }
  );

  const current_day = dayjs().format('DD-MM-YYYY');
  const current_hour = hour;
  $("#currentDay").text(current_day);

  const blocks = $(".row.time-block");
  for (var i = 0; i < blocks.length; i++)
  {

    const t = $(blocks[i]).children('div').text();
    const integer_time = convertTime(t);
  
    if ( integer_time < current_hour )
    {
      $(blocks[i]).addClass("past");
    }
    else if ( integer_time == current_hour )
    {
      $(blocks[i]).addClass("present");
    }
    else
    {
      $(blocks[i]).addClass("future");
    }
  }
});
