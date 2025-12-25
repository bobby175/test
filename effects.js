/* ======= Additional Cute Features - DIPERBAIKI UNTUK KINERJA ======= */

(function addCuteFeatures() {
    // quick refs
    const body = document.body;
    const openBtnLocal = document.getElementById("openBtn");
    const giftBtnLocal = document.getElementById("giftBtn");
    const giftEndBtnLocal = document.getElementById("giftEndBtn");

    /* --------- Whisper messages --------- */
    const whisperPool = [
        "Stay cute 💕", "You're special 🎀", "Smile more 😄",
        "Senyum dong 😍", "Semoga makin bahagia 💖"
    ];
    
    function spawnWhisper(text, ttl = 1800) {
        const msg = document.createElement("div");
        msg.className = "whisperMsg";
        msg.innerText = text || whisperPool[Math.floor(Math.random()*whisperPool.length)];
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const left = (vw/2) + (Math.random()*140 - 70);
        const top = (vh/2) + (Math.random()*120 - 60);
        msg.style.left = left + "px";
        msg.style.top = top + "px";
        body.appendChild(msg);
        
        requestAnimationFrame(()=> {
            msg.style.transform = "translateY(-15px)";
            msg.style.opacity = "1";
        });
        
        setTimeout(()=> {
            msg.style.transform = "translateY(-35px)";
            msg.style.opacity = "0";
            setTimeout(()=> msg.remove(), 600);
        }, ttl);
    }

    /* --------- Gift Explosion - DISEDERHANAKAN --------- */
    function giftExplosionAt(x, y, count = 12) { // DIKURANGI DARI 24
        const emojis = ["🎀","🎁","🧸","💖","🍰","🌸"];
        for (let i=0;i<count;i++) {
            setTimeout(() => {
                const e = document.createElement("div");
                e.className = "gift-explode";
                e.innerText = emojis[Math.floor(Math.random()*emojis.length)];
                e.style.left = (x + (Math.random()*30 - 15)) + "px";
                e.style.top = (y + (Math.random()*30 - 15)) + "px";
                e.style.fontSize = (14 + Math.random()*22) + "px";
                e.style.opacity = "1";
                body.appendChild(e);
                
                const tx = (Math.random()*130 - 65);
                const ty = -(70 + Math.random()*140);
                const rot = (Math.random()*720 - 360);
                e.animate([
                    { transform: `translate(0,0) rotate(0deg) scale(0.8)`, opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(0.6)`, opacity: 0 }
                ], {
                    duration: 900 + Math.random()*600,
                    easing: "cubic-bezier(.2,.9,.3,1)",
                    fill: "forwards"
                });
                setTimeout(()=> e.remove(), 1600);
            }, i * 35);
        }
    }

    // integrate with existing createGiftAnimation
    try {
        const oldCreate = window.createGiftAnimation;
        window.createGiftAnimation = function(e) {
            const rect = giftBtnLocal.getBoundingClientRect();
            giftExplosionAt(rect.left + rect.width/2, rect.top + rect.height/2, 8); // DIKURANGI
            try { oldCreate(e); } catch(err){ }
        };
    } catch (err) {
        window.createGiftAnimation = function(e) {
            const rect = giftBtnLocal.getBoundingClientRect();
            giftExplosionAt(rect.left + rect.width/2, rect.top + rect.height/2, 8);
        };
    }

    /* --------- Sakura Wind - DIHAPUS KARENA BIKIN LAG --------- */
    // function spawnSakuraBurst() { ... } - DIHAPUS
    // let sakuraInterval = null; - DIHAPUS
    // function startSakuraLoop() { ... } - DIHAPUS
    // function stopSakuraLoop() { ... } - DIHAPUS

    /* --------- Tiny Bunny Hop - DIHAPUS KARENA BIKIN LAG --------- */
    // function spawnTinyBunnyOnce() { ... } - DIHAPUS
    // let bunnyLoop = null; - DIHAPUS
    // function startBunnyLoop() { ... } - DIHAPUS
    // function stopBunnyLoop() { ... } - DIHAPUS

    /* --------- Shine Pulse on Buttons --------- */
    [openBtnLocal, giftBtnLocal, giftEndBtnLocal, document.getElementById("replayBtn")].forEach(btn => {
        if (btn) btn.classList.add("shine");
    });

    /* --------- Hook into lifecycle --------- */
    try {
        const originalStart = window.startExperience;
        window.startExperience = function() {
            try { originalStart(); } catch(e){ console.warn(e); }
            // HAPUS LOOP YANG BIKIN LAG:
            // startSakuraLoop(); - DIHAPUS
            // startBunnyLoop(); - DIHAPUS
            
            // Whisper dengan interval lebih lambat
            window._whisperKeeper = setInterval(()=> spawnWhisper(), 5000 + Math.random()*2000); // DIPERLAMBAT
            
            if (giftBtnLocal) giftBtnLocal.classList.add("shine");
        };
    } catch (err) {
        console.warn("Could not wrap startExperience");
    }

    // also stop loops when showEndScreen called
    try {
        const oldShowEnd = window.showEndScreen;
        window.showEndScreen = function() {
            try { oldShowEnd(); } catch(e){ console.warn(e); }
            // HAPUS:
            // stopSakuraLoop(); - DIHAPUS
            // stopBunnyLoop(); - DIHAPUS
            
            if (window._whisperKeeper) { clearInterval(window._whisperKeeper); window._whisperKeeper = null; }
        };
    } catch (err) { }

    /* --------- Small enhancement: clicking giftEndBtn triggers explosion - DISEDERHANAKAN --------- */
    giftEndBtnLocal.addEventListener("click", (ev) => {
        const r = giftEndBtnLocal.getBoundingClientRect();
        giftExplosionAt(r.left + r.width/2, r.top + r.height/2, 12); // DIKURANGI
    });

})();

/* ===== WHISPER FLOATING MESSAGE ===== */
function showWhisper(text){
    const container = document.getElementById('whisperContainer');
    if(!container) return;
    const w = document.createElement('div');
    w.className = 'whisper-float';
    w.textContent = text;
    w.style.left = (45 + Math.random() * 10) + '%';
    container.appendChild(w);
    setTimeout(()=> w.remove(), 6500);
}

// contoh pemanggilan otomatis
document.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=> showWhisper("Aku selalu di sini 🤍"), 3000);
    setTimeout(()=> showWhisper("Pelan-pelan bacanya ya…"), 7000);
});

/* ===== WHISPER SYNC WITH AUDIO ===== */
(function WhisperSync(){
    const whispers = [
        { t: 6,  text: "Aku selalu di sini 🤍" },
        { t: 14, text: "Pelan-pelan bacanya ya…" },
        { t: 22, text: "Semoga kamu ngerasa ditemani ✨" },
        { t: 32, text: "Ini cuma buat kamu…" }
    ];

    const fired = {};
    function init(){
        const audio = document.getElementById('bgm') || document.querySelector('audio');
        if(!audio) return;

        audio.addEventListener('timeupdate', ()=>{
            whispers.forEach(w=>{
                if(audio.currentTime >= w.t && !fired[w.t]){
                    fired[w.t] = true;
                    if(typeof showWhisper === 'function'){
                        showWhisper(w.text);
                    }
                }
            });
        });
    }
    document.addEventListener('DOMContentLoaded', init);
})();

/* ===== EXTRA CUTE FLOATING ANIMATIONS - DISEDERHANAKAN ===== */
(function(){
    const icons = ["💖","✨","🌸","🎀"];
    const layer = document.getElementById('cuteLayer');

    function spawnCute(){
        if(!layer) return;
        const el = document.createElement('div');
        el.className = 'cute-item';
        el.textContent = icons[Math.floor(Math.random()*icons.length)];
        el.style.left = Math.random()*100 + '%';
        el.style.bottom = '-10%';
        el.style.animationDuration = (6 + Math.random()*4) + 's';
        layer.appendChild(el);
        setTimeout(()=> el.remove(), 12000);
    }

    setInterval(spawnCute, 3000); // DIPERLAMBAT DARI 1200ms
})();

/* ===== SAFE COUNTDOWN GATE (NO STUCK) ===== */
document.addEventListener('DOMContentLoaded', ()=>{
    const openBtn = document.getElementById('openBtn');
    if(!openBtn) return;

    const overlay = document.getElementById('countdownOverlay');
    const num = document.getElementById('countdownNumber');

    const newBtn = openBtn.cloneNode(true);
    openBtn.parentNode.replaceChild(newBtn, openBtn);

    newBtn.addEventListener('click', (e)=>{
        e.preventDefault();

        let count = 3;
        overlay.style.display = 'flex';
        num.textContent = count;

        const timer = setInterval(()=>{
            count--;
            if(count >= 0){
                num.textContent = count;
                num.style.animation = 'none';
                num.offsetHeight;
                num.style.animation = 'countPop 1s ease-in-out';
            }
            if(count < 0){
                clearInterval(timer);
                overlay.style.display = 'none';

                newBtn.replaceWith(openBtn);
                openBtn.click();
            }
        },1000);
    });
});

/* ===== CUTE EFFECT DURING COUNTDOWN - DISEDERHANAKAN ===== */
(function(){
    const icons = ["💖","✨","🎀","🌸"];
    function spawnCute(){
        const layer = document.getElementById('countdownCute');
        if(!layer) return;
        for(let i=0;i<3;i++){ // DIKURANGI DARI 6
            const el = document.createElement('div');
            el.className = 'cute-pop';
            el.textContent = icons[Math.floor(Math.random()*icons.length)];
            el.style.left = Math.random()*100 + '%';
            el.style.bottom = '30%';
            el.style.animationDelay = (Math.random()*0.2) + 's';
            layer.appendChild(el);
            setTimeout(()=>el.remove(),1800);
        }
    }

    const num = document.getElementById('countdownNumber');
    if(num){
        const obs = new MutationObserver(()=> spawnCute());
        obs.observe(num,{childList:true});
    }
})();

/* ===== FIX MUSIC PLAY AFTER COUNTDOWN ===== */
(function(){
    function playMusicSafe(){
        const audio = document.getElementById('bgm') || document.querySelector('audio');
        if(!audio) return;
        audio.muted = false;
        audio.volume = 1;
        const p = audio.play();
        if(p && typeof p.catch === 'function'){
            p.catch(()=>{
                const once = ()=>{
                    audio.play().catch(()=>{});
                    document.removeEventListener('touchstart', once);
                    document.removeEventListener('click', once);
                };
                document.addEventListener('touchstart', once, { once:true });
                document.addEventListener('click', once, { once:true });
            });
        }
    }

    const overlay = document.getElementById('countdownOverlay');
    if(overlay){
        const obs = new MutationObserver(()=>{
            if(getComputedStyle(overlay).display === 'none'){
                playMusicSafe();
                obs.disconnect();
            }
        });
        obs.observe(overlay, { attributes:true, attributeFilter:['style','class'] });
    }
})();

/* ===== TRIGGER LOVE EXPLOSION AT ZERO - DISEDERHANAKAN ===== */
(function(){
    function explodeLove(){
        const wrap = document.createElement('div');
        wrap.className = 'love-burst';
        const icons = ["💖","💗","💕","💞"];
        for(let i=0;i<12;i++){ // DIKURANGI DARI 24
            const s = document.createElement('span');
            s.textContent = icons[Math.floor(Math.random()*icons.length)];
            const x = (Math.random()*300 - 150) + 'px';
            const y = (Math.random()*300 - 150) + 'px';
            s.style.setProperty('--x', x);
            s.style.setProperty('--y', y);
            wrap.appendChild(s);
        }
        document.body.appendChild(wrap);
        setTimeout(()=> wrap.remove(), 1800);
    }

    const overlay = document.getElementById('countdownOverlay');
    if(overlay){
        const obs = new MutationObserver(()=>{
            if(getComputedStyle(overlay).display === 'none'){
                explodeLove();
                obs.disconnect();
            }
        });
        obs.observe(overlay,{attributes:true,attributeFilter:['style','class']});
    }
})();

/* === PLAY MUSIC WHEN GIFT BUTTON CLICKED === */
document.addEventListener("DOMContentLoaded", () => {
    const giftBtn = document.getElementById("giftBtn");
    if(!giftBtn) return;

    let audio;
    giftBtn.addEventListener("click", () => {
        if(!audio){
            audio = new Audio("https://raw.githubusercontent.com/bobby175/audio/main/v4.www-y2mate.blog%20-%20TULUS%20-%20Jatuh%20Suka%20(Official%20Lyric%20Video)%20(320%20KBps)%20(1)%20(mp3cut.net).mp3");
            audio.loop = false;
        }
        audio.play().catch(()=>{});
    });
});
