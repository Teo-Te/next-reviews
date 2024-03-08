'use client';

import { LinkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';

export default function ShareLinkButton (){
    const [copied, setCopied] = useState(false);
    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <button onClick={handleClick} 
        className="flex gap-1 bg-slate-500 hover:bg-orange-700 text-white text-sm font-bold py-1 px-2 rounded items-center">
            {copied ? "Copied!" : "Copy Link"}
            <LinkIcon className="w-4 h-4"/>
        </button>
    );
}