import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", event => {
    event.preventDefault();

    const promiseMaker = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (form.elements.state.value === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${form.elements.delay.value}ms`);
            } else {
                reject(`❌ Rejected promise in ${form.elements.delay.value}ms`);
            }
        }, form.elements.delay.value);
    });

    promiseMaker
    .then(value => iziToast.success({
        message: value,
        position: "topCenter"
    }))
    .catch(error => iziToast.error({
        message: error,
        position: "topCenter"
    }));
});