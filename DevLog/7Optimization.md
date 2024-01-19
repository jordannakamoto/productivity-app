   
#### Objective:
Rest Day

#### Tasks Completed:

1. ** Familiarized with Tauri Build **
   - Need to change Application Data Storage location from com.tauri.dev
   - Experimented with setting compiler flags for Rust
   - Researched how to optimize the frontend
   - Looked into Svelte for making other apps due to front end cost of NextJS

  
#### TODO
1. **Implement Editable Date**
2. **Fix TextArea/Div Relationship**
3. **Implement Assignment Links**
4. **Implement Alarms/Notifications**
5. **Create AI API for parsing interactions**
6. **Connect WebVoice API to process voice input**


Optimizing your React component involves a few different strategies. Let’s go over several aspects of your `AssignmentCard` component and see where improvements can be made:

### 1. **Avoid Inline Function Definition in Render**

Every time your component renders, it re-creates the functions like `handleFieldUpdate`. This can be inefficient, especially if these functions are passed down to child components and could cause unnecessary re-renders.

```jsx
// Before
<EditableText
  initialValue={assignment.name}
  onFieldUpdate={(field, newValue) => handleFieldUpdate(field, newValue)}
  fieldName="name"
/>

// After
<EditableText
  initialValue={assignment.name}
  onFieldUpdate={handleFieldUpdate}
  fieldName="name"
/>
```

For this to work, `handleFieldUpdate` should be defined using `useCallback` to ensure it has a stable reference:

```jsx
const handleFieldUpdate = useCallback((fieldName, newValue) => {
  onUpdate(assignment.id, fieldName, newValue);
}, [onUpdate, assignment.id]);
```

### 2. **Use `useCallback` to Memorize Callbacks**

Wrap the handlers that are passed to event listeners or child components with `useCallback` to prevent unnecessary re-creations of functions:

```jsx
const handleDelete = useCallback(() => {
  // ...
}, [onDelete, assignment.id, /* any other dependencies */]);
```

### 3. **Optimize Conditional Rendering**

You are using conditional rendering to show an animation. If this operation is costly and the condition changes frequently, consider using CSS to hide/show the element instead of mounting and unmounting it.

### 4. **Animation and State Optimization**

Animations can be expensive. If the Lottie animation is not needed after it plays, consider removing it from the DOM. Also, you can manage the animation's play state more efficiently by directly controlling it via Lottie's API and `useEffect`.

### 5. **Optimize List Rendering**

If `AssignmentCard` is part of a list and the list can get large, consider using `React.memo` to prevent re-renders of cards that have not changed:

```jsx
export default React.memo(AssignmentCard);
```

### 6. **Avoid Unnecessary State**

You have multiple state variables to control the animation. It might be possible to consolidate them into a single state object if they always change together.

### 7. **Efficient DOM Manipulation**

Direct DOM manipulations (like changing the `style` property) in the `handleDelete` function can be inefficient and can lead to layout thrashing. Consider using CSS transitions or a React animation library that batches these changes for you.

### 8. **Remove Event Listeners**

Make sure to clean up any global event listeners when the component unmounts to prevent memory leaks:

```jsx
useEffect(() => {
  // Add event listeners on mount
  return () => {
    // Remove event listeners on unmount
  };
}, []);
```

### 9. **CSS over Inline Styles**

Avoid inline styles for static values, as they can cause performance issues. Instead, use CSS classes as much as possible.

### 10. **Reduce Prop Drilling**

If you find that you are passing a lot of props through multiple layers of components (`onUpdate`, `onDelete`), consider using a context.

### 11. **Code Splitting for the Lottie Animation**

If the Lottie animation is large, consider code splitting it so that it doesn't impact the initial load of your page.

### 12. **Lazy Loading of Heavy Components**

If `AssignmentCard` is a heavy component, consider lazy loading it, especially if it's not immediately visible.

Remember that premature optimization is the root of all evil. Always profile your application first to find bottlenecks before attempting to optimize. Tools like React Developer Tools can help you analyze component re-renders and performance issues. Optimize based on your findings, not just on general advice.