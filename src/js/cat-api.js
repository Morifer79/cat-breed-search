import axios from 'axios';
import {Report} from 'notiflix/build/notiflix-report-aio';

axios.defaults.headers.common['x-api-key'] = 'live_3gfV1CCBw2rYSumR7fGLWCIqSvNoiW6LDlJ1YTUUjTBOgLdatC5WfBJnHmxnG2du';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
	return axios
	.get(`breeds/`)
	.then(response => {
		if (response.status !== 200) {
			throw new Error(response.status);
		}
		return response.data})
	.catch(() => {Report.failure('MEOW!', 'Something went wrong! Try reloading the page!', '😿')});
}

export function fetchCatByBreed(breedId) {
	return axios
		.get(`/images/search?breed_ids=${breedId}`)
		.then(response => {
			if (response.status !== 200) {
				throw new Error(response.status);
			}
			return response.data[0]})
		.catch(() => {Report.failure('MEOW!', 'Something went wrong! Try reloading the page!', '😿')});
}