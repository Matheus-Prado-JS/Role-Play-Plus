// ====================================
// ELEMENTOS
// ====================================

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const volumeSlider = document.getElementById("volumeSlider");

const audioPlayer = document.getElementById("audioPlayer");

const artPanel = document.querySelector(".art-panel");

const songTitle = document.querySelector(".song-info h4");
const songSubtitle = document.querySelector(".song-info span");

let currentIndex = 0;

const tracks = Array.from(
    document.querySelectorAll(".music-card:not(.locked)")
);

// ====================================
// CARREGAR FAIXA
// ====================================

function loadTrack(index){

    const card = tracks[index];

    tracks.forEach(track =>
        track.classList.remove("active")
    );

    card.classList.add("active");

    const image = card.dataset.image;
    const audio = card.dataset.audio;

    const title =
        card.querySelector("h3").textContent;

    const subtitle =
        card.querySelector("p").textContent;

    songTitle.textContent = title;
    songSubtitle.textContent = subtitle;

    artPanel.classList.add("fade");

    setTimeout(() => {

        artPanel.style.backgroundImage =
            `url("${image}")`;

        artPanel.classList.remove("fade");

    }, 200);

    audioPlayer.src = audio;
}

// ====================================
// PLAY / PAUSE
// ====================================

playBtn.addEventListener("click", () => {

    if(audioPlayer.paused){

        audioPlayer.play();

        playBtn.textContent = "⏸";

    }else{

        audioPlayer.pause();

        playBtn.textContent = "▶";

    }

});

// ====================================
// VOLUME
// ====================================

volumeSlider.addEventListener("input", () => {

    audioPlayer.volume =
        volumeSlider.value / 100;

});

// ====================================
// PRÓXIMA
// ====================================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if(currentIndex >= tracks.length){
        currentIndex = 0;
    }

    loadTrack(currentIndex);

    audioPlayer.play();

    playBtn.textContent = "⏸";

});

// ====================================
// ANTERIOR
// ====================================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = tracks.length - 1;
    }

    loadTrack(currentIndex);

    audioPlayer.play();

    playBtn.textContent = "⏸";

});

// ====================================
// CLIQUE NAS FAIXAS
// ====================================

tracks.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        currentIndex = index;

        loadTrack(currentIndex);

        audioPlayer.play();

        playBtn.textContent = "⏸";

    });

});

// ====================================
// QUANDO A MÚSICA ACABAR
// ====================================

audioPlayer.addEventListener("ended",()=>{

    currentIndex++;

    if(currentIndex >= tracks.length){
        currentIndex = 0;
    }

    loadTrack(currentIndex);

    audioPlayer.play();

});

// ====================================
// INICIALIZAÇÃO
// ====================================

audioPlayer.volume = 0.75;

loadTrack(0);