$(document).ready(function(){

    const Activity = $(".Activity")
    const LoginActivity = ".LoginActivity"
    const RegisterActivity = ".RegisterActivity"
    const RadioActivity = ".RadioActivity"
    const TvActivity = ".TvActivity"
    const PrayerActivity = ".PrayerActivity"
    const OnDemandActivity = ".OnDemandActivity"

    const tvBtn = $("#tvBtn")
    const vodBtn = $("#vodBtn")
    const radioBtn = $("#radioBtn")
    const prayerBtn = $("#prayerBtn")
    const shopBtn = $("#shopBtn")
    const menuItems = $("footer .item")

    const sideMenuItems = $(".side-menu .item")

    let CurrentActivity = ""

    // Get Activity Function
    function getActivity(){
        const ActivityTitle = $(`${CurrentActivity} > .activity-title`)
        const MainTitle = $("header .activity-title")
    
        Activity.fadeOut()
        $(CurrentActivity).fadeIn()
    
        MainTitle.html(ActivityTitle.html())
    }

    const mainVideo = $(".main-video video")


    tvBtn.on("click", ()=>{
        CurrentActivity = TvActivity
        getActivity()
        sideMenuItems.removeClass("active")
        menuItems.removeClass("active")
        tvBtn.addClass("active")
        mainVideo.get(0).play()
    })

    vodBtn.on("click", ()=>{
        CurrentActivity = OnDemandActivity
        getActivity()
        sideMenuItems.removeClass("active")
        menuItems.removeClass("active")
        vodBtn.addClass("active")
        mainVideo.get(0).play()
    })

    radioBtn.on("click", ()=>{
        CurrentActivity = RadioActivity
        getActivity()
        menuItems.removeClass("active")
        radioBtn.addClass("active")
    })

    prayerBtn.on("click", ()=>{
        CurrentActivity = PrayerActivity
        getActivity()
        menuItems.removeClass("active")
        prayerBtn.addClass("active")
    })

    shopBtn.on("click", ()=>{
        var loader = $(".loading")
        loader.show()
    })
})