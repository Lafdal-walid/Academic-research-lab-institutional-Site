import React, { useState, useEffect, useRef } from 'react';
import { 
    RiRefreshLine, RiHistoryLine, RiTranslate, RiArrowDownSLine, 
    RiAlignLeft, RiAlignCenter, RiAlignRight, RiAlignJustify,
    RiBold, RiItalic, RiUnderline, RiStrikethrough,
    RiH1, RiH2, RiH3, RiCodeSSlashLine, RiFormatClear,
    RiListUnordered, RiListOrdered, RiLinksLine, RiImageLine,
    RiDoubleQuotesL, RiSeparator, RiTableLine
} from "react-icons/ri";
import { createPortal } from "react-dom";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Placeholder } from '@tiptap/extension-placeholder';

import wordIcon from "../../../assets/svg/userDashboard/My Publications/word/Vector-11.svg";

const ToolbarButton = ({ icon: Icon, active = false, onClick, disabled = false }) => (
    <div className="content-stretch flex items-start relative shrink-0">
        <button
            onClick={(e) => { e.preventDefault(); onClick?.(); }}
            disabled={disabled}
            className={`content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-all border-none ${active ? 'bg-white/20' : 'hover:bg-white/10'} ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
            <div className="overflow-clip relative shrink-0 w-[20px] h-[20px] flex items-center justify-center">
                <Icon size={16} color="white" />
            </div>
        </button>
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

const PublicationEditor = ({ langTab, setLangTab, lastUpdated, isDraft, lastDraftAt, content, setContent, onImport }) => {
    const typeBtnRef = useRef(null);
    const alignBtnRef = useRef(null);
    const tableBtnRef = useRef(null);

    const [typeMenuRect, setTypeMenuRect] = useState(null);
    const [alignMenuRect, setAlignMenuRect] = useState(null);
    const [tableMenuRect, setTableMenuRect] = useState(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image.configure({
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'editor-link',
                },
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Placeholder.configure({
                placeholder: 'Write the publication content here...',
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;

    const toggleTypeMenu = () => setTypeMenuRect(typeMenuRect ? null : typeBtnRef.current?.getBoundingClientRect() || null);
    const toggleAlignMenu = () => setAlignMenuRect(alignMenuRect ? null : alignBtnRef.current?.getBoundingClientRect() || null);
    const toggleTableMenu = () => setTableMenuRect(tableMenuRect ? null : tableBtnRef.current?.getBoundingClientRect() || null);

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="editor-publication-main bg-[#151519] relative rounded-[16px] shrink-0 w-full" style={{ border: '1px solid #1e1d22' }}>
            <style dangerouslySetInnerHTML={{ __html: editorStyles }} />
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[24px] relative size-full">
                {/* Header (Tabs + Info) */}
                <div className="editor-header-tabs content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
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
                    {/* Info Bar */}
                    <div className="editor-info-bar content-stretch flex flex-col items-start relative shrink-0 w-full">
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
                <div className="editor-canvas-wrapper relative shrink-0 w-full">
                    <div className="bg-[#151519] flex flex-col items-start relative shrink-0 w-full min-h-[400px]">
                        {/* Editor Toolbar */}
                        <div className="editor-toolbar-scroll-container bg-[#1e1e24] border-b border-[#2a2a30] shrink-0 w-full rounded-t-[12px] z-[10]">
                            <div className="editor-toolbar-wrapper flex items-center justify-between px-[12px] h-[52px]">
                                <div className="flex items-center gap-[4px]">
                                    {/* Text Type */}
                                    <div className="content-stretch flex flex-col items-start relative shrink-0 border-r border-[#2a2a30] pr-[8px]">
                                        <div
                                            ref={typeBtnRef}
                                            onClick={toggleTypeMenu}
                                            className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-white/10 transition-colors"
                                        >
                                            <p className="font-['Poppins',sans-serif] font-medium leading-[normal] text-[13px] text-white">
                                                {editor.isActive('heading', { level: 1 }) ? 'H1' : 
                                                 editor.isActive('heading', { level: 2 }) ? 'H2' : 
                                                 editor.isActive('heading', { level: 3 }) ? 'H3' : 'Body'}
                                            </p>
                                            <RiArrowDownSLine size={14} color="white" />
                                        </div>
                                        <PortalMenu triggerRect={typeMenuRect} onClose={() => setTypeMenuRect(null)}>
                                            <div onClick={() => { editor.chain().focus().setParagraph().run(); setTypeMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm">Body</div>
                                            <div onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setTypeMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm font-bold">Heading 1</div>
                                            <div onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setTypeMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm font-bold">Heading 2</div>
                                            <div onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setTypeMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm font-bold">Heading 3</div>
                                        </PortalMenu>
                                    </div>

                                    {/* Styling */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] px-[8px]">
                                        <ToolbarButton icon={RiBold} active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
                                        <ToolbarButton icon={RiItalic} active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
                                        <ToolbarButton icon={RiUnderline} active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} />
                                        <ToolbarButton icon={RiStrikethrough} active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} />
                                    </div>

                                    {/* Alignment */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] px-[8px]">
                                        <ToolbarButton icon={RiAlignLeft} active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} />
                                        <ToolbarButton icon={RiAlignCenter} active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} />
                                        <ToolbarButton icon={RiAlignRight} active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} />
                                        <ToolbarButton icon={RiAlignJustify} active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} />
                                    </div>

                                    {/* Lists & More */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] px-[8px]">
                                        <ToolbarButton icon={RiListUnordered} active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
                                        <ToolbarButton icon={RiListOrdered} active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
                                        <ToolbarButton icon={RiDoubleQuotesL} active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
                                        <ToolbarButton icon={RiCodeSSlashLine} active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
                                    </div>

                                    {/* Assets & Tables */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 px-[8px]">
                                        <ToolbarButton icon={RiLinksLine} active={editor.isActive('link')} onClick={setLink} />
                                        <ToolbarButton icon={RiImageLine} onClick={addImage} />
                                        
                                        <div className="relative">
                                            <div ref={tableBtnRef}>
                                                <ToolbarButton icon={RiTableLine} onClick={toggleTableMenu} active={editor.isActive('table')} />
                                            </div>
                                            <PortalMenu triggerRect={tableMenuRect} onClose={() => setTableMenuRect(null)} width="w-[180px]">
                                                <div onClick={() => { editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); setTableMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm">Insert Table</div>
                                                <div onClick={() => { editor.chain().focus().addColumnBefore().run(); setTableMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm">Add Column Before</div>
                                                <div onClick={() => { editor.chain().focus().addColumnAfter().run(); setTableMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm">Add Column After</div>
                                                <div onClick={() => { editor.chain().focus().deleteColumn().run(); setTableMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm">Delete Column</div>
                                                <div onClick={() => { editor.chain().focus().addRowBefore().run(); setTableMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm">Add Row Before</div>
                                                <div onClick={() => { editor.chain().focus().addRowAfter().run(); setTableMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm">Add Row After</div>
                                                <div onClick={() => { editor.chain().focus().deleteRow().run(); setTableMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm">Delete Row</div>
                                                <div onClick={() => { editor.chain().focus().deleteTable().run(); setTableMenuRect(null); }} className="px-3 py-2 text-white hover:bg-white/10 cursor-pointer text-sm text-red-400">Delete Table</div>
                                            </PortalMenu>
                                        </div>
                                        
                                        <ToolbarButton icon={RiSeparator} onClick={() => editor.chain().focus().setHorizontalRule().run()} />
                                        <ToolbarButton icon={RiFormatClear} onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} />
                                    </div>
                                </div>

                                {/* Import Button */}
                                <div onClick={onImport} className="editor-import-btn-container bg-[#2a2a30] content-stretch flex gap-[10px] items-center justify-center px-[16px] h-[36px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-white/10 transition-colors">
                                    <p className="font-['Poppins',sans-serif] font-medium leading-[normal] text-[13px] text-white whitespace-nowrap">Import from Word</p>
                                    <img src={wordIcon} alt="word" style={{ width: '16px' }} />
                                </div>
                            </div>
                        </div>

                        {/* Tiptap Editor Canvas */}
                        <div className="relative shrink-0 w-full z-[1]">
                            <div className="overflow-x-clip py-[12px] overflow-y-auto w-full">
                                <EditorContent 
                                    editor={editor} 
                                    dir={langTab === 'ar' ? 'rtl' : 'ltr'}
                                    className="tiptap-editor-surface"
                                />
                            </div>
                        </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#2a2a30] border-solid inset-0 pointer-events-none rounded-[6px]" />
                </div>
            </div>
        </div>
    );
};

const editorStyles = `
.tiptap-editor-surface .ProseMirror {
    width: 100%;
    background-color: #151519;
    padding: 16px;
    padding-bottom: 32px;
    font-size: 14px;
    color: white;
    line-height: 1.6;
    outline: none;
    min-height: 300px;
    font-family: 'Noto Sans', sans-serif;
}

.tiptap-editor-surface .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #80808a;
    pointer-events: none;
    height: 0;
}

.tiptap-editor-surface .ProseMirror h1 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; color: #fff; line-height: 1.2; }
.tiptap-editor-surface .ProseMirror h2 { font-size: 1.875rem; font-weight: 700; margin-bottom: 1.25rem; color: #fff; line-height: 1.3; }
.tiptap-editor-surface .ProseMirror h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #fff; line-height: 1.4; }
.tiptap-editor-surface .ProseMirror blockquote { border-left: 4px solid #3457DC; padding-left: 1.5rem; margin: 1.5rem 0; font-style: italic; color: rgba(255,255,255,0.6); }
.tiptap-editor-surface .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
.tiptap-editor-surface .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
.tiptap-editor-surface .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
.tiptap-editor-surface .ProseMirror hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2rem 0; }
.tiptap-editor-surface .ProseMirror a { color: #3457DC; text-decoration: underline; cursor: pointer; }

.tiptap-editor-surface .ProseMirror table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
}

.tiptap-editor-surface .ProseMirror table td,
.tiptap-editor-surface .ProseMirror table th {
    min-width: 1em;
    border: 1px solid rgba(255,255,255,0.1);
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
}

.tiptap-editor-surface .ProseMirror table th {
    font-weight: bold;
    text-align: left;
    background-color: rgba(255,255,255,0.05);
}

.tiptap-editor-surface .ProseMirror table .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0; right: 0; top: 0; bottom: 0;
    background: rgba(200, 200, 255, 0.1);
    pointer-events: none;
}

.tiptap-editor-surface .ProseMirror table .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: -2px;
    width: 4px;
    background-color: #3457DC;
    pointer-events: none;
}

@media screen and (max-width: 1024px) {
    .editor-publication-main > div {
        padding: 20px !important;
        gap: 24px !important;
    }
    .editor-header-tabs {
        gap: 20px !important;
    }
    .editor-info-bar > div {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 12px !important;
    }
    .editor-toolbar-scroll-container {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
    }
    .editor-toolbar-wrapper {
        min-width: 800px !important;
        padding: 0 12px !important;
    }
}
`;

export default PublicationEditor;
