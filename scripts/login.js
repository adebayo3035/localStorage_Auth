let loginForm = document.getElementById('loginForm');
let loader = document.getElementById('loader');
let btnLogin = document.getElementById('btnLogin');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let customerUsername = document.getElementById('username').value;
    let customerPassword = document.getElementById('password').value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(emailPattern.test(customerUsername))) {
        alert("Please check yourUsername")
    } 
    else {
        let customers = JSON.parse(localStorage.getItem('customers'));
        // Check if any Customer DATA Exist
        if (customers && customers.length > 0) {

            // Check if email and password match any customer
            function findCustomer(email, password) {
                return customers.find((customer) => {
                    return (customer.email === email && customer.password === password)
                })
            }
            // Check email and password supplied by User
            let foundUser = findCustomer(customerUsername, customerPassword);
            if (foundUser) {
                sessionStorage.setItem('customerData', JSON.stringify(foundUser))
                loader.innerHTML= `<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921">`
                btnLogin.disabled = true;
                btnLogin.style.cursor = 'not-allowed';
                setTimeout(function() {
                    alert("Your Login was Successful")
                    loader.style.display = "none";
                    location.replace('index.html')
                  }, 10000);
                
            } 
            else {
                loader.innerHTML= `<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921">`
                btnLogin.disabled = true;
                btnLogin.style.cursor = 'not-allowed';
                setTimeout(function() {
                    alert("The login details you supplied are Incorrect!")
                    loader.style.display = "none";
                  }, 10000);
               
            }
        } 
        else {
            alert("No Customer Information was found!")
        }
    }
})


