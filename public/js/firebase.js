const firebaseConfig = {
    apiKey: "AIzaSyCcU3Ccmm0bfAGnP4yRw4Hkn6oTygfc7n8",
    authDomain: "projectii-blog-ddz.firebaseapp.com",
    projectId: "projectii-blog-ddz",
    storageBucket: "projectii-blog-ddz.appspot.com",
    messagingSenderId: "15940608233",
    appId: "1:15940608233:web:0e0917b3b227005f379078"
  }; 

  firebaseConfig.initializeApp(firebaseConfig);

  let db = firebase.firestore();