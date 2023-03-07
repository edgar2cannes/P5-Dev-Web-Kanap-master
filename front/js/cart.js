const cart = JSON.parse(localStorage.getItem("Cart"));
const cartList = document.getElementById("cart__items");
let totalPrice = 0;
let totalQuantity = 0;

if (!cart || cart.length === 0) {
    cartList.innerHTML = "Le panier est vide";
} else {
    cart.forEach((product) => {
        const price = product.price * product.quantity;
        totalPrice += price;
        totalQuantity += product.quantity;
        cartList.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                    <div class="cart__item__img">
                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p>${product.price}€</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : </p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>`;

        // cartList.innerHTML += `
        //           <li>
        //             <span>${product.name} (${product.color})</span>
        //             <span>${product.quantity} x ${product.price} € = ${price} €</span>
        //           </li>
        //         `;
    });

    const totalPriceElement = document.getElementById("totalPrice");
    const totalQuantityElement = document.getElementById("totalQuantity");
    totalPriceElement.innerHTML = ` ${totalPrice}`;
    totalQuantityElement.innerHTML = `${totalQuantity}`;
}



// Sélectionnez tous les champs de quantité
const quantityFields = document.querySelectorAll(".cart__item__content__settings__quantity input");

// Ajoutez un écouteur d'événements de changement à chaque champ de quantité
quantityFields.forEach((field) => {
    field.addEventListener("change", (event) => {
        // Récupérez l'ID et la couleur de l'article à modifier
        const articleToUpdate = event.target.closest(".cart__item");
        const articleId = articleToUpdate.getAttribute("data-id");
        const articleColor = articleToUpdate.getAttribute("data-color");

        // Récupérez le panier du localStorage
        const cart = JSON.parse(localStorage.getItem("Cart"));

        // Recherchez l'index de l'article à modifier dans le tableau cart
        const articleIndex = cart.findIndex((product) => {
            return product.id === articleId && product.color === articleColor;
        });

        // Mettez à jour la quantité de l'article dans le tableau cart
        const newQuantity = event.target.value;
        cart[articleIndex].quantity = newQuantity;

        // Mettez à jour le localStorage avec le nouveau panier
        localStorage.setItem("Cart", JSON.stringify(cart));

        // Recalculez le prix total
        let totalPrice = 0;
        cart.forEach((product) => {
            const price = product.price * product.quantity;
            totalPrice += price;
        });

        // Mettez à jour le prix total dans le HTML
        const totalPriceElement = document.getElementById("totalPrice");
        totalPriceElement.innerHTML = `Total: ${totalPrice}`;
    });
});

// Sélectionnez tous les boutons de suppression d'article
const deleteButtons = document.querySelectorAll(".cart__item__content__settings__delete");

// Ajoutez un écouteur d'événements de clic à chaque bouton de suppression d'article
deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        // Récupérez l'ID et la couleur de l'article à supprimer
        const articleToDelete = event.target.closest(".cart__item");
        const articleId = articleToDelete.getAttribute("data-id");
        const articleColor = articleToDelete.getAttribute("data-color");

        // Récupérez le panier du localStorage
        const cart = JSON.parse(localStorage.getItem("Cart"));

        // Filtrer le tableau cart pour supprimer l'article à supprimer
        const newCart = cart.filter((product) => {
            return !(product.id === articleId && product.color === articleColor);
        });

        // Mettez à jour le localStorage avec le nouveau panier
        localStorage.setItem("Cart", JSON.stringify(newCart));

        // Mettre à jour l'affichage du panier
        window.location.reload();
    });
});


// // Sélectionnez tous les boutons de suppression d'article
// const deleteButtons = document.querySelectorAll(".deleteItem");

// // Ajoutez un écouteur d'événements de clic à chaque bouton de suppression
// deleteButtons.forEach((button) => {
//     button.addEventListener("click", (event) => {
//         // Récupérez l'élément parent de l'article à supprimer
//         const articleToDelete = event.target.closest(".cart__item");

//         // Récupérez l'ID et la couleur de l'article à supprimer
//         const articleId = articleToDelete.getAttribute("data-id");
//         const articleColor = articleToDelete.getAttribute("data-color");

//         // Récupérez le panier du localStorage
//         const cart = JSON.parse(localStorage.getItem("Cart"));

//         // Recherchez l'index de l'article à supprimer dans le tableau cart
//         const articleIndex = cart.findIndex((product) => {
//             return product.id === articleId && product.color === articleColor;
//         });

//         // Supprimez l'article du tableau cart
//         cart.splice(articleIndex, 1);

//         // Mettez à jour le localStorage avec le nouveau panier
//         localStorage.setItem("Cart", JSON.stringify(cart));

//         // Supprimez l'article de la liste d'articles dans le panier
//         articleToDelete.remove();

//         // Recalculez le prix total
//         let totalPrice = 0;
//         cart.forEach((product) => {
//             const price = product.price * product.quantity;
//             totalPrice += price;
//         });

//         // Mettez à jour le prix total dans le HTML
//         const totalPriceElement = document.getElementById("totalPrice");
//         totalPriceElement.innerHTML = `Total: ${totalPrice}`;
//     });
// });


//GERER LES INTERACTIONS AVEC LE FORMULAIRE A REMPLIR

//PATTERN POUR VALIDATION DE LETTRES UNIQUEMENT

let patternFirstName = document.querySelector("#firstName");
patternFirstName.setAttribute("pattern", "[a-zA-Z-éèà]*");

let patternLastName = document.querySelector("#lastName");
patternLastName.setAttribute("pattern", "[a-zA-Z-éèà]*");

let patternCity = document.querySelector("#city");
patternCity.setAttribute("pattern", "[a-zA-Z-éèà]*");

//RECUPERER LES ID POUR ENVOIE A L'API

let getId = cart.map(product => product.id);

//VALIDATION DES CHAMPS UTILISATEURS ET ENVOI DES DONNEES A L'API

document.querySelector(".cart__order__form__submit").addEventListener("click", function (e) {
    e.preventDefault();
    let valid = true;
    for (let input of document.querySelectorAll(".cart__order__form__question input")) {
        valid &= input.reportValidity();
        if (!valid) {
            break;
        }
    }
    if (valid) {
        const result = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact: {
                    firstName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    email: document.getElementById("email").value
                },
                products: getId
            })
        });
        result.then(async (answer) => {
            try {
                const data = await answer.json();
                window.location.href = `confirmation.html?id=${data.orderId}`;
                localStorage.clear();
            } catch (e) {
            }
        });
    }
})
