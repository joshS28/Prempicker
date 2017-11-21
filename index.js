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

     var database = firebase.database().ref();
    
     var user = firebase.auth().currentUser;
     var name, email, photoUrl, uid, emailVerified;
     email = user.email;
     name = user.displayName;
     uid = user.uid;
    
     var users = database.child("users");
     //var newEmail = email.replace(".", ",");
     //alert(newEmail);
     //users.child("email").set({newEmail : {week1: 10, week2: 11} });

     

    
 

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
     document.getElementById('checkName').innerHTML = "Hey " + uid + " !";


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
        var database = firebase.database().ref();
    
     var user = firebase.auth().currentUser;
     var name, email, photoUrl, uid, emailVerified;
     email = user.email;
     name = user.displayName;
     uid = user.uid;
     var users = database.child("users");

     function escapeEmailAddress(email) {
      if (!email) return false
      // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
      email = email.toLowerCase();
      email = email.replace(/\./g, ',');
      return email;
      }
      
      var myUser = users.child(escapeEmailAddress(user.email));
      myUser.set({ email: user.email, name: user.displayName, phone: 12912912 });


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