document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.getElementById('exampleModalDefault');
      const imageId = button.getAttribute('data-image-id');
      const imageUrl = document.getElementById(imageId)?.getAttribute('src');

      if (imageUrl) {
        modal.querySelector('#modalImage').setAttribute('src', imageUrl);
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Get all view buttons
  const viewButtons = document.querySelectorAll('.view-button');

  // Add click event listener to each view button
  viewButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Get the image source from the data-image-src attribute
      const imageSrc = this.getAttribute('data-image-src');
      // Set the modal image source
      document.getElementById('modalImage').setAttribute('src', imageSrc);
      // Get the title from the data-title attribute
      const title = this.getAttribute('data-title');
      // Set the modal title
      document.getElementById('exampleModalLabel').textContent = title;
      // Show the modal
      const modal = new bootstrap.Modal(document.getElementById('exampleModalDefault'));
      modal.show();
    });
  });
});