# 🎶 Swarve Music Bot

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Discord Server](https://img.shields.io/discord/XXXXXX?label=Discord&logo=discord&color=7289DA)](https://discord.gg/YOUR_INVITE_LINK)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D16-green.svg)](https://nodejs.org/)

Swarve Music is a **minimalist, powerful, and open-source** music bot for Discord, designed to provide a high-quality audio playback experience with maximum stability. We use **Lavalink** for audio management, ensuring seamless and interruption-free performance.

## ✨ Key Features

* **High-Quality Audio:** Leverages the powerful [Lavalink](https://github.com/Lavalink-Devs/Lavalink) audio server for stable and low-latency playback.
* **Minimalist:** Only two essential commands, making it easy to use and maintain.
* **Open Source:** Flexible for anyone to inspect, modify, and contribute.
* **🌐 Web Component Included:** The project also contains the bot's static marketing website, located in the **`public/`** directory.

***

## 🛠️ Commands

Swarve Music is designed to be straightforward. You only need two commands to control your entire music experience.

| Command | Usage | Description |
| :--- | :--- | :--- |
| **`/play`** | `/play [song name/URL]` | **Plays** a song or adds one to the queue. Supports searches and direct links (platform support depends on your Lavalink setup). |
| **`/pause`** | `/pause` | **Pauses** the current playback. Run it again to resume the music. |

***

## 🚀 Deployment and Installation

### 1. Requirements

* **Node.js** (v16.x or higher)
* Discord **Bot Token**.
* A functional **Lavalink** instance, pre-configured in the source code.

### 2. Installation Steps

Clone the repository, install the dependencies, and start the bot.

```bash
# Clone the repository
git clone [https://github.com/srTimm/swarve-music.git](https://github.com/srTimm/swarve-music.git)
cd swarve-music

# Install Node.js dependencies
npm install

# Start the bot (Ensure your Bot Token is configured properly)
node .
````

> **Note:** The Lavalink connection configuration and Bot Token must be set directly in the base code (e.g., in an environment file like `.env`) prior to installation.

### 🌐 Accessing the Website

The source files for the Swarve Music website are located in the **`public/`** directory.

To host the website, you can simply deploy the contents of this folder using any static web hosting service (like Vercel, Netlify, or GitHub Pages).

-----

## 🤝 Contributions

Swarve Music is an open-source project, and we welcome any contributions. If you wish to improve the bot, fix a bug, or add a feature, please:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/new-feature`).
3.  Make your changes and commit them (`git commit -m 'feat: Add new feature X'`).
4.  Push your changes (`git push origin feature/new-feature`).
5.  Open a **Pull Request**.

-----

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/srTimm/swarve-music/blob/main/LICENSE) file for more details.

-----

## 📧 Contact

If you have questions or need support, you can find us on our Discord server or contact **[coconube_diego]**.

**Enjoy the music\!**
```
```