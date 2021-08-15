let host = 'http://192.168.0.223:4000'
async function request (path, method, body, token) {
	let headers =  {
		'Content-Type': 'application/json',
	}
	if(token) headers['token'] = window.localStorage.getItem('token')

	let options = {
		method,
		headers
	}

	if(body) options.body = JSON.stringify(body)

	let response = await fetch(host + path, options)
	console.log(response)
	return response
}