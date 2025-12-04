$(document).ready(function(){

    const sidemenu = $(".side-menu")
    const mainMenuBtn = $("#mainMenu")
    const closeMenuBtn = $("#closeMenuBtn")

    const menuItems = $(".side-menu .item")

    menuItems.on("click", function(){
        $(".PrayerRequestsActivity .requests-list").load("https://mannaradio.mannatemple.co.za/php/data/prayer-requests.php")
        $(".EventsActivity .events-list").load("https://mannaradio.mannatemple.co.za/php/data/events.php")
        $(".NewsletterActivity .post-list").load("https://mannaradio.mannatemple.co.za/php/data/posts.php")
        $(".NewsletterActivity .news-block").load("https://mannaradio.mannatemple.co.za/php/data/news.php")
    })

    let menuOpen  = false
    mainMenuBtn.on("click", function(){
        if(menuOpen == false){
            menuOpen = true
            sidemenu.css("right", "0")
        }
    })

    closeMenuBtn.on("click", function(){
        if(menuOpen == true){
            menuOpen = false
            sidemenu.css("right", "-70%")
        }
    })

    const Activity = $(".Activity")
    const LoginActivity = ".LoginActivity"
    const RegisterActivity = ".RegisterActivity"
    const RadioActivity = ".RadioActivity"
    const TvActivity = ".TvActivity"
    const PrayerActivity = ".PrayerActivity"
    const BankingDetailsActivity = ".BankingDetailsActivity"
    const AboutUsActivity = ".AboutUsActivity"
    const EventsActivity = ".EventsActivity"
    const NewsletterActivity = ".NewsletterActivity"
    const OnDemandActivity = ".OnDemandActivity"
    const BibleActivity = ".BibleActivity"


    const closeBible = $("#closeBible")
    const openBible = $("#accountMenu")

    let CurrentActivity = RadioActivity

    function getActivity(){
        const ActivityTitle = $(`${CurrentActivity} > .activity-title`)
        const MainTitle = $("header .activity-title")
    
        Activity.fadeOut()
        $(CurrentActivity).fadeIn()
    
        MainTitle.html(ActivityTitle.html())
    }

    closeBible.on("click", function(){
        $(".BibleActivity").css("top", "150%")
        Activity.fadeOut()
        CurrentActivity = OnDemandActivity
        $(CurrentActivity).fadeIn()
    })

    openBible.on("click", function(){
        CurrentActivity = BibleActivity
        $(CurrentActivity).show()
        $(".BibleActivity").css("top", "50%")
    })

    getActivity()


    const bankingDetailsBtn = $("#bankingDetailsBtn")
    const eventsBtn = $("#EventsBtn")
    const galleryBtn = $("#galleryBtn")
    const advertiseWithUsBtn = $("#advertiseWithUsBtn")
    const aboutUsBtn = $("#aboutUsBtn")
    const newsletterBtn = $("#newsletterBtn")
    
    const footerItems = $("footer .item")
    
    bankingDetailsBtn.on("click", ()=>{
        CurrentActivity = BankingDetailsActivity
        getActivity()
        footerItems.removeClass("active")
        menuItems.removeClass("active")
        bankingDetailsBtn.addClass("active")

        if(menuOpen == true){
            menuOpen = false
            sidemenu.css("right", "-70%")
        }
    })

    eventsBtn.on("click", ()=>{
        CurrentActivity = EventsActivity
        getActivity()
        footerItems.removeClass("active")
        menuItems.removeClass("active")
        eventsBtn.addClass("active")

        if(menuOpen == true){
            menuOpen = false
            sidemenu.css("right", "-70%")
        }
    })

    aboutUsBtn.on("click", ()=>{
        CurrentActivity = AboutUsActivity
        getActivity()
        footerItems.removeClass("active")
        menuItems.removeClass("active")
        aboutUsBtn.addClass("active")

        if(menuOpen == true){
            menuOpen = false
            sidemenu.css("right", "-70%")
        }
    })

    newsletterBtn.on("click", ()=>{
        CurrentActivity = NewsletterActivity
        getActivity()
        footerItems.removeClass("active")
        menuItems.removeClass("active")
        newsletterBtn.addClass("active")

        if(menuOpen == true){
            menuOpen = false
            sidemenu.css("right", "-70%")
        }
    })

})