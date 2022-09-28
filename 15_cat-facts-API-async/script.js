const urlRandomImage = "https://api.thecatapi.com/v1/images/search";

const getImage = () => {
  return fetch(urlRandomImage)
    .then(res => res.json())
    .then(res => res[0].url)
}


 fetch('https://catfact.ninja/facts')
  .then((response) => {
    return response.json();
  })
  .then((data) => {

    function getCatFacts (data) {
          if (data.data) {
            for (let i=0; i<7; i++) {
              createListItem(data.data[i].fact);
            }
          }
        }

        function createListItem(text) {
          const list = document.getElementById('cat-fact-list');
          const listItem = document.createElement('li');;
          const textNode = document.createTextNode(text);
          const image = document.createElement('img');
          getImage().then(result => {image.src = result});
          listItem.appendChild(image);
          listItem.appendChild(textNode);
          
          list.appendChild(listItem);
        }

        getCatFacts(data);

      });