// ===========================
// 1. زر القائمة للموبايل
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// إغلاق القائمة عند النقر على أي رابط
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});


// ===========================
// 2. تمييز رابط التنقل الحالي
// ===========================
const sections = document.querySelectorAll('section');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
  let current = '';

  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


// ===========================
// 3. تبديل التبويبات في قسم عني
// ===========================
function switchTab(tabName) {

  // أزل كلاس active من جميع الأزرار وكل المحتويات
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.tab-content').forEach(function (tab) {
    tab.classList.remove('active');
  });

  // شغّل التبويب المحدد
  document.getElementById('tab-' + tabName).classList.add('active');

  // شغّل الزر الذي تم النقر عليه
  // event.target لا يعمل هنا فنستخدم querySelector باسم التبويب
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    if (btn.getAttribute('onclick') === "switchTab('" + tabName + "')") {
      btn.classList.add('active');
    }
  });

  // إذا فتح المستخدم تبويب المهارات نحرك الأشرطة
  if (tabName === 'skills') {
    // أعد الأشرطة إلى الصفر أولاً ثم حركها
    document.querySelectorAll('.skill-fill').forEach(function (bar) {
      bar.style.transition = 'none';
      bar.style.width = '0';
    });
    // بعد 50 مليثانية نشغّل التحريك
    setTimeout(function () {
      document.querySelectorAll('.skill-fill').forEach(function (bar) {
        bar.style.transition = 'width 1.2s ease';
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
    }, 50);
  }
}


// ===========================
// 4. أنيميشن أشرطة المهارات (إذا التبويب النشط هو المهارات)
// ===========================
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;

  const aboutSection = document.getElementById('about');
  const aboutTop = aboutSection.getBoundingClientRect().top;

  if (aboutTop < window.innerHeight - 100) {
    skillsAnimated = true;

    document.querySelectorAll('.skill-fill').forEach(function (bar) {
      bar.style.width = bar.getAttribute('data-width') + '%';
    });
  }
}

window.addEventListener('scroll', animateSkills);
animateSkills();


// ===========================
// 4. أنيميشن ظهور العناصر عند التمرير
// ===========================
// عند ظهور العنصر في الشاشة، أضف كلاس "visible" ليظهر بأنيميشن

function checkVisibility() {
  // نختار كل العناصر التي تحتاج أنيميشن
  const animatedElements = document.querySelectorAll('.slide-in-right, .slide-in-left');

  animatedElements.forEach(function (element) {
    const elementTop = element.getBoundingClientRect().top;

    // إذا أصبح العنصر مرئياً على الشاشة
    if (elementTop < window.innerHeight - 80) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); // فحص عند تحميل الصفحة


// ===========================
// 5. أنيميشن بطاقات الخدمات والأعمال
// ===========================
// نضيف تأخير لكل بطاقة لتظهر واحدة تلو الأخرى

function animateCards() {
  const cards = document.querySelectorAll('.service-card, .portfolio-card');

  cards.forEach(function (card, index) {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < window.innerHeight - 60) {
      // تأخير بسيط لكل بطاقة بناءً على ترتيبها
      setTimeout(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 80);
    }
  });
}

// نضع البطاقات مخفية في البداية
document.querySelectorAll('.service-card, .portfolio-card').forEach(function (card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateCards);
animateCards();


// ===========================
// 6. نموذج التواصل
// ===========================
function sendMessage() {
  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();
  const status  = document.getElementById('form-status');

  // التحقق من ملء جميع الحقول
  if (!name || !email || !subject || !message) {
    status.style.color = '#e53935';
    status.textContent = 'يرجى ملء جميع الحقول.';
    return;
  }

  // فتح تطبيق الإيميل مع الرسالة
  const mailto = 'mailto:bahaa6777@gmail.com'
    + '?subject=' + encodeURIComponent(subject + ' (من: ' + name + ')')
    + '&body=' + encodeURIComponent('الاسم: ' + name + '\nالإيميل: ' + email + '\n\n' + message);

  window.location.href = mailto;

  // رسالة نجاح للمستخدم
  status.style.color = '#2196F3';
  status.textContent = 'تم فتح تطبيق الإيميل. شكراً لتواصلك!';
}
