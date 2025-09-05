# AI-Powered Student Study Assistant 🚀

A comprehensive AI-powered study assistant for students and teachers, featuring free and premium tiers. Built with a modern tech stack and designed for seamless deployment and scalability.

---

## 🌐 [View Live](https://aibuddystudy.netlify.app/)

Check out the live deployed version of the app [here](https://aibuddystudy.netlify.app/).

---

## 📌 Comprehensive Prompt

> **Prompt Used for Building This Project:**  
>
> You are an expert full-stack developer. Build me a comprehensive AI-powered student study assistant with free and premium tiers.
>
> **Tech Stack:**
>
> - Frontend: React (with Tailwind CSS + shadcn/ui for styling, animations, responsive UI).
> - Backend: Node.js (Express).
> - Database/Auth/Storage: Supabase.
> - AI: OpenAI API (for quiz generation + chatbot).
> - Payments: Stripe (for premium upgrade).
>
> **Core Features:**
>
> 1. Authentication & Signup/Login  
>    - Signup/Login with name + password instead of just email.  
>    - Google/GitHub login (via Supabase).  
>    - Dashboard greets with “Welcome back, {Name}”.
>
> 2. AI-Powered Quiz Generator  
>    - Teachers/Students upload PDFs/Notes.  
>    - AI generates quizzes automatically.  
>    - Students can attempt quizzes.  
>    - Teachers can mark them.
>
> 3. AI Chatbot (Learning Assistant)  
>    - Learners can ask questions.  
>    - Save chat history for review.  
>    - Image upload (e.g., math problem) for clarification.  
>    - Microphone input for voice queries.  
>    - Free plan: 15 questions/day.  
>    - Premium: unlimited questions.
>
> 4. Free vs Premium Tiers  
>    - Free Plan: 15 chatbot questions/day, limited quizzes.  
>    - Premium Plan: Unlimited quizzes + chatbot.  
>    - Stripe integration for upgrade.
>
> **Improvements / UI/UX:**  
> - Modern dashboard (collapsible sidebar, top navbar)  
> - Profile photo dropdown for user settings  
> - Smooth animations (Framer Motion)  
> - Clear separation of student/teacher dashboards
>
> **Project Setup Instructions:**  
> 1. Running Locally  
>    - Clone repo, install dependencies, configure .env (OpenAI API key, Supabase keys, Stripe keys), and run backend + frontend locally (`npm run dev` for frontend, `npm run server` for backend).
> 2. Push to GitHub  
>    - Step-by-step guide and commands provided.
> 3. Deployment  
>    - Frontend: Vercel/Netlify  
>    - Backend: Render/Railway  
>    - Database/Auth: Supabase (cloud)  
>    - Payments: Stripe webhook configuration  
>    - Integration steps and deployment instructions requested.
>
> ✅ Deliver the codebase structure with clear separation of `frontend/` and `backend/`.  
> ✅ Provide final GitHub + deployment instructions for smooth running.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Node.js, Express
- **Database/Auth/Storage:** Supabase
- **AI:** OpenAI API
- **Payments:** Stripe

---

## 📁 Project Structure

```
├── frontend/            # React app, UI, assets, pages, components
│
├── backend/             # Node.js + Express API, Stripe integration, OpenAI logic
│
├── README.md            # Project documentation and setup
├── .env.example         # Example environment variable config
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ab494/ai-study-buddy-91.git
cd ai-study-buddy-91
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` in both folders to `.env` and fill in:

- **OpenAI API Key**
- **Supabase Project URL & Anon Key**
- **Stripe Secret Key**
- Any other required keys

#### Example `.env` (Frontend & Backend):

```
OPENAI_API_KEY=your-openai-key
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
STRIPE_SECRET_KEY=your-stripe-key
```

### 4. Run Locally

#### Frontend

```bash
npm run dev
```
Runs at [http://localhost:5173](http://localhost:5173)

#### Backend

```bash
npm run server
```
Runs at [http://localhost:5000](http://localhost:5000)

---

## 📝 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

---

## 🌐 Deployment

### Frontend (React)
- Deploy on [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/)
- Set build command: `npm run build`
- Publish directory: `dist`

### Backend (Node.js + Express)
- Deploy on [Render](https://render.com/) or [Railway](https://railway.app/)
- Configure environment variables
- Ensure backend URL matches frontend API calls

### Database/Auth/Storage (Supabase)
- Supabase is hosted in the cloud  
- Configure your project and keys at [supabase.com](https://supabase.com/)

### Payments (Stripe)
- Set up Stripe dashboard and webhook endpoint in backend
- Configure webhook in Stripe dashboard to point to your backend (`/stripe/webhook` endpoint)

### Integration Steps

- Make sure frontend `.env` points to backend/server URL and Supabase project
- Backend `.env` must have OpenAI, Supabase service key, Stripe secret
- Test payments, authentication, and AI features after deployment

---

## 👥 Collaborators

- **Marion Kipruto**  
  Email: marionrutto21@gmail.com
- **Brilliant Oluoch**  
  Email: brilliantoluoch01@gmail.com
- **Marion Achieng**  
  Email: marionachieng603@gmail.com
- **Moses Mbugua**  
  Email: mosesnjuguna601@gmail.com

---

## 📜 License

MIT License – feel free to use and modify for your needs.

---


Deployed on Netlify 🌐

---

## 🏷️ Button Functionality Update Prompt

> ### Button Functionality & UX Improvements
>
> I noticed that some buttons like the "Create Account" button are not working properly. Please update the project so that:
>
> 1. All buttons throughout the app (e.g., Create Account, Login, Continue with Google, Continue with GitHub, Upload Image, Send Voice Note, Upgrade, Logout, etc.) are fully functional when clicked.
> 2. Each button should be linked to its correct handler or function (e.g., Create Account → triggers user signup, Upgrade → triggers payment flow, Upload Image → opens file dialog and sends image to AI, etc.).
> 3. Add proper loading states (e.g., a spinner or “Please wait…” text) when a button action is processing (like signup, login, or sending a request to the chatbot).
> 4. Show success messages (e.g., “Account created successfully!”) or error messages (e.g., “Email already in use” or “Upload failed”) where appropriate.
> 5. Test and confirm all the buttons actually perform their expected functionality both on local machine and after deployment.

---
