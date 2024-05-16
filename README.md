
# Ecosorter 
![Logo](https://i.imgur.com/C0doVmO.png)
The Ecosorter App, crafted with React Native for cross-platform compatibility, revolutionizes waste management. Utilizing a custom-built TensorFlow model trained on 25,000 images, it accurately categorizes waste into eight distinct types: paper, tech, baggy, plastic, metal cans, leaf, food, and wood. The app boasts a visually stunning UI, featuring fluid animations and supporting both light and dark themes. Providing comprehensive information, including facts, charts, videos, and photos, it educates users about each waste category.
With Firebase authentication seamlessly integrated, the app ensures secure user access, complemented by push notification support. To stimulate engagement, Ecosorter implements a competitive edge through a leaderboard and scoring system. Real-time score updates are facilitated by Cloud Firestore, enhancing the interactive and dynamic user experience. The app also offers a choice between light and dark modes for personalized visual preferences. Leveraging the power of Cloud Firestore, Ecosorter exemplifies a forward-looking waste management solution that not only enhances user awareness but also delivers a rich and engaging experience.



## Badges
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

## Features

- IOS and Android support
- Fluid interactive animations
- Vibrant dark and light themes
- Firebase powered secure auth
- FCM powered Scheduled and custom push notifications
- interactive maps to find waste centres
- Detailed charts, videos, heatmaps, pictures to educate users
- Custom avatars and competitive leaderboards 
- Custom API and caching techniques implemented for faster retrieval of data



## Demo

| Android(v1.2.0) | IOS(alpha build) |
| ---------| ---------|
| [![Everything Is AWESOME](https://images.unsplash.com/photo-1521989116480-519a01ffeb2d?w=500&q=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHlvdXR1YmV8ZW58MHx8MHx8fDA%3D)](https://youtu.be/WavyHh-GeuE)| [![Everything Is AWESOME](https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=500&q=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW91dHViZSUyMGFuZHJvaWR8ZW58MHx8MHx8fDA%3D)](https://youtu.be/DiZrbxb3a70)|


## Screenshots

[App Screenshots](https://imgur.com/a/c68Ct2Y)
## Tech Stack

**Frontend:**
- React Native, Expo
- React Navigation, React Query, Tanstack Query
- Shopify Skia, Paper, Modal
- Lottie, Reanimated, SVG
- Maps, WebView
- Victory Native, Gesture Handler
- Firebase, Firestore

**Backend:**
- Firebase

**Additional Libraries:**
- Toast: @backpackapp-io/react-native-toast
- Collapsible View: @eliav2/react-native-collapsible-view
- Bottom Sheet: @gorhom/bottom-sheet
- Async Storage: @react-native-async-storage/async-storage
- Google Sign-In: @react-native-google-signin/google-signin
- Masked View: @react-native-masked-view/masked-view
- HTTP Requests: axios
- Color: color
- Authentication Session: expo-auth-session
- Camera: expo-camera
- Location: expo-location
- Notifications: expo-notifications
- File System: expo-asset, expo-crypto, expo-file-system
- Fonts: expo-font
- Device Info: expo-device
- Application Insights: expo-insights
- Constants: expo-constants
- Splash Screen: expo-splash-screen
- System UI: expo-system-ui
- Updates: expo-updates
- Web Browser: expo-web-browser
- Dev Client: expo-dev-client



## Installation

- Download APK from releases tab

- Click on install anyway

- Allow all permissions
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/Megahedron69/EcoSorter
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npx expo start
```
Choose android /ios/expo go from terminal



## Color Reference

| Light Theme             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary | ![#006e1c](https://via.placeholder.com/10/006e1c?text=+) #006e1c |
| Secondary | ![#0061a4](https://via.placeholder.com/10/0061a4?text=+) #0061a4 |
| Tertiary | ![#96480e](https://via.placeholder.com/10/96480e?text=+) #96480e |
| Surface | ![#fcfdf6](https://via.placeholder.com/10/fcfdf6?text=+)#fcfdf6 |

| Dark Theme             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary     | ![#78dc77](https://via.placeholder.com/10/78dc77?text=+) #78dc77 |
| Secondary   | ![#9ecaff](https://via.placeholder.com/10/9ecaff?text=+) #9ecaff |
| Tertiary    | ![#ffb68c](https://via.placeholder.com/10/ffb68c?text=+) #ffb68c |
| Surface     | ![#1a1c19](https://via.placeholder.com/10/1a1c19?text=+) #1a1c19 |



## API Reference

#### Get all items

```http
  GET https://mocki.io/v1/
```

| Parameter | Type     | Value                |
| :-------- | :------- | :------------------------- |
| `instance_id` | `string` | **Required**. e7c35e30-4554-4562-935c-628cd7e8eac6 |



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#from firebase

`EXPO_PUBLIC_apiKey`

`EXPO_PUBLIC_authDomain`

`EXPO_PUBLIC_projectId`

`EXPO_PUBLIC_storageBucket`

`EXPO_PUBLIC_messagingSenderId`

`EXPO_PUBLIC_appId`

`EXPO_PUBLIC_measurementId`

#maps key from google cloud

`EXPO_PUBLIC_mapi`



## Known Bugs

- Repetitive IntroScreen: Everytime app opens the skip intro animation does not work
- Input field validation causes app crash: Auth input fields validation works in emulator but validation causes app crash in build
- Google auth not working
- Notification delay: App Notifications set at 2min timer get accumulated come at once 
- Maps may not work due to API restrictions set by me. Contact for demo
- Scanner works at reduced FPS
- Status bar bug: Expo status bar gets bugged at some places
- Charts screen info array bugged: Radar chart works at reduced fps due to using old react native victory charts and activity rings data misplaced due to wrong method used for data retrieval from firestore  
- Bugged settings form validation
- Dark mode toggle does not work but theme changes work by changing device theme

## Contributing

Contributions are always welcome!

Please adhere to this project's `code of conduct`.


## Acknowledgements

 - [Kaggle Dataset](https://www.kaggle.com/datasets/aashidutt3/waste-segregation-image-dataset/data)
 - [Reference Notebook](https://www.kaggle.com/code/gpiosenka/waste-f1-score-97)
 - [React native tensorflow implementation](https://www.youtube.com/watch?v=s_T2NjoiGIM)


## Authors

- [@Megahedron69](https://github.com/Megahedron69)


## License

[MIT](https://choosealicense.com/licenses/mit/)

