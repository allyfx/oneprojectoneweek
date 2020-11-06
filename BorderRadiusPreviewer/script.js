let previewer = document.getElementById('preview');
let cssPreviewer = document.getElementById('css-preview');
const borderSides = document.getElementById('select-quantity-sides');
let sidesContainer = document.getElementsByClassName('sides-container')[0];

borderSides.addEventListener('change', (event) => {
    sidesContainer.innerHTML = '';
    let texts = [];

    switch(event.target.value) {
        case '1':
            texts.push('Value');
            break
        
        case '2':
            texts.push('Top-Left & Bottom-Right', 'Top-Right & Bottom-Left');
            break;
        
        case '3':
            texts.push('Top-Left', 'Top-Right & Bottom-Left', 'Bottom-Right');
            break;
        
        case '4':
            texts.push('Top-Left', 'Top-Right', 'Bottom-Right', 'Bottom-Left');
            break;
        
        default:
            texts.push('Value');
            break;
    }

    texts.forEach(text => {
        sidesContainer.innerHTML += `
            <div class="value-input-container">
                <label for="value">${text}</label>
                <input oninput="displayPreview(event)" id="value" type="number" class="value-input">
            </div>
        `;
    });
});

function displayPreview() {
    const inputs = document.querySelectorAll('.value-input');
    const sides = [];
    let finalPreview = `border-radius:`;
    let finalPreviewDiv = '';

    inputs.forEach(input => {
        if (input.value !== '') {
            sides.push(` ${input.value}px`);
        }
    });

    sides.forEach(side => {
        finalPreview += side;
        finalPreviewDiv += `${side}`;
    });

    cssPreviewer.innerText = `${finalPreview};`;
    previewer.style.borderRadius = `${finalPreviewDiv}`;
};

function copyToClipboard() {
    let range = document.createRange();

    range.selectNode(cssPreviewer);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    alert('Copy to Clipboard');
}