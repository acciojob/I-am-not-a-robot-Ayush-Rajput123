document.addEventListener("DOMContentLoaded", () => {
  const imagesContainer = document.getElementById("images");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const message = document.getElementById("h");
  const result = document.getElementById("para");

  const uniqueImages = [
    "https://picsum.photos/id/237/200/300",          
    "https://picsum.photos/seed/picsum/200/300",    
    "https://picsum.photos/200/300?grayscale",      
    "https://picsum.photos/200/300/",               
    "https://picsum.photos/200/300.jpg"            
  ];

  let clickedTiles = [];

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function setupImages() {
    imagesContainer.innerHTML = "";
    clickedTiles = [];
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";
    result.textContent = "";

    const duplicateIndex = Math.floor(Math.random() * uniqueImages.length);
    const images = [...uniqueImages, uniqueImages[duplicateIndex]];

    shuffle(images);

    images.forEach((src, idx) => {
      const img = document.createElement("img");
      img.src = src;
      img.dataset.src = src;
      img.classList.add("tile");
      img.classList.add(`img${idx + 1}`);

      img.addEventListener("click", () => handleImageClick(img));
      imagesContainer.appendChild(img);
    });

    message.textContent =
      "Please click on the identical tiles to verify that you are not a robot.";
  }

  function handleImageClick(img) {
    if (clickedTiles.length >= 2 || clickedTiles.includes(img)) {
      return; 
    }

    img.classList.add("selected");
    clickedTiles.push(img);

    if (clickedTiles.length > 0) {
      resetBtn.style.display = "inline-block";
    }

    if (clickedTiles.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }

  resetBtn.addEventListener("click", () => {
    setupImages();
  });

  verifyBtn.addEventListener("click", () => {
    verifyBtn.style.display = "none";
    const [img1, img2] = clickedTiles;

    if (img1.dataset.src === img2.dataset.src) {
      result.textContent = "You are a human. Congratulations!";
    } else {
      result.textContent =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });

  setupImages();
});
