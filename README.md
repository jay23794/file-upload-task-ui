# File Upload Frontend

A file analysis system where users can upload files via a frontend UI, with the backend processing these files asynchronously to extract metadata, perform a mock virus scan, and generate a final analysis report

## Prerequisites

- Node.js (v16 or higher)
- npm 

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jay23794/file-upload-task-ui.git
   cd file-upload-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND=http://localhost:9000/api/v1/ 
   ```

4. **Ensure backend is running**
   
   Make sure your Node.js backend server is running on `http://localhost:9000` before starting the frontend.

## Run

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another port if 5173 is in use).

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production

```
