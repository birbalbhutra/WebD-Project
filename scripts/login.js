(async function(){
    console.log(document.getElementById('loginForm'))
    document.getElementById('loginForm').addEventListener("submit", async (temp) => {
        temp.preventDefault();
        let username = document.forms['loginForm']['username'].value;
        let password = document.forms['loginForm']['password'].value;
        try {
            console.log("debug");
            let response = await fetch(`http://localhost:3000/verifyUser/${username}/${password}`);
            let authenticationToken = await response.json();
            localStorage.setItem("key", authenticationToken.token);
            localStorage.setItem("value", username);
            console.log("logged in");
            window.location.replace('./html/customer.html');
        } 
        catch (temp) {
            console.log("login failed");
            
        }
    })
})()