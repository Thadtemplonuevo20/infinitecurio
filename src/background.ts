import { createClient } from '@blinkdotnew/sdk';

const PROJECT_ID = import.meta.env.VITE_BLINK_PROJECT_ID;
const SECRET_KEY = import.meta.env.VITE_BLINK_SECRET_KEY;
const headers: Record<string, string> = { 
  'Content-Type': 'application/json', 
  'Authorization': `Bearer ${SECRET_KEY}` 
};
const BLINK_MODULES = new Set(['ai', 'db', 'storage', 'data', 'realtime', 'notifications', 'analytics', 'connectors', 'rag']);

function normalizeBlinkPath(rawPath: string, projectId: string): string {
  const [pathPart, queryPart] = String(rawPath || '').trim().split('?');
  let path = pathPart.replace(/^https?:\/\/[^/]+\/?/i, '').replace(/^\/+/, '').replace(/^api\//, '');
  const parts = path.split('/').filter(Boolean);
  if (!parts.length) throw new Error('Invalid API path');
  if (BLINK_MODULES.has(parts[0]) && parts[1] !== projectId) parts.splice(1, 0, projectId);
  const normalized = parts.join('/');
  return queryPart ? `${normalized}?${queryPart}` : normalized;
}

const blink = createClient({ projectId: PROJECT_ID, secretKey: SECRET_KEY });
console.log('BLINK_BG_READY', PROJECT_ID);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== 'BLINK_API') return;
  if (!msg.path) { sendResponse({ error: 'No API path' }); return true; }
  
  const method = msg.method || 'GET';
  const reqHeaders = (method === 'POST' || method === 'PATCH')
    ? { ...headers, 'Prefer': 'return=representation' } : { ...headers };
  
  const opts: RequestInit = { method, headers: reqHeaders };
  if (msg.body) opts.body = JSON.stringify(msg.body);
  
  let normalizedPath: string;
  try {
    normalizedPath = normalizeBlinkPath(msg.path, PROJECT_ID);
  } catch (error: any) {
    sendResponse({ error: error?.message || 'Invalid API path' });
    return true;
  }

  fetch(`https://core.blink.new/api/${normalizedPath}`, opts)
    .then(async (r) => {
      if (!r.ok) { 
        const e = await r.text(); 
        console.error('BLINK_API_ERROR', r.status, e); 
        sendResponse({ error: `API Error: ${r.status}` }); 
        return; 
      }
      sendResponse({ data: await r.json() });
    })
    .catch(e => { 
      console.error('BLINK_API_ERROR', e); 
      sendResponse({ error: e.message }); 
    });
    
  return true;
});
