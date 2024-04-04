export const fetchRandomDog = () => {
  return fetch('https://dog.ceo/api/breeds/image/random').then((r) => r.json());
};

export const fetchRandomDogWithBreed = (breed = 'australian-shepherd') => {
  return fetch(`https://dog.ceo/api/breed/${breed}/images/random`).then((r) => r.json());
};
