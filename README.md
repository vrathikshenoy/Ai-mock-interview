# Ai-mock-interview


AI Interview Mocker is a web application designed to help users prepare for job interviews using AI-powered simulations and feedback. This project aims to double the chances of landing a job offer by providing realistic interview practice.

## Key Features & Benefits

- **AI-Powered Simulations:** Realistic interview simulations powered by AI.
- **Personalized Feedback:** Detailed feedback on interview performance.
- **Customizable Interviews:** Create and customize interview scenarios.
- **Dashboard:** Centralized dashboard for managing interviews and tracking progress.
- **User Authentication:** Secure user authentication using Clerk.js.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** (version >= 18 recommended)
- **npm** or **yarn** (package manager)
- **PostgreSQL:** (for database)
- **Neon.tech account:** (for PostgreSQL cloud instance)
- **Clerk.js account:** (for user authentication)

## Installation & Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/vrathikshenoy/Ai-mock-interview.git
    cd Ai-mock-interview
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Set up environment variables:**

    -   Create a `.env` file based on `.env.example`.
    -   Populate the `.env` file with your Clerk API keys and Neon PostgreSQL connection string.

        ```
        CLERK_SECRET_KEY=your_clerk_secret_key
        CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
        NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
        NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
        DATABASE_URL=postgresql://neondb_owner:your_password@your_neon_host/your_database_name?sslmode=require
        ```

4.  **Database setup:**

    -   Run Drizzle Kit to push the schema to the database:

        ```bash
        npx drizzle-kit generate:pg
        npx drizzle-kit push:pg
        ```

5.  **Run the application:**

    ```bash
    npm run dev # or yarn dev
    ```

    This will start the development server. Open your browser and navigate to `http://localhost:3000`.

## Usage Examples & API Documentation (if applicable)

The application provides a user-friendly interface for creating and participating in AI-powered mock interviews.  Navigate to the dashboard after signing in/up to begin.

-   **Creating a New Interview:**  Click on the "Add New Interview" button on the dashboard.
-   **Participating in an Interview:** Select an interview from the list to start the simulation.

## Configuration Options

-   **Environment Variables:**
    -   `CLERK_SECRET_KEY`: Clerk.js secret key.
    -   `CLERK_PUBLISHABLE_KEY`: Clerk.js publishable key.
    -   `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: URL for the sign-in page.
    -   `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: URL for the sign-up page.
    -   `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: URL to redirect to after signing in.
    -   `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: URL to redirect to after signing up.
    -   `DATABASE_URL`: PostgreSQL connection string.

-   **Styling:**
    -   The application uses Tailwind CSS for styling.  You can modify the `app/globals.css` file to customize the look and feel.

## Contributing Guidelines

Contributions are welcome!  Here's how you can contribute to this project:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear and descriptive commit messages.
4.  Submit a pull request to the main branch.

Please ensure your code adheres to the project's coding standards and includes relevant tests.

## License Information

The project does not currently specify a license. All rights are reserved by the owner.

## Acknowledgments

-   This project uses Clerk for user authentication.
-   This project uses Neon.tech for the PostgreSQL database.
-   The project structure and UI components are built using Next.js and Tailwind CSS.
-   Uses `drizzle-orm` as an ORM.

## Project Structure

```
├── .env.example
├── .gitattributes
├── Media Pipe Holistic Tutorial.ipynb
└── app/
    ├── (auth)/
    │   ├── sign-in/
    │   │   └── [[...sign-in]]/
    │   │       └── page.jsx
    │   └── sign-up/
    │       └── [[...sign-up]]/
    │           └── page.jsx
    ├── dashboard/
    │   ├── _components/
    │   │   ├── AddNewInterview.jsx
    │   │   ├── Header.jsx
    │   │   ├── InterviewItemCard.jsx
    │   │   └── InterviewList.jsx
    ├── about/
    │   └── page.jsx
    ├── interview/
    ├── globals.css
    ├── layout.js
    └── page.js
├── drizzle.config.js
└── lib/utils.js
```
```
