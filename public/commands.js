// Commands page functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("commandSearch")
  const categoryTabs = document.querySelectorAll(".category-tab")
  const commandCards = document.querySelectorAll(".command-full-card")

  let activeCategory = "all"

  // Category filtering
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")
      activeCategory = tab.dataset.category
      filterCommands()
    })
  })

  // Search filtering
  if (searchInput) {
    searchInput.addEventListener("input", filterCommands)
  }

  function filterCommands() {
    const searchTerm = searchInput?.value.toLowerCase() || ""

    commandCards.forEach((card) => {
      const category = card.dataset.category
      const commandName = card.querySelector("code")?.textContent.toLowerCase() || ""
      const description = card.querySelector(".command-description")?.textContent.toLowerCase() || ""

      const matchesCategory = activeCategory === "all" || category === activeCategory
      const matchesSearch = commandName.includes(searchTerm) || description.includes(searchTerm)

      if (matchesCategory && matchesSearch) {
        card.style.display = "block"
        card.style.animation = "fadeIn 0.3s ease"
      } else {
        card.style.display = "none"
      }
    })
  }
})
