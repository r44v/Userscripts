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
    mermaidScript.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.0/dist/mermaid.min.js';
    document.head.appendChild(mermaidScript);

    function renderDiagrams() {
        if (!window.mermaid || window.mermaid.initialized) return;

        const elements = Array.from(document.querySelectorAll('.markdown-editor-preview pre code:not([class])')).filter(e => {
            const text = e.innerText.trim();
            return text.startsWith('graph') || text.startsWith('sequenceDiagram');
        });

        if (elements.length === 0) return;

        elements.forEach((element, index) => {
            const graphDefinition = element.innerText.trim();
            const containerId = `mermaid-container-${index}`;
            const wrapper = document.createElement('div');
            wrapper.className = 'mermaid-wrapper';
            wrapper.style.margin = '1em 0';
            wrapper.style.position = 'relative';

            const pre = element.parentNode;
            pre.parentNode.insertBefore(wrapper, pre.nextSibling);

            const code = document.createElement('code');
            code.style.display = 'none';
            code.textContent = graphDefinition;
            wrapper.appendChild(code);

            const diagramContainer = document.createElement('div');
            diagramContainer.className = 'mermaid-diagram-container';
            diagramContainer.style.marginTop = '0.5em';
            diagramContainer.style.backgroundColor = 'var(--bg-color, #f8f8f8)';
            diagramContainer.style.borderRadius = '4px';
            diagramContainer.style.padding = '1em';
            diagramContainer.id = containerId;
            wrapper.appendChild(diagramContainer);

            try {
                mermaid.render(containerId, graphDefinition).then(result => {
                    const container = document.getElementById(containerId);
                    if (container) {
                        container.innerHTML = result.svg;
                    }
                }).catch(err => {
                    console.error('Mermaid render error:', err);
                });
            } catch (err) {
                console.error('Mermaid initialization error:', err);
            }
        });

        window.mermaid.initialized = true;
    }

    const observer = new MutationObserver(() => {
        setTimeout(() => {
            renderDiagrams();
        }, 200);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    mermaidScript.onload = () => {
        setTimeout(() => {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'default',
                securityLevel: 'loose'
            });
            renderDiagrams();
        }, 500);
    };
})();