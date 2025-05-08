Update this program to show example usage of Expo's core components, as follows: 


Basic Components
Most apps will end up using one or more of these basic components.

View
The most fundamental component for building a UI.

Text
A component for displaying text.

Image
A component for displaying images.

TextInput
A component for inputting text into the app via a keyboard.

ScrollView
Provides a scrolling container that can host multiple components and views.

StyleSheet
Provides an abstraction layer similar to CSS stylesheets.

User Interface
These common user interface controls will render on any platform.

Button
A basic button component for handling touches that should render nicely on any platform.

Switch
Renders a boolean input.

List Views
Unlike the more generic ScrollView, the following list view components only render elements that are currently showing on the screen. This makes them a performant choice for displaying long lists of data.

FlatList
A component for rendering performant scrollable lists.

SectionList
Like FlatList, but for sectioned lists.

iOS Components and APIs
Many of the following components provide wrappers for commonly used UIKit classes.

ActionSheetIOS
API to display an iOS action sheet or share sheet.

Others
These components may be useful for certain applications. For an exhaustive list of components and APIs, check out the sidebar to the left (or menu above, if you are on a narrow screen).

ActivityIndicator
Displays a circular loading indicator.

Alert
Launches an alert dialog with the specified title and message.

Animated
A library for creating fluid, powerful animations that are easy to build and maintain.

Dimensions
Provides an interface for getting device dimensions.

KeyboardAvoidingView
Provides a view that moves out of the way of the virtual keyboard automatically.

Linking
Provides a general interface to interact with both incoming and outgoing app links.

Modal
Provides a simple way to present content above an enclosing view.

PixelRatio
Provides access to the device pixel density.

RefreshControl
This component is used inside a ScrollView to add pull to refresh functionality.

StatusBar
Component to control the app status bar.

source: https://reactnative.dev/docs/components-and-apis

# Prompt 2 

Update `README.md` to describe the feature of this app 

``` 
I've updated the App.tsx file to showcase examples of all the Expo core components you requested. The update includes:

Basic Components Section
View & Text: Demonstrates basic layout and text display capabilities
Image: Shows how to display an image using the local icon asset
TextInput: Implements a text input field with real-time value display
Button: Shows a clickable button that triggers an Alert
Switch: Demonstrates a toggle switch with state management
List Views Section
FlatList: Shows a performant scrollable list with sample data
SectionList: Displays a sectioned list with headers and items
Other Components Section
ActivityIndicator: Shows a loading spinner
Alert: Demonstrates how to trigger alert dialogs
Animated: Shows a fade-in animation with a button to trigger it
Dimensions: Displays the current window dimensions
PixelRatio: Shows device pixel ratio information
Modal: Demonstrates a modal overlay with open/close functionality
Linking: Shows how to open external URLs
ActionSheetIOS: Platform-specific component for iOS (with conditional rendering)
KeyboardAvoidingView: Shows a view that adjusts when keyboard appears
RefreshControl: Implemented within the main ScrollView to demonstrate pull-to-refresh
StatusBar: Applied at the top of the app
I've organized the components into a clean, user-friendly layout with sections and styled cards for each component example. The code has no errors and includes proper state management for interactive components.

You can run the app to see all these components in action. The examples should work well on both iOS and Android devices (with platform-specific components only appearing on the appropriate platform).
```

