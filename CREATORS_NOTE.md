# Creator's Note: Why Mileage Matters

I originally built `claude-mileage` (token-tengu 👺) to help improve the utility of my normal Claude CLI workflow on a standard subscription.

The insight came from watching ordinary tool calls burn through tokens. I noticed that Claude would sometimes read files individually when a single chunked read would have been more efficient. I saw mundane tasks dragging along 100kb of "chatty" thread history that didn't help the model reason—it just increased the complexity of every reply.

In a world where reasoning is powerful but context has a cost, I wanted to optimize my CLI agent workflow. This wasn't about trying to "game the system" or bypass Anthropic's controls. It was about realizing that my own sloppy prompt habits and broad workflows were the primary source of my frustration.

`claude-mileage` addresses that. It’s about waste reduction. It’s about making the Claude CLI experience feel tighter, faster, and more surgical.

I made this project open source because context management is a problem worth solving in public. Whether you're a systems thinker who wants to micromanage your local memory or someone who just wants better defaults so things "just work," I hope this tool helps you get more useful work done.

— Samuel
