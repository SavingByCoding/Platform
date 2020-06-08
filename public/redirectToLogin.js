firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "LoginPage/Login.html"
    }
})
