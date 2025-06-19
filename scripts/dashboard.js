// Render event list in DOM
async function renderEventList(events) {
   
    try{

        const response = await fetch('http://localhost:8080/api/events',{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` // if auth needed
            },
        });
    
        if(response.ok){
            return await response.json();
        }

    }catch(e){
        alert("There was an error fetching your events");
    }

}

// Load events and render
async function loadEvents() {

    const renderedEventList = await renderEventList();

    const container = document.querySelector('.dashboardEventList');

    renderedEventList.forEach(event => {

        const itemDate = new Date(event.date);

        const weekday = itemDate.toLocaleString('en-US', { weekday: 'long' });  // e.g. "Friday"
        const month = itemDate.toLocaleString('en-US', { month: 'short' });     // e.g. "Oct"
        const day = itemDate.getDate().toString().padStart(2, '0');             // e.g. "31"
        const year = itemDate.getFullYear();                                    // e.g. "2025"

        const formattedDate = `${weekday} ${day} ${month} ${year}`;
        
        const today = new Date();
        const targetDate = new Date(`${year}-${month}-${day}`);                        
        
        const timeDifference = targetDate.getTime() - today.getTime();
        const oneDay = 1000 * 60 * 60 * 24;                                     // Milliseconds in one day
        
        const daysLeft = Math.ceil(timeDifference / oneDay);
        
        console.log(`Days left until target date: ${daysLeft}`);


        console.log(event.date);
        const eventCard = document.createElement('div');
        eventCard.classList.add("event-card");
        
        const eventTitle = document.createElement('div');
        eventTitle.classList.add("event-title");
        eventTitle.textContent = event.name;
        
        const eventDate  = document.createElement('div');
        eventDate.textContent = formattedDate;

        const eventDaysLeft  = document.createElement('div');
        eventDaysLeft.classList.add("days-left");
        eventDaysLeft.textContent = `${daysLeft} days left`;
        
        eventCard.append(eventTitle);
        eventCard.append(eventDate);
        eventCard.append(eventDaysLeft);

        container.append(eventCard);



    //     refreshTasksForEvent(event.id);  // consistent task rendering everywhere
    });

}

document.addEventListener("DOMContentLoaded", () => {

    loadEvents();
  
});