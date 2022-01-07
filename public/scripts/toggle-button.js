/* eslint-disable no-undef */
$(document).ready(function() {
  $(".compose-button").on("click", function() {
    $(".tweet-form").slideToggle();
    $("#tweet-text").focus();
  });
});