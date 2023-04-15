//MOUVEMENT POSSIBLE
function pN(child){
    return child.parentNode.id                                      //Obtenir le parent de l'élément selectionner
}

function childOf(parent){                                           //Obtenir l'élément enfant
    return document.getElementById(parent).children[0]
}

function test(parent){
    return document.get
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
        let indic = document.getElementById(relation[r][i])         //Obtenir les positions possibles r:clé i:chaque élément possible
        if (!indic.children[0]){
            indic.style.backgroundColor = 'rgb(180, 114, 61)'
            indic.style.transition = 'all 0.5s'
        }
    }
}

//REINITIALISATION DE COULEUR
export function reset(a){
    for (let k=0; k<a.length; k++){
        let reset = document.getElementById(parseInt(k+1))          //Remttre les couleurs des positions possibles séléctionnées précedemment
        reset.style.backgroundColor = 'rgb(217, 151, 97)'
    }
}

//VERIFICATION DES ALIGNEMENTS
function childExist(elem){                                          //Vérifie si un élément (.circle) possède un enfant (.token)
    return document.getElementById(elem).children[0]
}

function testAlign(tab, color){                                     //Vérification pour les éléments (.token) alignés
    for (let i=0; i<tab.length; i++){
        let secondToken = null
        let thirdToken = null
        let view = true                                             //Pour stopper le premier boucle
        for (let j=0, cptj=0; j<tab[i].length; j++, cptj++){
            if (childExist(tab[i][j]) && cptj == 0){
                let sd = childOf(tab[i][j])                         //Récupérer deuxième élément pour l'alignement
                secondToken = getComputedStyle(sd).backgroundColor
            }
            
            if (childExist(tab[i][j]) && cptj == 1){
                let td = childOf(tab[i][j])                         //Récupérer troisième élément pour l'alignement
                thirdToken = getComputedStyle(td).backgroundColor
            }

            //Confirmer la couleur des trois jetons alignés
            if (color == secondToken && color == thirdToken && secondToken == thirdToken){      
                console.log('GAGNEEEEEE')
                view = false
            }
        }
        if (!view) break
    }
}

export function alignToken(elem){
    const firstToken = getComputedStyle(elem).backgroundColor         //Variable pour le style.backgroundColor du token ('green' | 'red')
    const parent = pN(elem)                                           //Variable pour l'élément parent de la déposition

    const align = {
        //Ordre : Ligne/Colonne/Diagonal
        1 : [['2','3'], ['4','7'], ['5','9']],
        2 : [['1','3'], ['5','8']],
        3 : [['1','2'], ['6','9'], ['5','7']],
        4 : [['5','6'], ['1','7']],
        5 : [['4','6'], ['2','8'], ['1','9'], ['3','7']],
        6 : [['4','5'], ['3','9']],
        7 : [['8','9'], ['1','4'], ['3','5']],
        8 : [['7','9'], ['2','5']],
        9 : [['7','8'], ['3','6'], ['1','5']]
    }

    testAlign(align[parent], firstToken)
}