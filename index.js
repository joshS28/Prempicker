firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();

    var dialog = document.querySelector('#loginDialog');
    /*
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    */
    dialog.close();

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    email = user.email;
    name = user.displayName;
    
    document.getElementById('nameBody').innerHTML = "Hey " + email;

    if(name == null){
      var x = document.getElementById('noName');
      x.style.display = "block";
      var nameEntry = document.getElementById('nameInput').value;
      user.updateProfile({
        displayName: nameEntry
      }).then(function(){
        document.getElementById('nameBody').innerHTML = "Hey " + email + " we found your name, it's " + nameEntry;
      });
    }
    else{
      document.getElementById('nameBody').innerHTML = "Hey " + email + " we found your name, it's " + name;

    }
     document.getElementById('checkName').innerHTML = "Hey " + user.displayName + " !";



  } else {

    $(".login-cover").show();

    // No user is signed in.
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

  }
});


/* LOGIN PROCESS */

$("#loginBtn").click(
  function(){


    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#loginError").show().text(errorMessage);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
    }
  }
);


$("#signupBtn").click(
  function(){


    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#loginError").show().text(errorMessage);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
    }
  }
);


/* LOGOUT PROCESS */

$("#signOutBtn").click(
  function(){

    firebase.auth().signOut().then(function() {
      $("#loginProgress").hide();
      $("#loginBtn").show();
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

  }
);