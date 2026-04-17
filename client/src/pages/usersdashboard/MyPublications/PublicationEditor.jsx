import React, { useState, useEffect, useRef } from 'react';
import { 
    RiRefreshLine, RiHistoryLine, RiTranslate, RiArrowDownSLine, 
    RiAlignLeft, RiAlignCenter, RiAlignRight, RiAlignJustify,
    RiBold, RiItalic, RiUnderline, RiStrikethrough,
    RiH1, RiH2, RiH3, RiCodeSSlashLine, RiFormatClear,
    RiListUnordered, RiListOrdered, RiLinksLine, RiImageLine,
    RiCodeView, RiDoubleQuotesL, RiSeparator
} from "react-icons/ri";
import { createPortal } from "react-dom";
import wordIcon from "../../../assets/svg/userDashboard/My Publications/word/Vector-11.svg";
import DropdownIcon from "../../../assets/svg/userDashboard/PhdTracker/angle-small-down 1.svg";

const ToolbarButton = ({ icon: Icon, active = false, onClick }) => (
    <div className="content-stretch flex items-start relative shrink-0">
        <div
            onClick={(e) => { e.preventDefault(); onClick?.(); }}
            className={`content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-all ${active ? 'bg-white/10' : 'hover:bg-white/10'}`}
        >
            <div className="overflow-clip relative shrink-0 w-[20px] h-[20px] flex items-center justify-center">
                <Icon size={16} color="white" />
            </div>
        </div>
    </div>
);

const PortalMenu = ({ children, triggerRect, onClose, width = 'w-[140px]' }) => {
    if (!triggerRect) return null;
    return createPortal(
        <>
            <div className="fixed inset-0 z-[999]" onClick={onClose} />
            <div
                className={`absolute z-[1000] bg-[#1E1E24] border border-white/10 rounded-xl shadow-2xl py-1.5 transition-all animate-in fade-in zoom-in-95 duration-100 ${width}`}
                style={{ top: triggerRect.bottom + window.scrollY + 6, left: triggerRect.left + window.scrollX }}
            >
                {children}
            </div>
        </>,
        document.body
    );
};

const PortalTooltip = ({ text, triggerRect }) => {
    if (!triggerRect) return null;
    return createPortal(
        <div
            className="fixed z-[1001] bg-[#1E1E24] border border-white/10 px-2 py-1 rounded text-[11px] text-white pointer-events-none transition-all animate-in fade-in duration-200"
            style={{ top: triggerRect.top + window.scrollY - 30, left: triggerRect.left + window.scrollX + (triggerRect.width / 2), transform: 'translateX(-50%)' }}
        >
            {text}
        </div>,
        document.body
    );
};

const PublicationEditor = ({ langTab, setLangTab, lastUpdated, isDraft, lastDraftAt, content, setContent, onImport }) => {
    const editorRef = useRef(null);
    const typeBtnRef = useRef(null);
    const alignBtnRef = useRef(null);
    const importBtnRef = useRef(null);
    const fileInputRef = useRef(null);

    const [typeMenuRect, setTypeMenuRect] = useState(null);
    const [alignMenuRect, setAlignMenuRect] = useState(null);
    const [importTipRect, setImportTipRect] = useState(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== content) {
            editorRef.current.innerHTML = content;
        }
    }, [content]);

    const handleAction = (cmd, val = "") => {
        document.execCommand(cmd, false, val);
        if (editorRef.current) setContent(editorRef.current.innerHTML);
    };

    const toggleTypeMenu = () => setTypeMenuRect(typeMenuRect ? null : typeBtnRef.current?.getBoundingClientRect() || null);
    const toggleAlignMenu = () => setAlignMenuRect(alignMenuRect ? null : alignBtnRef.current?.getBoundingClientRect() || null);
    const triggerImageUpload = () => fileInputRef.current?.click();

    const handleImageFile = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => handleAction("insertImage", event.target?.result);
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    };

    return (
        <div className="bg-[#151519] relative rounded-[16px] shrink-0 w-full" style={{ border: '1px solid #1e1d22' }}>
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[24px] relative size-full">
                {/* Header (Tabs + Info) */}
                <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
                        <div onClick={() => setLangTab('en')} className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 cursor-pointer">
                            <p className={`font-['Poppins',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] whitespace-nowrap ${langTab === 'en' ? 'text-[#3457dc]' : 'text-[#a5a5b2]'}`}>English Content</p>
                            <div className={`h-[2px] rounded-[400px] shrink-0 w-full ${langTab === 'en' ? 'bg-[#3457dc]' : 'opacity-0'}`} />
                        </div>
                        <div onClick={() => setLangTab('ar')} className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 cursor-pointer">
                            <p className={`font-['Poppins',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] whitespace-nowrap ${langTab === 'ar' ? 'text-[#3457dc]' : 'text-[#a5a5b2]'}`}>Arabic Content</p>
                            <div className={`h-[2px] rounded-[400px] shrink-0 w-full ${langTab === 'ar' ? 'bg-[#3457dc]' : 'opacity-0'}`} />
                        </div>
                    </div>
                    {/* Last Updated info */}
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                            <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                                <RiRefreshLine size={16} color="#A5A5B2" />
                                <p className="font-['Poppins',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#a5a5b2] text-[14px] whitespace-nowrap">
                                    {lastUpdated ? `Last updated: ${lastUpdated}` : 'No published version yet'}
                                </p>
                            </div>
                            <div className="bg-[#1e1e24] h-[16px] w-[1px]" />
                            <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                                <RiHistoryLine size={16} color="#A5A5B2" />
                                <p className="font-['Poppins',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#a5a5b2] text-[14px] whitespace-nowrap">
                                    {isDraft ? `Draft auto-saved: ${lastDraftAt}` : 'All changes saved to draft'}
                                </p>
                            </div>
                            <div className="flex-1" />
                            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 cursor-pointer group">
                                <RiTranslate size={16} color="#A5A5B2" className="group-hover:text-white transition-colors" />
                                <p className="font-['Poppins',sans-serif] leading-[normal] text-[#a5a5b2] text-[14px] group-hover:text-white transition-colors">Translate Content</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor Surface */}
                <div className="relative shrink-0 w-full">
                    <div className="bg-[#151519] flex flex-col items-start relative shrink-0 w-full min-h-[400px]">
                        {/* Editor Toolbar */}
                        <div className="bg-[#1e1e24] border-b border-[#2a2a30] shrink-0 w-full rounded-t-[12px] z-[10]">
                            <div className="flex items-center justify-between px-[12px] h-[52px]">
                                <div className="flex items-center gap-[4px]">
                                    {/* Text Type Selection */}
                                    <div className="content-stretch flex flex-col items-start relative shrink-0 border-r border-[#2a2a30] pr-[8px]">
                                        <div
                                            ref={typeBtnRef}
                                            onClick={toggleTypeMenu}
                                            className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-white/10 transition-colors"
                                        >
                                            <p className="font-['Poppins',sans-serif] font-medium leading-[normal] text-[13px] text-white">Body</p>
                                            <RiArrowDownSLine size={14} color="white" />
                                        </div>
                                        <PortalMenu triggerRect={typeMenuRect} onClose={() => setTypeMenuRect(null)}>
                                            <div onClick={() => { handleAction("formatBlock", "p"); setTypeMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm">Body</div>
                                            <div onClick={() => { handleAction("formatBlock", "h1"); setTypeMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm font-bold">Heading 1</div>
                                            <div onClick={() => { handleAction("formatBlock", "h2"); setTypeMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm font-bold">Heading 2</div>
                                            <div onClick={() => { handleAction("formatBlock", "h3"); setTypeMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm font-bold">Heading 3</div>
                                        </PortalMenu>
                                    </div>

                                    {/* Text Styling */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] px-[8px]">
                                        <ToolbarButton icon={RiBold} onClick={() => handleAction("bold")} />
                                        <ToolbarButton icon={RiItalic} onClick={() => handleAction("italic")} />
                                        <ToolbarButton icon={RiUnderline} onClick={() => handleAction("underline")} />
                                        <ToolbarButton icon={RiStrikethrough} onClick={() => handleAction("strikeThrough")} />
                                    </div>

                                    {/* Alignment */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] px-[8px]">
                                        <div
                                            ref={alignBtnRef}
                                            onClick={toggleAlignMenu}
                                            className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-white/10 transition-colors"
                                        >
                                            <RiAlignLeft size={16} color="white" />
                                            <RiArrowDownSLine size={12} color="white" />
                                        </div>
                                        <PortalMenu triggerRect={alignMenuRect} onClose={() => setAlignMenuRect(null)} width="w-[48px]">
                                            <div className="flex flex-col items-center">
                                                <ToolbarButton icon={RiAlignLeft} onClick={() => { handleAction("justifyLeft"); setAlignMenuRect(null); }} />
                                                <ToolbarButton icon={RiAlignCenter} onClick={() => { handleAction("justifyCenter"); setAlignMenuRect(null); }} />
                                                <ToolbarButton icon={RiAlignRight} onClick={() => { handleAction("justifyRight"); setAlignMenuRect(null); }} />
                                                <ToolbarButton icon={RiAlignJustify} onClick={() => { handleAction("justifyFull"); setAlignMenuRect(null); }} />
                                            </div>
                                        </PortalMenu>
                                    </div>

                                    {/* Heading Options */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] px-[8px]">
                                        <ToolbarButton icon={RiH1} onClick={() => handleAction("formatBlock", "h1")} />
                                        <ToolbarButton icon={RiH2} onClick={() => handleAction("formatBlock", "h2")} />
                                        <ToolbarButton icon={RiH3} onClick={() => handleAction("formatBlock", "h3")} />
                                        <ToolbarButton icon={RiCodeSSlashLine} onClick={() => handleAction("formatBlock", "pre")} />
                                        <ToolbarButton icon={RiFormatClear} onClick={() => handleAction("removeFormat")} />
                                    </div>

                                    {/* List Option */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] pr-[8px]">
                                        <ToolbarButton icon={RiListUnordered} onClick={() => handleAction("insertUnorderedList")} />
                                        <ToolbarButton icon={RiListOrdered} onClick={() => handleAction("insertOrderedList")} />
                                    </div>

                                    {/* Etc */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
                                        <ToolbarButton icon={RiLinksLine} onClick={() => handleAction("createLink", prompt('Enter URL:') || "")} />
                                        <ToolbarButton icon={RiImageLine} onClick={triggerImageUpload} />
                                        <ToolbarButton icon={RiCodeView} onClick={() => handleAction("formatBlock", "pre")} />
                                        <ToolbarButton icon={RiDoubleQuotesL} onClick={() => handleAction("formatBlock", "blockquote")} />
                                        <ToolbarButton icon={RiSeparator} onClick={() => handleAction("insertHorizontalRule")} />
                                    </div>
                                </div>

                                {/* Import Button */}
                                <div onClick={onImport} className="bg-[#2a2a30] content-stretch flex gap-[10px] items-center justify-center px-[16px] h-[36px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-white/10 transition-colors">
                                    <p className="font-['Poppins',sans-serif] font-medium leading-[normal] text-[13px] text-white whitespace-nowrap">Import from Word</p>
                                    <img src={wordIcon} alt="word" style={{ width: '16px' }} />
                                </div>
                            </div>
                        </div>

                        {/* Editor Canvas */}
                        <div className="relative shrink-0 w-full z-[1]">
                            <div className="overflow-x-clip py-[12px] overflow-y-auto w-full">
                                <div
                                    ref={editorRef}
                                    contentEditable
                                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                    dir={langTab === 'ar' ? 'rtl' : 'ltr'}
                                    className="w-full bg-[#151519] px-[16px] pb-[16px] text-[14px] text-white leading-[1.6] outline-none min-h-[300px] editor-canvas"
                                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#2a2a30] border-solid inset-0 pointer-events-none rounded-[6px]" />
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .editor-canvas h1 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; color: #fff; line-height: 1.2; }
                .editor-canvas h2 { font-size: 1.875rem; font-weight: 700; margin-bottom: 1.25rem; color: #fff; line-height: 1.3; }
                .editor-canvas h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #fff; line-height: 1.4; }
                .editor-canvas h4 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #fff; }
                .editor-canvas h5 { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: #fff; }
                .editor-canvas h6 { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; color: #fff; }
                .editor-canvas p { margin-bottom: 1rem; }
                .editor-canvas blockquote { border-left: 4px solid #3457DC; padding-left: 1.5rem; margin: 1.5rem 0; font-style: italic; color: rgba(255,255,255,0.6); }
                .editor-canvas ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
                .editor-canvas ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
                .editor-canvas li { margin-bottom: 0.25rem; }
                .editor-canvas a { color: #3457DC; text-decoration: underline; }
                .editor-canvas img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
                .editor-canvas hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2rem 0; }
            `}} />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
        </div>
    );
};

export default PublicationEditor;
