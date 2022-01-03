/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const tweetTime = timeago.format(created_at);
    let $tweet = `
  <article class="tweet-container">
    <header class="tweet-header">
      <div class="user-info">
        <img src=${tweet.user.avatars}/>
        <p>${tweet.user.name}</p>
      </div>
      <p class="user-id">${tweet.user.handle}</p>
    </header>
    <!-- Tweet content -->
    <div class="tweet-content">
      <p>${tweet.content.text}</p>
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
  `;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  const loadTweets = function() {
    $.get("/tweets").then(function(data) {
      renderTweets(data);
    });
  };
  loadTweets();

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.post("/tweets", formData);
  });

});


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
