$(document).ready(function(){

    const Activities = $(".Activity")
    const PrayerRequestsActivity = $(".PrayerRequestsActivity")
    const EventsActivity = $(".EventsActivity")
    const NewsletterActivity = $(".NewsletterActivity")
    // const PrayerRequestsActivity = $(".PrayerRequestsActivity")
    // const PrayerRequestsActivity = $(".PrayerRequestsActivity")

    const menuItems = $("footer .items")

    const activityTitle = $(".activity-title")


    menuItems.on("click", function(){
        menuItems.removeClass("active")
        $(this).addClass("active")
    })

    const requestsBtn = $("#requestsBtn")
    const eventsBtn = $("#eventsBtn")
    const newsBtn = $("#newsBtn")

    requestsBtn.on("click", function(){
        Activities.hide()
        PrayerRequestsActivity.show()
        activityTitle.html("Prayer Requests")
    })

    eventsBtn.on("click", function(){
        Activities.hide()
        EventsActivity.show()
        activityTitle.html("Events")
    })

    newsBtn.on("click", function(){
        Activities.hide()
        NewsletterActivity.show()
        activityTitle.html("Newsletter")
    })


})