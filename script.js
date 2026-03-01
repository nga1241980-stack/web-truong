const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const slideBox = document.querySelector(".slides");
let index = 0;

function showSlide(i) {
  if (i >= slides.length) index = 0;
  if (i < 0) index = slides.length - 1;

  slideBox.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

document.querySelector(".next").onclick = () => {
  index++;
  showSlide(index);
};

document.querySelector(".prev").onclick = () => {
  index--;
  showSlide(index);
};

dots.forEach((dot, i) => {
  dot.onclick = () => {
    index = i;
    showSlide(index);
  };
});

setInterval(() => {
  index++;
  showSlide(index);
}, 5000);

showSlide(index);

/* ===== MUSIC SYSTEM ===== */
let songs = [
  {src:"music1.mp3", name:"Mái trường mến yêu"},
  {src:"music2.mp3", name:"Nhớ mãi mái trường xưa"},
  {src:"music3.mp3", name:"Tuổi học trò"}
];

let audio = new Audio();
let musicIndex = 0;
let isPlaying = false;

let songName = document.getElementById("songName");
let musicIconInner = document.getElementById("musicIconInner");

audio.src = songs[musicIndex].src;

/* hết bài → bài sau */
audio.addEventListener("ended", function(){
  musicIndex = (musicIndex + 1) % songs.length;
  audio.src = songs[musicIndex].src;
  audio.play();
  updateUI();
});

/* play / pause */
function toggleMusic(){
  if(!isPlaying){
    audio.play();
    isPlaying = true;
  }else{
    audio.pause();
    isPlaying = false;
  }
  updateUI();
}

/* cập nhật giao diện */
function updateUI(){
  if(isPlaying){
    songName.innerText = "🎵 Đang phát: " + songs[musicIndex].name;
    musicIconInner.className = "fa-solid fa-music";
  }else{
    songName.innerText = "⏸ Chưa phát";
    musicIconInner.className = "fa-solid fa-play";
  }
}

/* tự bật khi user click lần đầu */
document.body.addEventListener("click", function(){
  if(!isPlaying){
    audio.play();
    isPlaying = true;
    updateUI();
  }
},{once:true});

function showPopup(){
  document.getElementById("classPopup").style.display="block";
}

/* cứ 5 giây hiện lại */
setInterval(showPopup, 5000);

function closePopup(){
  document.getElementById("classPopup").style.display="none";
}