/* eslint-disable no-undef */
$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let counter = $(this).parent().find('output');
    $(counter).text(140 - $(this).val().length);
    console.log($(counter).val());
    if ($(counter).val() < 0) {
      $(counter).css('color', 'red');
    } else {
      $(counter).css('color', '#545149');
    }
  });
});