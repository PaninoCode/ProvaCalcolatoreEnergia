function ReloadElementList() {
    let listaSistemi = getStorage('sistemiConfrontati');
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