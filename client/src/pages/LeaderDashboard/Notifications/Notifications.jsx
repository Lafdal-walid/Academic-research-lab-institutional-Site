import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCheckLine, RiSearch2Line, RiArrowLeftSLine, RiArrowRightSLine, RiArrowDownSLine, RiPencilLine, RiDeleteBin6Line, RiInformationLine } from 'react-icons/ri';

// Assets
import DropdownIcon from "@/assets/svg/userDashboard/PhdTracker/angle-small-down 1.svg";
import TrashIcon from "@/assets/svg/LeaderDashboard/notification/trash 3.svg";
import EditIcon from "@/assets/svg/LeaderDashboard/notification/edit 2.svg";

const svgPaths = {
  p1f77ae00: "M8 5.33333C8.55228 5.33333 9 4.88562 9 4.33333C9 3.78105 8.55228 3.33333 8 3.33333C7.44772 3.33333 7 3.78105 7 4.33333C7 4.88562 7.44772 5.33333 8 5.33333Z",
  p2286e900: "M8 10.6667C7.47258 10.6667 6.95701 10.5103 6.51848 10.2173C6.07995 9.92424 5.73815 9.50776 5.53632 9.02049C5.33449 8.53322 5.28168 7.99704 5.38457 7.47976C5.48747 6.96248 5.74144 6.48732 6.11438 6.11438C6.48732 5.74144 6.96248 5.48747 7.47976 5.38457C7.99704 5.28168 8.53322 5.33449 9.02049 5.53632C9.50776 5.73816 9.92424 6.07995 10.2173 6.51848C10.5103 6.95701 10.6667 7.47258 10.6667 8C10.6667 8.70725 10.3857 9.38552 9.88562 9.88562C9.38552 10.3857 8.70724 10.6667 8 10.6667ZM3.78867 10.6667H0.666667C0.489856 10.6667 0.320286 10.5964 0.195262 10.4714C0.0702379 10.3464 0 10.1768 0 10C0.00631723 9.04274 0.354483 8.11924 0.981704 7.39605C1.60892 6.67287 2.47391 6.19762 3.42067 6.056C3.53068 6.04059 3.6428 6.05291 3.74684 6.09185C3.85088 6.13079 3.94355 6.19511 4.01641 6.27896C4.08927 6.36282 4.14002 6.46356 4.16405 6.57201C4.18808 6.68047 4.18462 6.79322 4.154 6.9C4.05184 7.25774 4.00001 7.62796 4 8C4.00019 8.59317 4.1337 9.17871 4.39067 9.71333C4.439 9.81481 4.46089 9.92686 4.4543 10.0391C4.44772 10.1513 4.41287 10.26 4.353 10.3551C4.29313 10.4502 4.21019 10.5287 4.11187 10.5831C4.01356 10.6376 3.90306 10.6664 3.79067 10.6667H3.78867ZM11.3333 16H4.66667C4.48986 16 4.32029 15.9298 4.19526 15.8047C4.07024 15.6797 4 15.5101 4 15.3333C4 14.2725 4.42143 13.2551 5.17157 12.5049C5.92172 11.7548 6.93913 11.3333 8 11.3333C9.06087 11.3333 10.0783 11.7548 10.8284 12.5049C11.5786 13.2551 12 14.2725 12 15.3333C12 15.5101 11.9298 15.6797 11.8047 15.8047C11.6797 15.9298 11.5101 16 11.3333 16ZM12 5.33333C11.4726 5.33333 10.957 5.17694 10.5185 4.88392C10.0799 4.5909 9.73815 4.17443 9.53632 3.68716C9.33449 3.19989 9.28168 2.66371 9.38457 2.14643C9.48747 1.62914 9.74144 1.15399 10.1144 0.78105C10.4873 0.40811 10.9625 0.154134 11.4798 0.0512405C11.997 -0.0516535 12.5332 0.00115542 13.0205 0.202989C13.5078 0.404823 13.9242 0.746616 14.2173 1.18515C14.5103 1.62368 14.6667 2.13925 14.6667 2.66667C14.6667 3.37391 14.3857 4.05219 13.8856 4.55229C13.3855 5.05238 12.7072 5.33333 12 5.33333ZM4 5.33333C3.47258 5.33333 2.95701 5.17694 2.51848 4.88392C2.07995 4.5909 1.73816 4.17443 1.53632 3.68716C1.33449 3.19989 1.28168 2.66371 1.38457 2.14643C1.48747 1.62914 1.74144 1.15399 2.11438 0.78105C2.48732 0.40811 2.96248 0.154134 3.47976 0.0512405C3.99704 -0.0516535 4.53322 0.00115542 5.02049 0.202989C5.50776 0.404823 5.92424 0.746616 6.21725 1.18515C6.51027 1.62368 6.66667 2.13925 6.66667 2.66667C6.66667 3.37391 6.38572 4.05219 5.88562 4.55229C5.38552 5.05238 4.70724 5.33333 4 5.33333ZM15.3333 10.6667H12.2113C12.0989 10.6664 11.9884 10.6376 11.8901 10.5831C11.7918 10.5287 11.7089 10.4502 11.649 10.3551C11.5891 10.26 11.5543 10.1513 11.5477 10.0391C11.5411 9.92686 11.563 9.81481 11.6113 9.71333C11.8676 9.17855 12.0004 8.59302 12 8C11.9989 7.62781 11.946 7.25758 11.8427 6.9C11.8119 6.79291 11.8084 6.67981 11.8326 6.57104C11.8568 6.46227 11.9078 6.36129 11.9811 6.27734C12.0544 6.19339 12.1475 6.12914 12.252 6.09048C12.3565 6.05181 12.4691 6.03996 12.5793 6.056C13.5261 6.19762 14.3911 6.67287 15.0183 7.39605C15.6455 8.11924 15.9937 9.04274 16 10C16 10.1768 15.9298 10.3464 15.8047 10.4714C15.6797 10.5964 15.5101 10.6667 15.3333 10.6667Z",
  p22fb780: "M19.3925 7.84917C18.1 5.74417 15.16 2.2125 10 2.2125C4.84 2.2125 1.9 5.74417 0.6075 7.84917C0.20794 8.49542 -0.00370511 9.2402 -0.00370511 10C-0.00370511 10.7598 0.20794 11.5046 0.6075 12.1508C1.9 14.2558 4.84 17.7875 10 17.7875C15.16 17.7875 18.1 14.2558 19.3925 12.1508C19.7921 11.5046 20.0037 10.7598 20.0037 10C20.0037 9.2402 19.7921 8.49542 19.3925 7.84917ZM17.9717 11.2783C16.8617 13.0833 14.3492 16.1208 10 16.1208C5.65083 16.1208 3.13833 13.0833 2.02833 11.2783C1.79095 10.8942 1.66521 10.4516 1.66521 10C1.66521 9.54844 1.79095 9.1058 2.02833 8.72167C3.13833 6.91667 5.65083 3.87917 10 3.87917C14.3492 3.87917 16.8617 6.91333 17.9717 8.72167C18.2091 9.1058 18.3348 9.54844 18.3348 10C18.3348 10.4516 18.2091 10.8942 17.9717 11.2783Z",
  p2aa34d80: "M10 5.83333C9.17591 5.83333 8.37033 6.0777 7.68512 6.53554C6.99992 6.99338 6.46587 7.64413 6.1505 8.40549C5.83514 9.16684 5.75262 10.0046 5.91339 10.8129C6.07417 11.6211 6.471 12.3636 7.05372 12.9463C7.63644 13.529 8.37887 13.9258 9.18712 14.0866C9.99538 14.2474 10.8332 14.1649 11.5945 13.8495C12.3559 13.5341 13.0066 13.0001 13.4645 12.3149C13.9223 11.6297 14.1667 10.8241 14.1667 10C14.1653 8.89534 13.7259 7.8363 12.9448 7.05518C12.1637 6.27407 11.1047 5.83466 10 5.83333ZM10 12.5C9.50555 12.5 9.0222 12.3534 8.61107 12.0787C8.19995 11.804 7.87952 11.4135 7.6903 10.9567C7.50108 10.4999 7.45157 9.99723 7.54804 9.51227C7.6445 9.02732 7.8826 8.58186 8.23223 8.23223C8.58186 7.8826 9.02732 7.6445 9.51227 7.54804C9.99723 7.45157 10.4999 7.50108 10.9567 7.6903C11.4135 7.87952 11.804 8.19995 12.0787 8.61107C12.3534 9.0222 12.5 9.50555 12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5Z",
  p3b8f8870: "M14.1667 8.36583C10.9508 8.36583 8.33333 10.9825 8.33333 14.1992C8.33333 17.3975 10.9508 20 14.1667 20C17.3825 20 20 17.3833 20 14.1667C20 10.9683 17.3825 8.36583 14.1667 8.36583ZM14.1667 18.3333C11.8692 18.3333 10 16.4783 10 14.1992C10 11.9017 11.8692 10.0325 14.1667 10.0325C16.4642 10.0325 18.3333 11.8875 18.3333 14.1667C18.3333 16.4642 16.4642 18.3333 14.1667 18.3333ZM15.5892 14.4108C15.915 14.7367 15.915 15.2633 15.5892 15.5892C15.4267 15.7517 15.2133 15.8333 15 15.8333C14.7867 15.8333 14.5733 15.7517 14.4108 15.5892L13.5775 14.7558C13.4208 14.5992 13.3333 14.3875 13.3333 14.1667V12.5C13.3333 12.04 13.7058 11.6667 14.1667 11.6667C14.6275 11.6667 15 12.04 15 12.5V13.8217L15.5892 14.4108ZM20 5.83333V7.5C20 7.96 19.6275 8.33333 19.1667 8.33333C18.7058 8.33333 18.3333 7.96 18.3333 7.5V5.83333C18.3333 4.455 17.2117 3.33333 15.8333 3.33333H4.16667C2.78833 3.33333 1.66667 4.455 1.66667 5.83333V6.66667H9.16667C9.62667 6.66667 10 7.04 10 7.5C10 7.96 9.62667 8.33333 9.16667 8.33333H1.66667V15.8333C1.66667 17.2117 2.78833 18.3333 4.16667 18.3333H7.5C7.96 18.3333 8.33333 18.7067 8.33333 19.1667C8.33333 19.6267 7.96 20 7.5 20H4.16667C1.86917 20 0 18.1308 0 15.8333V5.83333C0 3.53583 1.86917 1.66667 4.16667 1.66667H5V0.833333C5 0.373333 5.37333 0 5.83333 0C6.29333 0 6.66667 0.373333 6.66667 0.833333V1.66667H13.3333V0.833333C13.3333 0.373333 13.7058 0 14.1667 0C14.6275 0 15 0.373333 15 0.833333V1.66667H15.8333C18.1308 1.66667 20 3.53583 20 5.83333Z",
  p4d4e580: "M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00888 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.3536 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z",
  p99c2800: "M8 6.66667H7.33333C7.15652 6.66667 6.98695 6.7369 6.86193 6.86193C6.7369 6.98695 6.66667 7.15652 6.66667 7.33333C6.66667 7.51014 6.7369 7.67971 6.86193 7.80474C6.98695 7.92976 7.15652 8 7.33333 8H8V12C8 12.1768 8.07024 12.3464 8.19526 12.4714C8.32029 12.5964 8.48986 12.6667 8.66667 12.6667C8.84348 12.6667 9.01305 12.5964 9.13807 12.4714C9.2631 12.3464 9.33333 12.1768 9.33333 12V8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66667 8 6.66667Z",
  pd7c6680: "M12 6C12 9.31371 9.31371 12 6 12H0.5C0.223858 12 0 11.7761 0 11.5C0 11.2239 0.223858 11 0.5 11H6C8.76142 11 11 8.76142 11 6V0.5C11 0.223858 11.2239 0 11.5 0C11.7761 0 12 0.223858 12 0.5V6Z",
};

const Tab = ({ label, isActive, onClick }) => {
    return (
        <div
            className="flex flex-col items-center justify-center cursor-pointer min-w-[100px] relative"
            onClick={onClick}
        >
            <div className="flex flex-col items-center w-fit relative" style={{ gap: '8px' }}>
                <p className={`font-poppins font-bold leading-[normal] not-italic text-[15px] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#3457dc] scale-105' : 'text-[#a5a5b2] hover:text-[#f5f5f5]'}`}>
                    {label}
                </p>

                {/* Framer Motion Active Underline */}
                {isActive && (
                    <motion.div
                        layoutId="activeUnderlineNotifications"
                        initial={false}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35
                        }}
                        className="absolute bg-[#3457dc] h-[2px] rounded-[400px] w-full"
                        style={{
                            bottom: -10,
                            left: 0,
                            right: 0,
                            boxShadow: '0 0 8px rgba(52,87,220,0.4)'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const NewNotification = ({ onNotificationSent, editData }) => {
    const [audienceType, setAudienceType] = useState('teams'); // 'teams' or 'filters'
    const [deliveryType, setDeliveryType] = useState('later'); // 'now' or 'later'
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [team, setTeam] = useState('All Teams');
    const [isSending, setIsSending] = useState(false);
    const [availableTeams, setAvailableTeams] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]); // Array of user emails or IDs
    const [scheduledAt, setScheduledAt] = useState('');

    useEffect(() => {
        if (editData) {
            setTitle(editData.title || '');
            setMessage(editData.message || '');
            setTeam(editData.team || 'All Teams');
            setAudienceType(editData.audienceType || 'teams');
            setSelectedMembers(editData.specificUsers || []);
            if (editData.scheduledAt) {
                setDeliveryType('later');
                setScheduledAt(new Date(editData.scheduledAt).toISOString().slice(0, 16));
            }
        }
    }, [editData]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('https://academic-research-lab-institutional-site.onrender.com/api/teams', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setAvailableTeams(data);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, []);

    const currentTeamData = availableTeams.find(t => t.name === team);

    const toggleMember = (email) => {
        setSelectedMembers(prev => 
            prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
        );
    };

    const handleSendNotification = async () => {
        if (!title || !message) {
            alert('Please fill in both the title and the message.');
            return;
        }

        const isEdit = editData && editData._id;
        const url = isEdit 
            ? `https://academic-research-lab-institutional-site.onrender.com/api/notifications/${editData._id}` 
            : 'https://academic-research-lab-institutional-site.onrender.com/api/notifications';

        setIsSending(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    message,
                    audienceType,
                    team: team || 'All Teams',
                    specificUsers: selectedMembers,
                    createdBy: 'Admin',
                    scheduledAt: deliveryType === 'later' ? scheduledAt : null
                })
            });

            if (res.ok) {
                alert('Notification sent successfully!');
                setTitle('');
                setMessage('');
                setTeam('');
                if (onNotificationSent) onNotificationSent();
            } else {
                const errorData = await res.json();
                alert(`Failed to send notification: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('An error occurred while sending the notification.');
        } finally {
            setIsSending(false);
        }
    };

    return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-6">
          {/* Notification Setup Section */}
          <div className="bg-[#151519] relative rounded-[16px] w-full">
            <div aria-hidden="true" className="absolute border border-[#1e1d22] border-solid inset-0 pointer-events-none rounded-[16px]" />
            <div className="content-stretch flex flex-col items-start p-[24px] relative">
              <div className="content-stretch flex flex-col gap-[24px] items-start w-full">
                <p className="font-['Gilroy',sans-serif] font-bold leading-[normal] not-italic text-[18px] text-white w-full">Notification Setup</p>
                
                <div className="content-stretch flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Gilroy:ExtraBold',sans-serif] leading-[normal] not-italic text-[14px] text-white/90 w-full font-bold">How do you want to choose users?</p>
                  
                  <div className="content-stretch flex flex-col gap-[32px] items-start w-full">
                    {/* Radio Options */}
                    <div className="content-stretch flex flex-col gap-[20px] items-start">
                      {/* Pick all Teams directly */}
                      <div 
                        className="content-stretch flex gap-[12px] items-start cursor-pointer group"
                        onClick={() => setAudienceType('teams')}
                      >
                        <div className="h-[20px] relative shrink-0 w-[16px] mt-[2px]">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
                            <g>
                              <circle cx="8" cy="10" r="6.5" stroke={audienceType === 'teams' ? "#3457DC" : "#373735"} strokeWidth="3" />
                            </g>
                          </svg>
                        </div>
                        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center leading-[normal] not-italic text-[14px]">
                          <p className={`font-['Poppins',sans-serif] font-medium transition-colors ${audienceType === 'teams' ? 'text-white' : 'text-[#a5a5b2] group-hover:text-white'}`}>Pick all Teams directly</p>
                          <p className="font-['Poppins',sans-serif] text-[#a5a5b2] text-[13px]">Type emails, search by name, or upload a list.</p>
                        </div>
                      </div>

                      {/* Find Team with filters */}
                      <div 
                        className="content-stretch flex gap-[12px] items-start cursor-pointer group"
                        onClick={() => setAudienceType('filters')}
                      >
                        <div className="h-[20px] relative shrink-0 w-[16px] mt-[2px]">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
                            <g>
                              <circle cx="8" cy="10" r="6.5" stroke={audienceType === 'filters' ? "#3457DC" : "#373735"} strokeWidth="3" />
                            </g>
                          </svg>
                        </div>
                        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center leading-[normal] not-italic text-[14px]">
                          <p className={`font-['Poppins',sans-serif] font-medium transition-colors ${audienceType === 'filters' ? 'text-white' : 'text-[#a5a5b2] group-hover:text-white'}`}>Find Team with filters</p>
                          <p className="font-['Poppins',sans-serif] text-[#a5a5b2] text-[13px]">Define your audience with rules that match your needs.</p>
                        </div>
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="content-stretch flex flex-col gap-[20px] items-start w-full">
                      {/* Team identifiers */}
                      <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                          <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px] w-full">Target Team</p>
                          <div className="bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all hover:border-white/10 focus-within:border-[#3457dc]">
                            <select 
                                className="bg-transparent border-none outline-none size-full px-[14px] text-white font-['Poppins',sans-serif] text-[14px] appearance-none"
                                value={team}
                                onChange={(e) => {
                                    setTeam(e.target.value);
                                    setSelectedMembers([]); // Reset selected members when team changes
                                }}
                            >
                                <option value="All Teams" className="bg-[#151519]">All Teams</option>
                                {availableTeams.map(t => (
                                    <option key={t._id} value={t.name} className="bg-[#151519]">{t.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                                <RiArrowDownSLine color="#a5a5b2" />
                            </div>
                          </div>
                      </div>

                      {/* Team Members List (Only shown if a specific team is selected) */}
                      {team !== 'All Teams' && currentTeamData && (
                        <div className="content-stretch flex flex-col gap-[12px] items-start w-full animate-in slide-in-from-top-2 duration-300">
                            <div className="flex justify-between items-center w-full">
                                <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px]">
                                    Select Team Members (Optional)
                                </p>
                                <button 
                                    className="text-[#3457dc] text-[12px] hover:underline"
                                    onClick={() => setSelectedMembers(currentTeamData.members.map(m => m.email))}
                                >
                                    Select All
                                </button>
                            </div>
                            <div className="bg-[#1a1a20] rounded-[12px] p-4 w-full border border-[#2a2a30] flex flex-wrap gap-2 max-h-[150px] overflow-y-auto custom-scrollbar">
                                {currentTeamData.members.map(member => {
                                    const isSelected = selectedMembers.includes(member.email);
                                    return (
                                        <div 
                                            key={member._id}
                                            onClick={() => toggleMember(member.email)}
                                            className={`px-3 py-1.5 rounded-full text-[12px] font-['Poppins',sans-serif] cursor-pointer transition-all flex items-center gap-2 ${
                                                isSelected 
                                                ? 'bg-[#3457dc] text-white' 
                                                : 'bg-[#25252b] text-[#a5a5b2] hover:bg-[#2e2e36]'
                                            }`}
                                        >
                                            {isSelected && <RiCheckLine size={14} />}
                                            {member.username || member.email}
                                        </div>
                                    );
                                })}
                                {currentTeamData.members.length === 0 && (
                                    <p className="text-[#a5a5b2] text-[13px] italic">No members found in this team.</p>
                                )}
                            </div>
                        </div>
                      )}

                      {/* Upload user list / Specific Emails */}
                      <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                        <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px] w-full">Additional specific recipients / Upload list</p>
                        <div className="bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all hover:border-white/10 focus-within:border-[#3457dc]">
                          <input 
                                type="text"
                                className="bg-transparent border-none outline-none size-full px-[14px] text-white font-['Poppins',sans-serif] text-[14px]"
                                placeholder="Paste emails separated by commas or type specific names..."
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compose notification Section */}
          <div className="bg-[#151519] relative rounded-[16px] w-full">
            <div aria-hidden="true" className="absolute border border-[#1e1d22] border-solid inset-0 pointer-events-none rounded-[16px]" />
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[24px] relative">
              <div className="content-stretch flex flex-col gap-[24px] items-start w-full">
                <p className="font-['Gilroy',sans-serif] font-bold leading-[normal] not-italic text-[18px] text-white w-full">Compose notification</p>
                
                <div className="content-stretch flex flex-col gap-[24px] items-start w-full">
                  {/* Notification title - English & Arabic */}
                  <div className="content-stretch flex flex-col lg:flex-row gap-[30px] items-start w-full">
                    {/* English */}
                    <div className="flex-[1_0_0] flex flex-col gap-[12px] w-full">
                        <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px] w-full">Notification title</p>
                        <div className="bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all focus-within:border-[#3457dc]">
                             <input 
                                type="text"
                                className="bg-transparent border-none outline-none size-full px-[14px] text-white font-['Poppins',sans-serif] text-[14px]"
                                placeholder="e.g New update available"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Arabic */}
                    <div className="flex-[1_0_0] flex flex-col gap-[12px] w-full">
                        <p className="font-['Poppins',sans-serif] leading-[normal] text-[#80808a] text-[14px] text-right w-full">
                          عنوان الإشعار
                        </p>
                         <div className="bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all focus-within:border-[#3457dc]">
                             <input 
                                type="text"
                                dir="rtl"
                                className="bg-transparent border-none outline-none size-full px-[14px] text-white font-['Poppins',sans-serif] text-[14px] text-right"
                                placeholder="مثال: تحديث جديد متاح"
                            />
                        </div>
                    </div>
                  </div>

                  {/* Message - English & Arabic */}
                  <div className="content-stretch flex flex-col lg:flex-row gap-[30px] items-start w-full">
                    {/* English */}
                    <div className="flex-[1_0_0] flex flex-col gap-[12px] w-full">
                        <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px] w-full">Message</p>
                        <div className="bg-[rgba(255,255,255,0.01)] min-h-[100px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all focus-within:border-[#3457dc] p-[14px] flex flex-col justify-between">
                             <textarea 
                                className="bg-transparent border-none outline-none w-full flex-1 text-white font-['Poppins',sans-serif] text-[14px] resize-none"
                                placeholder="Write the message you want users to see…"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
                                    <path d={svgPaths.pd7c6680} fill="white" className="opacity-40" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Arabic */}
                    <div className="flex-[1_0_0] flex flex-col gap-[12px] w-full">
                        <p className="font-['Poppins',sans-serif] leading-[normal] text-[#80808a] text-[14px] text-right w-full">
                          الرسالة
                        </p>
                         <div className="bg-[rgba(255,255,255,0.01)] min-h-[100px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all focus-within:border-[#3457dc] p-[14px] flex flex-col justify-between">
                             <textarea 
                                dir="rtl"
                                className="bg-transparent border-none outline-none w-full flex-1 text-white font-['Poppins',sans-serif] text-[14px] text-right resize-none"
                                placeholder="اكتب الرسالة التي تريد أن يراها المستخدمون…"
                            />
                            <div className="flex justify-start">
                                <svg className="size-[12px] -scale-x-100" fill="none" viewBox="0 0 12 12">
                                    <path d={svgPaths.pd7c6680} fill="white" className="opacity-40" />
                                </svg>
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* Action Button - English & Arabic */}
                  <div className="content-stretch flex flex-col lg:flex-row gap-[30px] items-start w-full">
                    {/* English */}
                    <div className="flex-[1_0_0] flex flex-col gap-[12px] w-full">
                      <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px] w-full">Action Button ( optional )</p>
                      <div className="bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all focus-within:border-[#3457dc]">
                           <input 
                                type="text"
                                className="bg-transparent border-none outline-none size-full px-[14px] text-white font-['Poppins',sans-serif] text-[14px]"
                                placeholder="e.g. Claim now, Learn more"
                            />
                      </div>
                    </div>

                    {/* Arabic */}
                    <div className="flex-[1_0_0] flex flex-col gap-[12px] w-full">
                      <p className="font-['Poppins',sans-serif] leading-[normal] text-[#80808a] text-[14px] text-right w-full">
                        زر الإجراء (اختياري)
                      </p>
                      <div className="bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all focus-within:border-[#3457dc]">
                           <input 
                                type="text"
                                dir="rtl"
                                className="bg-transparent border-none outline-none size-full px-[14px] text-white font-['Poppins',sans-serif] text-[14px] text-right"
                                placeholder="مثال: احصل عليه الآن، اعرف المزيد"
                            />
                      </div>
                    </div>
                  </div>

                  {/* Button link */}
                  <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                      <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px] w-full">Button link</p>
                      <div className="bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all focus-within:border-[#3457dc]">
                           <input 
                                type="text"
                                className="bg-transparent border-none outline-none size-full px-[14px] text-[#3457dc] font-['Poppins',sans-serif] text-[14px]"
                                placeholder="https://example.com/reset-password"
                            />
                      </div>
                    <div className="content-stretch flex gap-[8px] items-center">
                      <div className="relative shrink-0 size-[16px]">
                        <svg className="size-full" fill="none" viewBox="0 0 16 16">
                            <path d={svgPaths.p4d4e580} fill="#A5A5B2" />
                            <path d={svgPaths.p99c2800} fill="#A5A5B2" />
                            <path d={svgPaths.p1f77ae00} fill="#A5A5B2" />
                        </svg>
                      </div>
                      <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#a5a5b2] text-[13px]">Link to open when user taps the button.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row gap-[24px] items-center w-full mt-[16px]">
                <button className="bg-[#1e1e24] content-stretch flex gap-[10px] items-center justify-center px-[32px] py-[14px] relative rounded-[16px] transition-all hover:bg-white/5 active:scale-95">
                    <p className="font-['Poppins',sans-serif] font-medium leading-[normal] not-italic text-[14px] text-white">Preview</p>
                    <div className="relative shrink-0 size-[20px]">
                    <svg className="size-full" fill="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p22fb780} fill="white" />
                        <path d={svgPaths.p2aa34d80} fill="white" />
                    </svg>
                    </div>
                </button>

                <button 
                    className="bg-[#3457dc] content-stretch flex items-center justify-center px-[32px] py-[14px] relative rounded-[16px] transition-all hover:bg-[#2a46b3] active:scale-95 disabled:opacity-50"
                    onClick={handleSendNotification}
                    disabled={isSending}
                >
                    <p className="font-['Poppins',sans-serif] font-medium leading-[normal] not-italic text-[14px] text-white whitespace-nowrap">
                        {isSending ? 'Sending...' : 'Send notification'}
                    </p>
                </button>
              </div>

              {/* Summary Footer */}
              <div className="flex flex-col gap-[12px] mt-[16px] border-t border-white/[0.03] pt-[24px] w-full">
                <div className="flex gap-[12px] items-center">
                    <div className="relative shrink-0 size-[16px]">
                    <svg className="size-full" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p2286e900} fill="#3457dc" />
                    </svg>
                    </div>
                    <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[14px] text-[#a5a5b2]">Users to notify: <span className="text-white font-medium">{selectedMembers.length > 0 ? `${selectedMembers.length} specific members` : (team || 'All Teams')}</span></p>
                </div>

                <div className="flex gap-[12px] items-center">
                    <div className="relative shrink-0 size-[16px]">
                    <svg className="size-full" fill="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p3b8f8870} fill="#3457dc" />
                    </svg>
                    </div>
                    <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[14px] text-[#a5a5b2]">Scheduled for <span className="text-white font-medium">{deliveryType === 'now' ? 'Immediately' : 'Later'}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Settings Section */}
          <div className="bg-[#151519] relative rounded-[16px] w-full">
            <div aria-hidden="true" className="absolute border border-[#1e1d22] border-solid inset-0 pointer-events-none rounded-[16px]" />
            <div className="content-stretch flex flex-col items-start p-[24px] relative">
              <div className="content-stretch flex flex-col gap-[24px] items-start w-full">
                <p className="font-['Gilroy',sans-serif] font-bold leading-[normal] not-italic text-[18px] text-white w-full">Delivery Settings</p>
                
                <div className="content-stretch flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Gilroy:ExtraBold',sans-serif] font-bold leading-[normal] not-italic text-[14px] text-white/90 w-full">When do you want to send the notification?</p>
                  
                  <div className="content-stretch flex flex-col gap-[32px] items-start w-full">
                    {/* Radio Options */}
                    <div className="content-stretch flex flex-col gap-[20px] items-start">
                      {/* Send now */}
                      <div 
                        className="content-stretch flex gap-[12px] items-start cursor-pointer group"
                        onClick={() => setDeliveryType('now')}
                      >
                        <div className="h-[20px] relative shrink-0 w-[16px] mt-[2px]">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
                            <g>
                              <circle cx="8" cy="10" r="6.5" stroke={deliveryType === 'now' ? "#3457DC" : "#373735"} strokeWidth="3" />
                            </g>
                          </svg>
                        </div>
                        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center leading-[normal] not-italic text-[14px]">
                          <p className={`font-['Poppins',sans-serif] font-medium transition-colors ${deliveryType === 'now' ? 'text-white' : 'text-[#a5a5b2] group-hover:text-white'}`}>Send now</p>
                          <p className="font-['Poppins',sans-serif] text-[#a5a5b2] text-[13px]">Deliver immediately to the targeted users.</p>
                        </div>
                      </div>

                      {/* Schedule for later */}
                      <div 
                        className="content-stretch flex gap-[12px] items-start cursor-pointer group"
                        onClick={() => setDeliveryType('later')}
                      >
                        <div className="h-[20px] relative shrink-0 w-[16px] mt-[2px]">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
                            <g>
                              <circle cx="8" cy="10" r="6.5" stroke={deliveryType === 'later' ? "#3457DC" : "#373735"} strokeWidth="3" />
                            </g>
                          </svg>
                        </div>
                        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center leading-[normal] not-italic text-[14px]">
                          <p className={`font-['Poppins',sans-serif] font-medium transition-colors ${deliveryType === 'later' ? 'text-white' : 'text-[#a5a5b2] group-hover:text-white'}`}>Schedule for later</p>
                          <p className="font-['Poppins',sans-serif] text-[#a5a5b2] text-[13px]">Pick a date and time for delivery</p>
                        </div>
                      </div>
                    </div>

                    <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                        <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px] w-full">Date & time picker</p>
                        <div className={`bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] flex items-center justify-between px-[14px] transition-all hover:border-white/10 ${deliveryType === 'now' ? 'opacity-50 pointer-events-none' : ''}`}>
                              <input 
                                type="datetime-local" 
                                className="bg-transparent border-none outline-none size-full text-white font-['Poppins',sans-serif] text-[14px] custom-datetime-picker"
                                value={scheduledAt}
                                onChange={(e) => setScheduledAt(e.target.value)}
                                disabled={deliveryType === 'now'}
                              />
                              <div className="relative shrink-0 size-[20px] pointer-events-none ml-2">
                                <svg className="size-full" fill="none" viewBox="0 0 20 20">
                                    <path d={svgPaths.p3b8f8870} fill="#3457DC" />
                                </svg>
                              </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

const NotificationsHistoryTable = ({ notifications, onDelete, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 1; // Simplification

    const filteredNotifications = notifications.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.team.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filterItemStyle = {
        backgroundColor: 'rgba(255,255,255,0.01)',
        borderRadius: '0.9vw',
        padding: '1.1vh 1.2vw',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6vw',
        border: '1px solid #1e1d22',
        minWidth: '30vw'
    };

    return (
        <div style={{
            backgroundColor: '#151519',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '3vh 1.5vw 4vh 1.5vw',
            borderRadius: '1.2vw',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '2vh'
        }}>
            {/* 1. Header & Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3.5vh' }}>
                <div className="flex flex-col gap-1">
                    <h2 style={{ fontSize: '1.2vw', fontWeight: 600, color: 'white', margin: 0, fontFamily: 'Gilroy, sans-serif' }}>Saved Notifications</h2>
                    <p style={{ color: '#a5a5b2', fontSize: '0.85vw', margin: 0 }}>Choose from your saved notifications, or create a new one</p>
                </div>
                
                <div style={filterItemStyle}>
                    <input
                        type="text"
                        placeholder="Search /"
                        style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <RiSearch2Line color="#3457DC" size="1.2vw" />
                </div>
            </div>

            {/* 2. Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '1.5vh 0.5vw', width: '3vw' }}>
                                <div style={{ width: '1.1vw', height: '1.1vw', borderRadius: '4px', border: '1px solid #2a2a30', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    {/* Global Checkbox Placeholder */}
                                </div>
                            </th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Added</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Title</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Created by</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                Target Team <RiInformationLine size="14px" />
                            </th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Last used</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNotifications.map((row) => (
                            <tr key={row._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', height: '8vh' }}>
                                <td style={{ padding: '0 0.5vw' }}>
                                    <div style={{ width: '1.1vw', height: '1.1vw', borderRadius: '4px', border: '1px solid #2a2a30', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    </div>
                                </td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{new Date(row.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'white', fontWeight: 500 }}>{row.title}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.createdBy?.email || 'System'}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'white' }}>{row.team}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{new Date(row.lastUsed).toLocaleDateString()}</td>
                                <td style={{ padding: '0 0.5vw', textAlign: 'right' }}>
                                    <div className="flex items-center justify-end gap-3">
                                        <button 
                                            className="bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
                                            onClick={() => onEdit(row)}
                                        >
                                            <img src={EditIcon} alt="edit" className="w-[1.2vw]" />
                                        </button>
                                        <button 
                                            className="bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
                                            onClick={() => onDelete(row._id)}
                                        >
                                            <img src={TrashIcon} alt="delete" className="w-[1.2vw]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 3. Pagination Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4vh' }}>
                <div style={{ display: 'flex', gap: '12vw', alignItems: 'center' }}>
                    <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <RiArrowLeftSLine color="#F7F7F7" size="1.2vw" />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
                        <div style={{ border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1vh 0.6vw', backgroundColor: 'rgba(255,255,255,0.01)', minWidth: '2.5vw', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.9vw', color: '#ffffff' }}>2</span>
                        </div>
                        <span style={{ fontSize: '0.95vw', color: '#80808a' }}>of 12</span>
                    </div>

                    <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <RiArrowRightSLine color="#F7F7F7" size="1.2vw" />
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
                    <span style={{ fontSize: '0.9vw', color: '#a5a5b2' }}>results per page</span>
                    <div style={{
                        backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '0.6vw', padding: '0.8vh 1vw', display: 'flex', alignItems: 'center', gap: '0.5vw', cursor: 'pointer'
                    }}>
                        <span style={{ color: 'white', fontSize: '0.85vw' }}>10</span>
                        <RiArrowDownSLine color="#3457DC" size="1vw" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Notifications = () => {
    const [activeTab, setActiveTab] = useState('Notifications history');
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingNotification, setEditingNotification] = useState(null);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('https://academic-research-lab-institutional-site.onrender.com/api/notifications');
            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteNotification = async (id) => {
        if (!window.confirm('Are you sure you want to delete this notification?')) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`https://academic-research-lab-institutional-site.onrender.com/api/notifications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setNotifications(notifications.filter(n => n._id !== id));
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const renderTabContent = () => {
        if (loading) return <div className="p-10 text-center">Loading notifications...</div>;

        switch (activeTab) {
            case 'Notifications history':
                return <NotificationsHistoryTable 
                            notifications={notifications} 
                            onDelete={handleDeleteNotification} 
                            onEdit={(data) => {
                                setEditingNotification(data);
                                setActiveTab('New Notification');
                            }}
                        />;
            case 'New Notification':
                return <NewNotification 
                            editData={editingNotification}
                            onNotificationSent={() => {
                                fetchNotifications();
                                setEditingNotification(null);
                                setActiveTab('Notifications history');
                            }} 
                        />;
            default: return null;
        }
    };

    return (
        <div className="w-full text-white font-poppins pb-10">
            {/* Header with Tabs */}
            <div className="mb-[40px] mt-[0px]">
                <div className="flex gap-[30px] items-center pt-[0px] px-[0px] w-full">
                    <Tab 
                        label="Notifications history" 
                        isActive={activeTab === 'Notifications history'} 
                        onClick={() => setActiveTab('Notifications history')} 
                    />
                    <Tab 
                        label="New Notification" 
                        isActive={activeTab === 'New Notification'} 
                        onClick={() => setActiveTab('New Notification')} 
                    />
                </div>
            </div>

            {/* Tab Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderTabContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Notifications;

