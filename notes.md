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

I learned how to integrate a CSS framework (Bootstrap) with custom CSS. It was interesting to see how Bootstrap handles responsiveness out of the box with its grid system and utility classes.
I also found a helpful resource: https://getbootstrap.com/docs/4.0/examples/sticky-footer-navbar/ that I could inspect to use to my benefit. These docs are super helpful

Key things learned and implemented:
- **Bootstrap 5**: Used for the main structure, including the responsive navbar, tables, and card components. It definitely speeds up development but requires checking the docs frequently for class names.
- **Custom CSS Override**: Created a `main.css` file to define custom variables (colors) and specific styles that Bootstrap didn't cover, like the prompt box and custom hover effects on the GIF images.
- **Flexbox**: Used `d-flex flex-column min-vh-100` on the body to create a sticky footer that stays at the bottom even when content is short.
- **CSS Grid**: Used `display: grid` for the GIF results area to create a responsive gallery that auto-fills columns based on screen width (`repeat(auto-fill, minmax(200px, 1fr))`).
- **Google Fonts**: Integrated the 'Lexend' font to give the app a more modern, clean look.
- **Positioning**: This is rough, this doc was very helpful in my efforts to move my title to the center of the navbar: https://getbootstrap.com/docs/5.3/utilities/position/

```css
/* Example of using CSS Variables and Grid */
:root {
    --primary-color: #007bff;
    --background-color: #f8f9fa;
}

.gif-results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
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
