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
    const auth = firebase.auth(app);

    const registro = document.getElementById('registro');

    registro.addEventListener('click', (e) => {
        var email = document.getElementById('emailreg').value;
        var password = document.getElementById('passwordreg').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                alert("Usuario creado");
                sendEmailVerification(auth.currentUser).then(() => {
                    alert('Se ha enviado un correo de verificación');
                });
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode == 'auth/email-already-in-use') {
                    alert('El correo ya está en uso');
                } else if (errorCode == 'auth/invalid-email') {
                    alert('El correo no es válido');
                } else if (errorCode == 'auth/weak-password') {
                    alert('La contraseña debe tener al menos 6 caracteres');
                }
            });
    });
});