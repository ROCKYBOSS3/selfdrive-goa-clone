/*=====================================================================
  SELF DRIVE CAR GOA — Interactions
=====================================================================*/

document.addEventListener("DOMContentLoaded", function () {
  initBookingForm();
  initPopup();
  initBrandSlider();
  initMobileWhatsApp();
});

/*--------------------------------------------------------------
  Booking form → WhatsApp (mirrors reference behaviour)
--------------------------------------------------------------*/
function initBookingForm() {
  const form = document.getElementById("goaBookingForm");
  const msg = document.getElementById("goaBookingMessage");
  if (!form) return;

  const whatsappNumber = "9096626233";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fd = new FormData(form);
    const name = fd.get("name");
    const mobile = fd.get("mobile");
    const pickupDate = fd.get("pickup_date");
    const pickupTime = fd.get("pickup_time");
    const pickupLocation = fd.get("pickup_location");
    const dropoffDate = fd.get("dropoff_date");
    const dropoffTime = fd.get("dropoff_time");
    const dropoffLocation = fd.get("dropoff_location");
    const car = fd.get("car");

    const message =
      "🚗 NEW GOA CAR BOOKING\n\n" +
      "👤 Name: " + name + "\n" +
      "📱 Mobile: " + mobile + "\n\n" +
      "📅 Pick-up Date: " + pickupDate + "\n" +
      "⏰ Pick-up Time: " + pickupTime + "\n" +
      "📍 Pick-up Location: " + pickupLocation + "\n\n" +
      "📅 Drop-off Date: " + dropoffDate + "\n" +
      "⏰ Drop-off Time: " + dropoffTime + "\n" +
      "📍 Drop-off Location: " + dropoffLocation + "\n\n" +
      "🚘 Car: " + car;

    const whatsappURL =
      "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");

    // Show feedback message
    if (msg) {
      msg.style.display = "block";
      msg.innerHTML = "✓ Booking request sent via WhatsApp.";
      msg.style.background = "rgba(0,255,100,.15)";
      msg.style.color = "#065f46";
    }

    form.reset();

    setTimeout(function () {
      if (msg) msg.style.display = "none";
    }, 6000);
  });
}

/*--------------------------------------------------------------
  On-load booking popup (3s delay, mirroring the reference popup)
--------------------------------------------------------------*/
function initPopup() {
  const overlay = document.getElementById("popupOverlay");
  const closeBtn = document.getElementById("popupClose");
  if (!overlay || !closeBtn) return;

  // Open after 3 seconds (same timing as reference)
  const timer = setTimeout(function () {
    overlay.style.display = "flex";
  }, 3000);

  function closePopup() {
    overlay.style.display = "none";
    clearTimeout(timer);
  }

  closeBtn.addEventListener("click", closePopup);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePopup();
  });
}

/*--------------------------------------------------------------
  Simple brand slider (touch + arrow navigation)
--------------------------------------------------------------*/
function initBrandSlider() {
  const track = document.querySelector(".brand-track");
  if (!track) return;

  const prev = document.querySelector(".brand-prev");
  const next = document.querySelector(".brand-next");
  const slideWidth = 170; // approx card width incl. padding

  if (prev) {
    prev.addEventListener("click", function () {
      track.scrollBy({ left: -slideWidth, behavior: "smooth" });
    });
  }
  if (next) {
    next.addEventListener("click", function () {
      track.scrollBy({ left: slideWidth, behavior: "smooth" });
    });
  }

  // Touch / drag support
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener("mousedown", function (e) {
    isDown = true;
    track.classList.add("dragging");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener("mouseleave", function () {
    isDown = false;
    track.classList.remove("dragging");
  });
  track.addEventListener("mouseup", function () {
    isDown = false;
    track.classList.remove("dragging");
  });
  track.addEventListener("mousemove", function (e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });
}

/*--------------------------------------------------------------
  Show desktop WhatsApp CTA in header on larger screens
--------------------------------------------------------------*/
function initMobileWhatsApp() {
  // No-op placeholder: header WhatsApp CTAs are handled via CSS media queries.
  // Kept for future enhancements (e.g. sticky mobile bar).
}

/*--------------------------------------------------------------
  Smooth reveal on scroll (light enhancement)
--------------------------------------------------------------*/
const observerOptions = { threshold: 0.12, rootMargin: "0px 0px -60px 0px" };
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".car-card, .why-card, .step-card, .stat-card").forEach(function (el) {
  observer.observe(el);
});
