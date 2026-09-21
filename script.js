const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailErr = document.getElementById('email-err');
const passwordErr = document.getElementById('password-err');
const showPw = document.getElementById('show-pw');
const loginBtn = document.getElementById('login-btn');
const result = document.getElementById('result');

function checkEmail() {
  const val = email.value.trim();
  let msg = '';

  if (val === '') {
    msg = 'Please enter your email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    msg = 'That email doesn\'t look right';
  }

  emailErr.textContent = msg;
  email.classList.toggle('bad', msg !== '');
  return msg === '';
}

function checkPassword() {
  const val = password.value;
  let msg = '';

  if (val === '') {
    msg = 'Please enter your password';
  } else if (val.length < 8) {
    msg = 'Password must be at least 8 characters';
  }

  passwordErr.textContent = msg;
  password.classList.toggle('bad', msg !== '');
  return msg === '';
}

email.addEventListener('blur', checkEmail);
password.addEventListener('blur', checkPassword);

showPw.addEventListener('click', function () {
  if (password.type === 'password') {
    password.type = 'text';
    showPw.textContent = 'Hide';
  } else {
    password.type = 'password';
    showPw.textContent = 'Show';
  }
});

// temporary check until there's a real backend
function login(emailVal, passwordVal) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(emailVal === 'demo@example.com' && passwordVal === 'password123');
    }, 800);
  });
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  result.textContent = '';
  result.className = '';

  const emailOk = checkEmail();
  const passwordOk = checkPassword();
  if (!emailOk || !passwordOk) return;

  loginBtn.disabled = true;
  loginBtn.textContent = 'Logging in...';

  const success = await login(email.value.trim(), password.value);

  if (success) {
    result.textContent = 'Logged in!';
    result.className = 'ok';
  } else {
    result.textContent = 'Wrong email or password';
    result.className = 'fail';
  }

  loginBtn.disabled = false;
  loginBtn.textContent = 'Log in';
});
