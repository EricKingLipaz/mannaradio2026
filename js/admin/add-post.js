$(() => {
    const formResponse = $(".response")
    let inputs = $(".inputs")

    const submitRequestBtn = $("#newPostBtn")

    // Submit Prayer Request Button Click Function
    submitRequestBtn.on("click", () => {
        // Input Text Variables
        let title = $("#newPostTitle").val()
        let details = $("#newPostDetails").val()

        // If Any Of The Inputs Are Empty
            if(title == "" || details == ""){
                formResponse.html("Inputs Not Complete").show().delay(3000).fadeOut(500)
            }else{
                
                $.ajax(
                    {
                        url: "http://127.0.0.1/mt/php/add_post.php",
                        method: "POST",
                        data: {
                            submit: 1,
                            titlePHP: title,
                            detailsPHP: details
                        },
                        success: (response) => {
                            formResponse.html(response).show().delay(3000).fadeOut(500)
                            if(response == "Post Added Successfully!"){
                                inputs.val("")
                                $(".post-list").load("http://127.0.0.1/mt/php/data/posts.php")
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