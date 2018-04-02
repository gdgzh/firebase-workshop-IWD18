'use strict';

  // Initialize Firebase
  // TODO: Add configuration for firebase here
  var config = {
  };
  firebase.initializeApp(config);

function FireTalk() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');

  // Saves message on form submit.
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  this.initFirebase();
}

FireTalk.prototype.initFirebase = function() {
    // TODO: Init firebase
};

FireTalk.prototype.signIn = function() {
    // TODO: Implement signin method
    // Sign in Firebase using popup auth and Google as the identity provider.
};

// Signs-out of Friendly Chat.
FireTalk.prototype.signOut = function() {
    // TODO: Implement signout method
    // Sign out of Firebase.
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
FireTalk.prototype.onAuthStateChanged = function(user) {
    // TODO: Listen to auth state changes 
};

FireTalk.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK.');
  }
};

window.onload = function() {
  window.FireTalk = new FireTalk();
};
