// =========================
// BACKGROUND SELECTOR (MASTER)
// =========================

const bgCategoriesRef = db.ref("bgCategories");
const bgItemsRef = db.ref("bgItems");

const addBgCategoryBtn = document.getElementById("add-bg-category-btn");
const addBgBtn = document.getElementById("add-bg-btn");

const bgCategoryForm = document.getElementById("bg-category-form");
const bgForm = document.getElementById("bg-form");

const bgCategorySelect = document.getElementById("bg-category-select");

const bgButton = document.querySelector('[data-action="background"]');
const bgPanel = document.getElementById("background-selector");


// =========================
// FIREBASE LISTENER
// =========================

backgroundRef.on("value", (snapshot) => {

  const data = snapshot.val();
  if (!data || !data.current) return;

  const bgId = data.current;

  const bgMain = document.getElementById("bg-main");
  const bgFade = document.getElementById("bg-fade");

  if (!bgMain || !bgFade) return;

  // tenta pegar background do banco primeiro
  bgItemsRef.child(bgId).once("value", snap => {

    const bgData = snap.val();

    if (bgData && bgData.image) {

      // BACKGROUND NOVO (imagem salva no banco)
      const image = bgData.image;

      bgFade.src = image;
      bgFade.classList.add("active");

      setTimeout(() => {
        bgMain.src = image;
        bgFade.classList.remove("active");
      }, 600);

    } 

    const extensions = ["jpg", "png", "webp", "jpeg"];

let found = false;

for (const ext of extensions) {

  const testPath = `assets/backgrounds/${bgId}.${ext}`;

  const img = new Image();

  img.onload = () => {

    if (found) return;
    found = true;

    bgFade.src = testPath;
    bgFade.classList.add("active");

    setTimeout(() => {
      bgMain.src = testPath;
      bgFade.classList.remove("active");
    }, 600);

  };

  img.src = testPath;

}

  });

  // =========================
  // UI: marcar selecionado
  // =========================

  document.querySelectorAll(".background-options li").forEach(li => {
    li.classList.toggle("active", li.dataset.bg === bgId);
  });

  // =========================
  // abrir categoria automaticamente
  // =========================

  const activeOption = document.querySelector(
    `.background-options li[data-bg="${bgId}"]`
  );

  if (activeOption) {

    const categoryContent = activeOption.closest(".bg-category-content");
    const category = activeOption.closest(".bg-category");

    if (categoryContent && category) {

      document.querySelectorAll(".bg-category-content")
        .forEach(c => c.classList.add("hidden"));

      document.querySelectorAll(".bg-category-title")
        .forEach(t => t.classList.remove("open"));

      categoryContent.classList.remove("hidden");
      category.querySelector(".bg-category-title")?.classList.add("open");

    }

  }

});


// =========================
// OPEN / CLOSE PANEL
// =========================

if (bgButton && bgPanel) {
  bgButton.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!requireMaster("alterar o plano de fundo")) return;

    bgPanel.classList.toggle("hidden");
  });
}

// Fecha clicando fora
document.addEventListener("click", (e) => {
  if (!bgPanel || bgPanel.classList.contains("hidden")) return;
  if (!bgButton) return;

  if (!bgPanel.contains(e.target) && !bgButton.contains(e.target)) {
    bgPanel.classList.add("hidden");
  }
});

// Impede clique dentro de fechar
bgPanel?.addEventListener("click", (e) => e.stopPropagation());


// =========================
// CLICK BACKGROUND (FUNCIONA PARA TODOS)
// =========================

bgPanel.addEventListener("click", (e) => {

  const option = e.target.closest("li");

  if (!option) return;
  if (!option.dataset.bg) return;

  if (!requireMaster("mudar o plano de fundo")) return;

  const bgId = option.dataset.bg;

  backgroundRef.set({
    current: bgId,
    changedBy: window.playerName || "Moderador",
    at: Date.now()
  });

  bgPanel.classList.add("hidden");

});

// =========================
// DROPDOWN CATEGORIES
// =========================

document.querySelectorAll(".bg-category-title").forEach(titleBtn => {
  titleBtn.addEventListener("click", () => {
    const category = titleBtn.closest(".bg-category");
    if (!category) return;

    const content = category.querySelector(".bg-category-content");
    if (!content) return;

    const isHidden = content.classList.contains("hidden");

    // Fecha todos primeiro
    document.querySelectorAll(".bg-category-content").forEach(c => c.classList.add("hidden"));
    document.querySelectorAll(".bg-category-title").forEach(t => t.classList.remove("open"));

    // Se estava fechado, abre
    if (isHidden) {
      content.classList.remove("hidden");
      titleBtn.classList.add("open");
    }
  });
});

// =========================
// ABRIR FORMULÁRIOS
// =========================

addBgCategoryBtn.onclick = () => {
  if (!requireMaster("criar categoria de background")) return;
  bgCategoryForm.classList.remove("hidden");
};

addBgBtn.onclick = () => {
  if (!requireMaster("criar background")) return;
  bgForm.classList.remove("hidden");
};

document.getElementById("cancel-bg-category").onclick = () => {
  bgCategoryForm.classList.add("hidden");
};

document.getElementById("cancel-bg").onclick = () => {
  bgForm.classList.add("hidden");
};

// =========================
// SALVAR CATEGORIA
// =========================

document.getElementById("save-bg-category").onclick = () => {

  const name = document
    .getElementById("new-bg-category-name")
    .value.trim();

  if (!name) return;

  bgCategoriesRef.push({
    name: name
  });

  document.getElementById("new-bg-category-name").value = "";
  bgCategoryForm.classList.add("hidden");

};

// =========================
// CRIAR CATEGORIA NA UI
// =========================

bgCategoriesRef.on("child_added", snap => {

  const data = snap.val();
  const id = snap.key;

  const selector = document.getElementById("background-selector");

  const category = document.createElement("div");
  category.className = "bg-category";

  category.innerHTML = `
    <button class="bg-category-title">
      ${data.name}
      <span class="bg-category-arrow">▼</span>
    </button>

    <ul class="background-options bg-category-content hidden" data-category="${id}">
    </ul>
  `;

  const titleBtn = category.querySelector(".bg-category-title");

titleBtn.addEventListener("click", () => {

  const content = category.querySelector(".bg-category-content");
  if (!content) return;

  const isHidden = content.classList.contains("hidden");

  document.querySelectorAll(".bg-category-content")
    .forEach(c => c.classList.add("hidden"));

  document.querySelectorAll(".bg-category-title")
    .forEach(t => t.classList.remove("open"));

  if (isHidden) {
    content.classList.remove("hidden");
    titleBtn.classList.add("open");
  }

});

  selector.appendChild(category);

  // adiciona no select do formulário
  const option = document.createElement("option");
  option.value = id;
  option.textContent = data.name;

  bgCategorySelect.appendChild(option);

});

// =========================
// SALVAR BACKGROUND
// =========================

document.getElementById("save-bg").onclick = () => {

  const name = document.getElementById("new-bg-name").value.trim();
  const category = bgCategorySelect.value;

  const fileInput = document.getElementById("new-bg-image");
  const file = fileInput.files[0];

  if (!name || !file) {
    alert("Escolha um nome e uma imagem.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {

    const imageData = e.target.result;

    bgItemsRef.push({
      name: name,
      image: imageData,
      category: category
    });

    document.getElementById("new-bg-name").value = "";
    fileInput.value = "";

    bgForm.classList.add("hidden");
  };

  reader.readAsDataURL(file);

};

// =========================
// CRIAR BACKGROUND NA UI
// =========================

bgItemsRef.on("child_added", snap => {

  const data = snap.val();

  const list = document.querySelector(
    `.background-options[data-category="${data.category}"]`
  );

  if (!list) return;

  const li = document.createElement("li");

  li.dataset.bg = snap.key;

  li.innerHTML = `
    <span class="bg-radio"></span>
    <span class="bg-name">${data.name}</span>
  `;

  list.appendChild(li);

});