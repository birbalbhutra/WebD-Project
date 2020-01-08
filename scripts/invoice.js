(async () => {
    let token = localStorage.getItem('key');
    try {
        let fetchAll = [
            fetch(`http://localhost:3000/api/invoices`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `jwt ${token}`
                }
            }),
            fetch(`http://localhost:3000/api/customers`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `jwt ${token}`
                }
            })
        ];
      let response = await Promise.all(fetchAll);
      let invoices = await response[0].json();
      let customers = await responses[1].json();
      let i, j, className, tempCustomerName;
        let list = "";
        for(i=0;i<invoice.length;i++){
            if(i%2 == 0){
                className = "even";
            }
            else{
                className = "odd"; 
            }
            for(j=0;j<customers.length;i++){
                if(customers[j].id === invoice[i].customer_id){
                    tempCustomerName = customers[j].name;
                    continue;
                }
            }
            list += `<tr class=${className}>
                        <td>${i + 1}</td>
                        <td>${tempCustomerName}</td>
                        <td>${invoice[i].discount}</td>
                        <td>${invoice[i].total}</td>
                    </tr>`
        }
      document.getElementById('tbody').innerHTML = list;
    }
    catch (temp) {
      console.log(temp);
    }
})();