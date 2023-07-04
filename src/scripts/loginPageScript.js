const enterButton = document.getElementById('enterButton').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/users')
        const clientsData = await response.json()

        const email = document.getElementById('emailInput')
        const password = document.getElementById('passwordInput')

        const emailValidation = clientsData.filter((ev) => {
            if (ev.email === email.value) {
                return ev
            }
            return
        })
        const passwordValidation = clientsData.filter((ev) => {
            if (ev.password === password.value) {
                return ev
            }
            return
        })

        if (emailValidation[0] === undefined || passwordValidation[0] === undefined) {
            alert('Incapable to find the user')
        } else {
            alert('Redirecting you...')
            window.location.replace('finalPage.html')
        }
    } catch (err) {
        alert('Something happend :(')
        console.log(err)
    }
})
