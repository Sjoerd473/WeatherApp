

function DOMMaker(){
    const makeDiv = (group = undefined) =>{
        let el = document.createElement('div');
       
        el.classList.add(group);
        return el
    }

    const makePara  = (string) =>{
        let el = document.createElement('p');
        el.textContent = string;
        // el.classList.add(group);
        return el
}

    const makeHeader = (string) =>{
        let el = document.createElement('h1');
        el.textContent = string;
        // el.classList.add(group);
        return el
}  
    const makeButton  = (string, group) =>{
        let el = document.createElement('button');
        el.textContent = string;
        el.classList.add(group);
        return el
}

    const makeImage = () =>{
        let el = document.createElement('img')
        // el.src = source;
        return el

    }

const makeListItem = (string, group) =>{
    let el = document.createElement('li');
    el.textContent = string;
    el.classList.add(group);
    return el
}

return {makeDiv, makePara, makeHeader, makeButton, makeListItem, makeImage}

}

 

export const DOMgen = DOMMaker();
