// Particle Background
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  if (!particlesContainer) return

  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 20 + "s"
    particle.style.animationDuration = 15 + Math.random() * 10 + "s"
    particlesContainer.appendChild(particle)
  }
}

// Animated counter for stats
function animateValue(element, start, end, duration) {
  const startTime = performance.now()
  const isDecimal = end % 1 !== 0

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = start + (end - start) * easeOut

    if (end >= 1000000) {
      element.textContent = Math.floor(current / 1000000) + "M+"
    } else if (end >= 1000) {
      element.textContent = Math.floor(current / 1000) + "K+"
    } else if (isDecimal) {
      element.textContent = current.toFixed(1) + "%"
    } else {
      element.textContent = Math.floor(current) + "+"
    }

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

function initHeroStats() {
  const stats = document.querySelectorAll(".hero-stat-value")
  let animated = false

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true
          stats.forEach((stat) => {
            const target = Number.parseInt(stat.dataset.target)
            animateValue(stat, 0, target, 2000)
          })
        }
      })
    },
    { threshold: 0.5 },
  )

  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    observer.observe(heroStats)
  }
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      faqItems.forEach((faq) => faq.classList.remove("active"))

      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navLinks = document.getElementById("navLinks")
  const navButtons = document.querySelector(".nav-buttons")

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active")
      navLinks.classList.toggle("active")
      if (navButtons) {
        navButtons.classList.toggle("active")
      }
    })
  }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "rgba(3, 7, 18, 0.95)"
    } else {
      header.style.background = "rgba(3, 7, 18, 0.8)"
    }
  })
}

// Player simulation
function initPlayer() {
  const playBtn = document.getElementById("playBtn")
  const playIcon = playBtn?.querySelector(".play-icon")
  const pauseIcon = playBtn?.querySelector(".pause-icon")
  const progressFill = document.getElementById("progressFill")
  const progressThumb = document.getElementById("progressThumb")
  const currentTimeEl = document.getElementById("currentTime")

  let isPlaying = false
  let progress = 65
  const totalSeconds = 202 // 3:22

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      isPlaying = !isPlaying
      if (playIcon && pauseIcon) {
        playIcon.style.display = isPlaying ? "none" : "block"
        pauseIcon.style.display = isPlaying ? "block" : "none"
      }
    })
  }

  // Simulate progress
  setInterval(() => {
    if (isPlaying && progressFill && progressThumb) {
      progress += 0.1
      if (progress >= 100) progress = 0

      progressFill.style.width = progress + "%"
      progressThumb.style.left = progress + "%"

      const currentSeconds = Math.floor((progress / 100) * totalSeconds)
      const minutes = Math.floor(currentSeconds / 60)
      const seconds = currentSeconds % 60
      if (currentTimeEl) {
        currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`
      }
    }
  }, 100)
}

// Fade in animation on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  document.querySelectorAll(".feature-card, .command-item, .faq-item, .platform-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    fadeInObserver.observe(el)
  })
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  createParticles()
  initHeroStats()
  initFAQ()
  initMobileMenu()
  initSmoothScroll()
  initHeaderScroll()
  initPlayer()
  initScrollAnimations()
})
