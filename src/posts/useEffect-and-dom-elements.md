---
title: useEffect and DOM elements
date: 2020-06-24
language: en
---

Last week I was coding a feature in my current project and I learned something new. Well, better said, something I didn't know or something I was using wrong. 

The problem was this: I was dealing with a virtualized list of elements, where all the items are placed absolutely positioned. In this scenario, the design requires to add some margin after the last item when scrolling, to leave some space when a slider from the bottom of the page is shown. 

After some testing, I went with a known CSS technique called __faux element__. Basically, I introduce an element to force the height of the scroll, including the desired white spacing. So easy peasy, combining `useRef` and `useEffect`, I can wait until the container is rendered, look for its height, and then create the faux element to force the scroll. So I followed this approach:

```
const ref = useRef()

useEffect(() => {
    if (ref != null && ref.current != null) {
        ...
    }
}, [ref])

return <div ref={ref}>...</div>
```

Even if we add ref.current to the dependency array in the effect, this doesn't help. The reason being, the dependencies are checked against at the time of render, whereas react refs get modified after rendering. The reason is that `ref` can go deep down and have an independent lifecycle of the owner component.

The solution passes through using useCallback to create a ref callback instead of useRef:

```
const setRef = useCallback(node => {
    if (node != null) {
        // You can now do what you need to, addEventListeners, measure, etc.
    }
}, [])

return <div ref={setRef}>...</div>
```
