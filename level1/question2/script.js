fetch('https://jsonplaceholder.typicode.com/todos')
	.then(todoData => todoData.json())
	.then((todoData) => {
		addNewCards(todoData);
	})
	.catch(err => console.log(err))

function addNewCards(data) {
	let userId = 0;

	// Iterate throug JSON content
	for (let i = 0; i < data.length; i++) {
		// Test if user ID is the same as the previous one
		if (data[i].userId === userId) {
			const sections = document.querySelectorAll('section');
			const newCard = document.createElement('div');
			const newCardTitle = document.createElement('h3');
			const newCardId = document.createElement('p');
			const newCardStatus = document.createElement('p');

			// Get info about task
			newCardTitle.textContent = data[i].title;
			newCardId.textContent = 'ID: ' + data[i].id;
			// Check if task is completed
			if (data[i].completed) {
				newCardStatus.textContent = 'Completed';
				newCardStatus.setAttribute("class", "completed");
			} else {
				newCardStatus.textContent = 'Not completed';
				newCardStatus.setAttribute("class", "not-completed");
			}

			// Create a new card
			newCard.appendChild(newCardTitle);
			newCard.appendChild(newCardId);
			newCard.appendChild(newCardStatus);
			// Append card to the last section
			sections[sections.length - 1].appendChild(newCard);

		// Create new section for new user ID
		} else {
			const todoContainer = document.querySelector('#todo-container');
			const newSection = document.createElement('section');
			const newCard = document.createElement('div');
			const newH2 = document.createElement('h2');

			// Create header for new user
			newH2.textContent = 'USER ' + data[i].userId;
			newCard.appendChild(newH2);
			newSection.appendChild(newCard);
			todoContainer.appendChild(newSection);

			userId++;
		}
	}
}
