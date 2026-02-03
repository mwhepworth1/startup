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

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

## Startup HTML Structure

I have created the initial HTML structure for the Top Comment application. This includes:

- **index.html**: Introduction and login/register controls.
- **play.html**: The main game interface with placeholders for WebSocket data (live events) and game interaction.
- **scores.html**: A leaderboard displaying persistent data.
- **about.html**: Description of the application and a placeholder for the 3rd party service (Giphy).

All pages include a consistent header for navigation and a footer with GitHub links.
