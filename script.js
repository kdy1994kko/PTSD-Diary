// Load saved entries from localStorage when the page loads
window.onload = function() {
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    savedEntries.forEach((entry) => {
        displaySavedEntry(entry);
    });
}

function saveEntry() {
    const activatingEvent = document.getElementById('activating-event').value;
    const beliefsThoughts = document.getElementById('beliefs-thoughts').value;
    const emotionalConsequences = document.getElementById('emotional-consequences').value;
    const Question1 = document.getElementById('Q1').value;
    const Question2 = document.getElementById('Q2').value;

    const newEntry = {
        activatingEvent,
        beliefsThoughts,
        emotionalConsequences,
        Question1,
        Question2
    };

    displaySavedEntry(newEntry);

    // Save entry to localStorage
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    savedEntries.push(newEntry);
    localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));

    // Clear text areas after saving entry
    document.getElementById('activating-event').value = '';
    document.getElementById('beliefs-thoughts').value = '';
    document.getElementById('emotional-consequences').value = '';
    document.getElementById('Q1').value = '';
    document.getElementById('Q2').value = '';
}

function displaySavedEntry(entry) {
    const newEntry = document.createElement('div');
    newEntry.classList.add('diary-entry');
    newEntry.innerHTML = `
        <strong>Activating Event (A):</strong><br>${entry.activatingEvent}<br>
        <strong>Beliefs/Thoughts (B):</strong><br>${entry.beliefsThoughts}<br>
        <strong>Consequences (C):</strong><br>${entry.emotionalConsequences}<br>
        <strong>Question 1:</strong><br>${entry.Question1}<br>
        <strong>Question 2:</strong><br>${entry.Question2}<br>
        <button onclick="deleteEntry(this)">Delete Entry</button><hr>
    `;

    document.getElementById('diary-entries').prepend(newEntry);
}

function deleteEntry(entry) {
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries'));
    const entryIndex = Array.from(entry.parentNode.parentNode.children).indexOf(entry.parentNode);
    savedEntries.splice(entryIndex, 1);

    localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));

    entry.parentNode.remove();
}