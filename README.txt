RJMN CHECKLIST - MODULAR REACT PROJECT
=====================================

This project reorganizes the checklist website into separate files.
App.jsx contains ONLY the route definitions. BrowserRouter is in main.jsx.

INSTALLATION
------------
1. Extract this ZIP file.
2. Open the extracted folder in Visual Studio Code.
3. Open Terminal > New Terminal.
4. Run:

   npm install

5. Start the website:

   npm run dev

6. Open the local URL shown in the terminal (usually http://localhost:5173).

IMPORTANT FILES
---------------
src/App.jsx                         Route configuration only
src/main.jsx                        React entry point and BrowserRouter
src/components/Layout.jsx           Sidebar, mobile menu, shared page layout
src/components/PageHeading.jsx      Reusable page heading
src/components/StatCard.jsx         Dashboard statistic card
src/components/EmptyState.jsx       Empty-list message
src/store/useChecklistStore.js      Zustand task and group state
src/api/dummyjson.js                Axios connection to DummyJSON
src/pages/Dashboard.jsx             Dashboard
src/pages/GroupsPage.jsx             Create and list task groups
src/pages/GroupTasksPage.jsx         Add, search, complete and delete tasks
src/pages/GuidePage.jsx              User instructions
src/pages/UserInformationPage.jsx   DummyJSON sample user profiles
src/pages/DevelopersPage.jsx         Group member information

REQUIREMENTS
------------
- React
- Tailwind CSS 4 with Vite plugin
- React Router DOM
- Zustand with localStorage persistence
- Axios
- DummyJSON API

NOTES
-----
- User Information displays sample profiles from DummyJSON, not registered accounts.
- Task groups and tasks are stored in Zustand and persisted in this browser.
- Update the developer names/roles to match your actual group.
- The supplied reference repository's App.jsx appears to be an earlier version:
  it uses local component state/localStorage and does not include the User
  Information route, Axios, or Zustand. This modular project adds those
  Laboratory 4 requirements while keeping the soft pink RJMN visual style.
- If you already have a Vite project, you can copy the src folder and replace
  package.json and vite.config.js only if needed. Back up your current work first.
