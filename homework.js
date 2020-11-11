import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  closeModalButton: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  modalImg: document.querySelector('img.lightbox__image'),
  backdrop: document.querySelector('div.lightbox__content'),
};

let defaultIndex;

function createArrOfMarkup(arr, event, index) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');

  li.classList.add('gallery__item');
  a.classList.add('gallery__link');
  a.href = event.original;
  img.classList.add('gallery__image');
  img.src = event.preview;
  img.dataset.source = event.original;
  img.dataset.index = index;
  img.alt = event.description;

  li.appendChild(a);
  a.appendChild(img);

  arr.push(li);

  return arr;
}

function createMar(items) {
  const arrOfMarkup = items.reduce(createArrOfMarkup, []);

  refs.gallery.append(...arrOfMarkup);
}

function onImageClick(event) {
  event.preventDefault();
  const imgTarget = event.target;
  if (imgTarget.nodeName !== 'IMG') {
    return;
  }

  defaultIndex = Number(imgTarget.dataset.index);
  refs.modal.classList.add('is-open');
  refs.modalImg.src = imgTarget.dataset.source;
  refs.closeModalButton.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', closeOnClickBackdrop);
  window.addEventListener('keydown', controlByButtons);
}

function closeModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImg.src = '';
  window.removeEventListener('keydown', controlByButtons);
}

function closeOnClickBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function controlByButtons(event) {
  onPressEsc(event);
  nextImg(event);
  prevImg(event);
}

function showNewImg() {
  const newIndex = galleryItems[defaultIndex].original;
  refs.modalImg.src = newIndex;
}

function nextImg(event) {
  if (event.code === 'ArrowRight' && defaultIndex < galleryItems.length - 1) {
    defaultIndex += 1;
    showNewImg();
  }
}

function prevImg(event) {
  if (event.code === 'ArrowLeft' && defaultIndex > 0) {
    defaultIndex -= 1;
    showNewImg();
  }
}

function onPressEsc(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

createMar(galleryItems);

refs.gallery.addEventListener('click', onImageClick);


// другий варіант:

// const refs = {
//   gallery: document.querySelector(".js-gallery"),
//   modal: document.querySelector(".js-lightbox"),
//   modalImg: document.querySelector("img.lightbox__image"),
//   closeModal: document.querySelector('button[data-action="close-lightbox"]'),
// };

// let currentImage;

// const createItems = gallery.map((image, index) => {
//   const { preview, original, description } = image;
//   const createLi = document.createElement("li");
//   const createA = document.createElement("a");
//   const createImg = document.createElement("img");

//   createLi.classList.add("gallery__item");
//   createA.classList.add("gallery__link");
//   createA.href = original;
//   createImg.classList.add("gallery__image");
//   createImg.dataset.source = original;
//   createImg.dataset.index = index;
//   createImg.alt = description;
//   createImg.src = preview;
//   createLi.appendChild(createA);
//   createA.appendChild(createImg);
//   return createLi;
// });

// refs.gallery.append(...createItems);

// const onGalleryClick = (event) => {
//   event.preventDefault();
//   if (event.target.nodeName !== "IMG") {
//     return;
//   }
//   window.addEventListener("keydown", onPressEscape);
//   window.addEventListener("keydown", onPressArrow);
//   refs.modal.classList.add("is-open");
//   refs.modalImg.src = event.target.dataset.source;
//   refs.closeModal.addEventListener("click", onCloseModal);
//   currentImage = Number(event.target.dataset.index);
// };

// refs.gallery.addEventListener("click", onGalleryClick);

// const onCloseModal = () => {
//   window.removeEventListener("keydown", onPressEscape);
//   window.removeEventListener("keydown", onPressArrow);
//   refs.modal.classList.remove("is-open");
//   refs.modalImg.src = "";
// };

// const onPressEscape = (event) => {
//   if (event.code === "Escape") {
//     onCloseModal();
//   }
// };

// const onBackDropClick = (event) => {
//   if (event.target !== refs.modal) {
//     onCloseModal();
//   }
// };

// refs.modal.addEventListener("click", onBackDropClick);

// const prevImage = () => {
//   if (currentImage > 0) {
//     currentImage -= 1;
//     refs.modalImg.src = gallery[currentImage].original;
//     refs.modalImg.alt = gallery[currentImage].description;
//   }
// };

// const nextImage = () => {
//   if (currentImage < gallery.length - 1) {
//     currentImage += 1;
//     refs.modalImg.src = gallery[currentImage].original;
//     refs.modalImg.alt = gallery[currentImage].description;
//   }
// };

// const onPressArrow = (event) => {
//   if (event.code === "ArrowRight") {
//     nextImage();
//   }
//   if (event.code === "ArrowLeft") {
//     prevImage();
//   }
// };
