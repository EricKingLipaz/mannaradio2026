$(() => {

    const radio = new Audio("https://stream-39.zeno.fm/huvatsbzum0uv?zs=QdJvFjEeQ3-JTdgAopEWpg")

    const playRadioBtn = $("#playRadio")
    let playing = false

    playRadioBtn.on("click", function(){
        console.log("eric")
        if(playing == false){
            playing = true
            radio.play()
            playRadioBtn.html("pause")
        }else if(playing == true){
            playing = false
            radio.pause()
            playRadioBtn.html("play_circle")
        }
    })

    // const tv = $(".main-video video")

    $("footer .item").on("click", function(){
        playing = false
        radio.pause()
        playRadioBtn.html("play_circle")

        // tv.pause()
        playRadioBtn.html("play_circle")
    })
    
    function getActivity(){
        class Activities {
            constructor (name, className) {
                this.ActivityName = name,
                this.ClassName = className
            }
        }
        
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
    
        
        let CurrentActivity = RadioActivity
        const ActivityTitle = $(`${CurrentActivity} > .activity-title`)
        const MainTitle = $("header .activity-title")
    
        Activity.hide()
        $(CurrentActivity).show()
    
        MainTitle.html(ActivityTitle.html())
    
        class Division extends Activities{
            constructor (name, className, identifier, mySelf){
                super(name, className)
                this.id = identifier
                this.me = mySelf
            }
        }
    
        let activity = new Division(ActivityTitle.html(), "Class", "ID", "Me")
        console.log(activity.ActivityName)
    }

    getActivity()
    
})