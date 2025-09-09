// Render icon Lucide
lucide.createIcons();

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const startBtn = document.getElementById("start-btn");
let isPlaying = false;

// Klik tombol Jelajah untuk mulai musik
startBtn.addEventListener("click", async () => {
  try {
    await music.play();
    isPlaying = true;

    // Ubah tombol jadi headphones aktif
    musicBtn.innerHTML = `<i data-lucide="headphones"></i>`;
    lucide.createIcons();

    // Tampilkan tombol kontrol musik
    musicBtn.classList.remove("hidden");

    // Hilangkan tombol Jelajah (opsional)
    startBtn.style.display = "none";

  } catch (err) {
    console.log("Gagal memulai musik:", err);
  }
});

// Tombol kontrol musik (play/pause)
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.innerHTML = `<i data-lucide="headphone-off"></i>`;
  } else {
    music.play();
    musicBtn.innerHTML = `<i data-lucide="headphones"></i>`;
  }
  isPlaying = !isPlaying;
  lucide.createIcons();
});


// =======================
// Countdown Feature
// =======================
const showCountdownBtn = document.getElementById("show-countdown");
const countdownSection = document.getElementById("countdown");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progressBar");

let countdownInterval = null;

showCountdownBtn.addEventListener("click", () => {
  countdownSection.classList.remove("hidden");
});

function startCountdown() {
  const dateInput = document.getElementById("dueDate").value;
  const timeInput = document.getElementById("dueTime").value || "00:00";

  if (!dateInput) {
    alert("Silakan masukkan tanggal perkiraan lahir!");
    return;
  }

  const targetDateTime = new Date(`${dateInput}T${timeInput}:00`);
  if (isNaN(targetDateTime.getTime())) {
    alert("Format tanggal atau jam tidak valid!");
    return;
  }

  if (countdownInterval) clearInterval(countdownInterval);
  updateCountdown(targetDateTime);
  countdownInterval = setInterval(() => updateCountdown(targetDateTime), 1000);
}

function updateCountdown(targetDate) {
  const now = new Date();
  const diff = targetDate - now;

  const pregnancyDuration = 270 * 24 * 60 * 60 * 1000; // 270 hari default
  const elapsed = pregnancyDuration - diff;

  if (diff <= 0) {
    resultEl.innerHTML = "🎉 Selamat! Si kecil sudah lahir 💕";
    progressBar.style.width = "100%";
    return;
  }

  // Hitung waktu tersisa
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Hitung progress %
  const progress = Math.min((elapsed / pregnancyDuration) * 100, 100).toFixed(1);
  progressBar.style.width = progress + "%";

  // Tentukan trimester
  const elapsedDays = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  let trimester = "";
  let motivasi = "";

  if (elapsedDays <= 91) {
    trimester = "Trimester 1";
    motivasi = "Awal yang penuh keajaiban 💖, jaga kesehatan dan istirahat cukup ya Moms.";
  } else if (elapsedDays <= 189) {
    trimester = "Trimester 2";
    motivasi = "Selamat Moms! Sekarang masuk masa paling indah 🤰💕, si kecil makin aktif bergerak!";
  } else {
    trimester = "Trimester 3";
    motivasi = "Sedikit lagi bertemu si kecil 🌸, tetap semangat dan nikmati setiap detiknya.";
  }

  // Tampilkan hasil
  resultEl.innerHTML = `
    <div><strong>${days}</strong> Hari ${hours} Jam ${minutes} Menit ${seconds} Detik menuju persalinan</div>
    <div style="margin-top:10px; font-size:1rem; color:#93684a;">
      Progres: <strong>${progress}%</strong> (${elapsedDays} hari dari 270 hari)<br>
      Saat ini Anda berada di <strong>${trimester}</strong>.<br>
      <em>${motivasi}</em>
    </div>
  `;
}
