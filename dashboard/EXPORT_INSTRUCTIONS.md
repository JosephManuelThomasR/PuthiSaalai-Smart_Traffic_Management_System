# How to Export Your Project from Tempo Labs

## Option 1: Using the Git Tab

1. Click on the **Git** tab in the left sidebar
2. Click on the **Connect Repo** button
3. Follow the prompts to create a new repository or connect to an existing one
4. Once connected, you can commit and push your changes to your repository
5. Clone the repository to your local machine using `git clone <repository-url>`

## Option 2: Manual Export

1. Click on the **Share** button in the top right corner
2. Click on **Deploy** to build a static version of your app
3. Once deployed, you can download the built files
4. Alternatively, you can manually copy each file from the file editor to your local machine

## Running the Project Locally

1. Clone or download the project to your local machine
2. Navigate to the project directory
3. Install dependencies with `npm install`
4. Start the development server with `npm run dev`
5. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Project Structure

The project is structured as follows:

- `src/components/dashboard/` - Contains all dashboard components
- `src/components/layout/` - Contains layout components like Header, Sidebar, and Footer
- `src/components/login/` - Contains the login page
- `src/components/ui/` - Contains UI components from ShadCN

## Additional Notes

- The project uses Tailwind CSS for styling
- React Router is used for navigation
- The project is built with Vite
