
var firebaseConfig = {
  apiKey:            "AIzaSyA_UW4DCrnUBm7gXxyTNTrQsH9DbclTlF0",
  authDomain:        "examguardai---login.firebaseapp.com",
  projectId:         "examguardai---login",
  storageBucket:     "examguardai---login.firebasestorage.app",
  messagingSenderId: "814525896444",
  appId:             "1:814525896444:web:b1be01d939ef364e2a6979"
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();