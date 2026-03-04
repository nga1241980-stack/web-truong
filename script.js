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

/* ===== COUNTDOWN ===== */
const targetDate = new Date("2026-03-05 06:30:00").getTime();

setInterval(()=>{
  const now = new Date().getTime();
  const distance = targetDate - now;

  if(distance < 0) return;

  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
},1000);

/* ===== FADE ON SCROLL ===== */
const faders = document.querySelectorAll(".fade");

function checkFade(){
  const trigger = window.innerHeight * 0.85;

  faders.forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < trigger){
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", checkFade);
checkFade();

/* ===== TO TOP ===== */
const toTop = document.getElementById("toTop");
toTop.onclick = ()=>{
  window.scrollTo({top:0, behavior:"smooth"});
};

/* ===== AUTO HIDE HEADER ===== */
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", ()=>{
  let currentScroll = window.pageYOffset;

  if(currentScroll > lastScroll){
    // kéo xuống → ẩn
    header.classList.add("hide");
  }else{
    // kéo lên → hiện
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

/* ===== LEFT POPUP ===== */
function collapsePopup(){
  document.getElementById("classPopup").classList.add("collapsed");
}
function expandPopup(){
  document.getElementById("classPopup").classList.remove("collapsed");
}

/* ===== RIGHT PANEL ===== */
function collapseRight(){
  document.getElementById("rightPanel").classList.add("collapsed");
}
function expandRight(){
  document.getElementById("rightPanel").classList.remove("collapsed");
}
