// Fonction pour exporter les images
function afficherImages() {
    const input = document.getElementById("imageInput");
    const fileList = input.files;
    const previewArea =
      document.querySelector(".preview-area") || document.createElement("div");
    previewArea.className = "preview-area image-container";
  
    // Pour chaque image, créer un élément img et l'ajouter à la zone de prévisualisation
    for (let file of fileList) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.draggable = true;
        img.style.width = "120px"; // Agrandir à l'importation
        img.ondragstart = function (event) {
          event.dataTransfer.setData("text/plain", e.target.result);
        };
        previewArea.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  
    if (!document.body.contains(previewArea)) {
      document.querySelector(".container").prepend(previewArea);
    }
  }
  
  // Fonction pour permettre le "drag and drop"
  function allowDrop(event) {
    event.preventDefault();
  }
  
  // Fonction pour traiter l'image après un "drop"
  function drop(event) {
    event.preventDefault();
    const imageURL = event.dataTransfer.getData("text/plain");
    const img = document.createElement("img");
    img.src = imageURL;
    img.draggable = true;
    img.style.width = "10vw";
    event.target.appendChild(img);
  }
  
  // Fonction pour toggle l'affichage du groupe
  function toggleGroup(groupIdElement) {
    const groupContent = groupIdElement.nextElementSibling;
    if (groupContent) {
      groupContent.classList.toggle("active");
    }
  }
  
  // Fonction pour exporter les images avec la nouvelle structure de nom
  async function exporterImages() {
    const numeroJira = document.getElementById("numeroJira").value.trim();
    const suffixe = document.getElementById("suffixe").value;
  
    if (!numeroJira) {
      alert("Veuillez entrer un numéro Jira !");
      return;
    }
  
    if (!window.showDirectoryPicker) {
      alert(
        "Votre navigateur ne supporte pas la sélection de dossier.\nUtilisez Chrome, Edge ou Brave."
      );
      return;
    }
  
    try {
      const dirHandle = await window.showDirectoryPicker();
  
      // Exporter les images par groupe
      const groupes = document.querySelectorAll(".group");
      let index = 1;
  
      for (let group of groupes) {
        const groupHeader = group.querySelector(".group-header span");
        const groupName = groupHeader
          ? groupHeader.innerText.trim().toLowerCase()
          : "groupe_inconnu";
        const subItems = group.querySelectorAll(".sub-item");
  
        for (let subItem of subItems) {
          const images = subItem.querySelectorAll("img");
          for (let img of images) {
            const base64 = img.src.split(",")[1];
            const binary = atob(base64);
            const array = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              array[i] = binary.charCodeAt(i);
            }
  
            // Générer le nom de l'image comme: numeroJira-minititre-suffixe
            const minititre = subItem.querySelector("input")
              ? subItem.querySelector("input").value
              : "minititre_inconnu";
            const nomImage = `${numeroJira}-${minititre}-${suffixe}.png`;
  
            const fileHandle = await dirHandle.getFileHandle(nomImage, {
              create: true,
            });
            const writable = await fileHandle.createWritable();
            await writable.write(array);
            await writable.close();
  
            index++;
          }
        }
      }
  
      alert("Exportation réussie !");
    } catch (err) {
      console.error(err);
      alert("L'exportation a échoué");
    }
  }
  
  // Fonction pour ajouter un sous-item dans n'importe quel groupe
  function ajouterSousItem(buttonElement) {
    const group = buttonElement.closest(".group");
    const subItemsContainer = group.querySelector(".sub-items");
  
    const newSubItem = document.createElement("div");
    newSubItem.classList.add("sub-item");
  
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.value = "";
    newSubItem.appendChild(newInput);
  
    const newDropArea = document.createElement("div");
    newDropArea.classList.add("image-drop");
    newDropArea.setAttribute("ondrop", "drop(event, this)");
    newDropArea.setAttribute("ondragover", "allowDrop(event)");
    newSubItem.appendChild(newDropArea);
    subItemsContainer.appendChild(newSubItem);
  }