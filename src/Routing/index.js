import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MiniDrawer from '../Components/Drawer';
import Adventures from '../Private/Adventures';
import AddAdventure from '../Private/Adventures/AddAdventure';
import Announcement from '../Private/Announcement';
import AddAnnouncement from '../Private/Announcement/AddAnnouncement';
import Chats from '../Private/Chats';
import ExtraServices from '../Private/ExtraServices';
import AddExtraService from '../Private/ExtraServices/AddExtraService';
import Home from '../Private/Home';
import InternalActivities from '../Private/InternalActivities';
import Groups from '../Private/Resources/Groups';
import AddGroup from '../Private/Resources/Groups/AddGroup';
import GuestAccounts from '../Private/Resources/GuestAccounts';
import AddGuest from '../Private/Resources/GuestAccounts/AddGuest';
import RoomTypes from '../Private/Resources/RoomTypes';
import AddRoomTypes from '../Private/Resources/RoomTypes/AddRoomTypes';
import StaffUsers from '../Private/Resources/StaffUsers';
import AddStaff from '../Private/Resources/StaffUsers/AddStaff';
import Tags from '../Private/Resources/Tags';
import AddTag from '../Private/Resources/Tags/AddTag';
import Restaurants from '../Private/Restaurants';
import AddRestaurant from '../Private/Restaurants/AddRestaurant';
import SendPushNotification from '../Private/SendPushNotification';
import AddPushNotification from '../Private/SendPushNotification/AddPushNotification';
import Billing from '../Private/Settings/Billing';
import Feedback from '../Private/Settings/Feedback';
import Integration from '../Private/Settings/Integration/integration';
import Shopping from '../Private/Shopping';
import AddShopping from '../Private/Shopping/AddShopping';
import SinglePages from '../Private/SinglePages';
import AddSinglePage from '../Private/SinglePages/AddSinglePage';
import Login from '../Public/Login';
import Register from '../Public/Register';

  const PrivateRoute = ({ children }) => {
    return localStorage.getItem("token") ? (
      <MiniDrawer children={children} />
    ) : (
      <Navigate to="/login"></Navigate>
    );
    // return <MiniDrawer children={children} />
  };

const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            {/* HOME */}
            <Route path='/' element={<PrivateRoute> <Home /> </PrivateRoute>} />
            {/* HOME */}
            
            {/* RESOURCE */}
            {/* STAFF USER & ROLES */}
            <Route path='/resources/staff_user_roles' element={<PrivateRoute> <StaffUsers /> </PrivateRoute>} />
            <Route path='/resources/add_staff' element={<PrivateRoute> <AddStaff /> </PrivateRoute>} />
            <Route path='/resources/add_staff/:id' element={<PrivateRoute> <AddStaff /> </PrivateRoute>} />
            {/* STAFF USER & ROLES */}

            {/* GUEST ACCOUNTS */}
            <Route path='resources/guest_accounts' element={<PrivateRoute> <GuestAccounts /> </PrivateRoute>} />
            <Route path='/resources/add_guest' element={<PrivateRoute> <AddGuest /> </PrivateRoute>} />
            <Route path='/resources/add_guest/:id' element={<PrivateRoute> <AddGuest /> </PrivateRoute>} />
            {/* GUEST ACCOUNTS */}

            {/* ROOM TYPE */}
            <Route path='resources/room_types' element={<PrivateRoute> <RoomTypes /> </PrivateRoute>} />
            <Route path='resources/add_room_types' element={<PrivateRoute> <AddRoomTypes /> </PrivateRoute>} />
            <Route path='resources/add_room_types/:id' element={<PrivateRoute> <AddRoomTypes /> </PrivateRoute>} />
            {/* ROOM TYPE */}

            {/* GROUPS */}
            <Route path='resources/groups' element={<PrivateRoute> <Groups /> </PrivateRoute>} />
            <Route path='resources/add_group' element={<PrivateRoute> <AddGroup /> </PrivateRoute>} />
            <Route path='resources/add_group/:id' element={<PrivateRoute> <AddGroup /> </PrivateRoute>} />
            {/* GROUPS */}
            
            {/* TAGS */}
            <Route path='resources/tags' element={<PrivateRoute> <Tags /> </PrivateRoute>} />
            <Route path='resources/add_tag' element={<PrivateRoute> <AddTag /> </PrivateRoute>} />
            <Route path='resources/add_tag/:id' element={<PrivateRoute> <AddTag /> </PrivateRoute>} />
            {/* TAGS */}
            {/* RESOURCE */}

            {/* CHATS */}
            <Route path='chats' element={<PrivateRoute> <Chats /> </PrivateRoute>} />
            {/* CHATS */}

            {/* CHATS */}
            <Route path='internal_activities' element={<PrivateRoute> <InternalActivities /> </PrivateRoute>} />
            {/* CHATS */}


            {/* PUSH NOTIFICAITON */}
            <Route path='send_notification' element={<PrivateRoute> <SendPushNotification /> </PrivateRoute>} />
            <Route path='send_notification/add_notification' element={<PrivateRoute> <AddPushNotification /> </PrivateRoute>} />
            <Route path='send_notification/add_notification/:id' element={<PrivateRoute> <AddPushNotification /> </PrivateRoute>} />
            {/* PUSH NOTIFICAITON */}

            {/* ANNOUNCEMENT */}
            <Route path='announcements' element={<PrivateRoute> <Announcement /> </PrivateRoute>} />
            <Route path='announcements/add_announcement' element={<PrivateRoute> <AddAnnouncement /> </PrivateRoute>} />
            <Route path='announcements/add_announcement/:id' element={<PrivateRoute> <AddAnnouncement /> </PrivateRoute>} />
            {/* ANNOUNCEMENT */}

            {/* SINGLE PAGES */}
            <Route path='single_pages' element={<PrivateRoute> <SinglePages /> </PrivateRoute>} />
            <Route path='single_pages/add_single_page' element={<PrivateRoute> <AddSinglePage /> </PrivateRoute>} />
            <Route path='single_pages/add_single_page/:id' element={<PrivateRoute> <AddSinglePage /> </PrivateRoute>} />
            {/* SINGLE PAGES */}

            {/* ADVENTURES & DAY TRIPS*/}
            <Route path='adventures_day_trips' element={<PrivateRoute> <Adventures /> </PrivateRoute>} />
            <Route path='adventures_day_trips/add_adventures_day_trips' element={<PrivateRoute> <AddAdventure /> </PrivateRoute>} />
            <Route path='adventures_day_trips/add_adventures_day_trips/:id' element={<PrivateRoute> <AddAdventure /> </PrivateRoute>} />
            {/* ADVENTURES & DAY TRIPS */}

            {/* EXTRA SERVICES */}
            <Route path='extra_services' element={<PrivateRoute> <ExtraServices /> </PrivateRoute>} />
            <Route path='extra_services/add_extra_service' element={<PrivateRoute> <AddExtraService /> </PrivateRoute>} />
            <Route path='extra_services/add_extra_service/:id' element={<PrivateRoute> <AddExtraService /> </PrivateRoute>} />
            {/* EXTRA SERVICES */}

            {/* RESTAURANTS */}
            <Route path='restaurants' element={<PrivateRoute> <Restaurants /> </PrivateRoute>} />
            <Route path='restaurants/add_restaurant' element={<PrivateRoute> <AddRestaurant /> </PrivateRoute>} />
            <Route path='restaurants/add_restaurant/:id' element={<PrivateRoute> <AddRestaurant /> </PrivateRoute>} />
            {/* RESTAURANTS */}

            {/* SHOPPING */}
            <Route path='shopping' element={<PrivateRoute> <Shopping /> </PrivateRoute>} />
            <Route path='shopping/add_shopping' element={<PrivateRoute> <AddShopping /> </PrivateRoute>} />
            <Route path='shopping/add_shopping/:id' element={<PrivateRoute> <AddShopping /> </PrivateRoute>} />
            {/* SHOPPING */}

            {/* SETTINGS */}
            <Route path='settings/integrations' element={<PrivateRoute> <Integration /> </PrivateRoute>} />
            <Route path='settings/billing_subscription' element={<PrivateRoute> <Billing /> </PrivateRoute>} />
            <Route path='settings/feedback' element={<PrivateRoute> <Feedback /> </PrivateRoute>} />
            
            {/* SETTINGS */}

            
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register/>} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default Routing