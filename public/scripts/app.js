const sendButton = document.querySelector('.button');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

(function () {

    function Start() {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger');

        for (button of deleteButtons) {
            button.addEventListener('click', (event) => {
                if (!confirm("Are you sure?")) {
                    event.preventDefault();
                    window.location.assign('/book-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('send button clicked');

    let formData = {
        name: name.value,
        email: email.value,
        message: message.value
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact-me', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = () => {
        if (xhr.responseText == 'Success') {

            alert('Email Sent Sucessfully');
            console.log(xhr.responseText)

            name.value = '';
            email.value = '';
            message.value = '';
        } else {
            alert('Something Went Wrong');
        }
    }
    xhr.send(JSON.stringify(formData));

});

