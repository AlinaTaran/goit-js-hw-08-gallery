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