# Japanese Vocabulary Quiz

An interactive web application to learn 200 high-frequency Japanese verbs through multiple-choice quizzes.

## Features

- 200 common Japanese verbs with kanji, romaji, and English translations
- Multiple-choice quiz format (Japanese → English)
- Text-to-speech pronunciation using Web Speech API
- Real-time feedback on answers
- Track your progress with correct/incorrect counts and current streak
- Responsive design for desktop and mobile
- Practice mode with endless questions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to deploy

### Option 2: Deploy via GitHub + Vercel Dashboard

1. Push your code to a GitHub repository:
```bash
git add .
git commit -m "Initial commit: Japanese vocabulary quiz app"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)

3. Click "Add New" → "Project"

4. Import your GitHub repository

5. Vercel will automatically detect Next.js and configure the build settings

6. Click "Deploy"

7. Your app will be live at `https://your-project-name.vercel.app`

### Option 3: One-Click Deploy

Click the button below to deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/japanese-vocab-quiz)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Text-to-Speech**: Web Speech API
- **Deployment**: Vercel

## How to Use

1. A Japanese verb is displayed with its romaji transliteration
2. Click the speaker icon to hear the pronunciation
3. Choose the correct English translation from 4 options
4. Receive immediate feedback
5. Click "Next Question" to continue practicing
6. Track your progress with the stats at the top

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main quiz page
│   └── globals.css      # Global styles
├── components/
│   ├── Quiz.tsx                    # Main quiz component
│   └── PronunciationButton.tsx     # Text-to-speech button
├── data/
│   └── verbs.ts         # Database of 200 Japanese verbs
└── package.json         # Dependencies
```

## License

MIT
