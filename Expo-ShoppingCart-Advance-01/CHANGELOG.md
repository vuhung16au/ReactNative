# Changelog

All notable changes to the Expo Core Components Advanced Application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-05-09

### Added
- Initial release with comprehensive navigation patterns:
  - Tab Navigation with Home, Menu, and About tabs
  - Stack Navigation for product listings and details
  - Drawer Navigation with Home, Settings, and Help screens
  - Modal Navigation with slide-up presentation
- File-based routing using Expo Router
- Custom 404 page with comprehensive styling
- Custom fonts integration (Inter and Roboto from Google Fonts)
- SafeArea implementation throughout the app
- Configured splash screen with custom background
- Sample product data (iPhone comparison)
- Theme switching with Dark/Light mode
  - ThemeContext with persistent preferences using AsyncStorage
  - Animated toggle component
- Shopping Cart state management
  - CartContext with add/remove/update functionality
  - Persistent storage with AsyncStorage
- Animations for smoother transitions
  - Entrance animations for screens and components
  - Interactive feedback animations
  - Smooth transitions between screens
  - Reanimated implementation for performance
- Data persistence with AsyncStorage
  - Theme preferences
  - Shopping cart items
  - Settings for data clearing
- UI enhancements
  - High-quality product images
  - Animated product cards
  - Comprehensive product detail screens
  - Category filtering system with animated indicators

## [0.2.0] - 2025-04-15

### Added
- Shopping Cart functionality
  - Created CartContext.tsx for state management
  - Implemented CartBadge component for visual feedback
  - Added persistent storage with AsyncStorage
- Theme switching capabilities
  - Built ThemeContext.tsx for app-wide theming
  - Created ThemeToggle component
  - Implemented persistent theme preferences

### Enhanced
- Product listings with filtering options
- Navigation with proper typing and structure
- General UI improvements and consistency

## [0.1.0] - 2025-03-20

### Added
- Initial project setup with Expo SDK ~53.0.8
- Basic navigation structure implementation:
  - Tab navigation foundation
  - Stack navigation for products
  - Drawer navigation structure
- Core screens for each navigation type
- Basic product data structure
- Project folder organization
- Sample data integration for testing

### Known Issues
- Theme switching not yet implemented
- Cart functionality incomplete
- Animations pending implementation
- Navigation transitions need refinement