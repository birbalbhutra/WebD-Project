(async () => {
    let token = localStorage.getItem('key');
      document.getElementById('productForm').addEventListener('submit' , async (temp) => {
        temp.preventDefault();
        let product = {
            name: document.forms['productForm']['productName'].value , 
            price: document.forms['productForm']['price'].value
        };
        try {
            let response = await fetch(('http://localhost:3000/api/products') , {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `jwt ${token}`
            }
        });
        let newProduct = await response.json();
        }
        catch (temp) {
            console.log(temp);
        }
    });
  })();