
fetch('https://catfact.ninja/breeds?limit=10')
    .then(Response => Response.json())
    .then(response => {
        let breeds = [];
        response.data.forEach((element,index) => breeds[index] = element.breed);
        localStorage.setItem("breeds",breeds);
    });

window.addEventListener("load", function() {
    const list = document.getElementById("cat-breed");
    let breeds = localStorage.getItem("breeds").split(',');
    breeds.forEach(item => {
         list.appendChild(createTextItem("option",item))
    })
})


function createTextItem(itemType, itemText) {
    const listItem = document.createElement(itemType);
    const textNode = document.createTextNode(itemText);
    listItem.appendChild(textNode);
    return listItem;
}