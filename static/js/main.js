'use strict';

  // Initialize Firebase
  // TODO: Add configuration for firebase here
  //var config = {
    // apiKey: "AIzaSyBREeQlrGADDe0XoNnJLgmHNdi4cE8mN0c",
    // authDomain: "firetalk-7b1ad.firebaseapp.com",
    // databaseURL: "https://firetalk-7b1ad.firebaseio.com",
    // projectId: "firetalk-7b1ad",
    // storageBucket: "firetalk-7b1ad.appspot.com",
    // messagingSenderId: "777143835998"
  //};
  //firebase.initializeApp(config);

function FireTalk() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  this.newCommentsTextField = document.getElementById('new-comments');
  this.commentsForm = document.getElementById('comments-form');
  this.commentInput = document.getElementById('new-comment');
  this.submitButton = document.getElementById('submit');
  this.commentsForm.addEventListener('submit', this.saveComment.bind(this));

    // Toggle for the button.
    var buttonTogglingHandler = this.toggleButton.bind(this);
    this.commentInput.addEventListener('keyup', buttonTogglingHandler);
    this.commentInput.addEventListener('change', buttonTogglingHandler);


  // Comments
  this.commentList = document.getElementById('comments');

  // Saves comment on form submit.
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  

  this.initFirebase();
}

FireTalk.prototype.initFirebase = function() {
    // TODO: Init firebase
        // Shortcuts
        // this.auth = firebase.auth();
        // this.database = firebase.database();
        
        // // Initiates Firebase auth and listen to auth state changes.
        // this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

FireTalk.prototype.signIn = function() {
    // TODO: Implement signin method
    // Sign in Firebase using popup auth and Google as the identity provider.
    // var provider = new firebase.auth.GoogleAuthProvider();
    // this.auth.signInWithPopup(provider);
};

// Signs-out
FireTalk.prototype.signOut = function() {
    // TODO: Implement signout method
    // Sign out of Firebase.
    // this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
FireTalk.prototype.onAuthStateChanged = function(user) {
    // TODO: Listen to auth state changes
    if (user) { // User is signed in!
        // Get profile pic and user's name from the Firebase user object.
        var profilePicUrl = user.photoURL;
        var userName = user.displayName;
    
        // Set the user's profile pic and name.
        this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
        this.userName.textContent = userName;
    
        // Show user's profile and sign-out button.
        this.userName.removeAttribute('hidden');
        this.userPic.removeAttribute('hidden');
        this.signOutButton.removeAttribute('hidden');
    
        // Hide sign-in button.
        this.signInButton.setAttribute('hidden', 'true');

        // Show the textfield when user is logged in
        this.newCommentsTextField.removeAttribute('hidden');

        this.commentList.removeAttribute('hidden');

        // TODO: Load comments here
        // this.loadComments();
    
      } else { // User is signed out!
        // Hide user's profile and sign-out button.
        this.userName.setAttribute('hidden', 'true');
        this.userPic.setAttribute('hidden', 'true');
        this.signOutButton.setAttribute('hidden', 'true');
        this.newCommentsTextField.setAttribute('hidden', 'true');
        this.commentList.setAttribute('hidden', 'true');
        // Show sign-in button.
        this.signInButton.removeAttribute('hidden');

      }
};

FireTalk.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK.');
  }
};

// Template for comments.
var COMMENT_TEMPLATE = '<div class="message-container">' +
'<div class="spacing"><div class="pic"></div></div>' +
'<div class="name"></div>' +
'<div class="text"></div>' +
'</div>';

// Loads comments and listen to upcoming ones.
FireTalk.prototype.loadComments = function() {
    // Reference to the /comments/ database path.
    this.commentsRef = this.database.ref('comments');
    // Make sure we remove all previous listeners.
    this.commentsRef.off();
  
    // Loads the last 12 comments and listen for new ones.
    // var setComment = function(data) {
    //   var val = data.val();
    //   this.displayComments(data.key, val.name, val.text);
    // }.bind(this);
    // this.commentsRef.limitToLast(12).on('child_added', setComment);
    // this.commentsRef.limitToLast(12).on('child_changed', setComment);
    // // We are finished loading the comments. Disable loading text
    // document.getElementById('loading').setAttribute('hidden', 'true');
  };

  // Saves a new comment on the Firebase DB.
  FireTalk.prototype.saveComment = function(e) {
  e.preventDefault();
  // Check that the user entered a comment and is signed in.
  if (this.commentInput.value && this.checkSignedInWithMessage()) {
    var currentUser = this.auth.currentUser;
    // Add a new comment entry to the Firebase Database.
    // this.commentsRef.push({
    //   name: currentUser.displayName,
    //   text: this.commentInput.value,
    //   photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
    // }).then(function() {
    //   // Clear comments text field and SEND button state.
    //   FireTalk.resetMaterialTextfield(this.commentInput);
    //   this.toggleButton();
    // }.bind(this)).catch(function(error) {
    //   console.error('Error writing new comment to Firebase Database', error);
    // });
  }
};

// Resets the given MaterialTextField.
FireTalk.prototype.resetMaterialTextfield = function(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// Returns true if user is signed-in. Otherwise false and displays a message.
FireTalk.prototype.checkSignedInWithMessage = function() {
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

// Enables or disables the submit button depending on the values of the input
// fields.
FireTalk.prototype.toggleButton = function() {
  if (this.commentInput.value) {
    this.submitButton.removeAttribute('disabled');
  } else {
    this.submitButton.setAttribute('disabled', 'true');
  }
};

// Displays a comment in the UI.
FireTalk.prototype.displayComments = function(key, name, text) {
    var div = document.getElementById(key);
    // If an element for that comment does not exists yet we create it.
    if (!div) {
      var container = document.createElement('div');
      container.innerHTML = COMMENT_TEMPLATE;
      div = container.firstChild;
      div.setAttribute('id', key);
      this.commentList.appendChild(div);
    }
    div.querySelector('.name').textContent = name;
    var commentElement = div.querySelector('.text');
    if (text) {
        commentElement.textContent = text;
      // Replace all line breaks by <br>.
      commentElement.innerHTML = commentElement.innerHTML.replace(/\n/g, '<br>');
    }
    // Show the card fading-in and scroll to view the new comment.
    // setTimeout(function() {div.classList.add('visible')}, 1);
    // this.commentList.scrollTop = this.commentList.scrollHeight;
    // this.messageInput.focus();
  };

window.onload = function() {
  window.FireTalk = new FireTalk();
};
