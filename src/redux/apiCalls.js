const DEFAULT_URL = "https://uxcandy.com/~shapoval/test-task-backend/v2/"

export const get =  async(params) => {
	const cards = await fetch(DEFAULT_URL + "?" + new URLSearchParams({
			developer: "Illya",
			...params
		}));
	const jsonCards = await cards.json()
	return jsonCards
}

export const post =  async(formdata, method) => {
	let requestOptions = {
	  method: 'POST',
	  body: formdata,
	  redirect: 'follow'
	};

	const postResponse = await fetch(DEFAULT_URL + method + "?" + new URLSearchParams({
			developer: "Illya"
	}), requestOptions)

	const json = await postResponse.json()
  return json
}