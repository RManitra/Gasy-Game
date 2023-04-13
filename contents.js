//MOUVEMENT POSSIBLE
function pN(child){
    return child.parentNode.id
}

export function possibleMove(elem){
    let r = parseInt(pN(elem))

    const relation = {
        1 : ['2','4','5'],
        2 : ['1','5','3'],
        3 : ['2','5','6'],
        4 : ['1','5','7'],
        5 : ['1','2','3','4','6','7','8','9'],
        6 : ['3','5','9'],
        7 : ['4','5','8'],
        8 : ['7','5','9'],
        9 : ['5','6','8']
    }
    
    for (let i=0; i<relation[r].length; i++){
        let indic = document.getElementById(relation[r][i])
        if (!indic.children[0]){
            indic.style.backgroundColor = 'rgb(180, 114, 61)'
            indic.style.transition = 'all 0.5s'
        }
    }
}

export function reset(a){
    for (let k=0; k<a.length; k++){
        let reset = document.getElementById(parseInt(k+1))
        reset.style.backgroundColor = 'rgb(217, 151, 97)'
    }
}