import React, { useState, useRef } from 'react';

const svgPaths = {
  angleDown: "M15.5917 6.84167C15.5142 6.76356 15.422 6.70156 15.3205 6.65926C15.2189 6.61695 15.11 6.59517 15 6.59517C14.89 6.59517 14.7811 6.61695 14.6795 6.65926C14.578 6.70156 14.4858 6.76356 14.4083 6.84167L10.5917 10.6583C10.5142 10.7364 10.422 10.7984 10.3205 10.8407C10.2189 10.8831 10.110 10.9048 10 10.9048C9.88999 10.9048 9.78107 10.8831 9.67952 10.8407C9.57797 10.7984 9.4858 10.7364 9.40833 10.6583L5.59167 6.84167C5.5142 6.76356 5.42203 6.70156 5.32048 6.65926C5.21893 6.61695 5.11001 6.59517 5 6.59517C4.88999 6.59517 4.78107 6.61695 4.67952 6.65926C4.57797 6.70156 4.4858 6.76356 4.40833 6.84167C4.25312 6.9978 4.16601 7.20901 4.16601 7.42917C4.16601 7.64932 4.25312 7.86053 4.40833 8.01667L8.23333 11.8417C8.70208 12.3098 9.3375 12.5728 10 12.5728C10.6625 12.5728 11.2979 12.3098 11.7667 11.8417L15.5917 8.01667C15.7469 7.86053 15.834 7.64932 15.834 7.42917C15.834 7.20901 15.7469 6.9978 15.5917 6.84167Z",
  cornerResize: "M12 6C12 9.31371 9.31371 12 6 12H0.5C0.223858 12 0 11.7761 0 11.5C0 11.2239 0.223858 11 0.5 11H6C8.76142 11 11 8.76142 11 6V0.5C11 0.223858 11.2239 0 11.5 0C11.7761 0 12 0.223858 12 0.5V6Z",
  editPaths: [
    "M15.547 0.774979L5.38701 10.935C4.99896 11.3209 4.69132 11.78 4.48191 12.2857C4.2725 12.7913 4.16546 13.3335 4.16701 13.8808V15C4.16701 15.221 4.25481 15.433 4.41109 15.5892C4.56737 15.7455 4.77933 15.8333 5.00034 15.8333H6.11951C6.66681 15.8349 7.20898 15.7278 7.71464 15.5184C8.22029 15.309 8.67939 15.0014 9.06534 14.6133L19.2253 4.45331C19.7123 3.96512 19.9858 3.30371 19.9858 2.61415C19.9858 1.92458 19.7123 1.26317 19.2253 0.774979C18.7301 0.301557 18.0713 0.0373535 17.3862 0.0373535C16.701 0.0373535 16.0423 0.301557 15.547 0.774979ZM18.047 3.27498L7.88701 13.435C7.41711 13.902 6.78201 14.1649 6.11951 14.1666H5.83368V13.8808C5.83541 13.2183 6.09831 12.5832 6.56534 12.1133L16.7253 1.95331C16.9033 1.78327 17.14 1.68839 17.3862 1.68839C17.6323 1.68839 17.869 1.78327 18.047 1.95331C18.222 2.12874 18.3202 2.36639 18.3202 2.61415C18.3202 2.8619 18.222 3.09955 18.047 3.27498Z",
    "M19.1667 7.4825C18.9457 7.4825 18.7337 7.5703 18.5774 7.72658C18.4211 7.88286 18.3333 8.09482 18.3333 8.31583V12.5H15C14.337 12.5 13.7011 12.7634 13.2322 13.2322C12.7634 13.7011 12.5 14.337 12.5 15V18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V4.16667C1.66667 3.50363 1.93006 2.86774 2.3989 2.3989C2.86774 1.93006 3.50363 1.66667 4.16667 1.66667H11.7017C11.9227 1.66667 12.1346 1.57887 12.2909 1.42259C12.4472 1.26631 12.535 1.05435 12.535 0.833333C12.535 0.61232 12.4472 0.400358 12.2909 0.244078C12.1346 0.0877974 11.9227 0 11.7017 0L4.16667 0C3.062 0.00132321 2.00296 0.440735 1.22185 1.22185C0.440735 2.00296 0.00132321 3.062 0 4.16667L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H13.6192C14.1666 20.0016 14.7089 19.8945 15.2147 19.6851C15.7205 19.4757 16.1797 19.1681 16.5658 18.78L18.7792 16.565C19.1673 16.1791 19.475 15.72 19.6846 15.2143C19.8941 14.7087 20.0013 14.1665 20 13.6192V8.31583C20 8.09482 19.9122 7.88286 19.7559 7.72658C19.5996 7.5703 19.3877 7.4825 19.1667 7.4825ZM15.3875 17.6017C15.0525 17.9358 14.6289 18.1672 14.1667 18.2683V15C14.1667 14.779 14.2545 14.567 14.4107 14.4107C14.567 14.2545 14.779 14.1667 15 14.1667H18.2708C18.1677 14.6279 17.9367 15.0508 17.6042 15.3867L15.3875 17.6017Z"
  ],
  trashPaths: [
    "M17.5003 3.33333H14.917C14.7236 2.39284 14.2118 1.54779 13.468 0.940598C12.7242 0.333408 11.7938 0.0012121 10.8337 0L9.16699 0C8.20682 0.0012121 7.27642 0.333408 6.53262 0.940598C5.78881 1.54779 5.27707 2.39284 5.08366 3.33333H2.50033C2.27931 3.33333 2.06735 3.42113 1.91107 3.57741C1.75479 3.73369 1.66699 3.94565 1.66699 4.16667C1.66699 4.38768 1.75479 4.59964 1.91107 4.75592C2.06735 4.9122 2.27931 5 2.50033 5H3.33366V15.8333C3.33498 16.938 3.77439 17.997 4.55551 18.7782C5.33662 19.5593 6.39566 19.9987 7.50033 20H12.5003C13.605 19.9987 14.664 19.5593 15.4451 18.7782C16.2263 17.997 16.6657 16.938 16.667 15.8333V5H17.5003C17.7213 5 17.9333 4.9122 18.0896 4.75592C18.2459 4.59964 18.3337 4.38768 18.3337 4.16667C18.3337 3.94565 18.2459 3.73369 18.0896 3.57741C17.9333 3.42113 17.7213 3.33333 17.5003 3.33333ZM9.16699 1.66667H10.8337C11.3506 1.6673 11.8546 1.82781 12.2767 2.1262C12.6987 2.42459 13.0182 2.84624 13.1912 3.33333H6.80949C6.98248 2.84624 7.30191 2.42459 7.72398 2.1262C8.14605 1.82781 8.6501 1.6673 9.16699 1.66667ZM15.0003 15.8333C15.0003 16.4964 14.7369 17.1323 14.2681 17.6011C13.7993 18.0699 13.1634 18.3333 12.5003 18.3333H7.50033C6.83728 18.3333 6.2014 18.0699 5.73256 17.6011C5.26372 17.1323 5.00033 16.4964 5.00033 15.8333V5H15.0003V15.8333Z",
    "M8.33333 14.9999C8.55435 14.9999 8.76631 14.9121 8.92259 14.7558C9.07887 14.5996 9.16667 14.3876 9.16667 14.1666V9.16659C9.16667 8.94557 9.07887 8.73361 8.92259 8.57733C8.76631 8.42105 8.55435 8.33325 8.33333 8.33325C8.11232 8.33325 7.90036 8.42105 7.74408 8.57733C7.5878 8.73361 7.5 8.94557 7.5 9.16659V14.1666C7.5 14.3876 7.5878 14.5996 7.74408 14.7558C7.90036 14.9121 8.11232 14.9999 8.33333 14.9999Z",
    "M11.6663 14.9999C11.8874 14.9999 12.0993 14.9121 12.2556 14.7558C12.4119 14.5996 12.4997 14.3876 12.4997 14.1666V9.16659C12.4997 8.94557 12.4119 8.73361 12.2556 8.57733C12.0993 8.42105 11.8874 8.33325 11.6663 8.33325C11.4453 8.33325 11.2334 8.42105 11.0771 8.57733C10.9208 8.73361 10.833 8.94557 10.833 9.16659V14.1666C10.833 14.3876 10.9208 14.5996 11.0771 14.7558C11.2334 14.9121 11.4453 14.9999 11.6663 14.9999Z"
  ]
};

const NewChatModal = ({ isOpen, onClose, onSend }) => {
  const [recipient, setRecipient] = useState('Walid 1');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  const availableRecipients = [
    { id: 1, name: 'Walid 1', role: 'Researcher' },
    { id: 2, name: 'Walid 2', role: 'Doctorat' },
    { id: 3, name: 'Serine', role: 'Researcher' },
    { id: 4, name: 'Prof. Sarah', role: 'Lab Head' },
    { id: 5, name: 'Prof. Ahmed', role: 'Senior Professor' }
  ];

  if (!isOpen) return null;

  const handleSend = () => {
    if (onSend && (message.trim() || selectedFile)) {
      onSend({ 
        recipient, 
        message, 
        file: selectedFile ? { name: selectedFile.name, size: (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' } : null 
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSelectRecipient = (name) => {
    setRecipient(name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div 
        className="bg-[#151519] border border-[#1e1d22] relative animate-in zoom-in-95 duration-300 overflow-visible" 
        style={{ 
          width: 'clamp(300px, 40vw, 600px)', 
          borderRadius: '1.2vw', 
          padding: '2.5vw' 
        }}
      >
        <div className="flex flex-col w-full" style={{ gap: '2.5vh' }}>
          
          {/* Section: Choose One? */}
          <div className="flex flex-col w-full relative" style={{ gap: '1.2vh' }}>
            <label className="text-[#EDEDF0] font-poppins font-medium" style={{ fontSize: '0.85vw' }}>Choose one?</label>
            
            {/* Custom Dropdown Trigger */}
            <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`bg-[#1e1e24]/50 border flex items-center justify-between cursor-pointer transition-all ${isDropdownOpen ? 'border-[#3457dc] shadow-[0_0_15px_rgba(52,87,220,0.2)]' : 'border-[#2a2a30] hover:border-[#3457dc]'}`}
                style={{ borderRadius: '0.6vw', padding: '1.5vh 1vw' }}
            >
              <div className="flex items-center" style={{ gap: '0.8vw' }}>
                 <div className="bg-[#3457dc]/20 flex items-center justify-center rounded-full border border-[#3457dc]/30" 
                      style={{ width: '1.8vw', height: '1.8vw', fontSize: '0.7vw', fontWeight: 'bold', color: '#3457dc' }}>
                   {recipient.charAt(0)}
                 </div>
                 <span className="text-white font-poppins" style={{ fontSize: '0.85vw' }}>{recipient}</span>
              </div>
              <svg viewBox="0 0 20 20" style={{ width: '1.1vw', height: '1.1vw', transition: 'transform 0.3s', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} className="pointer-events-none">
                 <path d={svgPaths.angleDown} fill="#3457DC" />
              </svg>
            </div>

            {/* Custom Dropdown List */}
            {isDropdownOpen && (
              <div 
                className="absolute left-0 right-0 z-[60] bg-[#1e1e24] border border-[#2a2a30] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden"
                style={{ top: 'calc(100% + 0.5vh)', borderRadius: '0.8vw', maxHeight: '25vh' }}
              >
                <div className="flex flex-col overflow-y-auto custom-scrollbar h-full">
                  {availableRecipients.map((person) => (
                    <div 
                      key={person.id}
                      onClick={() => handleSelectRecipient(person.name)}
                      className="flex items-center justify-between hover:bg-[#3457dc]/10 cursor-pointer transition-colors border-b border-white/5 last:border-none"
                      style={{ padding: '1.5vh 1vw', gap: '1vw' }}
                    >
                      <div className="flex items-center" style={{ gap: '0.8vw' }}>
                        <div className="bg-[#2a2a30] flex items-center justify-center rounded-full border border-white/5" 
                             style={{ width: '1.6vw', height: '1.6vw', fontSize: '0.65vw', color: '#a5a5b2' }}>
                          {person.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-white font-medium" style={{ fontSize: '0.8vw' }}>{person.name}</span>
                           <span className="text-[#80808a]" style={{ fontSize: '0.65vw' }}>{person.role}</span>
                        </div>
                      </div>
                      {recipient === person.name && (
                        <div className="bg-[#3457dc]" style={{ width: '0.4vw', height: '0.4vw', borderRadius: '50%' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Your message */}
          <div className="flex flex-col w-full" style={{ gap: '1.2vh' }}>
            <label className="text-[#EDEDF0] font-poppins font-medium" style={{ fontSize: '0.85vw' }}>Your message</label>
            <div 
                className="bg-[#1e1e24]/50 border border-[#1e1d22] relative"
                style={{ borderRadius: '0.6vw', minHeight: '18vh', padding: '1.5vh 1vw' }}
            >
              <textarea 
                placeholder="Describe the issue, steps to reproduce, or anything that might help."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full h-full resize-none font-poppins leading-relaxed placeholder-[#70707a]"
                style={{ fontSize: '0.85vw' }}
              />
              <div className="absolute right-[0.6vw] bottom-[0.6vw]">
                 <svg viewBox="0 0 12 12" style={{ width: '0.8vw', height: '0.8vw' }}>
                    <path d={svgPaths.cornerResize} fill="#A5A5B2" />
                 </svg>
              </div>
            </div>
          </div>

          {/* Section: Send a file */}
          <div className="flex flex-col w-full" style={{ gap: '1.2vh' }}>
            <label className="text-[#EDEDF0] font-poppins font-medium" style={{ fontSize: '0.85vw' }}>Send a file</label>
            <input 
               type="file" 
               className="hidden" 
               ref={fileInputRef} 
               onChange={handleFileChange} 
            />
            <div 
                onClick={triggerFileInput}
                className={`bg-[#1e1e24]/50 border flex items-center justify-between transition-all cursor-pointer ${selectedFile ? 'border-[#3457dc] bg-[#1e1e24]/70' : 'border-[#2a2a30] hover:bg-[#1e1e24]/70'}`}
                style={{ borderRadius: '0.6vw', padding: '1.2vh 1vw' }}
            >
              <span className={`font-poppins font-medium truncate w-[70%] ${selectedFile ? 'text-white' : 'text-[#a5a5b2]'}`} style={{ fontSize: '0.85vw' }}>
                {selectedFile ? selectedFile.name : 'Click to select a file...'}
              </span>
              
              <div className="flex items-center" style={{ gap: '0.8vw' }}>
                {selectedFile && (
                  <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={removeFile}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ width: '1.1vw', height: '1.1vw' }}>
                      {svgPaths.trashPaths.map((p, i) => (
                        <path key={i} d={p} fill="#C5432D" />
                      ))}
                    </svg>
                  </div>
                )}
                
                <div className="cursor-pointer hover:opacity-80 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ width: '1.1vw', height: '1.1vw' }}>
                    {svgPaths.editPaths.map((p, i) => (
                      <path key={i} d={p} fill="#3457DC" />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSend}
            disabled={!message.trim() && !selectedFile}
            className={`w-full text-white font-medium transition-all flex items-center justify-center mt-[1vh] ${(!message.trim() && !selectedFile) ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-[#3457dc] hover:bg-[#4a6dec] active:scale-95'}`}
            style={{ borderRadius: '1vw', padding: '1.8vh', fontSize: '0.85vw' }}
          >
            Send Message
          </button>
        </div>
      </div>
      
      {/* Click outside to close dropdown or modal */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={() => {
          if (isDropdownOpen) setIsDropdownOpen(false);
          else onClose();
        }} 
      />
    </div>
  );
};

export default NewChatModal;
