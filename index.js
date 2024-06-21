console.log("Hello")
//I think most of this code is good, but I cannot for the life of me get the data to populate from the API...

const cohortName = "2404-ftb-mt-web-pt"
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohortName}`;

const fetchAllEvents = async () => {
    try {
    const response = await fetch(API_URL + "/events");
    const result = await response.json();
    console.log(result)
    return result.data
    
    } catch (err) {
    console.error("Uh oh, trouble fetching events!", err);
 }
}

const fetchOneEvent = async (eventID) => {
    try {
    const response = await fetch(`${API_URL}/${cohortName}/${eventID}`);
    const result = await response.json();
    console.log(result)
    return result.data
} catch(err){
    console.error("Uh oh, trouble fetching event")
}
}

const renderAllEvents = (eventList) => {
    console.log(eventList)
    const holders = []
    for(let i = 0; i<eventList.length; i++){
      const eventHolder = document.createElement("div")
  
      const nameEl = document.createElement("h2")
      const descripEl = document.createElement("p")
      const viewButton = document.createElement("button")
      const deleteButton = document.createElement("button")
      
      viewButton.textContent = "View Description"
      deleteButton.textContent = "Delete this event"
      
      nameEl.textContent = eventList[i].name
      descripEl.textContent = eventList[i].id
  
      viewButton.addEventListener("click", async (e) => {
        const singleEvent = await fetchSinglePlayer(eventList[i].id)
        const singleEventHolder = document.createElement("div")
  
        const singleName = document.createElement("h2")
        const singleDescrip = document.createElement("p")
  
        singleName.textContent = singleEvent.name
        singleDescrip.textContent = singleDescrip.description
  
        singleEventHolder.append(singleName, singleDescrip)
        const body = document.getElementsByTagName("body")[0]
        body.append(singleEventHolder)
      })
  
      deleteButton.addEventListener("click", (e) => {
        removeEvent(eventList[i].id)
      })
      eventHolder.append(nameEl, descripEl, viewButton, deleteButton)
      holders.push(eventHolder)
  
    };
    eventContainer.replaceChildren(...holders)
  
  };
  
  const removeEvent = async (eventID) => {
    try {
      const response = await fetch(`${API_URL}/${eventID}`,{
        method: "DELETE",
      });
      const result = await response.json()
      const players = await fetchAllEvents();

      renderAllEvents(events);
    } catch (err) {
      console.error(err);
    }
  };
  