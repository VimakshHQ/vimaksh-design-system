// The phone field from work.vimaksh.in (src/v5/main.js:72-82): intl-tel-input with every country, flags,
// search, India preselected, strict input. Load after vimaksh.js. Also load vendor/intl-tel-input.css before vimaksh.css.
import intlTelInput from 'intl-tel-input';
export function initPhone(scope = document) {
  scope.querySelectorAll('[data-check=phone]').forEach(input => {
    if (input.iti) return;
    input.iti = intlTelInput(input, {
      initialCountry: 'in',
      countryOrder: ['in', 'ae', 'us', 'gb', 'sg', 'au', 'ca', 'sa'],
      separateDialCode: true,
      strictMode: true,                 // only digits can be typed, and no more than the country allows
      countrySearch: true,
      formatAsYouType: true,
      loadUtils: () => import('intl-tel-input/utils'),
      uiTranslations: { searchPlaceholder: 'Search country or code' },
    });
    // the site re-checks the number when the country changes; its blur handler runs the same check
    input.addEventListener('countrychange', () => { if (input.value.trim()) input.dispatchEvent(new Event('blur')); });
  });
}
initPhone();
