async function fetchData() {
    const utentiResponse = await fetch('utenti.json');
    const cvResponse = await fetch('cv.json');
    const utenti = await utentiResponse.json();
    const cv = await cvResponse.json();

    const tabellaUtente = document.getElementById('tabella-utente');

    utenti.forEach(utente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${utente.nome}</td>
            <td>${utente.cognome}</td>
            <td>${utente.data_di_nascita}</td>
            <td>${utente.indirizzo}</td>
            <td>${utente.città}</td>
            <td><img src="${utente.thund}" onclick="apriCV('${utente.nome}', '${utente.cognome}')" /></td>
        `;
        tabellaUtente.appendChild(row);
    });
}

function apriCV(nome, cognome) {
    const cvData = getCVData(nome, cognome);
    if (cvData) {
        const cvWindow = window.open("", "_blank");
        cvWindow.document.write(`
            <html>
            <head>
                <title>CV di ${nome} ${cognome}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                </style>
            </head>
            <body>
                <h1>CV di ${cvData.nome} ${cvData.cognome}</h1>
                <p><strong>Esperienze:</strong> ${cvData.esperienze}</p>
                <p><strong>Istruzione:</strong> ${cvData.istruzione}</p>
                <p><strong>Contatto:</strong> ${cvData.contatto}</p>
            </body>
            </html>
        `);
        cvWindow.document.close();
    }
}

function getCVData(nome, cognome) {
    const cvList = [
        { 
            nome: "Mario", 
            cognome: "Rossi", 
            esperienze: "5 anni in XYZ Srl come sviluppatore.", 
            istruzione: "Laurea in Informatica.", 
            contatto: "mario.rossi@email.com" 
        },
        { 
            nome: "Luca", 
            cognome: "Bianchi", 
            esperienze: "3 anni in ABC Spa come designer.", 
            istruzione: "Laurea in Design.", 
            contatto: "luca.bianchi@email.com"
         },
        { nome: "Sara", 
        cognome: "Verdi", 
        esperienze: "4 anni in DEF Co. come project manager.", 
        istruzione: "Laurea in Economia.", 
        contatto: "sara.verdi@email.com" 
    }
     
    ];
    return cvList.find(cv => cv.nome === nome && cv.cognome === cognome);
}

fetchData();
