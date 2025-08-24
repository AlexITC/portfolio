---
title: "My new blog"
description: "Launching a new personal blog by migrating from Jekyll to Astro. This post covers the reasons for the change and the experience of using AI tools for web development"
pubDate: "2025-08-24"
heroImage: ../../assets/profile.jpg
---

It is finally the time to fill this domain with content, while I have been blogging mostly at the [Wiringbits Blog](https://wiringbits.net/blog), there have been many times where I was in the mood to post about a topic but I didn't feel it would fit on such a blog which shouldn't happen anymore.

This was a good opportunity to re-evaluate my tech stack for blogging which caused me to switch from [Jekyll](https://jekyllrb.com/) to [Astro](https://astro.build).

While Jekyll is very nice and powerfull, everytime I ask someone to help me with the website, the first issue they get into is about installing the correct Ruby version.

I also took the opportunity to try [Claude Code](https://www.anthropic.com/claude-code) for building this, with this powerful tool I managed to get the website running in a relatively short time-frame by spending ~$15 USD on credits.

While Claude Code was helpful, it was also frustrating a few times, if you look into the [commit history](https://github.com/AlexITC/portfolio/commits/main/), you will find that I had to fix details that Claude was failing to do, for example:

- [Cleaning up files Claude forgot to remove](https://github.com/AlexITC/portfolio/commit/bb757f3881659f2d2e5e88bab6a223239b912854)
- [Fixing content that Claude got wrong](https://github.com/AlexITC/portfolio/commit/2b8c0860b772d524b01c5fde2f6cc4439c583872)
- [Reducing unnecessary complexity](https://github.com/AlexITC/portfolio/commit/6f24320bb936a8797ea9e2146ea8ba2bee0e9eac)
- [Restore functionality that used to work](https://github.com/AlexITC/portfolio/commit/cf966d4cd020e3bb81d35e1a67a689fc8dd17c0c)

Given that this is the main domain I have been using for a long time, I'd expect that this blog stays alive for many years.
