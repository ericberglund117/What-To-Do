export async function getActivity() {
  const response = await fetch('http://www.boredapi.com/api/activity/')
  return await response.json()
}

export const getActivityParticipants = (participants) => {
  return fetch(`http://www.boredapi.com/api/activity?participants=${participants}`)
  .then(response => response.json())
}

export const getActivityType = (type) => {
  return fetch(`http://www.boredapi.com/api/activity?type=${type}`)
  .then(response => response.json())
}
