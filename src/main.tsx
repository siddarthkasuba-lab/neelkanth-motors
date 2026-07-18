import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';

// Robust polyfill for canvas getBoundingClientRect in case it is missing or mocked in sandboxed frames
if (typeof window !== 'undefined') {
  try {
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName: string, options?: ElementCreationOptions) {
      const el = originalCreateElement.call(document, tagName, options);
      if (el && tagName.toLowerCase() === 'canvas' && typeof el.getBoundingClientRect !== 'function') {
        Object.defineProperty(el, 'getBoundingClientRect', {
          value: function() {
            const width = (el as any).width || 0;
            const height = (el as any).height || 0;
            return {
              x: 0,
              y: 0,
              top: 0,
              left: 0,
              bottom: height,
              right: width,
              width: width,
              height: height,
              toJSON: () => ""
            };
          },
          configurable: true,
          writable: true
        });
      }
      return el;
    } as typeof document.createElement;

    if (typeof HTMLCanvasElement !== 'undefined' && typeof HTMLCanvasElement.prototype.getBoundingClientRect !== 'function') {
      Object.defineProperty(HTMLCanvasElement.prototype, 'getBoundingClientRect', {
        value: function() {
          return {
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            bottom: this.height || 0,
            right: this.width || 0,
            width: this.width || 0,
            height: this.height || 0,
            toJSON: () => ""
          };
        },
        configurable: true,
        writable: true
      });
    }
  } catch (e) {
    console.warn("Canvas polyfill warning:", e);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
