const CONTACT_PHONE = '+255654182387';
const form = document.querySelector('#enquiry');
const status = document.querySelector('#form-status');

if (form && status) {
  const piece = new URLSearchParams(window.location.search).get('piece');
  if (piece) form.elements.brief.value = `Ningependa kuulizia bidhaa hii: ${piece}.\n\n`;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk) {
      status.textContent = !name ? 'Tafadhali andika jina lako.' : 'Tafadhali weka barua pepe sahihi.';
      (!name ? form.elements.name : form.elements.email).focus();
      return;
    }

    const message = [
      `Jina: ${name}`,
      `Barua pepe: ${email}`,
      `Ninahitaji: ${form.elements.kind.value}`,
      '',
      form.elements.brief.value.trim()
    ].join('\n');
    status.textContent = 'Ujumbe wako uko tayari. Tuma kupitia programu ya ujumbe itakayofunguka.';
    window.location.href = `sms:${CONTACT_PHONE}?body=${encodeURIComponent(message)}`;
  });
}
