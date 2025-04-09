document.getElementById('geneCarrouselA').addEventListener('click', function () {
    // Récupérer les SKU 
    const carrouA = document.getElementById('carrouA').value;

    // Séparer les SKU 
    const skuArrayA= carrouA.split(',').map(sku => sku.trim());

    const codeCarrouselA = `

    <div class="tile-slick--third" data-inject-sku="${skuArrayA[0]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[1]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[2]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[3]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[4]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[5]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[6]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[7]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[8]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[9]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[10]}" data-list-name="featured_AAA">&nbsp;</div>
    <div class="tile-slick--third" data-inject-sku="${skuArrayA[11]}" data-list-name="featured_AAA">&nbsp;</div>

`;
    document.getElementById('carrouselAEn').textContent = codeCarrouselA;

});

document.getElementById('geneCarrouselB').addEventListener('click', function () {
    // Récupérer les SKU 
    const carrouB = document.getElementById('carrouB').value;

    // Séparer les SKU 
    const skuArrayB = carrouB.split(',').map(sku => sku.trim());

    const codeCarrouselB = `
       <div data-inject-sku="${skuArrayB[0]}" data-list-name="featured_B_carrousel">&nbsp;</div>
        <div data-inject-sku="${skuArrayB[1]}" data-list-name="featured_B_carrousel">&nbsp;</div>
        <div data-inject-sku="${skuArrayB[2]}" data-list-name="featured_B_carrousel">&nbsp;</div>
        <div data-inject-sku="${skuArrayB[3]}" data-list-name="featured_B_carrousel">&nbsp;</div>
        <div data-inject-sku="${skuArrayB[4]}" data-list-name="featured_B_carrousel">&nbsp;</div>
        <div data-inject-sku="${skuArrayB[5]}" data-list-name="featured_B_carrousel">&nbsp;</div>
        <div data-inject-sku="${skuArrayB[6]}" data-list-name="featured_B_carrousel">&nbsp;</div>
        <div data-inject-sku="${skuArrayB[7]}" data-list-name="featured_B_carrousel">&nbsp;</div>
        <div data-inject-sku="${skuArrayB[8]}" data-list-name="featured_B_carrousel">&nbsp;</div>
        <div data-inject-sku="${skuArrayB[9]}" data-list-name="featured_B_carrousel">&nbsp;</div>
    `;

    document.getElementById('carrouselBEn').textContent = codeCarrouselB;

});

// Copier - coller
function copyToClipboard(elementId, message) {
    const textElement = document.getElementById(elementId);
    const text = textElement.innerText || textElement.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert(message);
        }).catch(() => {
            fallbackCopyText(text, message);
        });
    } else {
        fallbackCopyText(text, message);
    }
}

// Pour Edge
function fallbackCopyText(text, message) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert(message + " (fallback utilisé)");
}

// Confirmer le copier - coller carrousel A
document.getElementById('copyCarrouAEnBtn').addEventListener('click', () => copyToClipboard('carrouselA', 'Code en copié!'));
// Confirmer le copier - coller carrousel B
document.getElementById('copyCarrouBEnBtn').addEventListener('click', () => copyToClipboard('carrouselB', 'Code en copié!'));