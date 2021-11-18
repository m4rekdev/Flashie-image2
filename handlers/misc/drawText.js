module.exports = {
    async write(canvas, info, style = {}) {
        const { text, x, y } = info;
        const { fontSize = 20, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'top' } = style;

        canvas.beginPath();
        canvas.font = fontSize + 'px ' + fontFamily;
        canvas.textAlign = textAlign;
        canvas.textBaseline = textBaseline;
        canvas.fillStyle = color;
        canvas.fillText(text, x, y);
        canvas.stroke();
    }
}