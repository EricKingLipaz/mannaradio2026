$(() => {

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
        const EventsActivity = ".EventsActivity"
        const NewsletterActivity = ".NewsletterActivity"
        const PrayerRequestsActivity = ".PrayerRequestsActivity"
    
        
        let CurrentActivity = PrayerRequestsActivity
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