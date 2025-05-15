// Fonction pour afficher les images importées
function afficherImages() {
  const input = document.getElementById('imageInput');
  const container = document.getElementById('importedImages');
  const status = document.getElementById('importStatus');
  
  // Vider le conteneur
  container.innerHTML = '';
  
  if (input.files.length > 0) {
    status.textContent = `${input.files.length} image(s) importée(s)`;
    
    // Parcourir les fichiers sélectionnés
    Array.from(input.files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.draggable = true;
          img.ondragstart = drag;
          
          const imgContainer = document.createElement('div');
          imgContainer.className = 'imported-image';
          imgContainer.appendChild(img);
          
          container.appendChild(imgContainer);
        };
        reader.readAsDataURL(file);
      }
    });
  } else {
    status.textContent = 'Aucune image importée';
  }
}

// Fonctions pour le glisser-déposer
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text/plain', ev.target.src);
}

function drop(ev, target) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData('text/plain');
  if (data) {
    const img = document.createElement('img');
    img.src = data;
    img.style.maxWidth = '100%';
    target.innerHTML = '';
    target.appendChild(img);
  }
}

// Fonction pour exporter les images
function exporterImages() {
  // Récupérer le numéro Jira et le suffixe
  const numeroJira = document.getElementById('numeroJira').value.trim();
  const suffixe = document.getElementById('suffixe').value;
  
  if (!numeroJira) {
    alert('Veuillez entrer un numéro Jira');
    return;
  }

  // Récupérer tous les sous-éléments avec des images
  const subItems = document.querySelectorAll('.sub-item');
  if (subItems.length === 0) {
    alert('Aucune image à exporter');
    return;
  }

  // Créer un tableau des éléments à exporter
  const itemsToExport = Array.from(subItems).map(item => {
    const input = item.querySelector('input');
    if (!input || !input.value) return null;
    
    const imageDrop = item.querySelector('.image-drop');
    if (!imageDrop) return null;
    
    const img = imageDrop.querySelector('img');
    if (!img || !img.src) return null;
    
    return {
      input: input.value.trim(),
      src: img.src
    };
  }).filter(item => item !== null);

  if (itemsToExport.length === 0) {
    alert('Aucune image à exporter');
    return;
  }

  // Fonction récursive pour exporter les images une par une
  function exportNextImage(index) {
    if (index >= itemsToExport.length) {
      alert(`Exportation de ${itemsToExport.length} image(s) terminée !`);
      return;
    }

    const { input, src } = itemsToExport[index];
    
    // Créer un nom de fichier au format: jira-titre-suffixe.png
    const titre = input;
    const fileName = `${numeroJira}-${titre.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}-${suffixe}.png`;
    
    // Créer un lien de téléchargement
    const link = document.createElement('a');
    link.download = fileName;
    link.href = src;
    
    // Ajouter le lien au document pour le rendre fonctionnel
    document.body.appendChild(link);
    
    // Déclencher le téléchargement
    link.click();
    
    // Ajouter un délai plus long pour le nettoyage
    setTimeout(() => {
      document.body.removeChild(link);
      // Attendre un peu avant d'exporter la prochaine image
      setTimeout(() => exportNextImage(index + 1), 1500);
    }, 1000);
  }

  // Commencer l'exportation
  exportNextImage(0);
}

// Fonction pour basculer l'affichage des groupes
function toggleGroup(header) {
  const group = header.parentElement;
  const items = group.querySelector('.sub-items');
  if (items) {
    items.style.display = items.style.display === 'none' ? 'block' : 'none';
  }
}

// Fonction pour ajouter un sous-élément
function ajouterSousItem(button) {
  const subItems = button.parentElement;
  const newItem = document.createElement('div');
  newItem.className = 'sub-item';
  newItem.innerHTML = `
    <input type="text" value="Nouveau" />
    <div class="image-drop" ondrop="drop(event, this)" ondragover="allowDrop(event)"></div>
  `;
  subItems.insertBefore(newItem, button);
}

// Ajout des écouteurs d'événements au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
  // Activer tous les groupes par défaut
  document.querySelectorAll('.group').forEach(group => {
    const items = group.querySelector('.sub-items');
    if (items) {
      items.style.display = 'block';
    }
  });
});