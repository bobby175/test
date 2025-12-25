document.addEventListener('DOMContentLoaded', () => {
    /* ==================== BIRTHDAY COUNTDOWN ==================== */
    const openBtn = document.getElementById('openBtn');
    const countdownDays = document.getElementById('countdownDays');
    const countdownHours = document.getElementById('countdownHours');
    const countdownMinutes = document.getElementById('countdownMinutes');
    const countdownSeconds = document.getElementById('countdownSeconds');
    const countdownMessage = document.getElementById('countdownMessage');
    const birthdayCountdown = document.getElementById('birthdayCountdown');

    /* ==================== UBAH TANGGAL BUKA KEJUTAN  ==================== */
    const BIRTH_MONTH = 11; // Januari (0=Januari, 1=Februari, ..., 11=Desember)
    const BIRTH_DATE = 25;
    /* ===================================================================== */

    function updateBirthdayCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        let nextBirthday = new Date(currentYear, BIRTH_MONTH, BIRTH_DATE);
        if (now > nextBirthday) {
            nextBirthday.setFullYear(currentYear + 1);
        }
        
        const diff = nextBirthday - now;
        const isBirthdayToday = now.getMonth() === BIRTH_MONTH && now.getDate() === BIRTH_DATE;
        
        if (isBirthdayToday || diff <= 0) {
            countdownDays.textContent = '00';
            countdownHours.textContent = '00';
            countdownMinutes.textContent = '00';
            countdownSeconds.textContent = '00';
            
            countdownMessage.innerHTML = '🎉 <strong>SELAMAT ULANG TAHUN WULAN!</strong> 🎉<br>Tombol sudah bisa dibuka!';
            countdownMessage.style.color = '#ffd700';
            countdownMessage.style.textShadow = '0 0 10px #ffd700';
            
            openBtn.disabled = false;
            openBtn.style.opacity = "1";
            openBtn.style.cursor = "pointer";
            openBtn.innerHTML = '🎂 Buka Pesan Spesial! 🎂';
            
            birthdayCountdown.style.background = 'rgba(255, 215, 0, 0.15)';
            birthdayCountdown.style.borderColor = '#ffd700';
            birthdayCountdown.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.6)';
            
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownDays.textContent = days.toString().padStart(2, '0');
        countdownHours.textContent = hours.toString().padStart(2, '0');
        countdownMinutes.textContent = minutes.toString().padStart(2, '0');
        countdownSeconds.textContent = seconds.toString().padStart(2, '0');
        
        if (days === 0) {
            countdownMessage.innerHTML = '⏰ Hampir tiba! Tinggal <strong>beberapa jam</strong> lagi!';
        } else if (days === 1) {
            countdownMessage.innerHTML = '✨ Besok adalah hari spesial Wulan!';
        } else if (days < 7) {
            countdownMessage.innerHTML = `🎈 Tinggal <strong>${days} hari</strong> lagi menuju hari spesial!`;
        } else {
            countdownMessage.innerHTML = '⏳ Sabar ya, hari spesial Wulan akan segera tiba!';
        }
        
        openBtn.disabled = true;
        openBtn.style.opacity = "0.5";
        openBtn.style.cursor = "not-allowed";
    }
    
    // Jalankan countdown setiap detik
    updateBirthdayCountdown();
    const countdownInterval = setInterval(updateBirthdayCountdown, 1000);
    
    /* ----------------------------
       Birth + Current Date/Time (detailed age)
       ---------------------------- */

    function computeAgeDetailed(birthDate, now) {
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months -= 1;
        }
        if (months < 0) {
            months += 12;
            years -= 1;
        }

        return { years, months, days };
    }

    function updateBirthInfo() {
        const birthDate = new Date(2004, 0 , 1);
        const now = new Date();

        const daysName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const birthDayName = daysName[birthDate.getDay()];

        const age = computeAgeDetailed(birthDate, now);

        const birthString = `${birthDayName}, 01 - 01 - 2004`;

        const parts = [];
        if (age.years) parts.push(`${age.years} Tahun`);
        if (age.months) parts.push(`${age.months} Bulan`);
        if (age.days || parts.length === 0) parts.push(`${age.days} Hari`);

        document.getElementById("birthDate").innerText = `📅 Lahir: ${birthString}`;
        document.getElementById("ageInfo").innerText = `🎂 Usia: ${parts.join(' ')}`;
    }

    function updateDateTime() {
        const dt = new Date();

        const daysName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const dayName = daysName[dt.getDay()];

        const day = String(dt.getDate()).padStart(2, '0');
        const month = String(dt.getMonth() + 1).padStart(2, '0');
        const year = dt.getFullYear();

        const time = dt.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        document.getElementById("currentDateTime").innerText =
            `📅 ${dayName}, ${day} - ${month} - ${year} — 🕐 ${time}`;

        updateBirthInfo();
    }

    // initial + intervals
    updateBirthInfo();
    updateDateTime();
    const dtInterval = setInterval(updateDateTime, 1000);

    /* ----------------------------
       Elements & UI behavior
       ---------------------------- */
    const startScreen = document.getElementById("startScreen");
    const bgm = document.getElementById("bgm");
    const messageBox = document.getElementById("messageBox");
    const typedText = document.getElementById("typedText");
    const giftBtn = document.getElementById("giftBtn");
    const endScreen = document.getElementById("endScreen");
    const replayBtn = document.getElementById("replayBtn");
    const giftEndBtn = document.getElementById("giftEndBtn");
    const profilePhotoWrapper = document.getElementById("profilePhotoWrapper");
    const profilePhoto = document.querySelector('.profile-photo');
    const giftGif = document.querySelector('.gift-gif');

    // Instagram URL
    const instagramUrl = "https://www.instagram.com/wulan_chaaan_?igsh=MWVkMXlvbm9pNnA0cw==";

    // initial explicit states
    startScreen.style.display = "flex";
    messageBox.style.display = "none";
    endScreen.style.display = "none";
    giftBtn.style.display = "none";
    typedText.textContent = "";

    let heartInterval = null;
    let emojiInterval = null;
    let balloonInterval = null;
    let cakeInterval = null;
    let confettiInterval = null; // INI YANG AKAN KITA HAPUS INTERVALNYA
    let sparkleInterval = null;
    let animalInterval = null;
    let floatingHeartInterval = null;
    let i = 0;
    let typingTimeout = null;

    /* ----------------------------
       MENCEGAH DOWNLOAD GAMBAR
       ---------------------------- */
    
    function preventImageDownload() {
        if (profilePhoto) {
            profilePhoto.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                showNoDownloadMessage();
                return false;
            });
            
            profilePhoto.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
            });
            
            profilePhoto.setAttribute('draggable', 'false');
        }
        
        if (giftGif) {
            giftGif.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                showNoDownloadMessage();
                return false;
            });
            
            giftGif.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
            });
            
            giftGif.setAttribute('draggable', 'false');
        }
        
        document.addEventListener('contextmenu', function(e) {
            if (e.target.tagName === 'IMG' || 
                e.target.classList.contains('profile-photo-wrapper') ||
                e.target.classList.contains('gift-gif-container')) {
                e.preventDefault();
                showNoDownloadMessage();
                return false;
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                showNoDownloadMessage();
                return false;
            }
            
            if (e.key === 'PrintScreen') {
                showNoDownloadMessage();
            }
        });
    }
    
    function showNoDownloadMessage() {
        const message = document.createElement('div');
        message.innerHTML = '❌ Foto tidak bisa didownload!';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'rgba(0, 0, 0, 0.8)';
        message.style.color = '#ff6b6b';
        message.style.padding = '15px 25px';
        message.style.borderRadius = '10px';
        message.style.zIndex = '9999';
        message.style.fontSize = '1.2rem';
        message.style.fontWeight = 'bold';
        message.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
        message.style.animation = 'fadeInOut 2s forwards';
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                40% { transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 2000);
    }
    
    preventImageDownload();

    function openInstagram() {
        createInstagramClickEffect();
        
        setTimeout(() => {
            window.open(instagramUrl, '_blank');
        }, 300);
    }

    function createInstagramClickEffect() {
        const originalBoxShadow = profilePhoto.style.boxShadow;
        profilePhoto.style.boxShadow = '0 0 50px rgba(255, 75, 209, 1), 0 0 80px rgba(255, 110, 200, 0.8)';
        profilePhoto.style.transform = 'scale(1.1)';
        profilePhoto.style.borderColor = '#ff00f7';
        
        setTimeout(() => {
            profilePhoto.style.boxShadow = originalBoxShadow;
            profilePhoto.style.transform = 'scale(1)';
            profilePhoto.style.borderColor = 'var(--pink)';
        }, 400);
        
        const rect = profilePhoto.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = '18px';
            heart.style.zIndex = '9998';
            heart.style.pointerEvents = 'none';
            document.body.appendChild(heart);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 40;
            const duration = 400 + Math.random() * 200;
            
            heart.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)'
            });
            
            setTimeout(() => {
                heart.remove();
            }, duration);
        }
    }

    profilePhotoWrapper.addEventListener('click', openInstagram);
    profilePhoto.addEventListener('click', openInstagram);

    // ANIMASI CUTE UNTUK MENU AWAL (SEMUA TETAP BERJALAN)
    function startMenuAnimations() {
        // Hati berloncatan
        setInterval(() => {
            const heart = document.createElement("div");
            heart.className = "bouncing-heart";
            heart.innerHTML = "💖";
            heart.style.left = Math.random() * 90 + 5 + "vw";
            heart.style.top = Math.random() * 70 + 15 + "vh";
            heart.style.animationDelay = Math.random() * 2 + "s";
            startScreen.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, 800);

        // Bintang berjatuhan
        setInterval(() => {
            const star = document.createElement("div");
            star.className = "floating-star";
            star.innerHTML = "✨";
            star.style.left = Math.random() * 100 + "vw";
            star.style.setProperty('--x-move', (Math.random() * 2 - 1).toFixed(2));
            startScreen.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 6000);
        }, 500);

        // Titik berkilauan
        setInterval(() => {
            const sparkle = document.createElement("div");
            sparkle.className = "sparkle-dot";
            sparkle.style.left = Math.random() * 100 + "vw";
            sparkle.style.top = Math.random() * 100 + "vh";
            startScreen.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, 300);

        // Kelinci lucu
        setInterval(() => {
            const bunny = document.createElement("div");
            bunny.className = "cute-bunny";
            bunny.innerHTML = "🐰";
            bunny.style.bottom = "10%";
            bunny.style.left = "-50px";
            startScreen.appendChild(bunny);

            setTimeout(() => {
                bunny.remove();
            }, 8000);
        }, 10000);

        // Kue mengambang
        setInterval(() => {
            const cake = document.createElement("div");
            cake.className = "floating-cake";
            cake.innerHTML = "🎂";
            cake.style.left = Math.random() * 80 + 10 + "vw";
            cake.style.bottom = "10%";
            startScreen.appendChild(cake);

            setTimeout(() => {
                cake.remove();
            }, 10000);
        }, 5000);

        // Gelembung
        setInterval(() => {
            const bubble = document.createElement("div");
            bubble.className = "bubble";
            bubble.style.left = Math.random() * 100 + "vw";
            bubble.style.bottom = "0%";
            startScreen.appendChild(bubble);

            setTimeout(() => {
                bubble.remove();
            }, 8000);
        }, 1500);

        // Hadiah berputar
        setInterval(() => {
            const gift = document.createElement("div");
            gift.className = "rotating-gift";
            gift.innerHTML = "🎁";
            gift.style.left = Math.random() * 90 + 5 + "vw";
            gift.style.top = Math.random() * 80 + 10 + "vh";
            startScreen.appendChild(gift);

            setTimeout(() => {
                gift.remove();
            }, 5000);
        }, 3000);
    }

    startMenuAnimations();

    openBtn.addEventListener("click", startExperience);

    function startExperience() {
        if (openBtn.disabled) {
            countdownMessage.innerHTML = '⏰ Belum waktunya! Tunggu sampai hari ulang tahun ya! 🎂';
            countdownMessage.style.color = '#ff6b6b';
            countdownMessage.style.animation = 'pulseText 0.5s 3';
            
            birthdayCountdown.style.animation = 'shake 0.5s 3';
            setTimeout(() => {
                birthdayCountdown.style.animation = '';
            }, 1500);
            return;
        }
        
        clearInterval(countdownInterval);
        
        startScreen.style.display = "none";
        messageBox.style.display = "flex";
        messageBox.setAttribute('aria-hidden', 'false');

        typedText.textContent = "";
        i = 0;
        giftBtn.style.display = "none";
        giftBtn.classList.remove("show");
        typeMessage();

        // HENTIKAN SEMUA INTERVAL SEBELUMNYA
        if (heartInterval) clearInterval(heartInterval);
        if (emojiInterval) clearInterval(emojiInterval);
        if (balloonInterval) clearInterval(balloonInterval);
        if (cakeInterval) clearInterval(cakeInterval);
        if (confettiInterval) clearInterval(confettiInterval); // INI AKAN DIHAPUS
        if (sparkleInterval) clearInterval(sparkleInterval);
        if (animalInterval) clearInterval(animalInterval);
        if (floatingHeartInterval) clearInterval(floatingHeartInterval);

        // JALANKAN SEMUA ANIMASI KECUALI CONFETTI SPAM
        heartInterval = setInterval(spawnLove, 450);
        emojiInterval = setInterval(spawnEmoji, 1200);
        balloonInterval = setInterval(spawnBalloon, 800);
        cakeInterval = setInterval(spawnCake, 3000);
        // HAPUS INI: confettiInterval = setInterval(spawnConfetti, 200); ← INI YANG BIKIN LAG!
        sparkleInterval = setInterval(spawnSparkle, 100);
        animalInterval = setInterval(spawnAnimal, 2000);
        floatingHeartInterval = setInterval(spawnFloatingHeart, 600);
    }

    /* Typing effect */
    const message =
        `Selamat Ulang Tahun Wulan! 🎉

Semoga dihari spesial ini
penuh dengan kebahagiaan, tawa,
dan cinta dari orang-orang terdekat. 😄

Mudah-mudahan tahun ini
membawa lebih banyak kesuksesan,
kesehatan, dan impian yang tercapai. 🌟

Dari hati ke hati,
Otanjoubi omedetou! 🎂❤️
Dan Selamat Tahun Baru 🎉`;

    function typeMessage() {
        if (i < message.length) {
            typedText.textContent += message.charAt(i);
            i++;
            typingTimeout = setTimeout(typeMessage, 12);
        } else {
            giftBtn.style.display = "flex";
            giftBtn.classList.add("show");
            giftBtn.focus();
            
            if (window.innerWidth >= 1024) {
                giftBtn.style.display = "flex !important";
            }
        }
    }

    /* Animasi tombol hadiah */
    function createGiftAnimation(event) {
        const btnRect = giftBtn.getBoundingClientRect();
        const btnX = btnRect.left + btnRect.width / 2;
        const btnY = btnRect.top + btnRect.height / 2;

        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const gift = document.createElement("div");
                gift.className = "gift-animation";
                gift.innerHTML = "🎁";
                gift.style.left = btnX + "px";
                gift.style.top = btnY + "px";
                document.body.appendChild(gift);

                setTimeout(() => {
                    gift.remove();
                }, 1500);
            }, i * 80);
        }

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const confetti = document.createElement("div");
                confetti.className = "confetti-btn";
                const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"];
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = btnX + "px";
                confetti.style.top = btnY + "px";
                confetti.style.setProperty('--tx', (Math.random() * 80 - 40) + 'px');
                confetti.style.setProperty('--ty', (Math.random() * -60 - 15) + 'px');
                confetti.style.setProperty('--r', (Math.random() * 720) + 'deg');
                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 1000);
            }, i * 40);
        }
    }

    /* Animasi tombol hadiah di end screen */
    function createGiftEndAnimation(event) {
        const btnRect = giftEndBtn.getBoundingClientRect();
        const btnX = btnRect.left + btnRect.width / 2;
        const btnY = btnRect.top + btnRect.height / 2;

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const gift = document.createElement("div");
                gift.className = "gift-animation";
                gift.innerHTML = "🎁";
                gift.style.left = btnX + "px";
                gift.style.top = btnY + "px";
                document.body.appendChild(gift);

                setTimeout(() => {
                    gift.remove();
                }, 1500);
            }, i * 80);
        }

        for (let i = 0; i < 22; i++) {
            setTimeout(() => {
                const confetti = document.createElement("div");
                confetti.className = "confetti-btn";
                const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"];
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = btnX + "px";
                confetti.style.top = btnY + "px";
                confetti.style.setProperty('--tx', (Math.random() * 120 - 60) + 'px');
                confetti.style.setProperty('--ty', (Math.random() * -80 - 25) + 'px');
                confetti.style.setProperty('--r', (Math.random() * 720) + 'deg');
                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 1000);
            }, i * 40);
        }
    }

    /* Love animation */
    function spawnLove() {
        const love = document.createElement("div");
        love.className = "love";
        const sizes = [16, 20, 24, 28, 32];
        const colors = ["❤️", "💖", "💕", "💘", "💞"];
        love.innerHTML = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        love.style.left = `${left}vw`;
        love.style.fontSize = `${sizes[Math.floor(Math.random() * sizes.length)]}px`;
        love.style.opacity = (0.7 + Math.random() * 0.3).toString();
        const dur = 3000 + Math.random() * 2000;
        love.style.animationDuration = dur + "ms";

        document.body.appendChild(love);
        setTimeout(() => { love.remove(); }, dur + 200);
    }

    /* Emoji popping */
    function spawnEmoji() {
        const emojiList = ["🎉", "✨", "🌟", "🥳", "🎀"];
        const emoji = document.createElement("div");
        emoji.className = "popEmoji";
        emoji.innerHTML = emojiList[Math.floor(Math.random() * emojiList.length)];

        emoji.style.left = (Math.random() * 80 + 10) + "vw";
        emoji.style.top = (Math.random() * 60 + 20) + "vh";

        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 600);
    }

    /* ANIMASI BARU DI LUAR PESAN - SEMUA TETAP KECUALI CONFETTI */
    function spawnBalloon() {
        const balloon = document.createElement("div");
        balloon.className = "balloon";

        const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = color;

        const xMove = (Math.random() * 2 - 1).toFixed(2);
        balloon.style.setProperty('--x-move', xMove);

        balloon.style.left = Math.random() * 100 + "vw";

        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 8000);
    }

    function spawnCake() {
        const cake = document.createElement("div");
        cake.className = "bouncing-cake";
        cake.innerHTML = "🎂";

        cake.style.left = Math.random() * 80 + 10 + "vw";

        document.body.appendChild(cake);
        setTimeout(() => cake.remove(), 6000);
    }

    /* ==== HAPUS FUNGSI INI SAJA! ==== */
    /* function spawnConfetti() {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;

        confetti.style.left = Math.random() * 100 + "vw";

        const size = 4 + Math.random() * 8;
        confetti.style.width = size + "px";
        confetti.style.height = size + "px";

        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        const duration = 2 + Math.random() * 3;
        confetti.style.animationDuration = duration + "s";

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), duration * 1000);
    } */

    function spawnSparkle() {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle-message";

        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.top = Math.random() * 100 + "vh";

        const colors = ["#ffffff", "#ffd700", "#ff6b6b", "#4ecdc4", "#ff9ff3"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.backgroundColor = color;

        const size = 2 + Math.random() * 5;
        sparkle.style.width = size + "px";
        sparkle.style.height = size + "px";

        sparkle.style.animationDelay = Math.random() * 1.5 + "s";

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }

    function spawnAnimal() {
        const animal = document.createElement("div");
        animal.className = "cute-animal";

        const animals = ["🐰", "🐱", "🐶", "🐻", "🐼", "🦊", "🐨", "🐯", "🦁"];
        animal.innerHTML = animals[Math.floor(Math.random() * animals.length)];

        animal.style.setProperty('--x-move', (Math.random() * 2 - 1).toFixed(2));

        animal.style.left = Math.random() * 100 + "vw";

        document.body.appendChild(animal);
        setTimeout(() => animal.remove(), 15000);
    }

    function spawnFloatingHeart() {
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        const hearts = ["❤️", "💖", "💕", "💘", "💞", "💓", "💗"];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

        const xMove = (Math.random() * 2 - 1).toFixed(2);
        heart.style.setProperty('--x-move', xMove);

        heart.style.left = Math.random() * 100 + "vw";

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }

    /* Finish / End */
    giftBtn.addEventListener("click", function(event) {
        createGiftAnimation(event);
        setTimeout(showEndScreen, 800);
    });

    function showEndScreen() {
        if (messageBox.style.display === "none") return;

        // stop intervals & typing
        if (heartInterval) { clearInterval(heartInterval); heartInterval = null; }
        if (emojiInterval) { clearInterval(emojiInterval); emojiInterval = null; }
        if (balloonInterval) { clearInterval(balloonInterval); balloonInterval = null; }
        if (cakeInterval) { clearInterval(cakeInterval); cakeInterval = null; }
        if (confettiInterval) { clearInterval(confettiInterval); confettiInterval = null; }
        if (sparkleInterval) { clearInterval(sparkleInterval); sparkleInterval = null; }
        if (animalInterval) { clearInterval(animalInterval); animalInterval = null; }
        if (floatingHeartInterval) { clearInterval(floatingHeartInterval); floatingHeartInterval = null; }
        if (typingTimeout) { clearTimeout(typingTimeout); typingTimeout = null; }

        messageBox.style.display = "none";
        messageBox.setAttribute('aria-hidden', 'true');
        endScreen.style.display = "grid";
        requestAnimationFrame(typeEndScreen);

        try { bgm.pause(); } catch (e) { }
    }

    /* Replay / Back */
    replayBtn.addEventListener("click", () => location.reload());

    giftEndBtn.addEventListener("click", function(event) {
        createGiftEndAnimation(event);

        setTimeout(() => {
            window.open("https://id.shp.ee/jjVwRJq", "_blank");
        }, 800);
    });

    /* Firework effect */
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
    });

    let fireworks = [];
    let particles = [];

    class Firework {
        constructor() {
            this.x = Math.random() * w;
            this.y = h;
            this.targetY = Math.random() * (h/2);
            this.speed = 6 + Math.random() * 2;
            this.color = `hsl(${Math.random() * 360},100%,60%)`;
        }
        update() {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                for (let i = 0; i < 30; i++) particles.push(new Particle(this.x, this.y, this.color));
                return true;
            }
            return false;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.speed = Math.random() * 3 + 1.5;
            this.angle = Math.random() * Math.PI * 2;
            this.alpha = 1;
        }
        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + 0.6;
            this.alpha -= 0.02;
            return this.alpha <= 0;
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function loop() {
        ctx.fillStyle = "rgba(3,3,6,0.22)";
        ctx.fillRect(0, 0, w, h);
        if (Math.random() < 0.05) fireworks.push(new Firework());
        fireworks = fireworks.filter(f => { f.draw(); return !f.update(); });
        particles = particles.filter(p => { p.draw(); return !p.update(); });
        requestAnimationFrame(loop);
    }
    loop();

    /* Accessibility: Enter to open from start */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && startScreen.style.display !== "none" && !openBtn.disabled) {
            startExperience();
        }
    });

    /* ----------------------------
       Neon Title - random color pulse
       ---------------------------- */
    (function setupNeonTitle() {
        const title = document.getElementById("title");
        if (!title) return;

        let intervalId = null;

        function applyNeon(hue) {
            const main = `hsl(${hue} 100% 72%)`;
            const glow1 = `hsl(${hue} 100% 60% / 0.95)`;
            const glow2 = `hsl(${hue} 95% 50% / 0.72)`;
            const outer = `hsl(${hue} 80% 40% / 0.45)`;

            title.style.color = main;
            title.style.textShadow =
                `0 0 6px ${glow1}, 0 0 14px ${glow2}, 0 0 28px ${outer}, 0 6px 22px rgba(0,0,0,0.45)`;
            title.style.transform = `scale(${1 + (Math.random() * 0.03)})`;
        }

        function pickAndApply() {
            const hue = Math.floor(Math.random() * 360);
            applyNeon(hue);
        }

        pickAndApply();
        intervalId = setInterval(pickAndApply, 1200);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (intervalId) clearInterval(intervalId);
                intervalId = null;
            } else {
                if (!intervalId) intervalId = setInterval(pickAndApply, 1200);
                pickAndApply();
            }
        });
    })();
});

/* ================= END SCREEN TYPING ================= */
const endTexts = [
    "Hai manusia favorit, semoga hari ini penuh berkah dan kebahagiaan yaa",
    "trimakasih telah membuat dunia kerjaku lebih berwarna walau jarang ngobrol sih,",
    "sebenernya pengen bisa ngobrol diluar tapii kayaknya gamungkin bisaa.",
    "apalagi semenjak tau wulan deket sama temen kerja juga. mungkin udah saatnya aku close menyukai secara diam² :v",
    "tapi itu ga penting, yang penting sekarang Wulan harus bahagia, tambah sehat dan tambah cantik pulaa wkwk",
    "oh iya ini ada gift buat Wulan, traktirannya beli sendirii tapii :v",
    "klik tombol ambil giftnya yaaa nanti langsung di arahin ke apk dana ,jangan sampe ga di ambil aku bakal kecewa berat :)",
    "maaf ya cuma bisa ngasih ginian, berhubung gapunya foto cutenya wulan jadi ijin ngelink dari foto IGnya :v"
];

function typeEndScreen(){
    const lines = document.querySelectorAll("#endInner .typing-line");
    let idx = 0;

    function typeLine(){
        if(idx >= endTexts.length) return;
        const el = lines[idx];
        const text = endTexts[idx];
        let i = 0;
        el.textContent = "";
        el.classList.add("typing-cursor");

        const timer = setInterval(()=>{
            el.textContent += text.charAt(i);
            i++;
            if(i >= text.length){
                clearInterval(timer);
                el.classList.remove("typing-cursor");
                idx++;
                setTimeout(typeLine, 510);
            }
        }, 35);
    }
    typeLine();
}
