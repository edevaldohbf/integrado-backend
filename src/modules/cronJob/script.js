import axios from 'axios';

const getUniversities = async (country) => {
	try {
	  const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
	  console.log(response);
	} catch (error) {
	  console.error(error);
	}
}

getUniversities ('suriname');
