// Contact form: no backend. On submit the enquiry is copied to the clipboard and
// WhatsApp opens in a new tab so the visitor can paste and send it.
const WHATSAPP_URL = 'https://wa.me/message/7TASPGWT6H77O1';
const form = document.querySelector('#enquiry');
const status = document.querySelector('#form-status');

const piece = new URLSearchParams(window.location.search).get('piece');
if (piece) form.elements.brief.value = `I’d like to ask about the ${piece}.\n\n`;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  if (!name) {
    status.textContent = 'Please add your name.';
    form.elements.name.focus();
    return;
  }
  const phone = form.elements.phone.value.trim();
  const message = [
    'Hello Huba, I would like to ask about furniture.',
    `Name: ${name}`,
    phone ? `Phone: ${phone}` : '',
    `Looking for: ${form.elements.kind.value}`,
    form.elements.brief.value.trim()
  ].filter(Boolean).join('\n');
  let copied = false;
  try { await navigator.clipboard.writeText(message); copied = true; } catch (error) { /* clipboard blocked */ }
  window.open(WHATSAPP_URL, '_blank', 'noopener');
  status.textContent = copied
    ? 'Your message is copied. Paste it into the WhatsApp chat and send.'
    : 'WhatsApp is opening. Please type your message in the chat.';
});
