// Email check for the brief form. The same rule runs in the browser (as you type) and in the worker
// (worker/index.js imports this file). Phone numbers are checked with libphonenumber: intl-tel-input in the
// browser, libphonenumber-js in the worker.

const EMAIL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,24}$/i;

// Returns an error message, or '' when the address looks deliverable.
export function checkEmail(raw) {
  const v = String(raw ?? '').trim();
  if (!v) return 'Please enter your email.';
  if (v.length > 254 || !EMAIL.test(v)) return 'Please enter a valid email, like name@company.com.';
  const [local, domain] = v.toLowerCase().split('@');
  if (local.length > 64) return 'Please enter a valid email, like name@company.com.';
  const typos = { 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gamil.com': 'gmail.com', 'yahooo.com': 'yahoo.com', 'hotmial.com': 'hotmail.com', 'outlok.com': 'outlook.com' };
  if (typos[domain]) return `Did you mean ${local}@${typos[domain]}?`;
  return '';
}
