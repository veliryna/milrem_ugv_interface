# UGV interface prototype
Software Engineering (HMI) Internship Home Assignment at Milrem Robotics.

An interface prototype for an Unmanned Ground Vehicle (UGV) system, created with Vue 3 and TypeScript.

## Demo Video
_Previous project demo video had pixelated glitches at the end. I captured and uploaded a new one._

[Project Demo](https://github.com/user-attachments/assets/f54b5e64-a92f-42b5-a61b-1df01fe4f802)


## Prerequisites
- Node.js v.20 or higher
- npm package manager 

This application uses Google Maps, so you need to generate your own api key:
- Sign in to the Google Cloud Console.
- Enable the Maps JavaScript API.
- Generate an API key.
- Add the key to a `.env` file at the root of the project.
  
  ```env
  VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
  ```
## How To Set Up

- Clone the repository
```console
  git clone https://github.com/veliryna/milrem_ugv_interface.git
  cd ugv_interface
```
- Install dependencies
```console
  npm install
```
- Run the development server
```console
  npm run dev
```
## How To Use

The UGV interface has the following features:

### **Map View**
- Displays the current UGV position as a custom vehicle icon marker.
- Map automatically updates as the UGV moves or drives to waypoint.

### **Waypoints Creation**
- Long press on the map lets you to create a waypoint.
- A dialog will appear with the options:
  - **Save** – Adds the waypoint to the store.
  - **Drive** – Sends the UGV to this point.
  - **Discard** – Cancels the action.

### **UGV Movement Controls**
- Use the **Arrow Keys** on your keyboard to maneuver the vehicle.
- Engine must be **ON** for the UGV to respond. Engine control button is at the top-right corner of the map.
- Each key press will move the UGV in the respective direction.
- If the engine is off, a toast popup reminds you to start it.

### **Vehicle Location Display**
- Displays the current latitude and longitude of the UGV in real-time.

### **Waypoint List**
- Displays a list of the saved waypoints with their names and coordinates.
- If you click on list item, dialog will appear with possible waypoint actions:
  - **Delete** – Delete the waypoint from the store.
  - **Drive** – Send the UGV to this point.
  - **Rename** – Change the name of specified waypoint.

## About Development

The most time-consuming part for me was to implement this project in Vue 3, because I have never used or known this framework before. I have learned a ton of things during this 9 days, but I can't guarantee that my solution is up to all best practices of the framework. For development I've used official documentation, Stack Overflow, Vue and Vite forums and websites, and ChatGPT/Gemini AI systems.
