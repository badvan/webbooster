let modal = document.getElementById("my-modal");
let button = document.getElementById("ok-btn");

const formModal = () => {
    let elForm = {
        name: document.forms["formReview"]["name"].value,
        phone: document.forms["formReview"]["phone"].value,
        name_place: document.forms["formReview"]["name_place"].value,
        err_name: document.getElementById('err_name'),
        err_phone: document.getElementById('err_phone'),
        err_place: document.getElementById('err_place'),
    }

    return elForm;
}

// отправка POST запроса
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    return await response.json();
}

function formClean() {
    let elForm = formModal()

    document.forms['formReview']['name'].value = ''
    document.forms['formReview']['phone'].value = ''
    document.forms['formReview']['name_place'].value = ''

    elForm.err_name.classList.add('invisible')
    elForm.err_phone.classList.add('invisible')
    elForm.err_place.classList.add('invisible')
}

// modal OK button
button.onclick = function () {
    let elForm = formModal()
    let error = false

    if (elForm.name == "") {
        elForm.err_name.classList.remove("invisible");
        error = true
    } else {
        elForm.err_name.classList.add("invisible");
    }

    if (elForm.phone == "") {
        elForm.err_phone.classList.remove("invisible");
        error = true
    } else {
        elForm.err_phone.classList.add("invisible");
    }

    if (elForm.name_place == "") {
        elForm.err_place.classList.remove("invisible");
        error = true
    } else {
        elForm.err_place.classList.add("invisible");
    }

    if (!error) {
        // цель на отправку формы через javascript событие
        ym(89230054,'reachGoal','target_review')

        postData('/process.php', {
            name: elForm.name,
            phone: elForm.phone,
            name_place: elForm.name_place

        }).then((data) => {
            console.log(data);
        });

        formClean()
        modal.style.display = "none";

        setTimeout(() => alert('Отзыв успешно отправлен!'), 200);
    }
}

// close modal anywhere outside the modal
window.onclick = function (event) {
    if (event.target == modal) {
        formClean()
        modal.style.display = "none"
    }
}

document.querySelectorAll('.btn_review').forEach((button) => {
    button.addEventListener('click', function (event) {
        event.preventDefault()
        modal.style.display = "block"
        let name_place = this.parentElement.parentElement.querySelector('.name_place').textContent.trim()
        document.getElementById("name_place").value = name_place
    })
})