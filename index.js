const getColorBtn = document.querySelector('#get-color-btn')
let selectedColor = document.querySelector('#color-input')
let selectedMode = document.querySelector('select')
let colorsContainer = document.querySelector('.colors-container')

render()

document.addEventListener('paste', event => {
    event.preventDefault()
})

getColorBtn.addEventListener('click', function(event) {
    event.preventDefault()
    colorsContainer.innerHTML = ''
    render()
    document.querySelector('h4').style.color = `${selectedColor.value}`
})

function render() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor.value.replace('#','')}&mode=${selectedMode.value}`)
        .then(response => response.json())
        .then(data => {
            data.colors.forEach((color,index) => {
                colorsContainer.innerHTML += `
                <div class="color-slot">
                    <div id="color" style="background: ${color.hex.value}">
                    </div>
                    <button onclick="copy('hex-value-${index}')" id="copy-btn">
                    <p id="hex-value-${index}">${color.hex.value}</p>
                    </button>
                </div>
                `
            })
        })
}

function copy(elementId) {
    let copiedText = document.querySelector('#' + elementId)
    navigator.clipboard.writeText(copiedText.textContent) 
}



