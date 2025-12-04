$(() => {

    const activities = $(".Activities")
    const mainActivity = $(".MainActivity")

    let currentActivity = ""

    $.ajax(
        {
            url: "php/check_session.php",
            method: "POST",
            success: (response) => {
                if(response == "not logged in"){
                    mobileMenu.hide()
                    currentActivity = regLoginActivity
                    currentActivity.show()
                }else{
                    mobileMenu.show()
                    currentActivity = mainActivity
                    $(".account-nav > .user").load("php/check_session.php");
                    $(".edit-profile").load("php/data/profile.php");
                    $(".music-player").show()
                    $(".main-activity").show()
                }
            },
            dataType: "text"
        }
    )

})