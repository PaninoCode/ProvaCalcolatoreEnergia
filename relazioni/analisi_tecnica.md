# Analisi Tecnica

Il Software è formato dalla pagina HTML e dallo script JavaScript, che si occupa di calcolare i risultati e di mostrare i dati.

Le funzioni più importanti sono:
## Aggiunta di un nuovo tipo di sistema
```javascript
    function addNewType(nome, rendimento, costo, materia) {
    let listaSistemi = JSON.parse(sessionStorage.getItem('sistemiConfrontati'));
    console.log(listaSistemi);
    let newSystem = {
        "nome": nome,
        "rendimento": rendimento,
        "costo": costo,
        "materia": materia
    }
    listaSistemi.sistemi.push(newSystem);
    sessionStorage.setItem('sistemiConfrontati', JSON.stringify(listaSistemi));
    printError("Sistema aggiunto", 'Potrai trovare "' + nome + '" nella lista dei sistemi confrontati');
    reloadTypeList();
    }
```

Questa funzione permette di aggiungere un nuovo tipo di sistema, che viene salvato nel database del browser. Prende in input i dati, li inserisce in un oggetto che successivamente viene trasformato in `string` e salvato nel database.

sessionStorage è un database del browser che permette di salvare dati temporaneamente (fino alla chiusura del browser).

## Rimozione di un tipo di sistema
```javascript
function removeCheckedElements() {
    let listaSistemi = JSON.parse(sessionStorage.getItem('sistemiConfrontati'));
    let nuovaListaSistemi = { "sistemi": [] };
    for (let i = 0; i < listaSistemi.sistemi.length; i++) {
        if (!document.getElementById('element_' + i).checked) {
            let newSystem = {
                "nome": listaSistemi.sistemi[i].nome,
                "rendimento": listaSistemi.sistemi[i].rendimento,
                "costo": listaSistemi.sistemi[i].costo,
                "materia": listaSistemi.sistemi[i].materia
            }
            nuovaListaSistemi.sistemi.push(newSystem);
        }
    }

    sessionStorage.setItem('sistemiConfrontati', JSON.stringify(nuovaListaSistemi));
    reloadTypeList();
}
```

Questa funzione permette di rimuovere un tipo di sistema. Non prende nulla in input, infatti l'unico modo per chiamare questa funzione è tramite il modal "Rimozione elementi", la funzione quindi legge lo stato delle `checkbox` e rimuove gli elementi selezionati.