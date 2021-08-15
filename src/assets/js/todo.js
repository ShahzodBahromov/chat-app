let token = window.localStorage.getItem('token')
let username = window.localStorage.getItem('username')

if(!token && !username) window.location = '/login'
usernameText.textContent = username

let hour = new Date()
let hor = (''+hour.getHours()).padStart(2,0)
let min = (''+hour.getMinutes()).padStart(2,0)

const getTodos = async () => {
	let data = await request('/message', 'GET', undefined, true)
	let res = await data.json()
	renderTodos(res.data)
}


form.onsubmit = async  (event) => {
	event.preventDefault()
	let newTodo = {
		todo_text: textInput.value,
		todo_time: hor + ':' + min
	}
	let res = await request('/message', 'POST', newTodo, true)

	if(res.status == 200) {
		res = await res.json()
		let todo = res.data
		renderTodos([todo])
	}
}


function renderTodos(todos)
{
	for(let todo of todos) {

		let userID = window.localStorage.getItem('user_id')
		let li = document.createElement('li')
		let div = document.createElement('div')
		let nDiv = document.createElement('div')
		let mDiv = document.createElement('div')
		let text = document.createElement('span')
		let username = document.createElement('span')
		let time = document.createElement('span')
		text.setAttribute('class', 'text-class')
		time.setAttribute('class', 'time-class')
		username.setAttribute('class', 'userr')

		username.setAttribute('class', 'username-class')

		if(todo.user_id == userID) {
			let button = document.createElement('button')
			button.textContent = 'X'
			li.classList.add('main')
			mDiv.style.display='none'
			button.onclick = async () => {
				let res = await request('/message', 'DELETE', { todo_id: todo.todo_id }, true)
				if(res.status == 200) {
					li.remove()
				}
			}
			textInput.value = ''
			li.append(button)
		} else {
		username.classList.add('userr--user')
		username.textContent = todo.username

		div.setAttribute('class','me')
		nDiv.setAttribute('class', 'n-div')
		}

		time.contentEditable = true
		text.contentEditable = true

		text.textContent = todo.todo_text
		time.textContent = todo.todo_time
		name.value = todo.username[0].toUpperCase()

		nDiv.append(text)
		nDiv.append(time)
		mDiv.append(username)
		div.append(mDiv)
		div.append(nDiv)
		li.append(div)

		ulList.append(li)

		text.onkeyup = async  (event) => {
			if(event.keyCode == 13) {
				let x = text.textContent
				let res = await request('/message', 'PUT', { todo_id: todo.todo_id, todo_text: text.textContent }, true)
				text.textContent = x
			}
		}
	}
}

logout.onclick = () => {
	window.localStorage.removeItem('token')
	window.localStorage.removeItem('username')
	window.location = '/login'
}

getTodos()