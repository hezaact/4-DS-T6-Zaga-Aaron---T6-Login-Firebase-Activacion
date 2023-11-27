import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js';
import {
    sendEmailVerification, getAuth, firebase, signInWithPopup,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js';

document.addEventListener('DOMContentLoaded', function () {

    const firebaseConfig = {
        apiKey: "AIzaSyBAhh3ZZRQvoafPAMbuXw01CQ83It-VHKQ",
        authDomain: "login-con-firebase-d93ad.firebaseapp.com",
        projectId: "login-con-firebase-d93ad",
        storageBucket: "login-con-firebase-d93ad.appspot.com",
        messagingSenderId: "662223730171",
        appId: "1:662223730171:web:992dda6ce377253107c75e"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = firebase.auth();

    const login = document.getElementById('login');
    const cerrar = document.getElementById('cerrar');

    login.addEventListener('click', (e) => {
        var email = document.getElementById('emaillog').value;
        var password = document.getElementById('passwordlog').value;

        if (!email || !password) {
            alert('Por favor, ingrese correo y contraseña.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password).then(cred => {
            alert("Usuario logueado");
            console.log(cred.user);
        }).catch(error => {
            const errorCode = error.code;
            if (errorCode == 'auth/invalid-email')
                alert('El correo no es válido');
            else if (errorCode == 'auth/user-disabled')
                alert('El usuario ha sido deshabilitado');
            else if (errorCode == 'auth/user-not-found')
                alert('El usuario no existe')
            else if (errorCode == 'auth/wrong-password')
                alert('Contraseña incorrecta')

        });
    });

    cerrar.addEventListener('click', (e) => {
        auth.signOut().then(() => {
            alert('Sesión cerrada');
        }).catch((error) => {
            alert('Error al cerrar sesión')
        })
    })

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("Usuario activo");
            var emailVerified = user.emailVerified; // Corrige la variable
            if (emailVerified) {
                window.open("https://www.google.com/")
            } else {
                auth.signOut();
            }
        } else {
            console.log("Usuario inactivo");
        }
    });
});