// ==UserScript==
// @name         Azure DevOps Mermaid Renderer
// @namespace    https://github.com/yourusername/userscripts
// @version      1.0
// @description  Render Mermaid diagrams in Azure DevOps markdown previews
// @author       You
// @match        *://dev.azure.com/*
// @match        *://app.vssps.visualstudio.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    const mermaidScript = document.createElement('script');
    mermaidScript.type = "module";
    mermaidScript.text = "import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'; window.mermaid = mermaid; window.mermaid.initialize({ startOnLoad: true });";
    document.head.appendChild(mermaidScript);

    function renderDiagrams() {
        if (!window.mermaid) return;

        const elements = Array.from(document.querySelectorAll('.markdown-editor-preview pre code:not([class])')).filter(e => {
            const text = e.innerText.trim();
            return text.startsWith('graph') || text.startsWith('sequenceDiagram');
        });

        if (elements.length === 0) return;

        elements.forEach((element, index) => {
            element.classList.add("mermaid");
            console.log("Create mermaid block");
        });
    }

    const observer = new MutationObserver(() => {
        setTimeout(() => {
            renderDiagrams();
        }, 500);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
