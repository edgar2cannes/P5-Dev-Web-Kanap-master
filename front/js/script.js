
const url = "http://localhost:3000/api/products"
const items = document.getElementById("items")

const getProducts = () => {
    fetch(url)
        .then(reponse => reponse.json())
        .then(function (data) {
            console.log(data)
            items.innerHTML = ""
            for (product of data) {
                items.innerHTML += `<a href="./product.html?id=${product._id}">
                <article>
                   <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                   <p class="productDescription">${product.description}</p>
                </article>
               </a>`

            }
        })

}
getProducts()
