firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid)
        db.collection("users")
            .where("userId", "==", user.uid)
            .get()
            .then((qs) => {
                let doc = qs.docs[0]
                if (doc.data().userType !== '2') {
                    document.body.innerHTML = ''
                    window.location.href = "ProfilePage/profile.html"
                }
            })
    }
})
