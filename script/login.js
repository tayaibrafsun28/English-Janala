const login = () =>{

    // 1. Fetch the actual HTML input elements first

    const userNameElement = document.getElementById("user-name");
    const userPasswordElement = document.getElementById('password');

    // Fetch user name

    const userName = document.getElementById("user-name").value;

    // Fetch password

    const userPassword = document.getElementById('password').value;

    // Check the validation by matching fetched data

    if (userName === 'rafsun' && userPassword === '1234') {
        alert('Login Completed');
        
        // Redirecting

        const logoutBtn = document.getElementById("logout-btn")

        logoutBtn.classList.remove("hidden")

        // Clear fields automatically on failed login so they can try again

        userNameElement.value = '';
        userPasswordElement.value = '';
           
    }

    else{
        alert('Login Failed');
        
        // Clear fields automatically on failed login so they can try again
         
        userNameElement.value = '';
        userPasswordElement.value = '';
    }
}

const logout = () => {

    alert('Logged Out Successfully');

    const logoutBtn = document.getElementById("logout-btn")
    logoutBtn.classList.add("hidden")
}