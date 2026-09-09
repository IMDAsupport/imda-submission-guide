document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".md-typeset p > img:only-child"));

  if (!images.length) {
    return;
  }

  const modal = document.createElement("div");
  modal.className = "imda-image-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <button class="imda-image-modal__close" type="button" aria-label="Close enlarged image">&times;</button>
    <div class="imda-image-modal__scroll">
      <img alt="">
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector("img");
  const closeButton = modal.querySelector("button");

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.removeAttribute("src");
    modalImage.alt = "";
  };

  images.forEach((image) => {
    image.setAttribute("title", "Click to enlarge");

    const caption = document.createElement("div");
    caption.className = "imda-image-caption";
    caption.textContent = "Click the image to enlarge and read the screen clearly.";
    image.parentElement.appendChild(caption);

    image.addEventListener("click", () => {
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt || "Enlarged IMDA SOP image";
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target === modalImage) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
});
