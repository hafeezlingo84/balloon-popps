const firebaseConfig = {
    apiKey: "AIzaSyAMzu8u63ZSluBp0GUXcYmwfEWAyF7XoyE",
    authDomain: "pop-balloon-92849.firebaseapp.com",
    projectId: "pop-balloon-92849",
    storageBucket: "pop-balloon-92849.appspot.com",
    messagingSenderId: "1096232380004",
    appId: "1:1096232380004:web:e5bd71e4e3682dfa3e2171",
    measurementId: "G-EBCBDSYQN9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}

function logout() {
    auth.signOut();
}

function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}


auth.onAuthStateChanged((user) => {
    if (user) {
        firestore.collection('users').doc(user.uid).set({
            email: user.email,
           
        })
            .then(() => {
                console.log("Document written");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        setData(user);

        document.getElementById("user").innerHTML = user.email;
        document.getElementById("login_box").style.display = "none";
        document.getElementById("welcome_box").style.display = "block";
        document.getElementById("balloonBG").style.display = "none";


    } else {
        document.getElementById("login_box").style.display = "block";
        document.getElementById("welcome_box").style.display = "none";

        document.getElementById("balloonBG").style.display = "none";



    }
});

const setData = (user) => {
    firestore.collection('users').doc(user.uid).get().then((querySnapshot) => {
        const data = querySnapshot.data();
     
        const lastLoggedInSpan = document.getElementById("lastLoggedIn");
      
    });
}



let popped = 0;
let wrong = 0;
document.addEventListener('mouseover', function (e) {

    if (e.target.className === "red") {

        e.target.style.backgroundColor = "#ededed";
        e.target.textContent = "POP!";
        popped++;
        document.getElementById("correct").innerHTML = popped;
        removeEvent(e);
        checkAllPopped();
        console.log(popped);
    }

    if (e.target.className === "balloon") {

        e.target.style.backgroundColor = "#ededed";
        e.target.textContent = "wrong";
        wrong++;
        document.getElementById("wrong").innerHTML = wrong;
        removeEvent(e);
        checkAllPopped();
        console.log(wrong);
    }

});

function removeEvent(e) {
    e.target.removeEventListener('mouseover', function () {

    })
};

function checkAllPopped() {
    if (wrong === 3) {
        console.log('all popped!');
        let gallery = document.querySelector('#balloon-gallery');
        let message = document.querySelector('#youLose');
        gallery.innerHTML = '';
        message.style.display = 'block';
    }

    if (popped === 10) {
        console.log('all popped!');
        let gallery = document.querySelector('#balloon-gallery');
        let message = document.querySelector('#yay-no-balloons');
        gallery.innerHTML = '';
        message.style.display = 'block';
    }


};

function gameStart() {
    document.getElementById("balloonBG").style.display = "block";
}

function reset() {
    location.reload();
}
