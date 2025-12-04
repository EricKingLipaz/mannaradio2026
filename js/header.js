$(()=>{
    
    const radioCall = $("#radioCall")
    const radioWhatsapp = $("#radioWhatsapp")
    
    radioCall.on("click", ()=>{
        $(".formResponse").html("Call Us On +27 73 851 4499").fadeIn().delay(4000).fadeOut()
    })
    
    radioWhatsapp.on("click", ()=>{
        $(".formResponse").html("WhatsApp Us On +27 73 851 4499").fadeIn().delay(4000).fadeOut()
    })
    
    const mainMenu = $(".main-menu")
    const accountMenu = $(".account-menu")

    const mainMenuBtn = $("#mainMenu")
    const accountMenuBtn = $("#accountMenu")

    mainMenuBtn.on("click", () => {
        accountMenu.css("right", "-65%")
        mainMenu.css("left", "0")
    })

    accountMenuBtn.on("click", () => {
        accountMenu.css("right", "0")
        mainMenu.css("left", "-85%")
    })

    const Activity = $(".Activity")

    Activity.on("click", ()=> {
        accountMenu.css("right", "-65%")
        mainMenu.css("left", "-85%")
    })

})