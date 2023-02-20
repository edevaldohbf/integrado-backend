import axios from 'axios';
import universitiesService from './universities.service.js';
import startDb from '../../config/mongoDb.js';
import UniversitiesModel from './universities.model.js';

export async function getUniversities (country) {
	try {
	  const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);

	  return response;
	} catch (error) {
	  console.error(error);
	}
}

export async function importUniversities (execute) {
	if (!execute) {
		return false;
	}

	UniversitiesModel.collection.drop();

	const arrCountries = [
		"argentina",
		"brazil",
		"chile",
		"colombia",
		"paraguay",
		"peru",
		"suriname",
		"uruguay"
	];

	let arrError = [];
	let aux = 1;

	for (let elementCountry of arrCountries) {
		const arrUniversities = await getUniversities(elementCountry);

		console.log(`Init importing from: ${elementCountry}`);

		for (let elementUniversity of arrUniversities.data) {
			try {
				const objUniversity = {}

				if (elementUniversity.name) {
					objUniversity.name = elementUniversity.name
				}

				if (elementUniversity['state-province']) {
					objUniversity.stateProvince = elementUniversity['state-province']
				}

				if (elementUniversity.country) {
					objUniversity.country = elementUniversity.country
				}

				if (elementUniversity.alpha_two_code) {
					objUniversity.alphaTwoCode = elementUniversity.alpha_two_code
				}

				if (elementUniversity.domains) {
					objUniversity.domains = elementUniversity.domains
				}

				if (elementUniversity.web_pages) {
					objUniversity.webPages = elementUniversity.web_pages
				}

				console.log('init: ', aux)
				console.log('element: ', objUniversity)

				await universitiesService.create(objUniversity)

				console.log('complete: ',aux)

				aux++;
			}
			catch (e) {
				arrError.push({
					message: e,
					dataError: elementUniversity
				})
			}	
		}

		console.log(`Finish importing from: ${elementCountry}`);
	}

	if (arrError.length == 0) {
		console.log('Import - Ok');
		return true;
	}
	else {
		console.log('Import Fail');

		console.log('\n\n\n');

		console.log('arrError', arrError);

		return false;
	}
}

startDb();
importUniversities()