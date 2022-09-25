if (getStorage('sistemiConfrontati') == null) {
    setStorage('sistemiConfrontati', {
        "sistemi": []
    });
}

function getStorage(id){
    try {
        return JSON.parse(sessionStorage.getItem(id));
    } catch {
        return false;
    }
    
}

function setStorage(id, data){
    try {
        sessionStorage.setItem(id, JSON.stringify(data));
    } catch {
        return false;
    }
    return true;
}

function stringInsert(originalString, find, replace){
    let string = originalString;
    for(let i = 0; i < find.length; i++){
        string = string.replaceAll(find[i], replace[i]);
    }
    return string;
}