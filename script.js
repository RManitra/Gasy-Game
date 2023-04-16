//IMPORTATION
import {possibleMove, reset, alignToken} from './contents.js'

//CREATION PLATEAU
const main = document.querySelector('.main')

for (let i=0; i<9; i++){
    const div = document.createElement('div')
    main.append(div)
    div.setAttribute('class', 'circle')
    div.setAttribute('id', i+1)
}
const circles = document.querySelectorAll('.circle')

for (let i=0; i<8; i++){
    const div = document.createElement('div')
    main.append(div)
    div.setAttribute('class', 'stick'+(i+1))
    div.style.position = 'absolute'
}

//CREATION DES TOKENS (PIONS)
function createTokens(){
    const tokens = []
    let put = 0
    let turn = true

    return new Promise((resolve, reject) => {
        circles.forEach(c => {
            c.addEventListener('click', () => {
                if (!c.children[0] && put<6){
                    const div = document.createElement('div')
                    c.append(div)
                    div.setAttribute('class', 'token')
                    put++
                    if (turn){
                        div.style.backgroundColor = 'red'
                        turn = false
                    }
                    else {
                        div.style.backgroundColor = 'green'
                        turn = true
                    }

                    alignToken(div)
                    tokens.push(document.querySelector('.token'))
                }
    
                if (tokens.length == 6){
                    resolve(turn)
                }
            })
        })
    })
}

//MOUVEMENT DES TOKENS
async function moveTokens(){
    let turn = null
    await createTokens()
        .then((val) => turn = val)
    console.log(turn)
    let selectedToken = null
    const tokens = document.querySelectorAll('.token')

    for (let i=0; i<tokens.length; i++){
        const t = tokens[i]

        t.addEventListener('click', () => {
            if (selectedToken == null){
                if (turn && t.style.backgroundColor == 'red'){
                    selectedToken = t
                    setTimeout(() => {
                        selectedToken.style.width = '85px'
                        selectedToken.style.height = '85px'
                        possibleMove(selectedToken)
                    }, 0)
                }
                else if (!turn && t.style.backgroundColor == 'green'){
                    selectedToken = t
                    setTimeout(() => {
                        selectedToken.style.width = '85px'
                        selectedToken.style.height = '85px'
                        possibleMove(selectedToken)
                    }, 0)
                }   
            }

            else if (selectedToken == t && t.style.width == '85px'){
                selectedToken.style.width = '75px'
                selectedToken.style.height = '75px'
                selectedToken = null
                reset(circles)
            }
        })

        for (let j=0; j<circles.length; j++){
            const c = circles[j]

            c.addEventListener('click', () => {

                if ((selectedToken == t) && (c.childElementCount == 0) && (c.style.backgroundColor == 'rgb(180, 114, 61)')){
                    c.append(selectedToken)
                    setTimeout(() => {  
                        selectedToken.style.width = '75px'
                        selectedToken.style.height = '75px'
                        reset(circles)
                        alignToken(selectedToken)
                        selectedToken = null
                        turn = (turn) ? false : true 
                    }, 0)
                }
            })
        }
    }
}

//APPEL FONCTION
moveTokens()