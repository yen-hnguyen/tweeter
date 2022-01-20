/* eslint-disable no-undef */
$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const counter = $(this).parent().find('output');
    $(counter).text(140 - $(this).val().length);
    if ($(counter).val() < 0) {
      $(counter).addClass("counter-color");
    } else {
      $(counter).removeClass("counter-color");
    }
  });
});