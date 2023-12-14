export const stateImage = {
  mapImagen: new Map([
    ["class 1", "./src/assets/images/palma_mano.webp"],
    ["class 2", "./src/assets/images/puno.webp"],
    ["class 3", "./src/assets/images/simbolo_de_mano.webp"],
  ]),
  
  changeImage: function (className) {
    const img = document.createElement("img");
    img.src = this.mapImagen.get(className) || "";
    img.alt = className;
    img.classList.add("img-fluid");
    return img;
  },
  
};
