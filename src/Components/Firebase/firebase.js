import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDujHiTU_N1ROc2JOIrdsCBn2YXA7Do288",
    authDomain: "quiz-app-d1538.firebaseapp.com",
    databaseURL: "https://quiz-app-d1538.firebaseio.com",
    projectId: "quiz-app-d1538",
    storageBucket: "quiz-app-d1538.appspot.com",
    messagingSenderId: "1076375064328",
    appId: "1:1076375064328:web:084834c0e941191f8f26bd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  class Firebase {
    constructor() {
      this.auth = firebase.auth()
      this.db = firebase.firestore()
    }
  
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }
  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password) 
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  isInitialized(){
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }
  
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }
  
  }

  const projectFirestore = firebase.firestore();

  export {  projectFirestore };
  export default new Firebase();