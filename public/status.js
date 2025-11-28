// Status page functionality
document.addEventListener("DOMContentLoaded", () => {
  generateUptimeBars()
})

function generateUptimeBars() {
  const container = document.getElementById("uptimeBars")
  if (!container) return

  const days = 90

  for (let i = 0; i < days; i++) {
    const bar = document.createElement("div")
    bar.className = "uptime-bar"

    // Simulate uptime data (mostly operational with occasional issues)
    const random = Math.random()
    if (random > 0.98) {
      bar.classList.add("degraded")
      bar.title = "Rendimiento degradado"
    } else if (random > 0.995) {
      bar.classList.add("outage")
      bar.title = "Interrupción"
    } else {
      bar.classList.add("operational")
      bar.title = "100% operativo"
    }

    container.appendChild(bar)
  }
}
