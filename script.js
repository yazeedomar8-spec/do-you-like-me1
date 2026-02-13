const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const playArea = document.querySelector(".play-area");
const messageBox = document.querySelector(".love-message");
const questionContainer = document.querySelector(".question-container");
const beanGif = document.querySelector(".local-gif");
const question = document.querySelector(".question");

let attempts = 0;
const maxAttempts = 12; // زودنا المحاولات
let escaped = false;
let escapeStyle = 0;
let noClickCount = 0;

// قائمة رسائل لزر No
const noMessages = [
  "No 😈",
  "Are you sure? 🤨",
  "Try again? 👀",
  "Still no! 😤",
  "I said NO! 🚫",
  "Why you do this? 🥺",
  "Stop clicking! 🛑",
  "You're persistent 😅",
  "OK fine... 🙄",
  "Maybe later? ⏰",
  "LAST WARNING! ⚠️",
  "😭 Can u just STOP?"
];

// قائمة ألوان لزر No
const noColors = [
  "#ff5a4a",
  "#ff4a3a",
  "#ff3a2a",
  "#ff2a1a",
  "#ff1a0a",
  "#e60a00",
  "#cc0000",
  "#b20000",
  "#990000",
  "#7f0000",
  "#660000",
  "#963838"
];

// زر Yes - نسخة محسنة
yesBtn.addEventListener("click", () => {
  // 1. تشغيل صوت إذا حابب (اختياري)
  // playSound('happy.mp3');
  
  // 2. إضافة fade out للعناصر القديمة
  questionContainer.classList.add("fade-out");
  
  // 3. تأخير بسيط قبل إظهار رسالة الحب
  setTimeout(() => {
    // إخفاء العناصر القديمة
    beanGif.style.display = "none";
    question.style.display = "none";
    playArea.style.display = "none";
    
    // إظهار رسالة الحب
    messageBox.classList.remove("hidden");
    
    // إضافة تأثيرات خاصة لرسالة الحب
    messageBox.style.animation = "fadeInUp 0.8s ease";
    
    // إضافة قلوب متطايرة
    createHearts();
    
  }, 400);
  
  // 4. إخفاء الأزرار بعد الانتهاء
  setTimeout(() => {
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
  }, 800);
});

// دالة إضافة قلوب متطايرة 💖
function createHearts() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.innerHTML = "💖";
      heart.style.position = "absolute";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = Math.random() * 100 + "%";
      heart.style.fontSize = Math.random() * 30 + 20 + "px";
      heart.style.opacity = "0";
      heart.style.animation = `floatHeart ${Math.random() * 2 + 2}s ease forwards`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "1000";
      
      // إضافة animation للقلب
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes floatHeart {
          0% { opacity: 0; transform: translateY(0) rotate(0deg); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-100px) rotate(20deg); }
        }
      `;
      document.head.appendChild(style);
      
      document.body.appendChild(heart);
      
      // حذف القلب بعد الانتهاء
      setTimeout(() => heart.remove(), 4000);
    }, i * 100);
  }
}

// دالة تحريك زر No - نسخة متطورة
function moveNoButton(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  if (messageBox.classList.contains("hidden") === false) return;
  if (attempts >= maxAttempts) return;

  attempts++;
  noClickCount++;
  
  // تغيير رسالة زر No
  if (attempts <= noMessages.length) {
    noBtn.textContent = noMessages[attempts - 1];
  }
  
  // تغيير لون زر No تدريجياً
  if (attempts <= noColors.length) {
    noBtn.style.backgroundColor = noColors[attempts - 1];
  }
  
  // تفعيل وضع الهروب من أول محاولة
  if (!escaped) {
    noBtn.classList.add("escape");
    escaped = true;
  }
  
  // تغيير نمط الهروب (3 أنماط مختلفة)
  escapeStyle = (escapeStyle % 3) + 1;
  
  // إزالة أنماط الهروب السابقة
  noBtn.classList.remove("escape-fast", "escape-sneaky", "escape-circular");
  
  // إضافة نمط الهروب الجديد
  switch(escapeStyle) {
    case 1:
      noBtn.classList.add("escape-fast");
      break;
    case 2:
      noBtn.classList.add("escape-sneaky");
      break;
    case 3:
      noBtn.classList.add("escape-circular");
      break;
  }
  
  // إذا وصل لأقصى المحاولات
  if (attempts === maxAttempts) {
    noBtn.textContent = "😭 Can u just STOP?";
    noBtn.style.backgroundColor = "#4CAF50"; // يخضر في النهاية 😂
    noBtn.style.cursor = "default";
    noBtn.classList.add("explode");
    
    setTimeout(() => {
      noBtn.classList.remove("escape", "escape-fast", "escape-sneaky", "escape-circular");
      noBtn.style.position = "relative";
      noBtn.style.left = "";
      noBtn.style.top = "";
    }, 500);
    return;
  }
  
  // حساب موقع الهروب الذكي
  const areaRect = playArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  
  let maxX, maxY, x, y;
  
  // أنماط هروب مختلفة حسب الـ escapeStyle
  if (escapeStyle === 1) {
    // هروب عشوائي سريع
    maxX = Math.max(0, areaRect.width - btnRect.width - 20);
    maxY = Math.max(0, areaRect.height - btnRect.height - 20);
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  } else if (escapeStyle === 2) {
    // هروب للأركان
    const corners = [
      [0, 0],  // أعلى يسار
      [areaRect.width - btnRect.width - 20, 0],  // أعلى يمين
      [0, areaRect.height - btnRect.height - 20],  // أسفل يسار
      [areaRect.width - btnRect.width - 20, areaRect.height - btnRect.height - 20]  // أسفل يمين
    ];
    const randomCorner = corners[Math.floor(Math.random() * corners.length)];
    x = randomCorner[0];
    y = randomCorner[1];
  } else {
    // هروب دائري (حول الزر Yes)
    const yesRect = yesBtn.getBoundingClientRect();
    const areaRectRelative = playArea.getBoundingClientRect();
    
    x = (yesRect.left - areaRectRelative.left) + (Math.random() * 100 - 50);
    y = (yesRect.top - areaRectRelative.top) + (Math.random() * 100 - 50);
    
    // التأكد من الحدود
    x = Math.max(0, Math.min(areaRect.width - btnRect.width - 20, x));
    y = Math.max(0, Math.min(areaRect.height - btnRect.height - 20, y));
  }
  
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  
  // تأثيرات إضافية
  if (attempts % 3 === 0) {
    // كل 3 محاولات يرتجف بقوة
    noBtn.style.transform = "scale(1.2)";
    setTimeout(() => noBtn.style.transform = "scale(1)", 200);
  }
  
  console.log(`Attempt ${attempts}: ${noMessages[attempts - 1]}`);
}

// تحسينات للشاشات الصغيرة
function checkScreenSize() {
  if (window.innerWidth <= 600) {
    noBtn.classList.remove("escape", "escape-fast", "escape-sneaky", "escape-circular");
    noBtn.style.position = "relative";
    noBtn.style.left = "";
    noBtn.style.top = "";
    escaped = false;
  }
}

// الأحداث مع تحسينات
noBtn.addEventListener("mouseenter", (e) => {
  if (window.innerWidth > 600) {
    moveNoButton(e);
  }
});

noBtn.addEventListener("click", (e) => {
  if (window.innerWidth > 600 || attempts < 3) {
    moveNoButton(e);
  }
});

noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (window.innerWidth > 600 || attempts < 3) {
    moveNoButton(e);
  }
});

// هروب عند تحريك الماوس بسرعة
noBtn.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.7 && window.innerWidth > 600) { // 30% فرصة للهروب
    moveNoButton(e);
  }
});

window.addEventListener("resize", checkScreenSize);
checkScreenSize();

console.log("✨ Super Enhanced Script Loaded! ✨");