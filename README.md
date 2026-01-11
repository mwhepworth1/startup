# Top Comment

[My Notes](notes.md)

Top Comment is a fast-paced, real-time mmultiplayer party game inspired by the chaotic and hilarious world of comment sections on Instagram's Reels feature. Players complete to find the most "liked" gif for a specific prompt simulating the experience of trying to land the top comment on a viral post.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Have you ever seen a reel on Instagram, opened the comment section, and laughed even harder at the gif someone replied with? Top Comment turns that social media intuition for the chronically onlne into a competitive game. Players are given a situational prompt, like "Your reaction when the Smarty building off I-15 rick rolls you" and tasked with finding the ultimate visual comeback. It's a real-time race to see who can read the room, win the most 'likes' from their friends, and climb the global leaderboard to become the internet's ultimate tastemaker.

### Design

![Signin Design Image](signin_mockup.png)
![Game Design Image](game_mockup.png)

Here's a diagram that reflects how people would interact with the central server to play the game. This diagram is a four player scenario.

```mermaid
sequenceDiagram
    actor Player1
    actor Server
    actor Player2
    actor Player3
    actor Player4
    Player1->>Server: Create Room
    Player2->>Server: Join Room
    Player3->>Server: Join Room
    Player4->>Server: Join Room
    Server->>Player1: New Prompt: "Monday Morning"
    Server->>Player2: New Prompt: "Monday Morning"
    Server->>Player3: New Prompt: "Monday Morning"
    Server->>Player4: New Prompt: "Monday Morning"
    Player1->>Server: Submit GIF
    Player2->>Server: Submit GIF
    Player3->>Server: Submit GIF
    Player4->>Server: Submit GIF
    Server->>Player1: Voting Phase
    Server->>Player2: Voting Phase
    Server->>Player3: Voting Phase
    Server->>Player4: Voting Phase

```

### Key features

- Secure login and registration to track wins and stats alongside adding friends and sharing online status
- Create or join Threads, or rooms, to compete with friends.
- Dynamic Giphy/Tenor integration with the ability to search, select, and send GIFs using free APIs.
- Players like the Top Comment (essentially a voting phase) to determine the winner for that prompt.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - I will use HTML5 to structure the login forms, the Thread lobbies (the game room lobby), the voting interface (meant to mimic a social media comment section) and display the GIF search results grid.
- **CSS** - I will use CSS to create a modern UI reminiscent of a social media page or app. I plan on using the CSS grid extensively to master item placement within the game.
- **React** - React will handle the state of the application such as the game room and the transition between submission and voting phases.
- **Service** - I will build and design a backend service to handle room logic, user sessions, and data storage.
- **DB/Login** - A simple MySQL or PostgreSQL db will store user credentials, room information, a user's friends, and global leaderboards.
- **WebSocket** - Websockets will be used to broadcast player submissions and votes in real-time and used as a synchronization tool to ensure the game is the same for all players.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.