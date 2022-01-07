/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escape function to prevent "cross-site scripting"
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  $(".error").hide();

  const createTweetElement = function(tweet) {
    let tweetTime = timeago.format(escape(tweet.created_at));
    let $tweet = $(`
    <article class="tweet-container">
      <header class="tweet-header">
        <div class="user-info">
          <img src=${escape(tweet.user.avatars)}/>
          <p>${escape(tweet.user.name)}</p>
        </div>
        <p class="user-id">${tweet.user.handle}</p>
      </header>
      <!-- Tweet content -->
      <div class="tweet-content">
        <p>${escape(tweet.content.text)}</p>
      </div>
      <!-- Timestamp and icons for tweet -->
      <footer class="tweet-footer">
        <div class="timestamp">
          <p>${tweetTime}</p>
        </div>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
    return $tweet;
  };

  // Function to render tweets to the tweets area
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.get("/tweets").then(function(data) {
      renderTweets(data);
    });
  };
  loadTweets();

  // Function to show and hide error
  const errorDisplay = function() {
    $(".error").slideDown("slow");

    setTimeout(() => {
      $(".error").slideUp("slow");
    }, 3000);
  };

  // Function to validate the form
  const formValidation = function() {
    const $tweetContent = $("#tweet-text").val();

    if (!$tweetContent.length) {
      $(".error-message").text("Tweet cannot be empty");
      errorDisplay();
      return false;
    } else if ($tweetContent.length > 140) {
      $(".error-message").text("Tweet is too long. Please keep it within 140 characters");
      errorDisplay();
      return false;
    }

    return true;
  };

  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    if (!formValidation("tweet-text")) return false;
    const formData = $(this).serialize();
    $("#tweet-text").val('');
    $(".counter").text(140);
    $.post("/tweets", formData).then(loadTweets);
  });
});
