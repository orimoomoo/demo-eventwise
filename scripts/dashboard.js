/*-------------------------------
Event Calendar
--------------------------------*/
var date = new Date();
var year =  date.getFullYear();
var month = date.getMonth();
var today = new Date().getDate();

function daysInMonth(month, year) {
    var lastDateInFull = new Date(year, month + 1, 0);
    return lastDateInFull.getDate();
}

function renderCalendarDays(events) {

    var tmpDate = new Date(year, month, 0);
    var lastDate = daysInMonth(month, year);

    // find where to start calendar day of week
    var dayofweek = tmpDate.getDay();

    // create day prefixes
    for (var i = 0; i <= dayofweek; i++) {
        var day = document.createElement("div");

        day.classList.add("day");
        day.classList.add("blank");
        day.classList.add("calendar-day");
        document.getElementById("calendarDays").appendChild(day);
    }

    // render the rest of the days
    for (var i = 0; i < lastDate; i++) {
        var counter = i + 1;
        var day = document.createElement("div");

        day.id = "calendarday_" + i;
        
        const dayOccurrence = events.find(event => {
            const occuranceDay = new Date(event.date).getDate();
            const occuranceMonth = new Date(event.date).getMonth();
            const occuranceYear = new Date(event.date).getFullYear();
            return occuranceDay == counter && occuranceMonth == month && occuranceYear == year;
        });

        // extra class for today
        if (counter === today) { day.className = "day today fw-bold text-success"; } else { day.className = "day"; }
        if(dayOccurrence) {
            day.className = "day today event-title rounded-4 bg-warning-subtle";
            day.style.border = "1px solid #B48686";
            day.style.cursor = "pointer";
            day.addEventListener("click", () => {
              window.location.href = "./events.html";
            })
        }
        
        day.innerHTML = counter;
        document.getElementById("calendarDays").appendChild(day);
    }

    // clearing float
    var clear = document.createElement("div");

    clear.className = "clear";
    document.getElementById("calendarDays").appendChild(clear);
}

/*-------------------------------
Event List
--------------------------------*/

// Render event list in DOM
async function renderEventList() {
   
    try{
        const response = await fetch('http://localhost:8080/api/events',{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` // if auth needed
            },
        });
    
        if(response.ok){
            const result = await response.json();
            return result;
        }
    }catch(e){
        alert("There was an error fetching your events");
    }

}

// Load events and render
async function loadDashboardListEvents(events) {

    const container = document.querySelector('.dashboardEventList');
    
    events.forEach(event => {

        const itemDate = new Date(event.date);

        const _weekday = itemDate.toLocaleString('en-US', { weekday: 'long' });  // e.g. "Friday"
        const _month = itemDate.toLocaleString('en-US', { month: 'short' });     // e.g. "Oct"
        const _day = itemDate.getDate().toString().padStart(2, '0');             // e.g. "31"
        const _year = itemDate.getFullYear();                                    // e.g. "2025"

        const _formattedDate = `${_weekday} ${_day} ${_month} ${_year}`;
        
        const _today = new Date();
        const _targetDate = new Date(`${_year}-${_month}-${_day}`);                        
        
        const _timeDifference = _targetDate.getTime() - _today.getTime();
        const _oneDay = 1000 * 60 * 60 * 24;                                     // Milliseconds in one day
        
        const _daysLeft = Math.ceil(_timeDifference / _oneDay);
        
        console.log(`Days left until target date: ${_daysLeft}`);

        const eventCard = document.createElement('div');
        eventCard.classList.add("event-card");
        
        const eventTitle = document.createElement('div');
        eventTitle.classList.add("event-title");
        eventTitle.textContent = event.name;
        
        const eventDate  = document.createElement('div');
        eventDate.textContent = _formattedDate;

        const eventDaysLeft  = document.createElement('div');
        eventDaysLeft.classList.add("days-left");
        eventDaysLeft.textContent = `${_daysLeft} day(s) left`;
        
        eventCard.append(eventTitle);
        eventCard.append(eventDate);
        eventCard.append(eventDaysLeft);

        container.append(eventCard);
    //     refreshTasksForEvent(event.id);  // consistent task rendering everywhere
    });

}

document.addEventListener("DOMContentLoaded", async () => {

    const listOfEvents = await renderEventList();
    
    loadDashboardListEvents(listOfEvents);
    renderCalendarDays(listOfEvents);
    
});