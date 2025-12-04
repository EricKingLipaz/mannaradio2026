$(() => {
    const formResponse = $(".response")
    let inputs = $(".inputs")

    const submitRequestBtn = $("#newEventBtn")

    // Submit Prayer Request Button Click Function
    submitRequestBtn.on("click", () => {
        
        // Input Text Variables
        let title = $("#newEventTitle").val()
        let date = $("#newEventDate").val()
        let details = $("#newEventDetails").val()

        // If Any Of The Inputs Are Empty
            if(title == "" || date == "" || details == ""){
                formResponse.html("Inputs Not Complete").show().delay(3000).fadeOut(500)
            }else{
                
                $.ajax(
                    {
                        url: "http://127.0.0.1/mt/php/add_event.php",
                        method: "POST",
                        data: {
                            submit: 1,
                            titlePHP: title,
                            datePHP: date,
                            detailsPHP: details
                        },
                        success: (response) => {
                            formResponse.html(response).show().delay(3000).fadeOut(500)
                            if(response == "Event Added Successfully!"){
                                inputs.val("")
                                $(".events-list").load("http://127.0.0.1/mt/php/data/events.php")
                                formResponse.html(response).show().delay(3000).fadeOut(500)
                            }else{
                                formResponse.html(response).show().delay(3000).fadeOut(500)
                            }
                        },
                        dataType: "text"
                    }
                )
            }
    })
})