# 🧠 eSoft Hackathon Portal

A modern web application built with **Next.js** and **Tailwind CSS** for managing and participating in hackathons. Includes dashboards for **students**, **faculty**, and **admin** users.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Authentication**: JWT or NextAuth (optional)
- **State Management**: React Context / Zustand (optional)
- **Backend**: FastAPI (external, assumed)
- **Hosting**: Vercel

---

## 📦 Project Setup

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) installed globally

```bash
npm install -g pnpm
```

### 📥 Installation

```bash
pnpm install
```

### 💻 Local Development

```bash
pnpm dev
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### 🏗️ Build for Production

```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```
/
├── app/                       # App directory (Next.js 13+)
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   ├── dashboard/
│   │   ├── student/           # Student dashboard routes
│   │   └── faculty/           # Faculty dashboard routes
├── components/                # Reusable UI components
├── lib/                       # Utility functions and helpers
├── public/                    # Static assets
├── styles/                    # Global styles
├── tailwind.config.ts         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
└── README.md
```

---

## 🧠 Features

- 🔐 **Role-based dashboards**: Student, Faculty (and Admin if implemented)
- 🎯 **Project & team submissions**
- 🗳️ **Judging panel** (optional)
- 📢 **Announcements system**
- 📈 **Submission & evaluation dashboard**

---

## 🌐 Live URLs

- **Main Site:** [https://esoft-hackathon.vercel.app](https://esoft-hackathon.vercel.app)
- **Student Dashboard:** [https://esoft-hackathon.vercel.app/dashboard/student](https://esoft-hackathon.vercel.app/dashboard/student)
- **Faculty Dashboard:** [https://esoft-hackathon.vercel.app/dashboard/faculty](https://esoft-hackathon.vercel.app/dashboard/faculty)
- **Organization Dashboard:** [https://esoft-hackathon.vercel.app/dashboard/organization](https://esoft-hackathon.vercel.app/dashboard/organization)

---

## 🌐 Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
JWT_SECRET=your_secret_key
```

---

## 📚 Additional Notes

- **API Backend**: This project assumes an external FastAPI backend. Update `NEXT_PUBLIC_API_URL` as needed.
- **Authentication**: JWT-based or NextAuth can be used; configure as per your requirements.
- **Styling**: All styling is handled via Tailwind CSS, configured in `tailwind.config.ts`.
- **TypeScript**: The project is fully typed with `tsconfig.json`.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 🛡️ License

[MIT](LICENSE)

---

## 📬 Contact

For questions or support, please open an issue or reach out to the maintainers.