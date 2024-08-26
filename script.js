// define a function named generate
function generate() { 
	// initialize an empty string to hold the characters for the password
	let dictionary = ""; 
	// check if the lowercase checkbox is checked and add lowercase letters to the dictionary if true
	if (document.getElementById("lowercaseCb").checked) { 
		dictionary += "qwertyuiopasdfghjklzxcvbnm"; 
	} 
	// check if the uppercase checkbox is checked and add uppercase letters to the dictionary if true
	if (document.getElementById("uppercaseCb").checked) { 
		dictionary += "QWERTYUIOPASDFGHJKLZXCVBNM"; 
	} 
	// check if the digits checkbox is checked and add digits to the dictionary if true
	if (document.getElementById("digitsCb").checked) { 
		dictionary += "1234567890"; 
	} 
	// check if the specials checkbox is checked and add special characters to the dictionary if true
	if (document.getElementById("specialsCb").checked) { 
		dictionary += "!@#$%^&*()_+-={}[];<>:"; 
	} 
	// get the length of the password from the range input
	const length = document.querySelector( 
		'input[type="range"]').value; 

	// if the length is less than 1 or dictionary is empty, return early
	if (length < 1 || dictionary.length === 0) { 
		return; 
	} 

	// initialize an empty string to hold the generated password
	let password = ""; 
	// generate the password character by character
	for (let i = 0; i < length; i++) { 
		// generate a random position within the dictionary
		const pos = Math.floor(Math.random() * dictionary.length); 
		// append the character at the random position to the password
		password += dictionary[pos]; 
	} 

	// set the generated password value to the text input field
	document.querySelector( 
		'input[type="text"]').value = password; 
} 

// execute the function generate when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // select the range input and generator div
    const rangeInput = document.querySelector('.range input[type="range"]');
    const generatorDiv = document.querySelector('.generator');
    // set the initial width of the generator div
    generatorDiv.style.width = '250px'
    // listen for input event on the range input
    rangeInput.addEventListener('input', function() {
        // calculate and set the width of the generator div based on the range input value
        const widthValue = Math.max(this.value * 5, 250); // ensure minimum width of 250px
        generatorDiv.style.width = widthValue + 'px';
    });
});

// add click event listeners to checkboxes and the generate button
[ 
	...document.querySelectorAll( 
		'input[type="checkbox"], button.generate'), 
].forEach((elem) => { 
	elem.addEventListener("click", generate); 
}); 

// add input event listener to the range input to update the span and generate password
document.querySelector('input[type="range"]').addEventListener( 
	"input", (e) => { 
		document.querySelector( 
			"div.range span").innerHTML = e.target.value; 
		generate(); 
	}); 

// add click event listener to the copy button to copy password to clipboard
document.querySelector("div.password button").addEventListener( 
	"click", () => { 
		const pass = document.querySelector('input[type="text"]').value; 
		// copy password to clipboard
		navigator.clipboard.writeText(pass).then(() => { 
			document.querySelector( 
				"div.password button").innerHTML = "copied!"; 
			// reset the button text after 1 second
			setTimeout(() => { 
				document.querySelector( 
					"div.password button").innerHTML = "copy"; 
			}, 1000); 
		}); 
	}); 

// generate a password initially when the script is executed
generate();
