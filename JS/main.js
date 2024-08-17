
var counter;
var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDes = document.getElementById("productDes")

// localStorage.clear();

var saveElement = document.getElementById("saveBtn")

function localStorageUpdate() {
    localStorage.setItem("productList", JSON.stringify(productList))
}

var productList;
if (localStorage.getItem("productList") == null) {
    productList = []
}
else {
    productList = JSON.parse(localStorage.getItem("productList"))

    showProducts(productList)
}


function addProduct() {
    if (validateName()) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            categ: productCategory.value,
            des: productDes.value,

        }
        productList.push(product)
        localStorageUpdate()
        showProducts(productList)
        validateName()
        clearInput()
    }
    else {
        alert("Please Renter ValideName")
    }
}



function showProducts() {
    var cartona = ``
    for (var i = 1; i < productList.length; i++) {


        cartona += ` <tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].categ}</td>
                <td>${productList[i].des}</td>
                <td><button onclick="updateProducts(${i})" class="btn btn-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
    }

    document.getElementById("Pro").innerHTML = cartona;
}

function deleteProduct(index) {
    productList.splice(index, 1)
    localStorageUpdate()
    console.log(productList);
    showProducts()

}
function clearInput() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDes.value = '';
}
function updateProducts(index) {
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].categ;
    productDes.value = productList[index].des;

    counter = index

    saveElement.classList.remove("d-none")

    console.log(counter);

}
function saveUpdate() {
    productList[counter].name = productName.value;
    productList[counter].price = productPrice.value;
    productList[counter].categ = productCategory.value;
    productList[counter].des = productDes.value;

    localStorageUpdate()
    showProducts(productList)
    console.log(productList);

    saveBtn.classList.add("d-none")
    clearInput()
}

function searchProduct(data) {
    var newProductList = []
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(data.toLowerCase())) {
            newProductList.push(productList[i])
            console.log("founded", productList[i])

        }

    }

    showProducts(newProductList)

}
function validateName() {
    var regex = /^[A-Z]{4}$/

    if (regex.test(productName.value)) {

        productName.style.border = "none"
        document.getElementById("fParg").classList.add("d-none")
        return true
    }
    else {
        productName.style.border = "solid 5px red"
        document.getElementById("fParg").classList.remove("d-none")
        return false
    }
}



