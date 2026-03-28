# Quartermaster Command - MO2 Refining Suite

**Quartermaster Command** is a comprehensive, browser-based logistics and refining calculator built specifically for **Mortal Online 2**. Designed for dedicated crafters and guild quartermasters, it streamlines the complex process of metal refining, ore extraction, and resource management.

*Made by [MTM] Jaegh for the MERCATORUM guild.*
*"Steel wins battles, silver wins wars"*

---

## 🚀 Key Features

### 1. Production Command & Manufacturing Pipeline
* **Target Management:** Select an advanced target metal (e.g., Steel, Oghmium, Tungsteel, Cronite), input your desired quantity, and specify the number of crafters.
* **Dynamic Pipeline:** The app automatically generates a step-by-step extraction and refining route using highly accurate, game-tested yield data.
* **Route Optimization:** Toggle between **Efficient** (lowest overall material cost) and **Max Yield** (highest byproduct generation) paths. 
* **Byproduct Tracking:** Calculates and totals all secondary materials (byproducts) generated during the extraction and refining processes.

### 2. Inventory (Bank) & Market Cart
* **Bank Management:** Input your current stash of raw materials, catalysts, and intermediate ores.
* **Calculate Max Craftable:** A specialized calculator that evaluates your current bank and tells you the absolute maximum amount of your target resource you can craft *without* buying anything else.
* **Market Cart:** Automatically calculates the exact missing components needed to reach your production goal. Features an **Auto-Fill** button to instantly add missing items to your shopping cart and calculate total costs.

### 3. Guild Logistics & Discord Dispatch
* **Discord Integration:** Hook up a Discord Webhook URL to instantly dispatch logistics orders directly to your guild's Discord server. Orders are neatly formatted to show missing components, market purchases, and gathering requirements.
* **Share / Import Setups:** Generate a unique string code to share your current inventory, market cart, and target goals with other players, or paste a code to instantly load theirs.

### 4. Customization & Accessibility
* **Full Localization:** Translated into 16 languages (English, French, German, Spanish, Russian, Czech, and more).
* **Theming:** Toggle between Dark Mode (Default) and Light Mode. Fully customizable Primary, Secondary, and Text colors to match your aesthetic.
* **PWA Support:** Installable as a Progressive Web App (PWA) for a native, app-like experience on desktop or mobile.

---

## 📊 Data Accuracy
The extraction yields, catalyst requirements, and recipes are based on standard Mortal Online 2 refining data. It includes calculations for:
* Proper Blast Furnace vs. standard Furnace smelting efficiencies.
* Strict catalyst requirements for advanced metallurgy (e.g., Grain Steel, Steel, Messing, Bron).
* Configurable skill modifiers (Mastery, Refining, and Extraction skills can be toggled to apply their respective +6% / +3% yield bonuses).

---

## 🛠️ Tech Stack
Quartermaster Command is built using lightweight, dependency-free web technologies:
* **HTML5 / CSS3** (Custom responsive grid and modal system)
* **Vanilla JavaScript (ES6 Modules)** (No React, Vue, or heavy frameworks)
* **LocalStorage API** (Persistent state management without a backend database)
* **Service Workers** (For PWA caching and offline capabilities)

---

## 📥 Installation & Usage (Important)

Because this application utilizes modern JavaScript ES6 Modules (`import`/`export`), **you cannot simply double-click the `index.html` file to run it.** Modern web browsers will block the scripts from loading over the `file:///` protocol due to CORS security policies.

To run the app, you must serve it through a local web server. Here are the three easiest ways to do this:

### Option A: Visual Studio Code (Recommended)
1. Open the project folder in VS Code.
2. Install the **"Live Server"** extension.
3. Open `index.html` and click the **"Go Live"** button in the bottom right corner.

### Option B: Python (Windows / Mac / Linux)
1. Open your terminal or command prompt.
2. Navigate to the `QuartermasterCommand-main` folder.
3. Run the following command: `python -m http.server 8000`
4. Open your web browser and navigate to `http://localhost:8000`.

### Option C: Node.js
1. Open your terminal in the project folder.
2. Run `npx http-server`.
3. Open the provided `localhost` link in your browser.

---

## 📝 License & Contributions
This project was created for the Mortal Online 2 community. Feel free to fork, modify, and host your own versions for your respective guilds! 

*Special thanks to the MO2 community data miners and testers who make tools like this possible.*
