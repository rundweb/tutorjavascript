const btnRegist = document.querySelector('.btn-regist'),
    registForm = document.querySelector('#register-form'),
    loginForm = document.querySelector('#login-form'),
    btnLogon = document.querySelector('.btn-logon'),
    title = document.querySelector('strong'),
    btnRegister = document.querySelector('.btn-register'),
    registerUsername = document.querySelector('#usernamer'),
    registerPasword = document.querySelector('#paswordr'),
    registerconfirm = document.querySelector('#confirmr'),
    loginUsername = document.querySelector('#username'),
    loginPasword = document.querySelector('#pasword'),
    btnLogin = document.querySelector('.btn-login')

const user = []

btnRegist.addEventListener('click', () => {
    registForm.style.display = 'flex'
    loginForm.style.display = 'none'
    title.innerText = 'Register'
    clearInput()

})

btnLogon.addEventListener('click', () => {
    loginForm.style.display = 'flex'
    registForm.style.display = 'none'
    title.innerText = 'Login'
    clearInput()
})

btnRegister.addEventListener('click', e => {
    e.preventDefault()
    let usernameInput = registerUsername.value,
        paswordInput = registerPasword.value,
        confirmInput = registerconfirm.value
    if (usernameInput || paswordInput || confirmInput) {
        let infoUser = {
            username: usernameInput,
            pasword: paswordInput,
            confirm: confirmInput
        }
        if (paswordInput != confirmInput) {
            document.querySelector('.error-pasword').style.display = 'block'
        } else if (user.find(user => user.username === usernameInput)) {
            document.querySelector('.error-username').style.display = 'block'
        }else {
            document.querySelector('.btn-register').innerText = 'Tunggu Sebentar'
            setTimeout(() => {
                document.querySelector('.btn-register').innerText = 'Register'
                let userObj = JSON.stringify(infoUser)
                let userFix = JSON.parse(userObj)
                user.push(userFix)
                alert('user berhasil di tambahkan')
                clearInput()
            }, 1000);
        }


    }
})

btnLogin.addEventListener('click', e=>{
    e.preventDefault()
    let usernameInput = loginUsername.value,
        paswordInput = loginPasword.value
    if (user.find(user => user.username === usernameInput && user.pasword === paswordInput)) {
        btnLogin.innerText = 'Tunggu Sebentar'
        setTimeout(() => {
            alert('berhasil Login')
            btnLogin.innerText = 'Login'
            clearInput()
        }, 1000);
    }else if (user.find(user => user.username != usernameInput && user.pasword === paswordInput)) {
        document.querySelector('.error').style.display = 'block'
        setTimeout(() => {
            document.querySelector('.error').style.display = 'none'
        }, 3000);
    }else if (user.find(user => user.username === usernameInput && user.pasword != paswordInput)) {
        document.querySelector('.error-paswordnya').style.display = 'block'
        setTimeout(() => {
            document.querySelector('.error-paswordnya').style.display = 'none'
        }, 3000);
    }else{
        document.querySelector('.error').style.display = 'block'
    }
})


function clearInput() {
    registerUsername.value = ''
    registerPasword.value = ''
    registerconfirm.value = ''
    loginUsername.value = ''
    loginPasword.value = ''
    document.querySelector('.error-pasword').style.display = 'none'
    document.querySelector('.error-username').style.display = 'none'
    document.querySelector('.error-usernamenya').style.display = 'none'
    document.querySelector('.error-paswordnya').style.display = 'none'
    document.querySelector('.error').style.display = 'none'
}