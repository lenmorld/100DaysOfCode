README

bubbling

when you click
it "bubbles" up
or it ripples to all the ancestors

Capturing
- ripple down

down
down
to
Target

then Bubble up to fire the events

options

`stopPropagation`

eventListener options 
```javascript
{
	capture: true,  // runs on capture, on the way down, not on bubble up; default false
	once: true, // unbind after (remove event listner)
			// perfect for e.g. Cart Checkout
}
```