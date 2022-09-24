document.getElementById('credits_modal_open').addEventListener('click', function () {
    document.getElementById('credits_modal').style.display = 'block';
});

document.getElementById('credits_modal_close').addEventListener('click', function () {
    document.getElementById('credits_modal').style.display = 'none';
});

document.getElementById('add_system_modal_open').addEventListener('click', function () {
    document.getElementById('add_system_modal').style.display = 'block';
});

document.getElementById('add_system_modal_close').addEventListener('click', function () {
    document.getElementById('add_system_modal').style.display = 'none';
});





document.getElementById('remove_system_modal_open').addEventListener('click', function () {
    document.getElementById('remove_system_modal').style.display = 'block';
    updateRemoveCheckboxes();
});

document.getElementById('remove_system_modal_close').addEventListener('click', function () {
    document.getElementById('remove_system_modal').style.display = 'none';
});

document.getElementById('remove_system_modal_confirm').addEventListener('click', function () {
    document.getElementById('remove_system_modal').style.display = 'none';
    removeCheckedElements();
});

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

function updateRemoveCheckboxes() {
    document.getElementById('all_elements').checked = false;

    let listaSistemi = JSON.parse(sessionStorage.getItem('sistemiConfrontati'));

    let checkboxCode = "";

    for (let i = 0; i < listaSistemi.sistemi.length; i++) {
        checkboxCode += '<input class="input-checkbox element-removal-selection" type="checkbox" id="element_' + i + '">\
        <label for="element_' + i + '">' + listaSistemi.sistemi[i].nome + '</label><br>'
    }

    document.getElementById('element_remove_checks').innerHTML = checkboxCode;
}

document.getElementById('all_elements').addEventListener('click', function () {
    document.querySelectorAll('.element-removal-selection').forEach(checkbox => {
        checkbox.checked = document.getElementById('all_elements').checked;
        checkbox.disabled = document.getElementById('all_elements').checked;
    });
});



if (sessionStorage.getItem('sistemiConfrontati') == null) {
    sessionStorage.setItem('sistemiConfrontati', JSON.stringify(
        {
            "sistemi": []
        }
    ));
}

const tipiSistema = ["caldaia_condensazione", "caldaia_tradizionale", "pompa_buona", "pompa_economica", "stufa_elettrica", "custom"]
const datiSistemi = {
    "caldaia_condensazione": ["Caldaia a condensazione", 1, 2000, "gas"],
    "caldaia_tradizionale": ["Caldaia tradizionale", 0.9, 1500, "gas"],
    "pompa_buona": ["Pompa di calore (buon livello)", 3.6, 3000, "elettrico"],
    "pompa_economica": ["Pompa di calore (economica)", 2.8, 1000, "elettrico"],
    "stufa_elettrica": ["Stufa elettrica", 1, 170, "elettrico"]
}

tipiSistema.forEach(sistema => {
    document.getElementById(sistema + '_system_selection').addEventListener('click', function () {
        switch (sistema) {
            case "custom":
                document.getElementById('custom_system_modal').style.display = 'block';
                break;
            default:
                addNewType(datiSistemi[sistema][0], datiSistemi[sistema][1], datiSistemi[sistema][2], datiSistemi[sistema][3]);
                break;
        }
    });
});

document.getElementById('custom_system_modal_close').addEventListener('click', function () { document.getElementById('custom_system_modal').style.display = 'none'; });

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
        addNewType(customName, customRendimento, customCost, customMateria);
        document.getElementById('custom_system_modal').style.display = 'none';
        document.getElementById('custom_system_name').value = "";
        document.getElementById('custom_system_rendimento').value = "";
        document.getElementById('custom_system_gas').checked = false;
        document.getElementById('custom_system_elettrico').checked = false;
    }
});

function printError(title, error) {
    document.getElementById('error_modal_title').innerHTML = title;
    document.getElementById('error_modal_text').innerHTML = error;
    document.getElementById('error_modal').style.display = 'block';
}
document.getElementById('error_modal_close').addEventListener('click', function () { document.getElementById('error_modal').style.display = 'none'; });

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

document.addEventListener('DOMContentLoaded', function () { reloadTypeList(); });

function reloadTypeList() {
    let listaSistemi = JSON.parse(sessionStorage.getItem('sistemiConfrontati'));
    let listaSistemiHTML = document.getElementById('sistemi_confrontati');
    listaSistemiHTML.innerHTML = "";
    let listaSistemiExtraHTML = document.getElementById('sistemi_confrontati_extra');
    listaSistemiExtraHTML.innerHTML = "";
    let contatore = 0;

    const single_column_string = document.getElementById('sce_template').innerHTML;
    let single_column_section = "";

    if (listaSistemi.sistemi.length % 2 == 0) {
        contatore = listaSistemi.sistemi.length;
    } else {
        contatore = listaSistemi.sistemi.length - 1;

        console.log(listaSistemi.sistemi.length - 1);
        console.log(listaSistemi.sistemi[listaSistemi.sistemi.length - 1]);

        single_column_section = single_column_string
            .replace("<!-- element 3 -->", listaSistemi.sistemi[listaSistemi.sistemi.length - 1].nome)
            .replace("<!-- element 3R -->", listaSistemi.sistemi[listaSistemi.sistemi.length - 1].rendimento)
            .replace("<!-- element 3C -->", listaSistemi.sistemi[listaSistemi.sistemi.length - 1].costo)
            .replace("<!-- element 3T -->", scegliMateria(listaSistemi.sistemi[listaSistemi.sistemi.length - 1].materia))

    }

    const multiple_columns_string = document.getElementById('sc_template').innerHTML;
    let multiple_columns_section = "";


    for (let i = 0; i < contatore; i += 2) {
        console.log(i);
        console.log(listaSistemi.sistemi[i]);
        console.log(i + 1)
        console.log(listaSistemi.sistemi[i + 1]);
        multiple_columns_section += multiple_columns_string
            .replace("<!-- element 1 -->", listaSistemi.sistemi[i].nome)
            .replace("<!-- element 1R -->", listaSistemi.sistemi[i].rendimento)
            .replace("<!-- element 1C -->", listaSistemi.sistemi[i].costo)
            .replace("<!-- element 1T -->", scegliMateria(listaSistemi.sistemi[i].materia))
            .replace("<!-- element 2 -->", listaSistemi.sistemi[i + 1].nome)
            .replace("<!-- element 2R -->", listaSistemi.sistemi[i + 1].rendimento)
            .replace("<!-- element 2C -->", listaSistemi.sistemi[i + 1].costo)
            .replace("<!-- element 2T -->", scegliMateria(listaSistemi.sistemi[i + 1].materia))
    }

    listaSistemiHTML.innerHTML = multiple_columns_section;
    listaSistemiExtraHTML.innerHTML += single_column_section;
}

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