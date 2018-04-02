'use strict';

  // Initialize Firebase
  // TODO: Add configuration for firebase here
  var config = {
    apiKey: "AIzaSyBREeQlrGADDe0XoNnJLgmHNdi4cE8mN0c",
    authDomain: "firetalk-7b1ad.firebaseapp.com",
    databaseURL: "https://firetalk-7b1ad.firebaseio.com",
    projectId: "firetalk-7b1ad",
    storageBucket: "firetalk-7b1ad.appspot.com",
    messagingSenderId: "777143835998"
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
        // Shortcuts
        this.auth = firebase.auth();
        this.database = firebase.database();
        
        // Initiates Firebase auth and listen to auth state changes.
        this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

FireTalk.prototype.signIn = function() {
    // TODO: Implement signin method
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
};

// Signs-out of Friendly Chat.
FireTalk.prototype.signOut = function() {
    // TODO: Implement signout method
    // Sign out of Firebase.
    this.auth.signOut();
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
    
        // TODO: Load comments here
    
      } else { // User is signed out!
        // Hide user's profile and sign-out button.
        this.userName.setAttribute('hidden', 'true');
        this.userPic.setAttribute('hidden', 'true');
        this.signOutButton.setAttribute('hidden', 'true');
    
        // Show sign-in button.
        this.signInButton.removeAttribute('hidden');
      }
};

FireTalk.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK.');
  }
};

window.onload = function() {
  window.FireTalk = new FireTalk();
};
