const _getDOMElem = id => {
    return document.getElementById(id);
}

export const mapListToDOMElements = listOfId => {
    const _viewElems = {}

    for (const id of listOfId) {
        _viewElems[id] = _getDOMElem(id);
    }

    return _viewElems;
}
//function that add to _viewElems every id from html and make object with the same name

