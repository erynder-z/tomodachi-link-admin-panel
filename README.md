# Tomodachi-Link Admin Panel

An admin panel to moderate content for Tomodachi-Link.

## Installation

1.  Clone the repository to your local machine: `git clone https://github.com/erynder-z/tomodachi-link-admin-panel.git`
2.  Navigate to the project directory: `cd tomodachi-link-admin-panel`
3.  Install the required dependencies: `npm install`
4.  Start the development server: `npm run dev`

## Usage

### 1. Setup Environment Variables

Before running the application, ensure you have set up the following environment variables in a `.env` file:

```shell
VITE_SERVER_URL=<URL_of_the_Server_running_the_backend>
VITE_STORAGE_ENCRYPTION_KEY=<secret_key_for_the_encrypted_localstorage>
VITE_FAKE_SIGNUP_PASSWORD=<Placeholder_password_used_during_fake_user_generation>
```

### 2. Install Tomodachi-Link Backend

The backend for Tomodachi-Link is a separate repo, so you need to install and run the [Tomodachi-Link Backend](https://github.com/erynder-z/tomodachi-link-backend).

## Acknowledgments

- [vite](https://vitejs.dev/) - Next generation frontend tooling.
- [typescript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [tailwindcss](https://tailwindcss.com/) - Utility-first CSS framework.
- [d3](https://d3js.org/) - A JavaScript library for manipulating documents based on data.
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library.
- [emoji-picker-react](https://github.com/missive/emoji-picker-react) - React component for picking emojis.
- [encrypt-storage](https://www.npmjs.com/package/encrypt-storage) - Library for encrypting local storage data.
- [react](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [react-icons](https://react-icons.github.io/react-icons/) - Library for icons in React.
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner) - Loader spinner component for React.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start) - DOM bindings for React Router.
