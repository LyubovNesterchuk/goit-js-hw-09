const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';


let formData = {
  email: '',
  message: '',
};


const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };
    if (parsedData.email) form.elements.email.value = parsedData.email;
    if (parsedData.message) form.elements.message.value = parsedData.message;
  } catch (error) {
    console.error('Error parsing saved form data:', error);
  }
}


form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (formData.hasOwnProperty(name)) {
    formData[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});


form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (email.trim() === '' || message.trim() === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted form data:', formData);


  formData = { email: '', message: '' };
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
});

