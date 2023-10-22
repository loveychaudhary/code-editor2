const codeEditor = document.querySelector('.code-editor > div');
const output = document.querySelector('.output');
const runButton = document.getElementById('runButton');
const lockButton = document.getElementById('lockButton');
const clearButton = document.getElementById('clearButton');
let isLocked = false;

runButton.addEventListener('click', () => {
    if (!isLocked) {
        const code = codeEditor.innerText;
        output.innerText = evaluateCode(code);
    }
});

lockButton.addEventListener('click', () => {
    isLocked = !isLocked;
    lockButton.innerText = isLocked ? 'Unlock' : 'Lock';
});

clearButton.addEventListener('click', () => {
    codeEditor.innerText = '';
    output.innerText = '';
});

codeEditor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !isLocked) {
        e.preventDefault();
        const start = codeEditor.selectionStart;
        const end = codeEditor.selectionEnd;
        codeEditor.value = codeEditor.value.substring(0, start) + '\t' + codeEditor.value.substring(end);
        codeEditor.selectionStart = codeEditor.selectionEnd = start + 1;
    }
});

function evaluateCode(code) {
    try {
        const result = eval(code);
        return result !== undefined ? result : 'undefined';
    } catch (error) {
        return error.message;
    }
}
