export const getActivity = () => {
  return fetch('http://www.boredapi.com/api/activity/')
  .then(response => response.json())
}
