const localImageSaving = () => {
  // Get DOM elements needed
  const formGroup = document.getElementById('image-upload-form-group');
  const input = document.getElementById('image-upload-input');
  const figure = document.getElementById('image-upload-figure');
  const image = document.getElementById('image-upload-image');
  const error = document.getElementById('image-upload-error');
  
  // Get image as data from localStorage
  const data = localStorage.getItem('imgData');
  
  // If the image element and data exist display the image
  if (image && data) {
    // Display figure element with caption
    if (figure) figure.style.display = 'block';
    image.setAttribute('src', data);
  }

  // Listen for upload on the input
  input.addEventListener('change', (inputEvent) => {
    // If the input has a file attached
    if (inputEvent.target.files && inputEvent.target.files[0]) {
      // New reader instance
      const reader = new FileReader();
      // Attach onload to the reader
      reader.onload = (readerEvent) => {
        try {
          // Save image data to local storage
          localStorage.setItem('imgData', readerEvent.target.result);
          // Display the uploaded image
          if (image) {
            // Display figure element with caption
            if (figure) figure.style.display = 'block';
            image.setAttribute('src', readerEvent.target.result);
            // Hide any previous errors
            if (error) {
              formGroup.classList.remove('nhsuk-form-group--error');
              error.style.display = '';
            }
          }
        } catch(err) {
          // If the saving fails it is most likely due to file size
          if (formGroup && error && image) {
            // Clear input, image and storage
            input.value = '';
            image.setAttribute('src', '');
            localStorage.removeItem('imgData');
            // Hide figure
            if (figure) figure.style.display = '';
            // Show error
            formGroup.classList.add('nhsuk-form-group--error');
            error.style.display = 'block';
            console.log(err)
          };
        }
      };
      // Call the file reader
      reader.readAsDataURL(inputEvent.target.files[0]);
    }
	});
};

// Call the functionality on load
window.addEventListener('DOMContentLoaded', () => {
  localImageSaving();
});
  