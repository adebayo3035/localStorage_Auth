// Display Data on Index.html file

document.addEventListener('DOMContentLoaded', ()=>{
    //Retrieve the customer Data from sessionStorage
    let customerData = JSON.parse(sessionStorage.getItem('customerData'))
    let logoutBtn = document.getElementById('logoutBtn')

    if(customerData){
        let userDataElement = document.getElementById('userData')
        userDataElement.innerHTML = `
        <p><strong>Name:</strong> ${customerData.firstname} ${customerData.lastname}</p>
        <p><strong>Email:</strong> ${customerData.email}</p>
        <img src= ${customerData.photo}>
        `
        logoutBtn.addEventListener('click', function() {
            // Clear the session storage and redirect to the login page
            sessionStorage.clear();
            window.location.href = 'login.html';
          });
    }
    else{
        alert('No customer Data found, Please Login first');
        window.location.replace('login.html') 
    }
})
