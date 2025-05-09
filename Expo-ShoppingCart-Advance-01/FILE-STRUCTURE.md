# Project File Structure

This project is a React Native (Expo) application organized for scalability and maintainability. Below is an overview of the main folders and files:

## Root Directory
- `app.json`, `package.json`, `tsconfig.json`: Project configuration files.
- `App.tsx`, `index.ts`: Main entry points for the app.
- `README.md`, `Prompt.md`, `SampleData.md`: Documentation and sample data.

## app/
Main application directory, following Expo Router conventions:
- `_layout.tsx`, `layout.tsx`: Layout components for the app and sub-sections.
- `index.tsx`, `not-found.tsx`: Main screen and 404 handler.
- Subfolders for navigation and features:
  - `drawer/`, `fonts/`, `modal/`, `stack/`, `tabs/`: Each contains its own `_layout.tsx`, `index.tsx`, and feature screens (e.g., `settings.tsx`, `help.tsx`, `about.tsx`).

## assets/
Static assets such as icons and images.

## components/
Reusable UI components:
- `CartBadge.tsx`, `ProductCard.tsx`, `ThemeToggle.tsx`, etc.

## context/
React context providers for state management:
- `CartContext.tsx`, `ThemeContext.tsx`

## data/
Data files, such as `products.tsx`.

## navigation/
Navigation logic and configuration:
- `DrawerNavigator.tsx`, `MainNavigator.tsx`, `StackNavigator.tsx`, `TabNavigator.tsx`

---

This structure separates concerns by feature and functionality, making the project easy to scale and maintain.