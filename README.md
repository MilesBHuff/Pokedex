# Miles's Pokédex

A web application that displays data on Pokémon from the [PokéAPI](https://PokeAPI.co).  
(This project exists solely to demonstrate my abilities to a particular hiring authority.)  

## About

### Technologies

I used [`git`](https://git-scm.com), because I like `git` and use it all the time, for work and pleasure alike;  and also because the prompt says `git` is "preferabl"e.

I used the latest stable versions of [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com), two tools that are presently ubiquitous in frontend development.

I wrote the code in [VSCode](https://code.visualstudio.com), to take advantage of its first-class support for TypeScript.

I used [Vite](https://vitejs.dev) because (1) it seems to be pretty easy to use, (2) I've used it on a number of small [Vue.js](https://vuejs.org) projects before, and (3) the Engineering Director said it would be a good idea to use it.  
I *have* worked on a [CRA](https://create-react-app.dev) app before (at [GM](https://www.gm.com)), but I've found Vite to be a better experience.  

I used [TypeScript](https://www.typescriptlang.org), both because it's required by the prompt *and* because I've grown to be a big fan of it.  Its typing system is incredibly flexible and detailled, and I don't think I'd want to go back to raw JavaScript anymore.

I used [Sass](https://sass-lang.com) because it's pretty great, because I'm more-used to it than I am [Less](https://lesscss.org) anymore, and because writing raw CSS is not [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)-enough for my liking.  I used SCSS specifically, in order to avoid the confusion that can come when those unaccustomed to normal Sass try to work with it;  and also because the prompt mentioned SCSS by name.  I feel normal Sass is more-suited for use alongside [CoffeeScript](https://coffeescript.org), while SCSS is a better match for TypeScript.

I used [React](https://react.dev), of course -- just as stipulated in the prompt.

I used [Redux](https://redux.js.org), as stipulated in the prompt -- [Redux Toolkit](https://redux-toolkit.js.org) specifically, since [that's what Redux itself recommends](https://redux.js.org/introduction/getting-started#redux-toolkit).  
*The Angular in me yearned for [RxJS](https://rxjs.dev) `Observables`, though!  :p*  

I used [React Router](https://reactrouter.com/en/main).  While the prompt did not specifically mention routing, I felt that it was a good idea to add it, since routing is a convenient way to pass certain kinds of information around the application, and because it allows me to store certain crucial bits of information (like search queries and Pokémon IDs) in the URL, which allows users to make use of browser history and bookmarks.  Having routing also enables me to handle 404s and such;  for this, I chose to just redirect to the homepage.

PokéAPI [requires caching as a condition of use](https://pokeapi.co/docs/v2#fairuse), and to use it properly with TypeScript I need types for the various calls it is capable of.  Both of these concerns are addressed by [`pokenode-ts`](https://pokenode-ts.vercel.app), one of the [Wrapper Libraries recommended by PokéAPI](https://pokeapi.co/docs/v2#wrap) itself.  However, what is provided by this package does not play well with Redux or React hooks.  Accordingly, I use `pokenode-ts` only for its types, and use React Toolkit's RTKQuery (which also has built-in caching) for everything else.

### Structure

I put repo-wide configs and such at the root of the repository, and moved UI-specific configs and such into a `frontend` directory.  This helps avoid having an ungodly number of loose files in the same directory.  
Likewise, I put `index.html`, `public`, and `src` into an `app` folder, to fully separate the source files from their configs and any generated output.  
I intended to also use `public` as the static resources folder, but I did not end-up needing any resources beyond those which are typically needed for a website to fill out its `index.html`.  If I *had* required additional resources, I would have made subfolders under `public`, such as `images`, `fonts`, etc.  
Inside of `src`, I have the application's entrypoints and other core files, in addition to variety of themed folders.  These folders are named appropriately, and I believe no further explanation should be needed as to their purpose.  That said, I do have some extra notes to share:  I avoided using a `components` directory, since `components` is so broad as to encompass most of the app;  I chose `views` oves `pages` and `routes` because I'm working with `section`s rather than pages, and because the folder contains more views than just routes;  I chose to cordone off all of the Redux code in a `redux` folder;  the core layout elements, I placed into a `layout` folder;  I placed miscellaneous types into the `types` directory;  and miscellaneous re-useable helper functions I placed into `utilities`.  
I chose to keep `routes.tsx` outside of the `routes` folder and `root.tsx` out of the `layout` folder, as I didn't want them being confused for their constituents.  

The `styles` directory contains all of the application's styles.  I went with global styles instead of component styles in part because the Engineering Manager expressed that there is a general preference at the company for global styles, and in part because I find that global styles are easier to debug, reuse, and deduplicate.  
The way I typically structure my `styles` directories, is that I have a `_.scss` file in each directory;  this serves as a kind of "module" that imports both the other files in that same directory, *and* the `_.scss` files in all folders that are direct children of that directory.  This makes it easy to organize the styles into various themed directories (as I have done with the scripts), and it makes it easy to ensure that all styles load in the correct order, no matter how many there end-up being.  All stylesheets that depend on another are prefixed with `_`, as is the convention in Sass.
I divide stylesheets into somewhat different folder structures depending on the project.  I often have a directory for variables, one for dependencies, etc.  For this particular project, I've found it sufficient to have a `general` folder to handle both variables *and* dependencies, an `elements` folder to style HTML tags, a `widgets` folder to handle classes for various non-element widgets in the app, and a `utilities` folder to hold mixins and reuseable utility classes.
I am rare among developers for actually liking CSS, and I generally prefer just rolling my own code for styles, as this gives me total control and saves me from having to fight against component libraries.  I think the resulting CSS and HTML end-up being higher-quality, since the former is not full of workarounds that break when you update the libraries, and since the latter is allowed to remain a simple reflection of the data I am trying to model, rather than a morass of single-style override classes and unnecessary elements.  For a larger project, though, I would have put up with the downsides and chosen a component library, since they can help avoid garbage CSS in long-lived group projects;  and, to be fair to them, they *do* have a lot of handy features right out-of-the-box.  To ensure as little as possible got in my way while writing the CSS for the app, I used a total reset (to remove nearly all browser styles) instead of `normalize.css`.  Where the total reset fell short, I manually reset things in `reset.scss`.

### Linting

I made the TSC about as strict as possible (minus a couple ridiculous things and a couple checks that I feel do not belong in a compiler).

I used [ESLint](https://eslint.org) with recommended settings for this project, and the intention of tweaking it as necessary to get good behavior.  I would like to eventually make my own ESLintRC from scratch again.  The last one I made, I made on my work laptop during work hours for my last job;  so I unfortunately no longer have access to it.

I used VSCode's built-in formatter because I don't like how Prettier (which comes with vite-template-redux) does things.  It would be nice for all my projects to eventually have a commandline equivalent to what VSCode does.  It's been on my ToDo list for "eventually", and I'll *eventually* get around to it... someday.

### Documentation

In general, I add [JSDoc](https://jsdoc.app) and miscellaneous explanatory comments where I think it to be helpful, and I leave these out where I do not think it helpful.  Documentation *is* really important, but it's still possible to go overboard with it.  As with all things, there's a balance to be had.  I hope I've struck it.  If I haven't, please let me know, and I'll add more documentation, no problem!  

Actionable comments are prefixed with one of the following tags:  `NOTE`, `TODO`, `FIXME`, `BUG`, `WARN`, `ERROR`, `HACK`, `DEPRECATED`.  This makes it easy to distinguish them from un-actionable comments in the code, and it also makes it easy to find them with an app-wide search when there's time to work on tech debt.  

### Design

I went for a relatively simple design of header, nav (currently hidden), section, and footer.

I ensured everything worked at the sorts of screen sizes used by mobile devices.

The way I designed this site, the entire thing should meet [WCAG AA accessibility requirements](https://www.w3.org/WAI/WCAG2AA-Conformance).

#### Theme and artwork

The primary accent color, `#DF2F2F`, is inspired by the red used in Pokéballs, and is designed to meet WCAG AA when placed against either white or black, as well as to have about the same contrast ratio for both.  

The secondary accent color, `#757575`, is inspired by the grey band in Pokéballs, and is designed to meet the same contrast criteria as the primary accent color.  

Both colors are used in the Pokéball favicon, which I created from scratch for this project.  

I made sure to make favicons that work on Chromium, Firefox, and Safari.  

### Changes needed for use in a concurrent environment

I'm not quite sure what this means, but the prompt requires me to address it.  I reached out asking for clarification, but didn't hear anything back in-time.

### Other

Before beginning work on the core parts of this project (and, indeed, before even receiving the prompt), I took the time to start on prework that would get the project into a good state for me to work from.  This involved setting up the `.editorconfig`, filling out the `index.html`, and a number of other things.  A lot of this I adapted from other personal projects of mine, to avoid spending too too much time on this non-essential stuff.  I encourage taking a look at the configs -- they're probably (hopefully) nicer than what you typically encounter out there.
I also jump-started the CSS with code I wrote a week prior for [a different take-home assignment](https://www.codeply.com/p/5zy2pxYxi1) (something which may also be of interest to you, if you wish to see something written in plain HTML/JS/CSS).  You might consider this to be comparable in ethics to using a component library to jump-start the application styling, only this involved integrating around 100 lines of CSS that I myself wrote very recently.  
Wherever anything in this project came from elsewhere, I made sure to, in the relevant commit messages, state as such *and* link to the source material.  I *only* included my own code in this project (outside of third-party libraries and template code from Vite, of course).  

This code represents what you can *currently* expect from me on a day-to-day basis.  I learn fast, and will surely be leagues better than this in a year's time.  At present, I am relatively new to React, having spent most of the past 6 years working with Angular and AngularJS.  I want to underscore that I take the same care you see in this project in my usual work.  I wanted this project to give an accurate portrayal of what my normal code is like, and I hope you are satisfied with it.  

I also went to lengths to try to ensure I did not infringe upon Nintendo's intellectual property rights.  Nintendo, if I've gone about this incorrectly, please let me know and I will do what I need to do to make this app compliant.  

### Unfinished objectives

#### Automated unit testing

I did not do the bonus objective that called for unit-testing the application.  Time constraints being what they were, I decided to triage this, since I know the company does not generally use automated unit testing in its UI (instead relying on a mixture of manual QA and end-to-end testing).  I did, however, ensure that [Jest](https://jestjs.io) was at least present and ready to go (by integrating `vite-template-redux` into the project).  

If I *were* to add unit tests, I would create a `*.test.ts` file with the same name as each `*.tsx` file in-need of testing, and ensure that the main functionality of each file worked as intended, even in edge-cases.  I would not, however, write useless tests solely for the sake of coverage.  

#### Making the site look like an actual Pokédex

If time weren't a factor, I would have made the site look like an actual Pokédex.  The homepage would have been a closed Pokédex, which I then would have animated opening as the route switched to the search page.  There *might* have also been some HTML5 canvas magic at work in the final product.

## Legal

### Copyright

Copyright © from 2023 by [Miles Bradley Huff](https://GitHub.com/MilesBHuff), per the terms of the Lesser Affero General Public License (v3.0 or later), the terms of which may be found in `LICENSE.txt`.  

### Trademarks

Pokémon® and Pokédex® are registered trademarks of [Nintendo of America Inc](https://www.Nintendo.com/US).  
This project is independent from and unaffiliated with Nintendo®.  
<!--- "Pokéball" is, interestingly, *not* a registered trademark of Nintendo;  please see [here](https://tmsearch.uspto.gov/bin/gate.exe?f=searchss&state=4801:tkjnd1.1.1). -->
