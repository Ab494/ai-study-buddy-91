# AI StudyBuddy Project 🚀

A modern web application built with **TypeScript** and **Vite**, designed for speed, scalability, and easy deployment.  
This project is hosted on **[Netlify](https://www.netlify.com/)** for seamless CI/CD and fast global delivery.

---

## 📂 Project Structure

```
├── public/            # Static assets (images, fonts, etc.)
├── src/               # Application source code
│   ├── assets/        # App-specific assets
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── App.tsx        # Root app component
│   ├── main.tsx       # App entry point
├── index.html         # HTML template
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
├── package.json       # Dependencies and scripts
```

---

## 🛠️ Tech Stack

- **Vite** – Lightning-fast development build tool
- **TypeScript** – Static typing for reliability
- **React (optional)** – For building modern UIs
- **ESLint + Prettier** – Code linting & formatting
- **Netlify** – Hosting & deployment

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

This starts the app at [http://localhost:5173](http://localhost:5173)

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment (Netlify)

1. Push your code to GitHub/GitLab/Bitbucket.
2. Go to [Netlify](https://www.netlify.com/) → **New Site from Git**.
3. Select your repository.
4. Set Build Command:  
   ```
   npm run build
   ```
5. Set Publish Directory:  
   ```
   dist
   ```
6. Click **Deploy Site** 🎉

---

## ⚙️ Environment Variables

If you need API keys or secrets, create a `.env` file:

```
VITE_API_URL=https://api.example.com
```

Access in code:

```ts
const apiUrl = import.meta.env.VITE_API_URL;
```

On Netlify, add these under:  
**Site Settings → Build & Deploy → Environment Variables**

---

## 🌍 Custom Domain

1. Buy a domain (e.g. Namecheap, Google Domains).
2. In Netlify Dashboard → Domain Settings, add your custom domain.
3. Update DNS records to point to Netlify.
4. Enable HTTPS with Let’s Encrypt SSL (1-click in Netlify).

---

## 🧪 Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build production app
npm run preview   # Preview build
npm run lint      # Lint code
```

---

## 📖 Contributing

1. Fork the repo
2. Create a new branch (`feature/awesome-feature`)
3. Commit changes (`git commit -m "Add awesome feature"`)
4. Push branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License – feel free to use and modify for your needs.

---

## 💡 Authors

Built with ❤️ by **Your Name**

Deployed on Netlify 🌐

---
