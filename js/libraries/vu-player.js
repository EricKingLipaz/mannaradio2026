const player = document.querySelector(".vu-player video")

if (player) {
    // JQUERY

    function togglePlay() {
        if (player.paused || player.ended) {
            playBtn.html("pause")
            player.play();
        } else {
            playBtn.html("play_circle")
            player.pause();
        }
    }

    makeFullScreen()

    function makeFullScreen() {
        let fullscreenView = false
        fullscreen.on("click", function () {
            if (fullscreenView == false) {
                fullscreenView = true
                $(".OnDemandActivity").css("height", "100%")
                $(".main-video").addClass("fullscreen");
                $(this).html("fullscreen_exit")

                // Hide Header and Footer
                $("header").hide()
                $("footer").hide()
            } else {
                $(".OnDemandActivity").css("height", "80%")
                fullscreenView = false
                $(".main-video").removeClass("fullscreen");
                $(this).html("fullscreen")

                // Show Header and Footer
                $("header").show()
                $("footer").show()
            }
        })
    }

    let timeElapsed = document.querySelector(".vu-video-time .vu-time-elapsed")
    let videoDuration = document.querySelector(".vu-video-time .vu-duration")
    let progressBar = document.querySelector(".vu-video-progress")
    let progress = document.querySelector(".video-progress")
    let videoVolume = document.querySelector(".vu-video-volume")
    let volIcon = document.querySelector(".vu-volume")

    // TIME UPDATE FUNCTIONALITY
    player.addEventListener("timeupdate", function () {
        let player_curr = player.currentTime;
        let player_dur = player.duration;

        let hour = Math.floor(player_dur / 60);
        let min = Math.floor(player_dur / 60);
        let sec = Math.floor(player_dur % 60);

        if (sec < 10) {
            sec = `0${sec}`
        }

        // LOAD VIDEO DURATION

        videoDuration.innerHTML = `${min}:${sec}`

        let sec1 = Math.floor(player_curr % 60);
        let min1 = Math.floor(player_curr / 60);


        if (sec1 < 10) {
            sec1 = `0${sec1}`
        }

        // LOAD VIDEO CURRENT TIME
        timeElapsed.innerHTML = `${min1}:${sec1}`;

        // ADJUST VIDEO PROGRESS BAR
        let percentage = (player_curr / player_dur) * 100
        progressBar.style.width = `${percentage}%`


        progress.addEventListener("click", function (e) {
            let progressTime = (e.offsetX / progress.offsetWidth) * player.duration
            player.currentTime = progressTime
        })

    })

    // VOLUME

    videoVolume.addEventListener("mousemove", function (e) {
        player.volume = (e.target.value) / 100

        if (videoVolume.value == 0) {
            volIcon.innerHTML = "volume_mute"
        } else if (videoVolume.value > 0 && videoVolume.value <= 50) {
            volIcon.innerHTML = "volume_down"
        } else if (videoVolume.value > 50) {
            volIcon.innerHTML = "volume_up"
        }

    })
}