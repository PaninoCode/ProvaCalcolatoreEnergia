function addElement(nome, rendimento, costo, materia) {
    let listaSistemi = getStorage('sistemiConfrontati');
    console.log("addElement " + listaSistemi);
    let newSystem = {
        "id": crypto.randomUUID(),
        "nome": nome,
        "rendimento": rendimento,
        "costo": costo,
        "materia": materia
    }
    listaSistemi.sistemi.push(newSystem);
    setStorage('sistemiConfrontati', listaSistemi);
    printError("Sistema aggiunto", 'Potrai trovare "' + nome + '" nella lista dei sistemi confrontati');
    reloadTypeList();
}

function removeElements(ids) {
    let listaSistemi = getStorage('sistemiConfrontati');
    let nuovaListaSistemi = { "sistemi": [] };
    for (let i = 0; i < listaSistemi.sistemi.length; i++) {
        if (!ids.includes(listaSistemi.sistemi[i].id)) {
            let newSystem = {
                "id": listaSistemi.sistemi[i].id,
                "nome": listaSistemi.sistemi[i].nome,
                "rendimento": listaSistemi.sistemi[i].rendimento,
                "costo": listaSistemi.sistemi[i].costo,
                "materia": listaSistemi.sistemi[i].materia
            }
            nuovaListaSistemi.sistemi.push(newSystem);
        }
    }
    setStorage('sistemiConfrontati', nuovaListaSistemi);
    if(ids.length == 1){
        printError("Sistema rimosso", 'Il sistema &ograve; stato rimosso dalla lista.');
    }else{
        printError("Sistemi rimossi", 'I sistemi sono stati rimossi dalla lista.');
    }
    reloadTypeList();
}
