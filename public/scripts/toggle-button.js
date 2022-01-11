/* eslint-disable no-undef */
$(document).ready(function() {
  $(".tweet-form").hide();
  $(".compose-button").on("click", function() {
    $(".tweet-form").slideToggle("slow");
    $("#tweet-text").focus();
  });
});