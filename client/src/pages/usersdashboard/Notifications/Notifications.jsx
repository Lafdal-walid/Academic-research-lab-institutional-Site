import React, { useState, useEffect } from 'react';
import API_BASE_URL from '@/config';

const svgPaths = {
  angleSmallDown: "M15.8842 6.545C15.7681 6.42884 15.6302 6.3367 15.4785 6.27383C15.3268 6.21096 15.1642 6.1786 15 6.1786C14.8358 6.1786 14.6732 6.21096 14.5215 6.27383C14.3698 6.3367 14.2319 6.42884 14.1158 6.545L10.2942 10.3658C10.216 10.4439 10.1101 10.4878 9.99958 10.4878C9.8891 10.4878 9.78314 10.4439 9.705 10.3658L5.88417 6.545C5.64978 6.3105 5.33184 6.17872 5.00029 6.17864C4.66875 6.17857 4.35075 6.3102 4.11625 6.54458C3.88175 6.77897 3.74997 7.09691 3.74989 7.42846C3.74982 7.76 3.88145 8.078 4.11583 8.3125L7.9375 12.1342C8.20834 12.405 8.52989 12.6199 8.88377 12.7665C9.23766 12.9131 9.61695 12.9885 10 12.9885C10.383 12.9885 10.7623 12.9131 11.1162 12.7665C11.4701 12.6199 11.7917 12.405 12.0625 12.1342L15.8842 8.3125C16.1185 8.07809 16.2502 7.76021 16.2502 7.42875C16.2502 7.0973 16.1185 6.77941 15.8842 6.545Z",
  calendarClock: "M14.1667 8.36583C10.9508 8.36583 8.33333 10.9825 8.33333 14.1992C8.33333 17.3975 10.9508 20 14.1667 20C17.3825 20 20 17.3833 20 14.1667C20 10.9683 17.3825 8.36583 14.1667 8.36583ZM14.1667 18.3333C11.8692 18.3333 10 16.4783 10 14.1992C10 11.9017 11.8692 10.0325 14.1667 10.0325C16.4642 10.0325 18.3333 11.8875 18.3333 14.1667C18.3333 16.4642 16.4642 18.3333 14.1667 18.3333ZM15.5892 14.4108C15.915 14.7367 15.915 15.2633 15.5892 15.5892C15.4267 15.7517 15.2133 15.8333 15 15.8333C14.7867 15.8333 14.5733 15.7517 14.4108 15.5892L13.5775 14.7558C13.4208 14.5992 13.3333 14.3875 13.3333 14.1667V12.5C13.3333 12.04 13.7058 11.6667 14.1667 11.6667C14.6275 11.6667 15 12.04 15 12.5V13.8217L15.5892 14.4108ZM20 5.83333V7.5C20 7.96 19.6275 8.33333 19.1667 8.33333C18.7058 8.33333 18.3333 7.96 18.3333 7.5V5.83333C18.3333 4.455 17.2117 3.33333 15.8333 3.33333H4.16667C2.78833 3.33333 1.66667 4.455 1.66667 5.83333V6.66667H9.16667C9.62667 6.66667 10 7.04 10 7.5C10 7.96 9.62667 8.33333 9.16667 8.33333H1.66667V15.8333C1.66667 17.2117 2.78833 18.3333 4.16667 18.3333H7.5C7.96 18.3333 8.33333 18.7067 8.33333 19.1667C8.33333 19.6267 7.96 20 7.5 20H4.16667C1.86917 20 0 18.1308 0 15.8333V5.83333C0 3.53583 1.86917 1.66667 4.16667 1.66667H5V0.833333C5 0.373333 5.37333 0 5.83333 0C6.29333 0 6.66667 0.373333 6.66667 0.833333V1.66667H13.3333V0.833333C13.3333 0.373333 13.7058 0 14.1667 0C14.6275 0 15 0.373333 15 0.833333V1.66667H15.8333C18.1308 1.66667 20 3.53583 20 5.83333Z"
};

const ToggleSwitch = ({ active, onToggle }) => (
  <div 
    onClick={onToggle}
    className="relative shrink-0 cursor-pointer transition-all duration-300" 
    style={{ width: '2.7vw', height: '1.62vw' }}
  >
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 28">
      <rect fill={active ? '#01CBB1' : '#1E1E24'} height="27" rx="13.5" width="47" x="0.5" y="0.5" />
      <rect height="27" rx="13.5" stroke="#2A2A30" width="47" x="0.5" y="0.5" />
      <circle 
        cx={active ? "34" : "14"} 
        cy="14" 
        fill="white" 
        r="10" 
        className="transition-all duration-300"
      />
    </svg>
  </div>
);

const NotificationItem = ({ title, message, time, unread, isLast }) => (
  <div className="flex flex-col w-full" style={{ gap: '2vh' }}>
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-start" style={{ gap: '0.4vh', maxWidth: '85%' }}>
        <div className="flex items-center" style={{ gap: '0.6vw' }}>
          <p className="font-bold text-white m-0" style={{ fontSize: '1.05vw', fontFamily: 'Gilroy, Poppins, sans-serif' }}>{title}</p>
          <p className="text-white m-0 opacity-80" style={{ fontSize: '0.85vw', fontFamily: 'Poppins, sans-serif' }}>{message}</p>
        </div>
        <p className="text-[#a5a5b2] m-0" style={{ fontSize: '0.85vw', fontFamily: 'Poppins, sans-serif' }}>{time}</p>
      </div>
      
      <div className="shrink-0" style={{ width: '0.5vw', height: '0.5vw' }}>
        {unread && (
          <svg className="block size-full" fill="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="#3457DC" r="5" />
          </svg>
        )}
      </div>
    </div>
    
    {!isLast && (
      <div className="w-full" style={{ height: '0.1vh', backgroundColor: '#1E1D22', margin: '1vh 0' }} />
    )}
  </div>
);

const Notifications = () => {
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/notifications/my`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Format data to match mock if needed
          const formatted = data.map(n => ({
            id: n._id,
            title: n.title,
            message: n.message,
            time: new Date(n.createdAt).toLocaleString(),
            unread: false // For now, we don't have unread status in DB
          }));
          setNotifications(formatted);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyNotifications();
  }, []);

  const displayedNotifications = unreadOnly 
    ? notifications.filter(n => n.unread) 
    : notifications;

  return (
    <div className="w-full text-white font-poppins pb-[6vh] animate-in fade-in duration-500">
      {/* Header Bar */}
      <div className="flex items-center justify-between w-full" style={{ paddingBottom: '3vh' }}>
        <h1 className="font-bold text-white m-0" style={{ fontSize: '1.3vw', fontFamily: 'Gilroy, Poppins, sans-serif' }}>Notifications</h1>
        
        <div className="flex items-center" style={{ gap: '1.5vw' }}>
          {/* Unread Filter */}
          <div className="flex items-center cursor-pointer select-none" style={{ gap: '0.6vw' }} onClick={() => setUnreadOnly(!unreadOnly)}>
            <p className="text-white m-0" style={{ fontSize: '0.9vw' }}>Unread only</p>
            <ToggleSwitch active={unreadOnly} onToggle={() => {}} />
          </div>

          {/* Type Filter */}
          <div className="bg-[#1e1e24] flex items-center justify-between border border-white/5 transition-all hover:bg-[#2a2a30] cursor-pointer"
               style={{ gap: '1.6vw', padding: '1.1vh 1.4vw', borderRadius: '0.8vw' }}>
            <p className="text-[#a5a5b2] m-0" style={{ fontSize: '0.9vw' }}>Type</p>
            <svg style={{ width: '1vw', height: '1vw' }} fill="none" viewBox="0 0 20 20">
              <path d={svgPaths.angleSmallDown} fill="#3457DC" />
            </svg>
          </div>

          {/* Date Range Filter */}
          <div className="bg-[#1e1e24] flex items-center justify-between border border-white/5 transition-all hover:bg-[#2a2a30] cursor-pointer"
               style={{ gap: '1.6vw', padding: '1.1vh 1.4vw', borderRadius: '0.8vw' }}>
            <p className="text-[#a5a5b2] m-0" style={{ fontSize: '0.9vw' }}>Date Range</p>
            <svg style={{ width: '1vw', height: '1vw' }} fill="none" viewBox="0 0 20 20">
              <path d={svgPaths.calendarClock} fill="#3457DC" />
            </svg>
          </div>
        </div>
      </div>

      {/* Notifications List Card */}
      <div className="bg-[#151519] flex flex-col relative w-full shadow-2xl overflow-hidden" 
           style={{ 
             padding: '2vw', 
             borderRadius: '1vw', 
             border: '1px solid rgba(255,255,255,0.05)' 
           }}>
        <div className="flex flex-col w-full" style={{ gap: '2vh' }}>
          {displayedNotifications.length > 0 ? displayedNotifications.map((notification, index) => (
            <NotificationItem 
              key={notification.id}
              {...notification}
              isLast={index === displayedNotifications.length - 1}
            />
          )) : (
            <div className="flex items-center justify-center w-full" style={{ padding: '5vh 0' }}>
               <p className="text-[#a5a5b2]" style={{ fontSize: '1vw' }}>No notifications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
