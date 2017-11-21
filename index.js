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
     //name = user.displayName;
     uid = user.uid;

     var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;
        //email = user.email;
    // name = user.displayName;
     //uid = user.uid;

       function escapeEmailAddress(email) {
        if (!email) return false
        // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
        console.log("inside loop - working");
        email = email.toLowerCase();
        email = email.replace(/\./g, ',');
        console.log("finished loop - working");
        return email;
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
    console.log("sign up btn clicked");

    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

        console.log("New user created");

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var database = firebase.database().ref();
        
    
        
      


        $("#loginError").show().text(errorMessage);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
      var database = firebase.database().ref();
        console.log("Reference made");
        var users = database.child("users");
        var user = firebase.auth().currentUser;
        //var displayName = user.displayName;
        function escapeEmailAddress(email) {
        if (!email) return false
        // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
        console.log("inside loop - working");
        email = email.toLowerCase();
        email = email.replace(/\./g, ',');
        console.log("finished loop - working");
        return email;
        }
        console.log("calling loop - working");
        var myUser = users.child(escapeEmailAddress(email));
        console.log("setting variables - working");
        myUser.set({ email: email});

        console.log("variables set - working");


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