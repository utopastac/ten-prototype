# ten-prototype

## Purpose
The purpose of this project is to have a canonical design resource for the site, to stop the rampant proliferation of Sketch files. It should have:
- The ability to have multiple client variants.
- Client variants includes: Text, coours, images, icons.
- The ability to easily build and deploy client variants.
- Every component from the site.
- Fully responsive layout.

## Process
All initial design work is much better done on paper, in Sketch, in Photoshop, or any tool you're comfortable with. Once something has been through that process and the team is happy with it, the changes / new components should be submitted to this repo as a PR.
- We are *not* overly concerned about code quality.
- Components should not be too tightly bound with other components. Err on the side of more css and more template files with better encapsulation rather than sharing styles.
- On the other hand, make sure what you're making truly needs a new component.

## Tooling
The site is built with [Middleman](https://middlemanapp.com). Middleman is a static site generator that uses Ruby. The languages used are:
- [Sass](http://sass-lang.com) for css compilation.
- [HAML](http://haml.info) for markup.
- jQuery for easy-ish dom manipulation (chosen as it has the shallowest learning curve and a big community still).
- Plain Javascript.
- [GSAP](https://greensock.com/gsap/) for animation
Feel free to add any framework you fancy to this list.

## Deployment
Feel free to deploy in any way you see fit. For now, we are using [Surge](http://surge.sh).
Build the project into the build folder using the command:
`bundle exec middleman build`
CD into the build folder, then run the command:
`surge`
Choose a URL. That's it!

## Library
The url `/library` contains a list of all the component elements including their usage.

## Different clients
In the file `config.rb` there in an attribute called `config[:client]`. Add new clients to this list. To add a new client, you must:
In the root `data` folder add a folder with the name of the client (the same string you use in the `config` file). Add a file in this new folder called `content.yaml`. Copy the content for this file from one of the other clients.
### It's important that all of the keys in the client content files are present across *all files*. If they aren'tthe site will fail to build. If you add a new content tag, make sure to add it across all client files.
Add a css file for your new client. These are added in `source/stylesheets/client/[name_of_client.css.sass]`. This is where you can override the variables set in the `source/stylesheets/_variables.css.sass` file.

## Adding client overrides
You can add any variable to `source/stylesheets/_variables.css.sass` with `!default` at the end of the line. This can then be optionally overriden in the individual client stylesheets in the folder `source/stylesheets/client/`.
To add something more complicated, such as a text variable or a boolean value, add a key/value pair (or array, list, or any object type) to the `content.yaml` files within `data/[name_of_client]`. You can then access these values within the source `[].html.haml` files by using the tag `data[config[:client]].content.[name_of_key]`.

## Adding new routes
Simply make a folder in `source` with the name of the page you want, and add an `index.html.haml` into the folder. For nested pages, add nested folders with the desired page name, each with their own `index.html.haml`. The yaml attribute `title:` is the label that gets used in the breadcrumb bar.