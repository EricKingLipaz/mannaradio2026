$(document).ready(function () {

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
    function getActivity() {
        const ActivityTitle = $(`${CurrentActivity} > .activity-title`)
        const MainTitle = $("header .activity-title")

        Activity.fadeOut()
        $(CurrentActivity).fadeIn()

        MainTitle.html(ActivityTitle.html())
    }

    const mainVideo = $(".main-video video")

    // Helper to stop radio
    function stopRadio() {
        if (window.mannaRadioPlayer && typeof window.mannaRadioPlayer.pause === 'function') {
            window.mannaRadioPlayer.pause();
        }
    }

    // Helper to stop video
    function stopVideo() {
        // Stop HTML5 video if exists
        if (mainVideo.length > 0) {
            mainVideo.get(0).pause();
        }

        // Stop Modern Player if exists
        if (window.modernPlayer && typeof window.modernPlayer.pause === 'function') {
            window.modernPlayer.pause();
        }

        // Stop YouTube iframe if exists (by resetting src)
        const iframe = $(".main-video iframe");
        if (iframe.length > 0) {
            const src = iframe.attr("src");
            iframe.attr("src", src);
        }
    }

    tvBtn.on("click", () => {
        stopRadio();
        CurrentActivity = TvActivity
        getActivity()
        sideMenuItems.removeClass("active")
        menuItems.removeClass("active")
        tvBtn.addClass("active")
        // mainVideo.get(0).play() // Don't auto-play video
    })

    vodBtn.on("click", () => {
        stopRadio();
        CurrentActivity = OnDemandActivity
        getActivity()
        sideMenuItems.removeClass("active")
        menuItems.removeClass("active")
        vodBtn.addClass("active")
        // mainVideo.get(0).play() // Don't auto-play video
    })

    radioBtn.on("click", () => {
        stopVideo();
        CurrentActivity = RadioActivity
        getActivity()
        menuItems.removeClass("active")
        radioBtn.addClass("active")
    })

    prayerBtn.on("click", () => {
        // Optional: stop media when going to prayer
        // stopRadio();
        // stopVideo();

        CurrentActivity = PrayerActivity
        getActivity()
        menuItems.removeClass("active")
        prayerBtn.addClass("active")
    })

    shopBtn.on("click", () => {
        var loader = $(".loading")
        loader.show()
    })
})