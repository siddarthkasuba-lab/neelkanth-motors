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

    const makeBulletproof = (proto: any) => {
      if (!proto) return;
      
      // Get the existing descriptor or property
      let originalGetBCR: any = null;
      try {
        const desc = Object.getOwnPropertyDescriptor(proto, 'getBoundingClientRect');
        if (desc) {
          originalGetBCR = desc.value || desc.get?.();
        } else {
          originalGetBCR = proto.getBoundingClientRect;
        }
      } catch (e) {
        originalGetBCR = proto.getBoundingClientRect;
      }

      Object.defineProperty(proto, 'getBoundingClientRect', {
        get() {
          return function(this: any) {
            // 1. Try custom assigned function first
            if (typeof this.__customGetBCR === 'function') {
              try {
                return this.__customGetBCR.call(this);
              } catch (e) {
                // ignore
              }
            }
            
            // 2. Try the original getBoundingClientRect
            if (typeof originalGetBCR === 'function') {
              try {
                const rect = originalGetBCR.call(this);
                if (rect && typeof rect.width === 'number') {
                  return rect;
                }
              } catch (e) {
                // ignore
              }
            }

            // 3. Fallback for canvas elements
            if (this && (this.tagName === 'CANVAS' || this instanceof HTMLCanvasElement)) {
              return getFallbackRect(this);
            }

            // 4. Fallback for all other elements
            return {
              x: 0,
              y: 0,
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: 0,
              height: 0,
              toJSON: () => ""
            };
          };
        },
        set(val) {
          if (typeof val === 'function') {
            this.__customGetBCR = val;
          }
        },
        configurable: true
      });
    };

    // Apply to Element, HTMLElement, and HTMLCanvasElement prototypes
    if (typeof Element !== 'undefined') {
      makeBulletproof(Element.prototype);
    }
    if (typeof HTMLElement !== 'undefined') {
      makeBulletproof(HTMLElement.prototype);
    }
    if (typeof HTMLCanvasElement !== 'undefined') {
      makeBulletproof(HTMLCanvasElement.prototype);
    }

    // Intercept document.createElement to ensure any newly created elements are also safe
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName: string, options?: ElementCreationOptions) {
      const el = originalCreateElement.call(document, tagName, options);
      if (el) {
        // Just to be extremely robust, define the property directly on the element if it's a canvas
        if (tagName.toLowerCase() === 'canvas') {
          const originalElGetBCR = el.getBoundingClientRect;
          Object.defineProperty(el, 'getBoundingClientRect', {
            get() {
              return function(this: any) {
                if (typeof this.__customGetBCR === 'function') {
                  try {
                    return this.__customGetBCR.call(this);
                  } catch (e) {}
                }
                if (typeof originalElGetBCR === 'function') {
                  try {
                    const rect = originalElGetBCR.call(this);
                    if (rect && typeof rect.width === 'number') {
                      return rect;
                    }
                  } catch (e) {}
                }
                return getFallbackRect(this);
              };
            },
            set(val) {
              if (typeof val === 'function') {
                this.__customGetBCR = val;
              }
            },
            configurable: true
          });
        }
      }
      return el;
    } as typeof document.createElement;

  } catch (e) {
    console.warn("Canvas polyfill warning:", e);
  }
}
export {};
