$(document).ready(function () {

    // Check if running locally
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // Define base URL and extension
    const baseUrl = isLocal ? 'data/' : 'https://mannaradio.mannatemple.co.za/php/data/';
    const ext = isLocal ? '.html' : '.php';

    console.log(`Loading data from: ${baseUrl} (Local: ${isLocal})`);

    $(".PrayerRequestsActivity .requests-list").load(`${baseUrl}prayer-requests${ext}`)
    $(".EventsActivity .events-list").load(`${baseUrl}events${ext}`)
    $(".NewsletterActivity .post-list").load(`${baseUrl}posts${ext}`)
    $(".NewsletterActivity .news-block").load(`${baseUrl}news${ext}`)
    $(".TvActivity .tv-container").load(`${baseUrl}tv${ext}`)
    $(".OnDemandActivity .video-playlist").load(`${baseUrl}videos${ext}`)

    const prayerItem = $(".requests-list .request")

    prayerItem.on("click", function () {
        $(this).addClass("active")
    })
})