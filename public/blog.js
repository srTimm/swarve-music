document.addEventListener("DOMContentLoaded", () => {
  // Blog filters
  const filterBtns = document.querySelectorAll(".filter-btn")
  const blogCards = document.querySelectorAll(".blog-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter

      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      blogCards.forEach((card) => {
        const category = card.dataset.category
        if (filter === "all" || category === filter) {
          card.style.display = "flex"
          card.style.animation = "fadeInUp 0.5s ease forwards"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const input = newsletterForm.querySelector(".newsletter-input")
      const email = input.value

      // Simulate subscription
      input.value = ""
      alert("¡Gracias por suscribirte! Recibirás nuestras novedades en " + email)
    })
  }
})
