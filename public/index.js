document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('imageFile');
    const file = fileInput.files[0];
    if (!file) {
        console.error('No file selected');
        return;
    }
    function removeAnsiEscapeCodes(str) {
        return str.replace(/\x1B[[(?);]{0,2}(;?\d)*./g, '');
    }
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:3000/convert', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(asciiImage => {
        asciiImage = removeAnsiEscapeCodes(asciiImage);
        document.getElementById('asciiImage').innerHTML = asciiImage;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});