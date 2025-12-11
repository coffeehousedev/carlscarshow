function deleteTicket(index) {
	// Get the current tickets
	let allCars = JSON.parse(localStorage.getItem('cars')) || [];
	
	// Remove the ticket at the specified index
	allCars.splice(index, 1);
	
	// Save the updated array back to localStorage
	localStorage.setItem('cars', JSON.stringify(allCars));
	
	// Reload the page to show the updated table
	location.reload();
}


document.addEventListener('DOMContentLoaded', function() {
	var firstNameInput = document.getElementById("first-name");
	var firstNameError = document.getElementById("first-name-error");

	function validateFirstName() {
		if (firstNameInput.validity.valid) {
			firstNameError.textContent = '';
			firstNameError.classList.remove('show');
			firstNameInput.classList.remove('error');
		} else {
			if (firstNameInput.validity.valueMissing) {
				firstNameError.textContent = 'First Name is required';
			} else if (firstNameInput.validity.patternMismatch) {
				firstNameError.textContent = 'Please enter a valid name';
			}
			firstNameError.classList.add('show');
			firstNameInput.classList.add('error');
		}
	}

	var lastNameInput = document.getElementById("last-name");
	var lastNameError = document.getElementById("last-name-error");

	function validateLastName() {
		if (lastNameInput.validity.valid) {
			lastNameError.textContent = '';
			lastNameError.classList.remove('show');
			lastNameInput.classList.remove('error');
		} else {
			if (lastNameInput.validity.valueMissing) {
				lastNameError.textContent = 'Last Name is required';
			} else if (lastNameInput.validity.patternMismatch) {
				lastNameError.textContent = 'Please enter a valid name';
			}
			lastNameError.classList.add('show');
			lastNameInput.classList.add('error');
		}
	}

	var emailInput = document.getElementById("email");
	var emailError = document.getElementById("email-error");

	function validateEmail() {
		if (emailInput.validity.valid) {
			emailError.textContent = '';
			emailError.classList.remove('show');
			emailInput.classList.remove('error');
		} else {
			if (emailInput.validity.valueMissing) {
				emailError.textContent = 'Email is required';
			} else if (emailInput.validity.typeMismatch) {
				emailError.textContent = 'Please enter a valid Email';
			}
			emailError.classList.add('show');
			emailInput.classList.add('error');
		}
	}

	var carYearInput = document.getElementById("car-year");
	var carYearError = document.getElementById("car-year-error");

	function validateCarYear() {
		if (carYearInput.validity.valid) {
			carYearError.textContent = '';
			carYearError.classList.remove('show');
			carYearInput.classList.remove('error');
		} else {
			if (carYearInput.validity.valueMissing) {
				carYearError.textContent = 'Car year is required';
			} else if (carYearInput.validity.rangeUnderflow || carYearInput.validity.rangeOverflow) {
				carYearError.textContent = 'Please enter a valid year';
			}
			carYearError.classList.add('show');
			carYearInput.classList.add('error');
		}
	}


	var makeInput = document.getElementById("make");
	var makeError = document.getElementById("make-error");
	
	function validateMake() {
		if (makeInput.validity.valid) {
			makeError.textContent = '';
			makeError.classList.remove('show');
			makeInput.classList.remove('error');
		} else {
			if (makeInput.validity.valueMissing) {
				makeError.textContent = 'Make is required';
			} else if (makeInput.validity.patternMismatch) {
				makeError.textContent = 'Please enter a valid make';
			}
			makeError.classList.add('show');
			makeInput.classList.add('error');
		}
	}

	var modelInput = document.getElementById("model");
	var modelError = document.getElementById("model-error");

	function validateModel() {
		if (modelInput.validity.valid) {
			modelError.textContent = '';
			modelError.classList.remove('show');
			modelInput.classList.remove('error');
		} else {
			if (modelInput.validity.valueMissing) {
				modelError.textContent = 'Model is required';
			} else if (modelInput.validity.patternMismatch) {
				modelError.textContent = 'Please enter a valid model';
			}
			modelError.classList.add('show');
			modelInput.classList.add('error');
		}
	}


	var form = document.querySelector(".registration-form");
	if (form) {
		firstNameInput.addEventListener('input', validateFirstName);
		lastNameInput.addEventListener('input', validateLastName);
		emailInput.addEventListener('input', validateEmail);
		carYearInput.addEventListener('input', validateCarYear);
		makeInput.addEventListener('input', validateMake);
		modelInput.addEventListener('input', validateModel);

		form.addEventListener("submit", function(event) {
			event.preventDefault();
			let car = {
				firstName: document.getElementById("first-name").value,
				lastName: document.getElementById("last-name").value,
				email: document.getElementById("email").value,
				carYear: document.getElementById("car-year").value,
				make: document.getElementById("make").value,
				model: document.getElementById("model").value,
				color: document.getElementById("color").value,
				category: document.getElementById("category").value,
				description: document.getElementById("description").value,
			};

			let allCars = JSON.parse(localStorage.getItem('cars')) || [];

			allCars.push(car);
			
			localStorage.setItem('cars', JSON.stringify(allCars));

			window.location.href = 'pages/garage.html';
		});
	}

	function loadCarTable() {
		let tbody = document.getElementById('filter-tbody');

		if (tbody) {
			let allCars = JSON.parse(localStorage.getItem('cars')) || [];

			tbody.innerHTML = '';

			allCars.forEach(function(car, index) {
				let row = `
					<tr>
						<td>${car.firstName}</td>
						<td>${car.lastName}</td>
						<td>${car.email}</td>
						<td>${car.carYear}</td>
						<td>${car.make}</td>
						<td>${car.model}</td>
						<td>${car.color}</td>
						<td>${car.category}</td>
						<td>${car.description}</td>
						<td>
							<button onclick="deleteTicket(${index})">Delete</button>
						</td>
					</tr>
				`;
				tbody.innerHTML += row;
			});
		}
	}

	function displayCarTotal() {
		let tfootRow = document.getElementById('footer-row');

		if (tfootRow) {
			let allCars = JSON.parse(localStorage.getItem('cars')) || [];

			tfootRow.innerHTML += `<td colspan="3">Total Cars: ${allCars.length}</td>`;
		}
	}

	displayCarTotal();

	var filterInput = document.getElementById('filter-input');
	if (filterInput) {
		filterInput.addEventListener('input', function(e) {
			const filterValue = e.target.value.toLowerCase();
			const rows = document.querySelectorAll('#filter-tbody tr');

			rows.forEach(row => {
				const text = row.textContent.toLowerCase();
				row.style.display = text.includes(filterValue) ? '' : 'none';
			});
		});
	}

	var clearDataButton = document.getElementById('clear-data');

	if (clearDataButton) {
		clearDataButton.addEventListener("click", function() {
			localStorage.removeItem('cars');
			loadCarTable();
		});
	}

	loadCarTable();
});


