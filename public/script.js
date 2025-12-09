// public/script.js (Korrigierte Version)

document.getElementById('appointmentForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const titel = document.getElementById('titel').value;
    const start_zeitpunkt = document.getElementById('start_zeitpunkt').value;
    const ende_zeitpunkt = document.getElementById('ende_zeitpunkt').value;

    const messageArea = document.getElementById('message-area');
    messageArea.innerHTML = '';

    const data = {
        titel: titel,
        start_zeitpunkt: start_zeitpunkt,
        ende_zeitpunkt: ende_zeitpunkt
    };

    try {
        const response = await fetch('/api/termine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json(); // <-- result ist hier ein Array, z.B. [{ id: 1, ... }]

        if (response.ok) {
            // HIER IST DIE KORREKTUR: Wir greifen auf das erste Element [0] im Array zu
            // const firstResult = result[0]; 
            // messageArea.innerHTML = 'Termin erfolgreich gespeichert! ID: ' + firstResult.id;

            // Oder kompakter:
           //messageArea.innerHTML = 'Termin erfolgreich gespeichert! ID: ' + result[0].id;
            messageArea.innerHTML = 'Termin erfolgreich gespeichert! ID: ' + result.id;
            document.getElementById('appointmentForm').reset(); 
        } else {
            throw new Error(result.error || 'Unbekannter Fehler beim Speichern.');
        }
    } catch (error) {
        messageArea.className = 'error';
        messageArea.innerHTML = 'Fehler: ' + error.message;
    }
});
