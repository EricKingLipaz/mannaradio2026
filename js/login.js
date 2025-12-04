$(() => {
    const formResponse = $(".formResponse")
    let inputs = $(".inputs")
    const signInBtn = $("#signInBtn")
    const goToSignUp = $("#goToSignUp")

    const signUpActivity = $(".reg-container")
    const signInActivity = $(".login-container")

    const mobileMenu = $(".mobile-menu")
    const regLoginActivity = $(".reg-login-activity")

    let currentActivity = ""

    signInBtn.on("click", () => {
        const username = $("#loginUsername").val()
        const password = $("#loginPassword").val()

        if(username == "" || password == ""){
            formResponse.html("Inputs Not Complete").show().delay(3000).fadeOut(500)
        }else{
            $.ajax({
                url: "php/login.php",
                method: "POST",
                data: {
                    login: 1,
                    usernamePHP: username.toLowerCase(),
                    passwordPHP: password
                },
                success: (response) => {
                    if(response == "Incorrect Login Credentials!"){
                        inputs.val("")
                        formResponse.html(response).show().delay(3000).fadeOut(500)
                    }else{
                        mobileMenu.show()
                        regLoginActivity.hide()
                        // $(".main-activity").show()
                        inputs.val("")
                        $(".account-nav > .user").load("php/check_session.php");
                        $(".edit-profile").load("php/data/profile.php");
                    }
                },
                dataType: "text"
            })
        }

    })

    // Go To Sign Up
    goToSignUp.on("click", () => {

        formResponse.hide()
        inputs.val("")
        signUpActivity.fadeIn()
        signInActivity.fadeOut()
    
    })

})