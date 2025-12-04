$(() => {
    const formResponse = $(".formResponse")
    let inputs = $(".inputs")

    const submitRequestBtn = $("#submitRequestBtn")

    // Submit Prayer Request Button Click Function
    submitRequestBtn.on("click", () => {
        const loader = $(".PrayerActivity .loading")
        loader.fadeIn()

        // Input Text Variables
        let name = $("#nameRequest").val()
        let location = $("#locationRequest").val()
        let phone = $("#phoneRequest").val()
        let prayer = $("#prayerRequest").val()

        // If Any Of The Inputs Are Empty
            if(name == "" || location == "" || phone == "" || prayer == ""){
                formResponse.html("Inputs Not Complete").show().delay(3000).fadeOut(500)
            }else{
                
                $.ajax(
                    {
                        url: "https://mannaradio.mannatemple.co.za/php/send_prayer_request.php",
                        method: "POST",
                        data: {
                            submit: 1,
                            namePHP: name,
                            locationPHP: location,
                            phonePHP: phone,
                            prayerRequestPHP: prayer
                        },
                        success: (response) => {
                            formResponse.html(response).show().delay(2000).fadeOut(500)
                            if(response == "Prayer Request Sent!"){
                                inputs.val("")
                                loader.fadeOut()
                                formResponse.html(response).show().delay(3000).fadeOut(500)
                            }else{
                                loader.fadeOut()
                                formResponse.html(response).show().delay(3000).fadeOut(500)
                            }
                        },
                        dataType: "text"
                    }
                )
            }
    })
})