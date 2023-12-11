import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const fillFormFields = () => {
  const jsonString = localStorage.getItem('feedback-form-state');
  if (jsonString) {
    const formData = JSON.parse(jsonString);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};

document.addEventListener('DOMContentLoaded', fillFormFields);

const handleSubmit = event => {
  event.preventDefault();

  const formData =
    JSON.parse(localStorage.getItem('feedback-form-state')) || {};
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  form.reset();
};

form.addEventListener('submit', handleSubmit);

const saveFormData = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  const jsonString = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', jsonString);
};

const throttledSaveFormData = throttle(saveFormData, 500);
form.addEventListener('input', throttledSaveFormData);
