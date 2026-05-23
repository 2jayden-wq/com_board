// Baseline events to populate if localStorage is empty
const defaultEvents = [
  { title: "Park Cleanup", date: "2026-05-12" },
  { title: "Food Drive", date: "2026-05-15" },
  { title: "Urban Garden Project", date: "2026-05-17" }
];

// Always retrieves a valid array from localStorage
function getStoredEvents() {
  const stored = localStorage.getItem('communityEvents');
  if (!stored) {
    // If empty, initialize localStorage with defaults right away
    localStorage.setItem('communityEvents', JSON.stringify(defaultEvents));
    return defaultEvents;
  }
  return JSON.parse(stored);
}

// Formats a standard YYYY-MM-DD string into something readable (e.g., "May 12, 2026")
function formatDisplayDate(rawDateString) {
  if (!rawDateString) return "Unknown Date";
  const eventDate = new Date(rawDateString);
  return eventDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC' // Prevents time zone shifting issues
  });
}