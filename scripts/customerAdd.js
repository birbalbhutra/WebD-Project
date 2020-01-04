(async () => {
    let token = localStorage.getItem('token');
    document.getElementById('customerForm').addEventListener('submit' , async (temp) => {
        temp.preventDefault();
        let newCustomer = {
                        name: document.forms['customerForm']['customerName'].value,
                        address: document.forms['customerForm']['address'].value,
                        phone: document.forms['customerForm']['phone'].value
                      };
        try {
            let response = await fetch(('http://localhost:3000/api/customers') , {
                method: 'POST',
                body: JSON.stringify(newCustomer),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `jwt ${token}`
                }
            });
            let customerAdd = await response.json();
            }
        catch (temp) {
            console.log(temp);
        }
    });
})();