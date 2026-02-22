# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

IP: 13.223.210.39
Domain: mhep.link

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

No sweat on this part, super simple. Just added some basic elements to help structure the webpage(s)

<aside> - This seems kinda cool and it seems to be supported in html5: https://www.w3schools.com/tags/tag_aside.asp
<blockquote> - https://www.w3schools.com/tags/tag_blockquote.asp

## CSS

I learned a lot about how to make a professional looking application using Bootstrap. I struggled a bit with getting the layout to work exactly how I wanted it to. I had to use a lot of different classes to get things to line up correctly. I think the hardest part was getting the page to not scroll, but instead just have the content scroll. I used `overflow: hidden` on the body and then `overflow: auto` on the content that I wanted to scroll. I also used `flex-grow-1` to make sure that the content took up all the available space.

Key things learned and implemented:
- **Bootstrap 5**: Used for the main structure. I particularly liked the card component for the different sections of the game.
- **Custom CSS**: I wrote some custom CSS in `main.css` to handle things that Bootstrap didn't cover perfectly, or where I wanted a specific look (like the dark theme).
- **Flexbox**: Used extensively! `d-flex`, `flex-column`, `flex-grow-1`, `align-items-center`, `justify-content-center`. It's really powerful for layout.
- **Grid**: I used CSS Grid for the GIF results. `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` is a magic line of code that makes responsive grids super easy.
- **100vh Layout**: I struggled to get the app to fit exactly on the screen without a scrollbar. I learned that `height: 100vh` on the body and `display: flex` with `flex-direction: column` is the way to go.

```css
/* My struggle with the grid layout */
.gif-grid {
    display: grid; 
    /* This took me a while to figure out */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
    gap: 1rem; 
    align-content: start; /* Keeps items at the top */
    flex-grow: 1;
    overflow: auto; /* This allows just the grid to scroll! */
    padding: 0.5rem;
}
```
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Key learnings from this phase:

### useState Hook
I used `useState` extensively throughout the application:
- **Login component**: Managing email, password, username, and form mode (login vs create account)
- **Play component**: Managing game state, room codes, timers, player lists, GIF searches, submissions, and votes
- **Scores component**: Managing leaderboard data
- **About component**: Managing the featured GIF state

### useEffect Hook
The `useEffect` hook was crucial for:
- **Authentication checks**: Checking if user is logged in on mount and redirecting appropriately
- **Timer countdowns**: Implementing the game timer that counts down during submission and voting phases
- **WebSocket simulation**: Using `setInterval` inside `useEffect` to simulate real-time events (player joins, submissions, votes)
- **Data fetching**: Loading trending GIFs from Giphy API for the About page
- **Real-time score updates**: Simulating live leaderboard changes

### Component Lifecycle
Understanding when effects run was key:
- Empty dependency array `[]` means run once on mount
- Dependency arrays like `[gamePhase, timer]` means run when those values change
- Cleanup functions (returning a function from `useEffect`) are critical for clearing intervals

### State Management Patterns
I learned several important patterns:
- **Derived state**: Calculating values from existing state rather than storing redundant state
- **State updates based on previous state**: Using the functional form `setState(prev => ...)` when new state depends on old state
- **localStorage integration**: Syncing React state with localStorage for persistence

### Complex State Transitions
The game flow required managing complex state transitions:
1. Lobby → Create/Join Room
2. Room → Game Start
3. Submission Phase → Auto-transition after timer
4. Voting Phase → Auto-transition after timer
5. Results → Auto-start next round

Each transition required careful coordination of multiple state variables.

### Mocking Backend Functionality
As instructed, I mocked out features that will be implemented later:
- **localStorage for authentication**: Storing user credentials and current user session
- **setInterval for WebSocket simulation**: Creating fake real-time events every 5 seconds
- **Hard-coded responses**: Mock player data, prompts pool, and auto-submissions
- **Timer-based phase transitions**: Simulating server-controlled game flow

### Performance Considerations
I learned about potential performance issues:
- Polling localStorage every 500ms in App.jsx to update UI (necessary evil for this mock implementation)
- Cleanup of intervals in `useEffect` return functions to prevent memory leaks
- Being careful with state updates in intervals to avoid infinite loops

### React Router Integration
Managing navigation with state:
- Redirecting to login if not authenticated
- Preserving room state across page refreshes with localStorage
- Using `useNavigate` hook for programmatic navigation

This deliverable really brought the application to life! The combination of React hooks, state management, and mocking made it feel like a real multiplayer game even though everything is client-side.

## Startup HTML Structure

I have created the initial HTML structure for the Top Comment application. This includes:

- **index.html**: Introduction and login/register controls.
- **play.html**: The main game interface with placeholders for WebSocket data (live events) and game interaction.
- **scores.html**: A leaderboard displaying persistent data.
- **about.html**: Description of the application and a placeholder for the 3rd party service (Giphy).

All pages include a consistent header for navigation and a footer with GitHub links.
