import{j as e,r as c,a5 as v}from"./index-C1yabst7.js";function f({label:r,error:o,required:l,children:d,hint:n}){return e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsxs("label",{className:"text-sm font-medium text-[var(--color-text-primary)]",children:[r,l&&e.jsx("span",{className:"ml-1 text-red-400",children:"*"})]}),d,n&&e.jsx("p",{className:"text-xs text-[var(--color-text-muted)]",children:n}),o&&e.jsx("p",{className:"text-xs text-red-400",children:o})]})}function p(r){return e.jsx("input",{...r,className:`
        w-full rounded-xl border border-[var(--color-glass-border)]
        bg-[var(--color-bg-elevated)] px-4 py-2.5 text-sm
        text-[var(--color-text-primary)]
        placeholder:text-[var(--color-text-muted)]
        outline-none transition
        focus:border-[var(--color-accent-blue)]
        ${r.className??""}
      `})}function h(r){return e.jsx("textarea",{...r,className:`
        w-full rounded-xl border border-[var(--color-glass-border)]
        bg-[var(--color-bg-elevated)] px-4 py-2.5 text-sm
        text-[var(--color-text-primary)]
        placeholder:text-[var(--color-text-muted)]
        outline-none transition
        focus:border-[var(--color-accent-blue)]
        ${r.className??""}
      `})}function g({value:r,onChange:o,options:l,placeholder:d="Select…",className:n="",disabled:u=!1}){const[a,s]=c.useState(!1),x=c.useRef(null);c.useEffect(()=>{if(!a)return;const t=m=>{x.current&&!x.current.contains(m.target)&&s(!1)};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[a]),c.useEffect(()=>{if(!a)return;const t=m=>{m.key==="Escape"&&s(!1)};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[a]);const i=l.find(t=>t.value===r);return e.jsxs("div",{ref:x,className:`relative ${n}`,children:[e.jsxs("button",{type:"button",onClick:()=>!u&&s(t=>!t),disabled:u,className:`
          flex w-full items-center justify-between gap-2
          rounded-xl border border-[var(--color-glass-border)]
          bg-[var(--color-bg-elevated)] px-4 py-2.5 text-sm
          text-[var(--color-text-primary)] outline-none transition
          hover:border-[var(--color-accent-blue)]
          ${a?"border-[var(--color-accent-blue)]":""}
          ${u?"cursor-not-allowed opacity-50":"cursor-pointer"}
        `,children:[e.jsx("span",{className:i?"":"text-[var(--color-text-muted)]",children:i?i.label:d}),e.jsx(v,{size:16,className:`shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${a?"rotate-180":""}`})]}),a&&e.jsx("div",{className:`\r
            absolute z-50 mt-1.5 w-full overflow-hidden\r
            rounded-xl border border-[var(--color-glass-border)]\r
            bg-[var(--color-bg-elevated)] shadow-2xl\r
          `,style:{backdropFilter:"blur(16px)"},children:l.map(t=>e.jsx("button",{type:"button",onClick:()=>{o(t.value),s(!1)},className:`
                block w-full px-4 py-2.5 text-left text-sm transition
                hover:bg-[var(--color-accent-blue)]/10 hover:text-[var(--color-accent-blue)]
                ${t.value===r?"bg-[var(--color-accent-blue)]/15 font-medium text-[var(--color-accent-blue)]":"text-[var(--color-text-primary)]"}
              `,children:t.label},t.value))})]})}function j({onEdit:r,onDelete:o}){return e.jsxs("div",{className:"flex items-center gap-2",children:[r&&e.jsx("button",{onClick:r,className:"rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--color-accent-blue)] transition hover:bg-[var(--color-accent-blue)]/10",children:"Edit"}),o&&e.jsx("button",{onClick:o,className:"rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10",children:"Delete"})]})}export{p as A,f as F,h as a,j as b,g as c};
