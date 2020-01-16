const localImageSaving = () => {
	// Get DOM elements needed
	const image = document.getElementById('image-preview');
	const input = document.getElementById('file-input');

	// Get image as data from localStorage
	const data = localStorage.getItem('imgData');

	// If the image element and data exist display the image
	if (image && data) {
		image.setAttribute('src', data);
	}

	// Listen for upload on the input
	input.addEventListener('change', (event) => {
		// If the input has a file attached
		if (event.target.files && event.target.files[0]) {
			// New reader instance
			const reader = new FileReader();
			// Attach onload to the reader
			reader.onload = (event) => {
				// Display the uploaded image 
				image.setAttribute('src', event.target.result);
				// Save image data to local storage
				localStorage.setItem("imgData", event.target.result);
			}
			// Call the file reader
			reader.readAsDataURL(event.target.files[0]);
		}
	});
};

// Call the functionality on load
window.addEventListener('DOMContentLoaded', () => {
	localImageSaving();
});