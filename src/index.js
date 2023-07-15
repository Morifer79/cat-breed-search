import {fetchBreeds, fetchCatByBreed} from "./js/cat-api";
import { Report } from 'notiflix/build/notiflix-report-aio';
import {Loading} from 'notiflix/build/notiflix-loading-aio';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

const toggleSelectLoad = () => {
	breedSelect.style.opacity = 1;
	Loading.remove();
}

const toggleLoadSelect = () => {
	Loading.hourglass('Loading data, please wait...');
	breedSelect.style.opacity = 0;
}

toggleLoadSelect();

fetchBreeds().then(data => {
	toggleSelectLoad();
	const option = data
	.map(({id, name}) => `<option class="option" value="${id}">${name}</option>`);
		breedSelect.insertAdjacentHTML('beforeend', option);
		})
	.catch(() => {Report.failure('MEOW!', 'Something went wrong! Try reloading the page!', '😿')});

breedSelect.addEventListener('change', (e) => {
	e.preventDefault();
	toggleLoadSelect();
	const breedSelectId = breedSelect.value;
	fetchCatByBreed(breedSelectId)
	.then(cat => {
		toggleSelectLoad();
		const info = `
		<div class='thumb-pic'><img src="${cat.url}" alt="${cat.id}" width=400></div>
		<div class='thumb'>
			<h2>${cat.breeds[0].name}</h2>
			<p>${cat.breeds[0].description}</p>
			<p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
		</div>`;
		catInfo.innerHTML = info})
	.catch(() => {Report.failure('MEOW!', 'Something went wrong! Try reloading the page!', '😿')})});