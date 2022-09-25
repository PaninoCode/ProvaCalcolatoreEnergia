ReloadElementList();
InitModalLogic('credits');
InitModalLogic('add_system');
InitModalLogic('remove_system');
InitModalLogic('custom_system');

for(let sistema in defaultSystems){
    document.getElementById(sistema + '_system_selection').addEventListener('click', function () {
        addElement(defaultSystems[sistema].nome, defaultSystems[sistema].rendimento, defaultSystems[sistema].costo, defaultSystems[sistema].materia);
    });
}

document.getElementById('remove_system_modal_confirm').addEventListener('click', function () {
    let removeArray = [];
    closeModal('remove_system');
    document.querySelectorAll('.element-removal-selection').forEach(checkbox => {
        if (checkbox.checked) removeArray.push(checkbox.id.replace('remove_element_', ''));
    });
    removeElements(removeArray);
});

document.getElementById('remove_system_modal_open').addEventListener('click', function () {
    document.getElementById('all_elements').checked = false;
    let listaSistemi = getStorage('sistemiConfrontati');
    const checkboxCode = '<input class="input-checkbox element-removal-selection" type="checkbox" id="remove_element_id"><label for="remove_element_id">remove_element_name</label><br>';
    let checkboxes = "";
    for (let i = 0; i < listaSistemi.sistemi.length; i++) {
        checkboxes += stringInsert(checkboxCode, ['remove_element_id', 'remove_element_name'], [listaSistemi.sistemi[i].id, listaSistemi.sistemi[i].nome]);
    }

    document.getElementById('element_remove_checks').innerHTML = checkboxes;
});

document.getElementById('all_elements').addEventListener('click', function () {
    document.querySelectorAll('.element-removal-selection').forEach(checkbox => {
        checkbox.checked = document.getElementById('all_elements').checked;
        checkbox.disabled = document.getElementById('all_elements').checked;
    });
});

document.getElementById('add_custom_system_confirm').addEventListener('click', function () {
    if (document.getElementById('custom_system_name').value == "" && document.getElementById('custom_system_rendimento').value == "") {
        document.getElementById('custom_system_modal').style.display = 'none';
        printError("Errore di inserimento", "Nome o rendimento mancanti!");
    } else {
        let customName = document.getElementById('custom_system_name').value;
        let customRendimento = document.getElementById('custom_system_rendimento').value;
        let customCost = document.getElementById('custom_system_costo').value;
        let customMateria = "";
        const materiaGas = document.getElementById('custom_system_gas');
        const materiaElettrico = document.getElementById('custom_system_elettrico');
        if (materiaGas.checked && materiaElettrico.checked) {
            customMateria = "gas_elettrico";
        } else if (materiaGas.checked) {
            customMateria = "gas";
        } else if (materiaElettrico.checked) {
            customMateria = "elettrico";
        }
        addElement(customName, customRendimento, customCost, customMateria);
        const customSystemInputs = document.querySelectorAll('.custom_system_input');
        customSystemInputs.forEach(input => {
            input.value = "";
        });
        const customSystemChecks = document.querySelectorAll('.custom_system_check');
        customSystemInputs.forEach(check => {
            check.checked = false;
        });
        document.getElementById('custom_system_gas').checked = false;
        document.getElementById('custom_system_elettrico').checked = false;
        closeModal('custom_system')
    }
});


/// OK CODE

function printError(title, error) {
    document.getElementById('error_modal_title').innerHTML = title;
    document.getElementById('error_modal_text').innerHTML = error;
    document.getElementById('error_modal').style.display = 'block';
}
document.getElementById('error_modal_close').addEventListener('click', function () { document.getElementById('error_modal').style.display = 'none'; });

/// OLD CODE








function scegliMateria(materia) {
    if (materia == "gas_elettrico") {
        return "a gas e elettrico";
    } else if (materia == "gas") {
        return "a gas";
    } else if (materia == "elettrico") {
        return "elettrico";
    }
}

document.getElementById('compare_start').addEventListener('click', function () {
    const consumo_ee = document.getElementById('consumo_ee').value;
    const consumo_gas = document.getElementById('consumo_gas').value;
    if (JSON.parse(sessionStorage.getItem('sistemiConfrontati')).sistemi.length > 1 && consumo_ee > 0 && consumo_gas > 0) {
        calcolaConfronto();
    } else {
        printError("Errore di confronto", "Assicurati di aver compilato i valori dei prezzi e dei consumi correttamente e di aver selezionato almeno 2 sistemi per poterli confrontare");
    }
});

function calcolaConfronto() {
    let listaSistemi = JSON.parse(sessionStorage.getItem('sistemiConfrontati'));
    let consumo_ee = document.getElementById('consumo_ee').value;
    let consumo_gas = document.getElementById('consumo_gas').value;

    let costiSistemi = [];

    for (let i = 0; i < listaSistemi.sistemi.length; i++) {
        switch (listaSistemi.sistemi[i].materia) {
            case "gas_elettrico":
                costiSistemi[i] = listaSistemi.sistemi[i].costo + (consumo_ee / listaSistemi.sistemi[i].rendimento) + (consumo_gas / listaSistemi.sistemi[i].rendimento);
                break;
            case "gas":
                costiSistemi[i] = listaSistemi.sistemi[i].costo + (consumo_gas / listaSistemi.sistemi[i].rendimento);
                break;
            case "elettrico":
                costiSistemi[i] = listaSistemi.sistemi[i].costo + (consumo_ee / listaSistemi.sistemi[i].rendimento);
                break;
        }
    }

    let min = ["", 9007199254740991];
    for (let i = 0; i < costiSistemi.length; i++) {
        if (costiSistemi[i] < min[1]) {
            min[1] = costiSistemi[i];
            min[0] = i;
        }
    }
    document.getElementById('risultato_confronto').scrollIntoView({ behavior: "smooth" });
    document.getElementById('risultato_confronto').innerHTML = "Il costo minore &egrave; quello di: " + listaSistemi.sistemi[min[0]].nome + " con un costo di " + Math.round(min[1]) + "&euro;";
}