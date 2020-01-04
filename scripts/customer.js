(async () => {
    let token = localStorage.getItem('token');
    try {
        console.log("requests");
        let fetch = [
            fetch(`http://localhost:3000/api/customers`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `jwt ${token}`
                }
            })
        ];
        let response = await Promise.all(fetch);
        let customers = await response[0].json();
        let i,className;
        let list = "";
        for(i=0;i<customers.length;i++){
            if(i%2 == 0){
                className = "even";
            }
            else{
                className = "odd"; 
            }
            list += `<tr class=${className}>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.phone}</td>
                        <td class="col-lg-1"><a href=""><div><img src="../images/edit.png"></div></a></td>
                    </tr>`
        }
        document.getElementById('tbody').innerHTML = list;
    }
    catch (temp) {
      console.log(temp);
    }
})();