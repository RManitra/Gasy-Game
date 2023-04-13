//IMPORTATION
import {possibleMove, reset} from './contents.js'

//CREATION PLATEAU
const main = document.querySelector('.main')

for (let i=0; i<9; i++){
    const div = document.createElement('div')
    main.append(div)
    div.setAttribute('class', 'circle')
    // div.classList.add(i+1)
    div.setAttribute('id', i+1)
}
const circles = document.querySelectorAll('.circle')

for (let i=0; i<8; i++){
    const div = document.createElement('div')
    main.append(div)
    div.setAttribute('class', 'stick'+(i+1))
    div.style.position = 'absolute'
}

//CREATION DES TOKENS
function createTokens(){
    const tokens = []
    let put = 0

    return new Promise((resolve, reject) => {
        circles.forEach(c => {
            c.addEventListener('click', () => {
                if (!c.children[0] && put<6){
                    const div = document.createElement('div')
                    c.append(div)
                    div.setAttribute('class', 'token')
                    put++
                    if (put % 2 != 0)
                        div.style.backgroundColor = 'red'
                    else
                        div.style.backgroundColor = 'green'
                    tokens.push(document.querySelector('.token'))
                }
    
                if (tokens.length == 6){
                    resolve()
                }
            })
        })
    })
}

//MOUVEMENT DES TOKENS
async function moveTokens(){
    await createTokens()
    let selectedToken = null
    const tokens = document.querySelectorAll('.token')

    for (let i=0; i<tokens.length; i++){
        const t = tokens[i]

        t.addEventListener('click', () => {
            if (selectedToken == null){
                selectedToken = t
                setTimeout(() => {
                    t.style.width = '85px'
                    t.style.height = '85px'
                }, 0)
                possibleMove(t)
            }

            else if (selectedToken == t && t.style.width == '85px'){
                selectedToken = null
                t.style.width = '75px'
                t.style.height = '75px'
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
                        selectedToken = null
                    }, 0)
                }
            })
        }
    }
}

//APPEL FONCTION
moveTokens()