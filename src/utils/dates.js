// Dates come from the backend as ISO strings in UTC, for example
// "2026-03-01T00:00:00.000Z". They are formatted in UTC on purpose: in Toronto the
// local time of that moment is still the day before, so "March 2026" would show
// as "February 2026".

export function formatMonthYear(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-CA', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function formatDay(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

// Value for an <input type="date">, which expects "YYYY-MM-DD".
export function toDateInput(value) {
  return value ? String(value).slice(0, 10) : '';
}
