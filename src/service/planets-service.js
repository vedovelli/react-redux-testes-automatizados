const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const endpoint = url => `${BASE_URL}${url}`;

export const fetchPlanets = () => fetch(endpoint('/planets'));

export default { fetchPlanets };
