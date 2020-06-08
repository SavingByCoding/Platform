firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "public/LoginPage/Login.html"
    }
})
