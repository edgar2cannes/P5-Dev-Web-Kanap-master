const params = new URL(document.location).searchParams
const id = params.get("id")

const url = `http://localhost:3000/api/products/${id}`
const colorSelected = document.getElementById("colors")
const nbProduct = document.getElementById("quantity")
const addCart = document.getElementById("addToCart")

const getProduct = () => {
    fetch(url)
        .then(function (reponse) {
            return reponse.json()
        })
        .then(function (data) {
            console.log(data)
            document.getElementById("title").innerHTML = data.name
            document.getElementById("price").innerHTML = data.price
            const addImg = document.createElement("img")
            document.querySelector(".item__img").appendChild(addImg)
            addImg.setAttribute("src", `${data.imageUrl}`)
            addImg.setAttribute("alt", `${data.altTxt}`)

            document.getElementById("description").innerHTML = data.description
            const addOption = document.getElementById("colors")
            for (color of data.colors) {
                addOption.innerHTML += `<option value="${color}">${color}</option>`
            }


            addCart.addEventListener('click', () => {
                const productLine = {
                    id: id,
                    color: colorSelected.value,
                    quantity: parseInt(nbProduct.value),
                    price: data.price,
                    imageUrl: data.imageUrl,
                    altTxt: data.altTxt,
                    name: data.name
                }
                console.log(productLine);
                if (productLine.color == '') {

                    alert('choisissez une couleur')
                    return
                }
                if (productLine.quantity < 1 || productLine.quantity > 100) {

                    alert('merci de choisir une quantité entre 1 et 100')
                    return
                }
                let Cart = JSON.parse(localStorage.getItem("Cart"))
                if (!Cart) Cart = [];


                const indexProd = Cart.findIndex(Elm => Elm.id == productLine.id && Elm.color == productLine.color)
                console.log(indexProd)
                if (indexProd == -1) {
                    Cart.push(productLine)
                }
                else {

                    Cart[indexProd].quantity = (+Cart[indexProd].quantity) + (+productLine.quantity)
                    if (Cart[indexProd].quantity < 1 || Cart[indexProd].quantity > 100) {

                        alert('quantité dans le panier supérieure  à 100')
                        return
                    }
                }
                localStorage.setItem("Cart", JSON.stringify(Cart))
                alert('produit ajouté au panier')
                colorSelected.value = ''
                nbProduct.value = 0
                console.log(productLine)
            })
        })
}





getProduct()


