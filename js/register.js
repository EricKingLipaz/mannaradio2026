$(()=>{

    // Initiatize NewUser Variable 
    let newUser = ""

    // Add New User

    function addNewUser(){

        // New User Class
        class User {
            constructor(userName, userEmail, userGender, userDateOfBirth, userPassword){
                this.name = userName,
                this.email = userEmail,
                this.gender = userGender,
                this.dateOfBirth = userDateOfBirth,
                this.password = userPassword
            }
        }
    
        // New User Properties
        const newName = $("#newName").val()
        const newEmail = $("#newEmail").val()
        const newGender = $("#newGender").val()
        const newDateOfBirth = $("#newDateOfBirth").val()

        const createPassword = $("#createPassword").val()
        const confirmPassword = $("#confirmPassword").val()


        // Validate New User Inputs

        function validateInputs(){
            if(newName == "" || newEmail == "" || newGender == "" || createPassword == ""){
                console.log("Inputs Are Incomplete")
            }else{

                // Validate New User Password
                if(createPassword.length < 6){
                    console.log("Password Too Short")
                }else{
                    if(createPassword != confirmPassword){
                        console.log("Password Do Not Match")
                    }else{
                        const password = createPassword

                        // Declare NewUser Object From User Class
                        newUser = new User(newName, newEmail, newGender, newDateOfBirth, password)
                        
                        // Call Register User Function
                        registerUser()
                        
                        // Send New User Data To Server 
                        function registerUser(){
                            console.log(newUser.name)
                            console.log(newUser.email)
                            console.log(newUser.gender)
                            console.log(newUser.dateOfBirth)
                            console.log(newUser.password)
                        }
                    }
                }
            }
        }

        // Call Validate User Function
        validateInputs()
    
    }
    
    const signUpBtn = $("#signUpBtn")

    // Sign Up Button Click
    signUpBtn.on("click", ()=>{
        // Call addNewUser Function
        addNewUser()
    })

})