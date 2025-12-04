$(() => {
    const formResponse = $(".formResponse")
    const signUpBtn = $("#signUpBtn")
    const goToSignIn = $("#goToSignIn")
    let inputs = $(".inputs")

    const signUpActivity = $(".reg-container")
    const signInActivity = $(".login-container")

    const activities = $(".activities")
    const mobileMenu = $(".mobile-menu")
    const regLoginActivity = $(".reg-login-activity")
    const mainActivity = $(".main-activity")

    let currentActivity = ""


    // Sign Button Click Function
    signUpBtn.on("click", () => {
        
        // Input Text Variables
        let displayName = $("#newDisplayName").val()
        let username = $("#newUsername").val()
        let email = $("#newEmail").val()
        let gender = $("#gender").val()
        let DOB = $("#newDOB").val()
        let password1 = $("#password1").val()
        let password2 = $("#password2").val()

        // If Any Of The Inputs Are Empty
            if(displayName == "" || username == "" || email == "" || gender == "" || password1 == ""){
                formResponse.html("Inputs Not Complete").show().delay(3000).fadeOut(500)
            }else{
                if(password1.length < 6){
                    formResponse.html("Password Too Short").show().delay(3000).fadeOut(500)
                }else{
                    if(password1 != password2){ 
                        formResponse.html("Password Do Not Match").show().delay(3000).fadeOut(500)
                    }else{
                        let password = password1
                        $.ajax(
                            {
                                url: "php/register.php",
                                method: "POST",
                                data: {
                                    register: 1,
                                    displayNamePHP: displayName.toLowerCase(),
                                    usernamePHP: username.toLowerCase(),
                                    emailPHP: email.toLowerCase(),
                                    genderPHP: gender.toLowerCase(),
                                    dateOfBirthPHP: DOB,
                                    passwordPHP: password
                                },
                                success: (response) => {
                                    formResponse.html(response).show().delay(3000).fadeOut(500)
                                    if(response == "Stirio Welcomes You"){
                                        activities.hide()
                                        mobileMenu.show()
                                        currentActivity = mainActivity
                                        currentActivity.show()
                                    }
                                },
                                dataType: "text"
                            }
                        )
            
                    }
                }
            }
    })

    // Go To Sign In
    goToSignIn.on("click", () => {

        inputs.val("")
        formResponse.hide()
        signUpActivity.fadeOut()
        signInActivity.fadeIn()

    })
})