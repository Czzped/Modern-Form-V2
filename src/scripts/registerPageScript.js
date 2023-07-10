import "../styles/registerPageStyle.css"

const inputs = document.querySelectorAll('input').forEach((ev) => {
    ev.addEventListener('keydown', (ev) => {
        const erroSpans = document.querySelectorAll('span')
        erroSpans.forEach((span) => {
            span.innerText = ""
        })
    })
})

const form = document.getElementById('form').addEventListener('submit', async (ev) => {
    ev.preventDefault()

    let user = {
        username: "",
        email: "",
        password: ""
    }

    try {
        const API = await fetch('http://localhost:3000/users')
        const clientsData = await API.json()
        let numbersOfPassedRegexErros = 0

        const filds = [
            {
                name: "username",
                ref: document.getElementById('usernameInput'),
                erroSpan: document.getElementById('usernameErroSpan'),
                erros: [
                    {
                        erroMessage: 'The username must include of 3 to 16 characters.',
                        regex: /^.{3,16}$/
                    },
                    ,
                    {
                        erroMessage: 'The username must have just lowercase letters',
                        regex: /^[a-z]+$/
                    }
                ]
            },
            {
                name: "email",
                ref: document.getElementById('emailInput'),
                erroSpan: document.getElementById('emailErroSpan'),
                erros: [
                    {
                        erroMessage: "you can't have empty spaces",
                        regex: /^\S+$/
                    },
                    {
                        erroMessage: "you can write @ just one time",
                        regex: /^([^@]*@[^@]*)$/
                    },
                    {
                        erroMessage: "you have to put just letters or numbers before the @",
                        regex: /^[a-zA-Z0-9]+@/
                    },
                    {
                        erroMessage: "you need to put letters or numbers before and after the char .",
                        regex: /[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
                    },
                    {
                        erroMessage: "your email needs to have a .something after the char @",
                        regex: /@.*\./
                    },
                    {
                        erroMessage: "you have to write something before @",
                        regex: /.+@/
                    },
                    {
                        erroMessage: "email doesn't has @",
                        regex: /@/
                    }
                ]
            },
            {
                name: "password",
                ref: document.getElementById('passwordInput'),
                erroSpan: document.getElementById('passwordErroSpan'),
                erros: [
                    {
                        erroMessage: "your password needs to have at least 1 uppercase letter",
                        regex: /^(?=.*?[A-Z])/
                    },
                    {
                        erroMessage: "your password needs to have at least 1 lowercase letter",
                        regex: /^(?=.*?[a-z])/
                    },
                    {
                        erroMessage: "your password needs to have at least 1 number",
                        regex: /^(?=.*?[0-9])/
                    },
                    {
                        erroMessage: "your password needs to have at least one especial char",
                        regex: /^(?=.*?[#?!@$ %^&*-])/
                    },
                    {
                        erroMessage: "your password needs to have at least 8 chars",
                        regex: /^.{8,}$/
                    },
                ]
            }

        ]

        filds.map(({ name, ref, erroSpan, erros }) => {
            if (ref.value === "") {
                return erroSpan.innerText = 'You need to fill this place'
            }

            erros.forEach((erro) => {
                if (!ref.value.match(erro.regex)) {
                    return erroSpan.innerText = erro.erroMessage
                }
                user[name] = ref.value
                numbersOfPassedRegexErros++
            })
        })

        const usernameVerification = clientsData.find((ev) => {
            return ev.username === user.username
        })
        const emailVerification = clientsData.find((ev) => {
            return ev.email === user.email
        })

        if (usernameVerification || emailVerification) {
            return alert('You are trying register an user that already exists')
        }

        if (numbersOfPassedRegexErros < 14) {
            return
        }

        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        window.location.replace("/dist/pages/loginPage.html")
    } catch (err) {
        alert('Something happened:(')
        console.log(err)
    }
})