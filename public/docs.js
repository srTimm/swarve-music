// Docs page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Sidebar navigation active state
  const docsSections = document.querySelectorAll(".docs-article")
  const navLinks = document.querySelectorAll(".docs-nav-link")

  const observerOptions = {
    rootMargin: "-100px 0px -50% 0px",
    threshold: 0,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }, observerOptions)

  docsSections.forEach((section) => observer.observe(section))

  // Accordion functionality
  const accordionItems = document.querySelectorAll(".accordion-item")

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header")

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      accordionItems.forEach((acc) => acc.classList.remove("active"))

      if (!isActive) {
        item.classList.add("active")
      }
    })
  })

  // Smooth scroll for sidebar links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const target = document.querySelector(targetId)

      if (target) {
        const headerOffset = 100
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})
