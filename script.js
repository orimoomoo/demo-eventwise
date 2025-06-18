// // Calendar Functions
// const monthYearElement = document.getElementById('monthYear');
// const datesElement = document.getElementById('dates');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');

// let currentDate = new Date();

// const updateCalendar = () => {
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   const firstDay = new Date(currentYear, currentMonth,0);
//   const lastDay = new Date(currentYear,currentMonth + 1, 0);
//   const totalDays = lastDay.getDate();
//   const firstDayIndex = firstDay.getDay();
//   const lastDayIndex = lastDay.getDay();

//   const monthYearString = currentDate.toLocaleString
//   ('default', {month: 'long', year: 'numeric'});
//   monthYearElement.textContent = monthYearString;

//   let datesHTML = '';

//   for(let i = firstDayIndex; i > 0; i--) {
//     const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
//     datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
//   }

//   for(let i = 1; i <= totalDays; i++) {
//     const date = new Date(currentYear, currentMonth, i);
//     const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
//     datesHTML += `<div class="date ${activeClass}">${i}</div>`;
//   }

//   for(let i = 1; i <= 7 - lastDayIndex; i++) {
//     const nextDate = new Date(currentYear, currentMonth + 1, i);
//     datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
//   }

//   datesElement.innerHTML = datesHTML;

// }

// prevBtn.addEventListener('click', () => {
//   currentDate.setMonth(currentDate.getMonth() -1);
//   updateCalendar();
// })

// nextBtn.addEventListener('click', () => {
//   currentDate.setMonth(currentDate.getMonth() + 1);
//   updateCalendar();
// })

// updateCalendar();
// // End of Calendar Functions

// // TODO - Progress Bar Redo.
// // TODO - Search Bar Research if got time
// // TODO - Picture for Events (eventCarousel) to link with the EventList
// // TODO - BREAKTIME

// // TODO Still working on it~
// document.addEventListener('DOMContentLoaded', function () {
// const addItemBtn = document.getElementById('addItem');
// const itemListContainer = document.getElementById('itemListContainer');
// const subtotalEl = document.getElementById('subtotal');

// function updateSubtotal() {
//   let total = 0;
//   document.querySelectorAll('.item-price').forEach(input => {
//     const value = parseFloat(input.value);
//     if (!isNaN(value)) total += value;
//   });
//   subtotalEl.textContent = `Subtotal: $${total.toFixed(2)}`;
// }

// function createItemRow() {
//   const div = document.createElement('div');
//   div.className = 'item-row';
//   div.innerHTML = `
//     <input type="text" placeholder="Item name">
//     <input type="number" placeholder="Price" class="item-price" min="0" step="0.01" oninput="updateSubtotal()">
//     <button type="button" onclick="this.parentElement.remove(); updateSubtotal();">Delete</button>
//   `;
//   return div;
// }

// addItemBtn.addEventListener('click', () => {
//   itemListContainer.appendChild(createItemRow());
// });

// document.getElementById('eventForm').addEventListener('submit', function (e) {
//   e.preventDefault();
//   alert('Event saved!');
// });
// });