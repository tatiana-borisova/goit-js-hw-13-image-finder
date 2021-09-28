import * as basicLightbox from 'basiclightbox';

export default function onOpenModal(event) {
  event.preventDefault();

  if (event.target.classList.contains('img')) {
    const instance = basicLightbox.create(`
      <img src="${event.target.dataset.action}" width="800" height="600">`);

    instance.show();
  }
}
