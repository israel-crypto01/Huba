// Contact form: no backend, so submitting opens the visitor's email app with the
// enquiry pre-filled. Swap STUDIO_EMAIL (and this handler) if you add a real form service.
const STUDIO_EMAIL = 'support@yourbrand.com';
const form = document.querySelector('#enquiry');
const status = document.querySelector('#form-status');

const piece = new URLSearchParams(window.location.search).get('piece');
if (piece) {
  const brief = form.elements.brief;
  brief.value = `I’d like to ask about the ${piece}.\n\n`;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk) {
    status.textContent = !name ? 'Please add your name.' : 'Please enter a valid email address.';
    (!name ? form.elements.name : form.elements.email).focus();
    return;
  }
  const subject = `Enquiry: ${form.elements.kind.value}`;
  const body = `Name: ${name}\nEmail: ${email}\nLooking for: ${form.elements.kind.value}\n\n${form.elements.brief.value.trim()}`;
  status.textContent = 'Opening your email app… if nothing happens, write to ' + STUDIO_EMAIL + '.';
  window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
