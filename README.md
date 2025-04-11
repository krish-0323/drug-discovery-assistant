This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Follow these steps to set up the project locally:

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_url_here
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_url_here
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=your_url_here
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=your_url_here
DATABASE_URL=your_database_url_here
GEMINI_API_KEY=your_gemini_api_key_here


npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


## Features  

### 1. Secure Authentication  
- Seamless Login using Google or GitHub accounts  
- Ensures user security, privacy, and personalized workspace  

### 2. Smart Research Notebooks  
- Create and manage disease-specific notebooks  
- User-friendly UI for organizing research data and AI-generated content  

### 3. Powered by Gemini API  
- Integration with Google's Gemini API for advanced data generation and query answering  
- Provides accurate, context-aware responses to user queries  

### 4. File Upload & Data Extraction  
- Upload research papers, PDFs, and other files  
- Automatically extract and summarize key data from uploaded documents  

### 5. Voice Input Feature  
- Speech-to-Text support for quick and effortless interaction  
- Helps users to input queries or notes through voice commands  