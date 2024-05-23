document.addEventListener("DOMContentLoaded", () => {
    const partyList = document.getElementById("party-list");
    const newPartyForm = document.getElementById("new-party-form");

    const API_URL =
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-FTB-ET-WEB-PT"; // Replace YOUR_COHORT_NAME

    // Fetch and Display Parties Function
    async function fetchAndDisplayParties() {
        try {
            const response = await fetch(`${API_URL}/events`);
            const result = await response.json();
        
            if (result.success) {
                const parties = result.data;
                renderParties(parties); 
            } else {
                console.error("Failed to fetch parties:", result.error);
            }
        } catch (error) {
            console.error("Error fetching parties:", error);
        }
    }
        
    // Render Parties in the List
    function renderParties(parties) {
        partyList.innerHTML = "";
        parties.forEach((party) => {
            const partyItem = document.createElement("div");
            partyItem.classList.add("party-item");
            partyItem.dataset.partyId = party.id; 

            const nameElement = document.createElement("h3");
            nameElement.textContent = party.name;

            const dateTimeElement = document.createElement("p");
            const dateTimeString = new Date(party.date).toLocaleString(); // Convert date to local format
            dateTimeElement.textContent = `Date and Time: ${dateTimeString}`;

            const locationElement = document.createElement("p");
            locationElement.textContent = `Location: ${party.location}`;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = `Description: ${party.description}`;
        
            // Delete Button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                deleteParty(party.id); 
            });

            // Append elements to partyItem
            partyItem.appendChild(nameElement);
            partyItem.appendChild(dateTimeElement);
            partyItem.appendChild(locationElement);
            partyItem.appendChild(descriptionElement);
            partyItem.appendChild(deleteButton);
        
            partyList.appendChild(partyItem); 
        });
    }

    // Delete Party Function
    async function deleteParty(partyId) {
        try {
            const response = await fetch (`${API_URL}/events/${partyId}`, {
                method: 'DELETE'  
            });
        
            if (response.status === 204) {
                // Remove the deleted party from the DOM (if needed)
                const partyToDelete = document.querySelector(`.party-item[data-party-id="${partyId}"]`);
                if (partyToDelete) {
                partyToDelete.remove();
                }
                // Refresh the list of parties
                fetchAndDisplayParties();
            } else {
                console.error("Failed to delete party.");
            }
        } catch (error) {
            console.error("Error deleting party:", error);
        }
    }
    
    
    newPartyForm.addEventListener("submit", async (event) => { 
        event.preventDefault();
        
    });
  
    
    fetchAndDisplayParties(); 

});