const STAR_WARS_PANETS = 'https://swapi.dev/api/planets';

async function fetchPlanets() {
  const response = await fetch(STAR_WARS_PANETS);
  const { results } = await response.json();
  results.forEach((e) => delete e.residents);
  // console.log(filteredResponse);
  return results;
}

export default fetchPlanets;
