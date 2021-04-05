// const userInput = document.getElementById('user')
// const passwordInput = document.getElementById('password')
// const form = document.getElementById('login')
// const errorBox = document.getElementById('error')

// form.addEventListener('submit', (e) => {
//     let errors = []

//     if (userInput === null || userInput.value === '') errors.push('Username is required.')
//     else if (userInput.value.length <= 4) errors.push('Username must be longer than 4 characters.')
//     else if (userInput.value.length > 12) errors.push('Username must be less than 12 characters.')

//     if (passwordInput === null || passwordInput.value === '') errors.push('Password is required.')
//     else if (passwordInput.value.length <= 6) errors.push('Password must be longer than 6 characters.')
//     else if (passwordInput.value.length > 32) errors.push('Password must be less than 32 characters.')

//     if (errors.length === 0 && userInput.value.toLowerCase() === passwordInput.value.toLowerCase()) errors.push('Username and password cannot be the same.')

//     if (errors.length !== 0) {
//         e.preventDefault()
//         errorBox.innerText = errors.join('\n')
//     }
// })