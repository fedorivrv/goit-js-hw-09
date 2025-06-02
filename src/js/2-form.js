let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailField = form.elements.email;
const messageField = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

const savedState = localStorage.getItem(STORAGE_KEY);
if (savedState) {
  try {
    const parsedData = JSON.parse(savedState);
    formData = {
      email: parsedData.email?.trim() || '',
      message: parsedData.message?.trim() || '',
    };

    emailField.value = formData.email;
    messageField.value = formData.message;
  } catch (err) {
    console.error('Помилка при парсингу localStorage:', err);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value.trim(); // прибираємо пробіли по краях
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const trimmedEmail = emailField.value.trim();
  const trimmedMessage = messageField.value.trim();

  if (!trimmedEmail || !trimmedMessage) {
    alert('Fill please all fields');
    return;
  }

  const submittedData = {
    email: trimmedEmail,
    message: trimmedMessage,
  };

  console.log(submittedData);

  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
