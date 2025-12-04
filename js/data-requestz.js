$(document).ready(function(){

    $(".PrayerRequestsActivity .requests-list").load("https://mannaradio.mannatemple.co.za/php/data/prayer-requests.php")
    $(".EventsActivity .events-list").load("https://mannaradio.mannatemple.co.za/php/data/events.php")
    $(".NewsletterActivity .post-list").load("https://mannaradio.mannatemple.co.za/php/data/posts.php")
    $(".NewsletterActivity .news-block").load("https://mannaradio.mannatemple.co.za/php/data/news.php")
    $(".TvActivity .tv-container").load("https://mannaradio.mannatemple.co.za/php/data/tv.php")
    $(".OnDemandActivity .video-playlist").load("https://mannaradio.mannatemple.co.za/php/data/videos.php")
    
    const prayerItem = $(".requests-list .request")

    prayerItem.on("click", function(){
        $(this).addClass("active")
    })
})