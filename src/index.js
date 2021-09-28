import refs from './js/refs';
import ApiService from './js/apiService';
import cardTpl from './templates/cardTpl.hbs';
import LoadMoreBtn from './js/loadMoreBtn';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const apiService = new ApiService();

refs.searcForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchCards);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  loadMoreBtn.show();
  apiService.resetPage();
  clearCardsContainer();
  fetchCards();
}

function fetchCards() {
  loadMoreBtn.disable();
  apiService
    .fetchArticles()
    .then(cards => {
      appendCardsMarkup(cards);
      loadMoreBtn.enable();
    })
    .catch(onFetchError);
}

function appendCardsMarkup(cards) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', cardTpl(cards));
  if (refs.cardsContainer.innerHTML === '') {
    throw new Error();
  }
}

function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}

function onFetchError() {
  loadMoreBtn.hide();
  error({
    text: 'No matches found, please enter a new query.',
  });
}
