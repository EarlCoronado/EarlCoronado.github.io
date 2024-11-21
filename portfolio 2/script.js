const button = document.getElementById("fetch-art-btn");
const artContainer = document.getElementById("art-container");

button.addEventListener("click", () => {
  fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects?limit=1&offset=" +
      Math.floor(Math.random() * 1000)
  )
    .then((response) => response.json())
    .then((data) => {
      const randomArt =
        data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];
      return fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomArt}`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.primaryImage;
      if (imageUrl) {
        artContainer.innerHTML = `<img src="${imageUrl}" alt="Artwork">`;
      } else {
        artContainer.innerHTML = `<p>Click again.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching artwork:", error);
      artContainer.innerHTML = `<p>Failed to load artwork. Try again later.</p>`;
    });
});
