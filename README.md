# Google App Clone - React Native

This is a **React Native** project that replicates the core functionalities of the Google App. It includes features like **Google Login**, **Voice Search**, **Google Lens functionality**, **Realtime Weather Data**, and more. The app is built using modern React Native libraries and tools, ensuring a smooth and responsive user experience.

---

## Features

- **Google Login Integration**: Secure authentication using `@react-native-google-signin/google-signin`.
- **Latest News Feed**: Displays the latest news articles in a clean and responsive UI.
- **Google Lens Functionality**: Scan and search for anything using your camera. Implemented using reverse scraping of the Google Lens API.
- **Voice Search**: Fully functional voice search using `@react-native-voice/voice`.
- **Realtime Weather Data**: Fetches and displays weather information based on the user’s location using `@react-native-community/geolocation`.
- **Links to Google Services**: Quick access to Google services like Gmail, Maps, and Drive via an in-app browser.
- **Shimmer Effect**: Sleek loading animations using `react-native-shimmer-placeholder`.
- **Responsive UI**: Designed to closely mirror the Google App, with a focus on simplicity and aesthetic appeal.

---

## Technologies and Packages Used

- **Core Libraries**:
  - `react`: 18.3.1
  - `react-native`: 0.76.6
  - `axios`: For API requests.
  - `form-data`: For handling multipart/form-data requests.

- **Navigation**:
  - `@react-navigation/native`: For navigation.
  - `@react-navigation/bottom-tabs`: For bottom tab navigation.
  - `@react-navigation/native-stack`: For stack navigation.

- **Authentication**:
  - `@react-native-google-signin/google-signin`: For Google login integration.

- **Voice Recognition**:
  - `@react-native-voice/voice`: For voice search functionality.

- **Location and Weather**:
  - `@react-native-community/geolocation`: For fetching user location.
  - `react-native-permissions`: For handling location permissions.

- **Camera and Image Processing**:
  - `react-native-vision-camera`: For camera functionality in Google Lens feature.
  - `react-native-fast-image`: For optimized image loading.

- **UI Enhancements**:
  - `react-native-linear-gradient`: For gradient backgrounds.
  - `react-native-svg`: For scalable vector graphics.
  - `react-native-vector-icons`: For icons.
  - `@gorhom/bottom-sheet`: For interactive bottom sheets.
  - `react-native-modalize`: For modal screens.

- **Animations and Feedback**:
  - `react-native-reanimated`: For smooth animations.
  - `react-native-gesture-handler`: For gesture-based interactions.
  - `react-native-haptic-feedback`: For tactile feedback.

- **Responsive Design**:
  - `react-native-responsive-dimensions`: For responsive UI components.

- **Loading States**:
  - `react-native-shimmer-placeholder`: For shimmer effects during loading.

---

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions up to the "Creating a new application" step before proceeding.

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/Saif-09/GoogleAppClone
cd google-app-clone
# using npm
npm install

# OR using Yarn
yarn install

## Environment Variables

To run this project, you will need to set up the following environment variables in a `.env` file. Create a `.env` file in the root directory of the project and add the variables as shown below:

```plaintext
# Google API Keys for Authentication
IOS_CLIENT_ID=your_ios_client_id
WEB_CLIENT_ID=your_web_client_id

# API Keys for External Services
SERP_API=your_serp_api_key
WEATHER_API_KEY=your_weather_api_key
NEWS_API_KEY=your_news_api_key
SCRAPING_DOG_API_KEY=your_scraping_dog_api_key

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name