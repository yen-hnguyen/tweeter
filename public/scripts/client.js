/* eslint-disable no-undef */
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
      <div class="tweet-header">
        <div class="user-info">
          <img src=${escape(tweet.user.avatars)}/>
          <p>${escape(tweet.user.name)}</p>
        </div>
        <p class="user-id">${tweet.user.handle}</p>
      </div>
      <!-- Tweet content -->
      <div class="tweet-content">
        <p>${escape(tweet.content.text)}</p>
      </div>
      <!-- Timestamp and icons for tweet -->
      <div class="tweet-footer">
        <div class="timestamp">
          <p>${tweetTime}</p>
        </div>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </article>
  `);
    return $tweet;
  };

  // Function to render each tweet to the site
  const renderTweet = function(tweet) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  };

  // Function to render tweets
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      renderTweet(tweet);
    }
  };

  const loadTweets = function() {
    $.get("/tweets").then(function(data) {
      renderTweets(data);
    });
  };
  loadTweets();

  // Function to load new tweet from the database
  const loadNewTweet = function() {
    $.get("/tweets").then(function(data) {
      let $newTweet = data[data.length - 1];
      renderTweet($newTweet);
    });
  };

  // Function to show and hide error
  const errorDisplay = function(errorMsg) {
    $(".error-message").text(errorMsg);
    $(".error").slideDown("slow");
    setTimeout(() => {
      $(".error").slideUp("slow");
    }, 3000);
  };

  // Function to validate the form
  const formValidation = function() {
    const $tweetContent = $("#tweet-text").val();

    if (!$tweetContent.length) {
      errorDisplay("Tweet cannot be empty");
      return false;
    } else if ($tweetContent.length > 140) {
      errorDisplay("Tweet is too long. Please keep it within 140 characters");
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
    $.post("/tweets", formData).then(loadNewTweet);
  });
});
