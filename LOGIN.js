var correctCode = "987654";
var busy = false;    
var tries = 0;       
var loginId = "";    



function signIn() {
  if (busy) { return; }
  busy = true;

  var google = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(google)
    .then(function (result) {
      var user = result.user;
      document.getElementById('who').textContent = user.email;

      return db.collection("logins").add({
        name:   user.displayName,
        email:  user.email,
        time:   new Date().toString(),
        status: "Pending verification"
      });
    })
    .then(function (record) {
      loginId = record.id;

      document.getElementById('step1').style.display = "none";
      document.getElementById('step2').style.display = "block";
    })
    .catch(function (error) {
      busy = false;
      document.getElementById('message').textContent = "Failed: " + error.code;
    });
}







function newCode() {
  document.getElementById('codeBox').value = "";
  document.getElementById('codeMessage').textContent = "";
}

function checkCode() {
  var typed = document.getElementById('codeBox').value;
  var note = document.getElementById('codeMessage');

  if (typed == correctCode) {
    note.className = "ok";
    note.textContent = "✅ Code verified. Opening the control centre...";

    db.collection("logins").doc(loginId).update({ status: "Verified" });

    setTimeout(function () {
      window.location.href = "1index.html";
    }, 1200);

  } else {
    tries = tries + 1;
    note.className = "error";

    if (tries >= 3) {
      note.textContent = "❌ Too many wrong codes. This attempt has been blocked.";
      db.collection("logins").doc(loginId).update({ status: "Blocked: failed verification" });
      document.getElementById('codeBox').disabled = true;

    } else {
      note.textContent = "❌ Wrong code. " + (3 - tries) + " attempts left.";
    }
  }
}