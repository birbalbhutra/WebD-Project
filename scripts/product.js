(async () => {
  let token = localStorage.getItem('key');
    try {
        let fetchAll = [
            fetch(`http://localhost:3000/api/products`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `jwt ${token}`
                }
            })
        ];
      let response = await Promise.all(fetchAll);
      let products = await response[0].json();
      let i,className;
        let list = "";
        for(i=0;i<products.length;i++){
            if(i%2 == 0){
                className = "even";
            }
            else{
                className = "odd"; 
            }
            list += `<tr class=${className}>
                        <td class="col-lg-5">${products[i].name}</td>
                        <td class="col-lg-5">${products[i].price}</td>
                        <td class="col-lg-2"><a href=""><div><img src="../images/edit.png"></div></a></td>
                    </tr>`
        }
        document.getElementById('tbody').innerHTML = list;
    }
    catch (temp) {
      console.log(temp);
    }
})();