// auth.js
import firebase from 'firebase'
import router from '../router'

import database from './database'
import {firebaseConfig} from './configs'
let googleProvider = new firebase.auth.GoogleAuthProvider();

const user = {
    displayName: 'پروفایل',
    email: '',
    emailVerified: false,
    photoURL: '',
    uid: ''
};


const getUser = () => {
    return user
};

const getUid = () => {
    return user.uid;
};


const isAuthenticated = {
    value: true,
};

// const initApp = () => {
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        if (firebaseUser.emailVerified === true) {
            isAuthenticated.value = true;
             // alert('User Logged In');
        } else {
            isAuthenticated.value = false;
            firebaseUser.sendEmailVerification().then(function () {
                alert("we have send an Verification link to "+firebaseUser.email+". Please verify your email")
                // console.log('send Verification');
            }, function (error) {
                alert(error.message);
                console.log('not send Verification');
            });
        }
    } else {
        isAuthenticated.value = false;
        // alert('not loggend in');
    }
    _checkUser(firebaseUser)
});
// }


const logout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.reload();
        isAuthenticated.value = false;
    }, (error) => {
        // An error happened.
        alert(error.message)
        window.location.reload()
    })
};

const _checkUser = (theUser) => {
    if (theUser) {
        user.displayName = theUser.displayName;
        if(user.displayName===null){
            user.displayName='پروفایل'
        }
        user.email = theUser.email;
        user.emailVerified = theUser.emailVerified;
        user.photoURL = theUser.photoURL;
        user.uid = theUser.uid;
        isAuthenticated.value = true;
    } else {
        user.displayName = 'پروفایل';
        user.email = '';
        user.emailVerified = false;
        user.photoURL = '';
        user.uid = '';
        router.push('/login');
    }
};

const login = (authInput) => {
    const email = authInput.email;
    const pass = authInput.password;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass).then(()=>{
        _checkUser(promise);
        router.push('/');
    }, (error) => {
        // An error happened.
        _checkUser();
        alert(error.message)
        // promise.catch(event => );
    })
};

const SignUp = (authInput) => {
    const email = authInput.email;
    const pass = authInput.password;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    console.log(promise);
    promise.catch(event =>alert(event.message));
};


const googleLogin = () => {
    firebase.auth().signInWithRedirect(googleProvider).then(function (result) {
        _checkUser(result.user);
    }).catch(function (error) {
        alert(error.message)
    });
};


database.init();
export default {getUser, logout, login, SignUp, googleLogin, isAuthenticated,getUid,firebase};