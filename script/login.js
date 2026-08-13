const login = () =>{
     // Fetch mobile number

    const userName = document.getElementById("user-name").value;

    // Fetch pin number

    const userPassword = document.getElementById('password').value;

    // Check the validation by matching fetched data

    if (userName === 'rafsun' && userPassword === '1234') {
        alert('Login Completed');
        
        // Redirecting to home.html page

        const logoutBtn = document.getElementById("logout-btn")

        logoutBtn.classList.remove("hidden")
           
    }

    else{
        alert('Login Failed');
        return;
    }
}

const logout = () => {

    alert('Logged Out Successfully');

    const logoutBtn = document.getElementById("logout-btn")
    logoutBtn.classList.add("hidden")
}