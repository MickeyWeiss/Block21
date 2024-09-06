
const cohortName = "2404-ftb-mt-web-pt"
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohortName}`;

const state = {
    events: [], 
};

const eventList = document.querySelector('#events')
const addEvent = document.querySelector('#addEvent')
addPartyButton = addEventListener('submit', createEvent)

fetchAllEvents = async () => {
    try {
        const response = await fetch(API_URL + '/events');
        const result = await response.json()
        return state.events = result.data
    } catch (error) {
        console.log('error fetching events')
    }
}
console.log(state)

async function createEvent(event) {
    event.preventDefault()

    const name = addEvent.title.value
    const date = new Date(addEvent.dateTime.value)
    const description = addEvent.description.value
    const location = addEvent.location.value

    try {
        const response = await fetch(API_URL + '/events', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name,
                date,
                description,
                location,
            })
        })
        const result = await response.json()
    } catch (error) {
        console.log('error posting event')
    }
}

async function deleteEvent(id) {
    try {
        const response = await fetch (`${API_URL + '/events'}/${id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        return state.events = result.data
    }catch(error) {
        console.log('error deleting event')
    }
}

function renderEvents() {
    if (state.events.length < 1) {
        const newEventItem = document.createElement('li')
        newEventItem.textContent = 'No Event Found'
        eventList.append(newEventItem)
    }else {
        eventList.replaceChildren()
        state.events.forEach((eventObject) => {
            const newEventItem = document.createElement('li')
            newEventItem.classList.add('#events')

            const newTitle = document.createElement('h2')
            newTitle.textContent = eventObject.name

            const newDate = document.createElement('p')
            newDate.textContent = eventObject.date

            const newDescription = document.createElement('p')
            newDescription.textContent = eventObject.description

            const newLocation = document.createElement('p')
            newLocation.textContent = eventObject.location

            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'delete'
            deleteButton.addEventListener('click', () => 
                deleteEvent(eventObject.id))

            newEventItem.append(
                newTitle,
                newDate,
                newDescription,
                newLocation,
                deleteButton
            )

            eventList.append(newEventItem)
        })
    }
}

async function renderAll() {
    await fetchAllEvents();
    renderEvents()
}
renderAll()