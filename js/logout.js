$(() => {

    const activities = $(".activities")
    const mobileMenu = $(".mobile-menu")
    const regLoginActivity = $(".reg-login-activity")
    const mainActivity = $(".main-activity")

    const logoutBtn = $("#logoutBtn")
    const menu = $(".account-nav")

    let currentActivity = ""

    logoutBtn.on("click", function(){
        $.ajax(
            {
                url: "php/logout.php",
                method: "POST",
                success: (response) => {
                    if(response == "logged out"){
                        activities.hide()
                        mobileMenu.hide()
                        currentActivity = regLoginActivity
                        currentActivity.show()
                        menu.css("right", "-80%")
                    }
                },
                dataType: "text"
            }
        )
    })

})