const inputs = document.querySelectorAll('input').forEach((ev) => {
    ev.addEventListener('keydown', (ev) => {
        ev.target.classList.remove('erroClass')
    })
})

const registerButton = document.getElementById('enterButton').addEventListener('click', async () => {
    try {
        let passedOnRegexValidation = true

        const response = await fetch('http://localhost:3000/users')
        const clientsData = await response.json()

        const username = document.getElementById('usernameInput')
        const email = document.getElementById('emailInput')
        const password = document.getElementById('passwordInput')
        const a = [username, email]

        if (username.value === "" || email.value === "" || password.value === "") {
            alert('You need to fill all places')
            username.classList.add('erroClass')
            email.classList.add('erroClass')
            password.classList.add('erroClass')
            return
        }

        if (!email.value.match((/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || email.value === "") {
            alert("Your email doens't match")
            email.classList.add('erroClass')
            passedOnRegexValidation = false
        }
        if (!password.value.match((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) || password.value === "") {
            alert("Write a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character")
            password.classList.add('erroClass')
            passedOnRegexValidation = false
        }

        const usernameVerification = clientsData.find((ev) => {
            return ev.username === username.value
        })
        const emailVerification = clientsData.find((ev) => {
            return ev.email === email.value
        })

        if (usernameVerification || emailVerification) {
            alert('You are trying register an user that already exists')
        } else if (passedOnRegexValidation === false) {
            return
        } else {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username.value,
                    "email": email.value,
                    "password": password.value
                })
            })
            window.location.replace("/src/pages/loginPage.html")
        }
    } catch (err) {
        alert('Something happend :(')
        console.log(err)
    }
})