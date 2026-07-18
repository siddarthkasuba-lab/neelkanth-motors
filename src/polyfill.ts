// Robust polyfill for canvas getBoundingClientRect in case it is missing or mocked in sandboxed frames
if (typeof window !== 'undefined') {
  try {
    // Helper fallback function
    const getFallbackRect = function(el: any) {
      const width = el?.width || 0;
      const height = el?.height || 0;
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
    };

    // 1. Polyfill HTMLCanvasElement prototype
    if (typeof HTMLCanvasElement !== 'undefined') {
      const originalProtoGetBCR = HTMLCanvasElement.prototype.getBoundingClientRect;
      Object.defineProperty(HTMLCanvasElement.prototype, 'getBoundingClientRect', {
        value: function() {
          try {
            if (typeof originalProtoGetBCR === 'function') {
              const rect = originalProtoGetBCR.call(this);
              if (rect && typeof rect.width === 'number') {
                return rect;
              }
            }
          } catch (e) {
            // failed, use fallback
          }
          return getFallbackRect(this);
        },
        configurable: true,
        writable: true
      });
    }

    // 2. Intercept document.createElement to ensure any newly created canvas also has the polyfill
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName: string, options?: ElementCreationOptions) {
      const el = originalCreateElement.call(document, tagName, options);
      if (el && tagName.toLowerCase() === 'canvas') {
        const originalElGetBCR = el.getBoundingClientRect;
        Object.defineProperty(el, 'getBoundingClientRect', {
          value: function() {
            try {
              if (typeof originalElGetBCR === 'function') {
                const rect = originalElGetBCR.call(this);
                if (rect && typeof rect.width === 'number') {
                  return rect;
                }
              }
            } catch (e) {
              // failed, use fallback
            }
            return getFallbackRect(this);
          },
          configurable: true,
          writable: true
        });
      }
      return el;
    } as typeof document.createElement;
  } catch (e) {
    console.warn("Canvas polyfill warning:", e);
  }
}
export {};

