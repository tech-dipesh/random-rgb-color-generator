
// Utility functions to generate random colors and calculate opposites
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

function rgbToHex({ r, g, b }) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function rgbToHsl({ r, g, b }) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function getOppositeColor({ r, g, b }) {
    return { r: 255 - r, g: 255 - g, b: 255 - b };
}

// Generate color description
function getColorName({ r, g, b }) {
    if (r > g && r > b) return "Redish";
    if (g > r && g > b) return "Greenish";
    if (b > r && b > g) return "Bluish";
    return "Grayish/Neutral";
}

// DOM manipulation functions
function updateColorDisplay(color) {
    const generatedBox = document.getElementById('generated-color');
    const generatedInfo = document.getElementById('generated-color-info');
    const description = document.getElementById('color-description');

    const hex = rgbToHex(color);
    const hsl = rgbToHsl(color);
    const oppositeColor = getOppositeColor(color);
    const oppositeHex = rgbToHex(oppositeColor);

    // Update styles
    document.body.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    document.body.style.color = `rgb(${oppositeColor.r}, ${oppositeColor.g}, ${oppositeColor.b})`;
    generatedBox.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    generatedBox.style.color = `rgb(${oppositeColor.r}, ${oppositeColor.g}, ${oppositeColor.b})`;

    // Update text
    generatedInfo.innerHTML = `RGB: ${color.r}, ${color.g}, ${color.b} | HEX: ${hex} | HSL: ${hsl}`;
    description.innerHTML = `This color is: ${getColorName(color)}`;

    // Attach events to copy buttons
    document.getElementById('copy-rgb').onclick = () => copyToClipboard(`rgb(${color.r}, ${color.g}, ${color.b})`);
    document.getElementById('copy-hex').onclick = () => copyToClipboard(hex);
    document.getElementById('copy-hsl').onclick = () => copyToClipboard(hsl);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
}

// Event listeners
document.getElementById('generate-btn').addEventListener('click', () => {
    const color = getRandomColor();
    updateColorDisplay(color);
});

// Initial color generation
(() => {
    const color = getRandomColor();
    updateColorDisplay(color);
})();
