# Places Map Application :earth_americas:

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue?style=flat&logo=react)](https://reactjs.org/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-Latest-5A0EF8?style=flat&logo=daisyui)](https://daisyui.com/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-API-4285F4?style=flat&logo=google-maps)](https://developers.google.com/maps)

A modern web application that allows users to create, manage and share location-based places on an interactive map. Users can mark their favorite locations, add detailed information about places, and choose to make them public or private.  
> [!NOTE]  
> This is a frontend-focused demonstration project showcasing React, Next.js, and Google Maps integration skills. It uses browser localStorage for data management instead of a backend database, making it perfect for demonstration purposes but not intended for production deployment.

## :sparkles: Features

### :closed_lock_with_key: User Authentication
- Registration and login system
- Profile management with customizable user details
- Password change functionality with validation

### :world_map: Interactive Map
- Real-time user location tracking
- Place markers with custom colors
- Double-click to add new places
- Search functionality with autocomplete
- Route calculation between locations
- Distance and duration information for routes

### :round_pushpin: Place Management
- Create and edit place details
- Customize pin colors for better organization
- Toggle places to be public or private
- Personal places list with quick navigation

## :camera_flash: Screenshots

### Authentication
![Login Interface](/images/login.png)
*Login page with validation*

![Failed Login](/images/failedLogin.png)
*Login error handling*

![Registration Page](/images/register.png)
*User registration form*

![Registration Validation](/images/registerInvalidData.png)
*Registration form validation*

![Registration Validation](/images/failedRegister.png)
*Registration failure validation*

![Successful Registration](/images/successfulRegister.png)
*Registration success feedback*

### Map Interface
![Normal Map View](/images/normalMap.png)
*Default map interface*

![Satellite View](/images/sateliteMap.png)
*Satellite map view option*

![Pins on Map](/images/pinsOnMap.png)
*Multiple place markers on map*

![Pins Close Up](/images/pinsOnMapCloseup.png)
*Detailed view of place markers*

![Location marker 1](/images/locationPin1.png)
![Location marker 2](/images/locationPin2.png)  
*Animated location marker*

### Place Management
![Add New Pin](/images/addPin.png)  
*Adding a new place*

![Edit Pin](/images/editPin.png)  
*Editing place details*

![Places List](/images/pinsList.png)  
*List of saved places*

### User Features
![Profile Settings](/images/profileSettings.png)
*User profile management*

![Change Password](/images/changePassword.png)
*Password change interface*

![Search Places](/images/searchPlace.png)
*Location search functionality*

![Route Planning](/images/routeMap.png)
*Route calculation between locations*

## :hammer_and_wrench: Technologies Used

### Frontend Framework and Libraries
- ![React](https://img.shields.io/badge/React-18.0-blue?style=flat&logo=react) Modern UI development
- ![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js) React framework
- ![Formik](https://img.shields.io/badge/Formik-Latest-blue?style=flat) Form management
- ![Yup](https://img.shields.io/badge/Yup-Latest-blue?style=flat) Form validation

### UI Components and Styling
- ![DaisyUI](https://img.shields.io/badge/DaisyUI-Latest-5A0EF8?style=flat&logo=daisyui) UI components
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Latest-06B6D4?style=flat&logo=tailwind-css) Utility-first CSS
- ![Lucide React](https://img.shields.io/badge/Lucide%20React-Latest-gray?style=flat) Icon library

### Maps and Location
- @vis.gl/react-google-maps (Google Maps integration)
- Google Maps Platform
  - Places API
  - Directions API
  - Maps JavaScript API

## :rocket: Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Google Maps API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/Hapyy2/MapsApp.git
cd MapsApp
```

2. Install dependencies
```bash
# Create Next.js app
npx create-next-app@latest . --use-npm

# Install React
npm install react@18 react-dom@18

# Install form handling libraries
npm install yup
npm install formik

# Install UI libraries
npm install -D daisyui@latest
npm install lucide-react

# Install Google Maps library
npm install @vis.gl/react-google-maps
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_GOOGLE_MAPS_ID=your_google_maps_id
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## :file_folder: Project Structure
```
.
├── app
│   ├── components
│   │   ├── hooks            # Custom React hooks
│   │   ├── login_components # Authentication components
│   │   ├── map_components   # Map-related components
│   │   └── profile_components # User profile components
│   ├── login               # Login page
│   ├── main                # Main application page
│   ├── profile_settings    # User settings pages
│   └── register           # Registration page
└── services              # Mock service layer
```

## :mag: Features in Detail

### Authentication System
- Email-based registration and login
- Profile management with editable user details
- Password change functionality
- Form validation with Yup schemas

### Map Features
- Interactive Google Maps integration
- Real-time location tracking
- Custom place markers with color customization
- Route calculation with distance and time estimation
- Location search with Google Places autocomplete

### Place Management
- Local storage for personal places
- Public/private visibility toggle
- Custom pin colors for organization
- Detailed place information storage
- List view of personal places

## :pray: Acknowledgments

- [Google Maps Platform](https://developers.google.com/maps) for mapping services
- [DaisyUI](https://daisyui.com/) for UI components
- [Vis.gl](https://vis.gl/) for React Google Maps integration
