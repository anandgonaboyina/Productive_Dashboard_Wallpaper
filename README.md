# 🚀 Productive Dashboard & Dynamic Wallpaper

Welcome to the **Productive Dashboard**! This is a highly customizable, beautiful, and interactive dashboard designed to be used natively as your Windows desktop wallpaper (via Lively Wallpaper) or directly in your web browser. 

It tracks your health habits, manages your tasks and notes, provides focus timers, and serves up powerful motivational quotes—all layered over dynamic video or image backgrounds!

---

## ⚡ 1-Click Automated Setup (Less than 5 mins!)

You DO NOT need to be a programmer to install this. We've built an automated setup wizard that does all the heavy lifting.

1. **Extract the ZIP file** you downloaded to a permanent location on your PC (like `Documents/ProductiveDashboard`).
2. **Double-click `setup.bat`**.
3. **Follow the on-screen prompts**. The script will automatically:
   - Install Node.js (if you don't have it).
   - Download all required files.
   - Configure a secure local SQLite database (Zero XAMPP or third-party servers required!).
   - Create an invisible startup script (`start_hidden.vbs`) and place it in your Windows Startup folder so the dashboard boots silently every time you turn on your PC.

*Requirement: Make sure you have an active internet connection while running `setup.bat`!*

---

## 🎨 Connecting to Lively Wallpaper

To make this your actual interactive desktop background:
1. Download and install **Lively Wallpaper** (Free on the Microsoft Store).
2. Open Lively Wallpaper.
3. Click the **'+' (Add Wallpaper)** button at the top right.
4. Click **'Enter URL'** and type: `http://localhost:4321`
5. Click the arrow to save and apply. 

Boom! Your desktop is now a fully interactive productivity operating system.

---

## 🛠️ Features & How to Use Them

### 1. 👥 Multi-Profile System
- Click the profile icon in the top right (or in Settings) to switch between different users. 
- Every profile has its own entirely separate Database, Tasks, Notes, Health History, and Video preferences!

### 2. 📅 Health & Habit Tracking (Apple Rings Style)
- Click on the glowing rings to log a habit (e.g., drank water, exercised, meditated).
- The rings fill up dynamically.
- Your progress is saved automatically to the local database. At midnight, the rings reset, and your previous day's progress is securely archived in the History Logs!

### 3. ⏱️ Focus Timer & Countdowns
- Use the built-in Pomodoro timer to manage deep work. 
- You can add custom countdowns (e.g., "Days until Vacation") in the settings.

### 4. 📝 Tasks, Notes & Calendar
- **Tasks**: Add, complete, and delete daily to-do items.
- **Notes**: Write rich-text notes that autosave.
- **Calendar**: A sleek mini-calendar to check dates quickly.

### 5. 🎥 Dynamic Video Backgrounds
- The dashboard supports high-quality `.mp4` video backgrounds!
- Hover over the left edge of the screen to reveal the **Video Controls** (Play/Pause, Mute/Unmute).
- Want to add your own? Go to **Settings > Wallpapers** and upload your own `.mp4`, `.jpg`, or `.png` files!

### 6. 💡 100+ Motivational Quotes
- A massive built-in database of carefully curated productivity and stoic quotes cycles on your dashboard.
- It features an intelligent memory system that prevents the same quote from repeating in a single session!

---

## 🕵️ Hidden Features & Pro-Tips

* **Widget Locking & Customization**: Don't like where a widget is placed? You can drag and drop almost everything! If you want to lock them in place so you don't accidentally move them, go to **Settings > Preferences** and toggle "Lock Widgets".
* **The "Lively Click" Glitch Fix**: Lively Wallpaper sometimes loses "focus" when you click heavily. **If a button isn't responding**, simply click on an empty space on the desktop or another element first to regain focus, then click your target again. It will work!
* **Toggle Visibility**: Don't want to see the Health Rings or the Quote today? Go to **Settings > Preferences** and hide any widget you want for a minimalist look.
* **Database Safety**: All your data is saved locally on your machine inside a secure `.db` file. We don't use cloud servers, meaning your data is 100% private and works completely offline after the initial setup.

---

## 🧹 Data Management & Factory Reset

We respect your storage space. Inside **Settings > Data & Backup**, you can:
- **Clear Old Logs**: Delete Health and History logs older than a specific timeframe (15, 30, 60, 90, or 120 days) to keep your database fast and lightweight.
- **Export Data**: Export your tasks and notes to a `.csv` file.
- **Factory Reset Profile**: A hidden "Danger Zone" button that allows you to completely wipe all data for the current profile. It requires you to manually type "delete all" to prevent accidents.

---

## 👨‍💻 Developer Notes
Made with ❤️ by **Anand** for working more efficiently every day.

*(Note: The old Task Scheduler method is completely deprecated. Do not use Task Scheduler to start the server. The new `setup.bat` automatically places a lightweight `.vbs` script in your native Windows Startup folder, which is much faster and cleaner.)*