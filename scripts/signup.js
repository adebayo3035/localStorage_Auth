// Preview Image that was Uploaded 
function previewImage(event) {
    var input = event.target;

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var previewElement = document.getElementById('preview');
            previewElement.src = e.target.result;
            previewElement.style.display = "block";
        };

        reader.readAsDataURL(input.files[0]);
    }
}
// End of PreviEW function

// Assign registration form to variable regForm
let regForm = document.getElementById('regForm');
// Add eventlistener to regForm
regForm.addEventListener('submit', (newEvent)=>{
    newEvent.preventDefault();
    //   Pass form Inputs to be saved to Database
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    let photo = document.getElementById('photo').files[0];

    // Form Inputs Validation
    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (password !== confirmPassword) {
        alert("Please Confirm Your Password")
        password = "";
        confirmPassword = "";
    }
    else if (!(namePattern.test(firstname))) {
        alert("Please check your Firstname")
    }
    else if (!(namePattern.test(lastname))) {
        alert("Please check your Lastname")
    }
    else if (!(emailPattern.test(email))) {
        alert("Please check your E-mail Address")
    }
    else{
        //Convert photo to Data URL
        let reader = new FileReader();
        reader.onload = (event) =>{
            // let imageDataUrl = event.target.result;
            // Create an Array of Object and store the result
            let newCustomer = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                // photo: imageDataUrl
                photo: event.target.result
            };
            // Retrieve the Existing user entries from the local Storage
            let customers = JSON.parse(localStorage.getItem('customers')) || [];
            // Check if the email address has not been used before

            let emailExists = customers.some((customer) => customer.email === email)

            if(emailExists){
                alert("Email address already Exist. Please Use a different Email");
            }
            else{
                customers.push(newCustomer);
                //Save the updated Customers array back to localStorage
                localStorage.setItem('customers', JSON.stringify(customers));
                alert("Your Data has been Successfully Registered!")
                location.replace('login.html')
            }
            console.log(customers)
        };
        reader.readAsDataURL(photo);  
    }
})