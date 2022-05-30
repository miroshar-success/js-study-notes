"use strict";
function createLabel1(id) {
    return {
        id
    };
}
function createLabel2(name) {
    return {
        name
    };
}
function createLabel3(nameOrId) {
    if (typeof nameOrId === 'string') {
        return {
            name: nameOrId
        };
    }
    else {
        return {
            id: nameOrId
        };
    }
}
createLabel1(1);
createLabel2('hello');
