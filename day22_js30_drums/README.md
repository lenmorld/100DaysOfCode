# HTML data-* Attributes

> Custom data attributes are intended to store custom data private to the page or application, for which there are no more appropriate attributes or elements

They can then be used in JS for interactivity without 
Ajax calls or server-side DB queries

Rules:
1. no uppercase
2. data-[at least one character long]

When to use and NOT to use?

> We shouldn’t use data attributes for anything which already has an already established or more appropriate attribute

e.g. `datetime` instead of `data-time`

https://stackoverflow.com/questions/18227375/what-are-data-url-and-data-key-attributes-of-a-tag

e.g. `data-key` `data-animal-type`


# Transform: scale and box-shadow, with fast transition

```css
transition: all .07s ease;


.playing {
  /* make it a bit bigger */
  transform: scale(1.1);
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
}
```


# transitionend event

When using CSS transitions, this event fires after the transition.
e.g if you have
```css
transition: all .07s ease;
```
and you want to do something after that...

Instead of having a `setTimeout` equivalent to the 0.07s
but then they might go out-of-sync and now you have to change it in 2 places

```js
.on('transitionend')
```

⚠ it triggers a lot of transitions
if its a border, you get for border-left, right bottom...
Here we are only interested in the `transform`

```js
if (e.propertyName === 'transform') {
	...
}
```