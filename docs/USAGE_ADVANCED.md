---
layout: spec
title: 'Advanced Usage'
sitemapOrder: 1
---

<!-- prettier-ignore-start -->
<!-- omit in toc -->
# Advanced Usage
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

See the [Primer Spec README](../README.md) for the main usage instructions. This page contains further instructions for more advanced workflows.

<!-- prettier-ignore-start -->
<!-- omit in toc -->
## Contents
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

- [Advanced Markdown tips](#advanced-markdown-tips)
- [Previewing locally](#previewing-locally)
- [Customizing Jekyll](#customizing-jekyll)
- [Hiding sections from the sidebar](#hiding-sections-from-the-sidebar)
- [Auto-invert image colors in dark mode](#auto-invert-image-colors-in-dark-mode)
- [Callouts](#callouts)
- [Enhanced code blocks](#enhanced-code-blocks)
- [Page configuration options](#page-configuration-options)
  - [`disableSidebar`: Boolean](#disablesidebar-boolean)
  - [`hideSidebarOnLoad`: Boolean](#hidesidebaronload-boolean)
  - [`sitemapOrder`: Number](#sitemaporder-number)
  - [`latex`: Boolean](#latex-boolean)
  - [`mermaid`: Boolean](#mermaid-boolean)
  - [`defaultCodeblockVariant`: CodeblockVariant (String)](#defaultcodeblockvariant-codeblockvariant-string)
  - [`excludeFromSitemap`: Boolean](#excludefromsitemap-boolean)
- [Site configuration options](#site-configuration-options)
  - [`defaultSubthemeName`: String](#defaultsubthemename-string)
  - [`defaultSubthemeMode`: String](#defaultsubthememode-string)
  - [`defaultCodeblockVariant`: CodeblockVariant (String)](#defaultcodeblockvariant-codeblockvariant-string-1)
  - [`sitemap`: Boolean | {label: String; externalLinks: Array}](#sitemap-boolean--label-string-externallinks-array)
  - [`disableJokes`: Boolean](#disablejokes-boolean)
- [Pinning to a specific version](#pinning-to-a-specific-version)
- [Using without Jekyll](#using-without-jekyll)

## Advanced Markdown tips

Check out [MARKODWN_TIPS](https://eecs485staff.github.io/primer-spec/docs/MARKDOWN_TIPS.html) for notes on using some of the more advanced features of Markdown with Primer Spec.

## Previewing locally

If you'd like to preview your site on your computer (or if you aren't using GitHub Pages), do the following:

<!-- prettier-ignore-start -->

1. Follow steps 2 and 3 from the main [usage instructions](https://github.com/eecs485staff/primer-spec#usage).

2. Create a file named `Gemfile` in your project root directory. Add this to the file:

   ```ruby
   source 'https://rubygems.org'

   gem 'github-pages', '228'
   gem 'webrick'
   ```

3. (Optional) Create a `.gitignore` file in your site directory with the following contents:

   ```gitignore
   # This .gitignore file is for locally-rendered Jekyll sites.

   # Locally rendered website
   _site

   # Other Jekyll files
   .sass-cache
   .jekyll-metadata
   ```
   {: data-title=".gitignore" }

4. Ensure that you are using a version of Ruby later than 2.1.0. If you're on a Mac, you may need to run `brew install ruby` first. You must also install `bundler`.

   ```console
   $ ruby --version
   ruby 2.6.1p33 (2019-01-30 revision 66950) [x86_64-darwin18]
   $ gem install bundler
   ```
    <div class="primer-spec-callout warning" markdown="1">
    WARNING: Primer Spec is not yet compatible with Ruby 3.2. Use Ruby 3.1 instead. (See [GitHub issue #242](https://github.com/eecs485staff/primer-spec/issues/242) for discussion.)
    </div>

5. Install the dependencies.

   ```console
   $ pwd
   /seshrs/demo-project
   $ bundle install
   ```

6. Run the Jekyll server to build the site and watch for changes. By default, the site is served at [http://127.0.0.1:4000](http://127.0.0.1:4000).

   ```console
   $ pwd
   /seshrs/demo-project/docs
   $ bundle exec jekyll serve
   ```

<!-- prettier-ignore-end -->

<div class="primer-spec-callout info" markdown="1">
**NOTE:** If you run into issues with any of these steps, [create an issue](https://github.com/eecs485staff/primer-spec/issues/new) in this repository to report it. (It's possible that something has changed with GitHub Pages / Jekyll!)
</div>

At this point, the HTML files with Primer Spec styling are available in the `_site` directory. (You may move them to a remote webserver if you wish.)

## Customizing Jekyll

Primer Spec will respect the following variables, if set in your site's `_config.yml`:

```yml
title: [The title of your site]
description: [A short description of your site's purpose]
```

Additionally, you may choose to set the following optional variables:

```yml
favicon: [Path/URL to 32x32 favicon]
google_analytics: [Your Google Analytics tracking ID / measurement ID]
```

## Hiding sections from the sidebar

To prevent a heading from appearing in the sidebar, add the class `primer-spec-toc-ignore` to a header element.

In Markdown files, this can be achieved by inserting `{: .primer-spec-toc-ignore }` under the heading. For instance:

```markdown
### This heading appears in the sidebar

Spam spam spam.

### This heading does NOT appear in the sidebar

{: .primer-spec-toc-ignore }

Spam spam spam.
```

In HTML files, this can be achieved by adding a `class` attribute to the heading element. For instance:

```html
<h3>This heading appears in the sidebar</h3>

<p>Spam spam spam.</p>

<h3 class="primer-spec-toc-ignore">
  This heading does NOT appear in the sidebar
</h3>

<p>Spam spam spam.</p>
```

## Auto-invert image colors in dark mode

Primer Spec can invert the colors of images to optimize them in dark mode. All you need to do is add the `invert-colors-in-dark-mode` class to your image!

```markdown
Markdown syntax:
![This image shows a screenshot of Primer Spec in the 'Bella' theme.](./screenshot.png){: .invert-colors-in-dark-mode }

Equivalent HTML syntax:
<img
  src="./screenshot.png"
  alt="This image shows a screenshot of Primer Spec in the 'Bella' theme."
  class="invert-colors-in-dark-mode" />
```

Check out the [Images demo](https://eecs485staff.github.io/primer-spec/demo/images.html) for further docs.

## Callouts

Use Callouts to highlight information in your specs. Here's an example:

```markdown
<div class="primer-spec-callout info" markdown="1">
  This is an example callout.
  If you use this in a `markdown` file, *markdown* works inside the box too!
</p>
```

See the [Callouts demo](https://eecs485staff.github.io/primer-spec/demo/callouts.html) for examples of how to customize Callouts for your spec.

## Enhanced code blocks

Primer Spec automatically upgrades your code blocks! These enhanced code blocks let viewers copy code easily, while also letting you highlight important lines in the code.

To highlight lines in a codeblock, specify them in a [`data-highlight` attribute](https://eecs485staff.github.io/primer-spec/demo/enhanced-code-blocks.html#using-data-highlight-attribute), or surround them in ["magic comments"](https://eecs485staff.github.io/primer-spec/demo/enhanced-code-blocks.html#using-magic-comments). For instance:

<!-- prettier-ignore-start -->
````markdown
```python
import os
print("Hello world")
print("spam and eggs")
print("Ni! Ni! Ni!")
# Or surround them in "magic comments"
# primer-spec-highlight-start
print("This line gets highlighted too!")
# primer-spec-highlight-end
```
{: data-highlight="1,3" }
````
<!-- prettier-ignore-end -->

If you'd like to revert back to the original "legacy" style of code blocks, simply add the attribute [`data-variant="legacy"`](https://eecs485staff.github.io/primer-spec/demo/enhanced-code-blocks.html#using-variants):

<!-- prettier-ignore-start -->
````markdown
```console
$ echo "Eggs & Spam"
```
{: data-variant="legacy" }
````
<!-- prettier-ignore-end -->

Check out the [demo](https://eecs485staff.github.io/primer-spec/demo/enhanced-code-blocks.html) for more examples of how to customize Enhanced code blocks for your spec.

## Page configuration options

The following configuration options can be specified in the ["front-matter"](https://jekyllrb.com/docs/front-matter/) of your page, in the same place that you specify the page's layout. For instance, to disable the Primer Spec sidebar and render LaTeX expressions, modify your page to look like this:

```yml
---
layout: spec

# Disable the Sidebar completely
disableSidebar: true
# Render LaTeX expressions
latex: true
---
...your webpage's MarkDown/HTML content...
```

Primer Spec supports the following page configuration options:

#### `disableSidebar`: Boolean

Disable the the sidebar completely. (The Table of Contents will also not be generated.) Defaults to `false`.

Example page: http://eecs485staff.github.io/primer-spec/demo/page-configuration-options.html

#### `hideSidebarOnLoad`: Boolean

Prevent the sidebar (with table of contents) from appearing when a user loads the page. Defaults to `false`.

Example page: http://eecs485staff.github.io/primer-spec/demo/hide-sidebar-on-load.html

#### `sitemapOrder`: Number

Specify where in the sidebar the link to the page will appear. A page with a higher `sitemapOrder` will appear later in the sidebar than page with a lower `sitemapOrder`. Pages without a `sitemapOrder` will appear at the end.

You can see each page's `sitemapOrder` property in your browser's dev tools by right-clicking a link in the sidebar and inspecting its `data-order` attribute. External links are treated separately; see the [Sitemap](#sitemap-boolean--label-string-externallinks-array) section for more.

#### `latex`: Boolean

Render Mathematical expressions using [LaTeX syntax and rendering](https://en.wikibooks.org/wiki/LaTeX/Mathematics). Defaults to `false`.

LaTeX can be rendered inline or as separate blocks. Here is an example of a MarkDown file with LaTeX typesetting:

```markdown
---
layout: spec
latex: true
---

LaTeX can be inlined ($$ \forall x \in R $$) or as a separate math block.

$$
-b \pm \sqrt{b^2 - 4ac} \over 2a
$$
```

For a full list of supported LaTeX commands, see the [MathJax docs](https://docs.mathjax.org/en/latest/input/tex/macros/index.html).

<div class="primer-spec-callout info" markdown="1">
**NOTE:** LaTeX rendering only supports MarkDown that was parsed using the
GFM Kramdown parser. See the [Usage](https://github.com/eecs485staff/primer-spec#usage) instructions for the
correct contents for `_config.yml`.
</div>

#### `mermaid`: Boolean

Render diagrams using [Mermaid syntax and rendering](https://mermaid-js.github.io/mermaid/#/?id=diagram-types). Defaults to `false`.

Here is an example of a MarkDown file with Mermaid diagrams:

<!-- prettier-ignore-start -->
<!-- omit in toc -->
````
---
layout: spec
mermaid: true

---

Use Mermaid to render flow charts, sequence diagrams and more!

```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```
{:
  data-title="Basic example of a flowchart"
  data-description="A links to B and C. B and C link to D."
}
````
<!-- prettier-ignore-end -->

Check out the [demo](https://eecs485staff.github.io/primer-spec/demo/diagrams.html#mermaid) for inspiration and for links to Mermaid's syntax documentation.

#### `defaultCodeblockVariant`: CodeblockVariant (String)

Choose the default codeblock variant to use. Valid codeblock variants are:

- `enhanced` (default)
- `no-line-numbers`
- `legacy`

Use `legacy` to opt out of ["enhancing" code blocks](#enhanced-code-blocks) on the entire page. See an example of the "legacy" style code block in the [demo](https://eecs485staff.github.io/primer-spec/demo/enhanced-code-blocks.html#legacy).

This setting can be overriden per-block.

#### `excludeFromSitemap`: Boolean

Prevent the page from being displayed as part of the [Sitemap](#sitemap-boolean--label-string-externallinks-array) in the Sidebar. This option does not have any effect if the [`sitemap` site-wide configuration option](#sitemap-boolean--label-string-externallinks-array) is not set.

<div class="primer-spec-callout info" markdown="1">
**NOTE:** If the site-wide option `sitemap` is enabled, then a Sitemap will _not_ be rendered on the page.
</div>

## Site configuration options

The following site-configuration options can be specified in the [`_config.yml`](https://jekyllrb.com/docs/configuration/) file of your site under the `primerSpec` key. For instance, to always hide the Primer Spec sidebar when users visit your page, modify your `_config.yml` to look like this:

```yml
# REQUIRED configuration options, as specified in the Primer Spec README
remote_theme: eecs485staff/primer-spec
plugins:
  - jekyll-remote-theme
  - jekyll-optional-front-matter
  - jekyll-readme-index
  - jekyll-relative-links
  - jekyll-default-layout
  - jemoji
kramdown:
  input: GFM
readme_index:
  remove_originals: true
  with_frontmatter: true

# OPTIONAL site configuration options
primerSpec:
  defaultSubthemeName: modern
  # Other site configuration options can go here too.
```

Primer Spec supports the following site configuration options:

#### `defaultSubthemeName`: String

Specify the default subtheme name. This subtheme will be applied for first-time site visitors. Defaults to `default`.

#### `defaultSubthemeMode`: String

Specify the default subtheme mode. This subtheme will be applied for first-time site visitors. Defaults to `system`.

#### `defaultCodeblockVariant`: CodeblockVariant (String)

Choose the default codeblock variant to use. Valid codeblock variants are:

- `enhanced` (default)
- `no-line-numbers`
- `legacy`

Use `legacy` to opt out of ["enhancing" code blocks](#enhanced-code-blocks) on the entire page. See an example of the "legacy" style code block in the [demo](https://eecs485staff.github.io/primer-spec/demo/enhanced-code-blocks.html#legacy).

This setting can be overriden per-block.

#### `sitemap`: Boolean \| {label: String; externalLinks: Array}

_[EECS 280's Project 1](https://eecs280staff.github.io/p1-stats/) has a great example of a sitemap!_

If set to `true`, a sitemap will be auto-generated and displayed in the Sidebar of every Primer Spec page with the label _"Supplemental Pages"_.

To customize the label, specify it under a `label` field. If you would prefer to remove the label from your sitemap, set the field to the empty string (`label: ''`).

To add external links, specify them under an `externalLinks` field. Each item in the `externalLinks` array must have a `title` and a `url` field. External links will always appear at the bottom of the sidebar, below all internal links. They will appear in the same order that you include them in your `_config.yml`.

Your `_config.yml` would look like this:

```yml
# REQUIRED configuration options, as specified in the Primer Spec README
remote_theme: eecs485staff/primer-spec
# ...

# OPTIONAL site configuration options
primerSpec:
  sitemap:
    label: My custom sitemap label
    externalLinks:
      - title: Title1
        url: URL of External Page
      - title: Title2
        url: URL of Second External Page
  # ... (other site configuration options)
```

In this example, all internal pages will appear first in an order based on the individual pages' [`sitemapOrder`](#sitemaporder-number) property. After them will be Title1 followed by Title2.

To exclude a page from the sitemap, set [`excludeFromSitemap: true`](#excludefromsitemap-boolean) in the front-matter of your page.

<div class="primer-spec-callout info" markdown="1">
**NOTE:** A sitemap will only be rendered if your site has multiple pages.
</div>

#### `disableJokes`: Boolean

Primer Spec displays Easter Eggs to students around Halloween and April Fools. The jokes do not interefere with the spec's content without students' explicit consent. (See the [Halloween joke](https://github.com/eecs485staff/primer-spec/pull/157) as an example.)

If you'd prefer for Primer Spec to not render jokes on your website, add the config `disableJokes: false` to the Primer Spec config in `_config.yml`.

We hope you'll keep the jokes enabled as a fun way to engage students around these holidays! If you _do_ end up disabling these jokes, we'd appreciate your feedback on why you chose to do so. Please feel free to open an [issue](https://github.com/eecs485staff/primer-spec/issues/new/) or [discussion](https://github.com/eecs485staff/primer-spec/discussions/new) on the Primer Spec repo, and we can follow up there :)

## Pinning to a specific version

We take care to release new versions of Primer Spec on the `main` branch only between semesters at the University of Michigan. However, if your site needs an even stronger guarantee of stability, you can pin your site to a specific _minor_ version of Primer Spec.

1. Visit the [Primer Spec Releases](https://github.com/eecs485staff/primer-spec/releases) page. Find the version to which you'd like to pin your site, and note down its title. (For instance, `v1.3.1+fa20`.)
2. Update your site's `_config.yml` with the version tag from step (1). Specifically, update this line:
   ```yml
   # Replace the contents after the '@' symbol with the version tag from
   # step (1).
   remote_theme: eecs485staff/primer-spec@v1.3.1+fa20
   ```
3. Don't forget to update your Primer Spec version regularly!

Note that you will _always_ get patch version updates for a specific minor version. (For instance, if you pin to `v1.3.1`, you will automatically be upgraded to `v1.3.2` if that version is released.)

## Using without Jekyll

We recommend using Primer Spec with Jekyll because:

- You can store your content as Markdown. Jekyll converts Markdown files to HTML automatically.
- Jekyll applies much of the scaffolding needed for Primer Spec.

However, with some work, it is _possible_ to add Primer Spec styling to a plain HTML page:

1. Make sure that all sections of your web page are marked by header tags (like `h1`, `h2`, etc.).

2. Place all your main content within a `div` with ID `primer-spec-plugin-main-content`:

   ```html
   <div id="primer-spec-plugin-main-content">
     <!-- Your main content goes here. -->
   </div>
   ```

3. Add the following lines at the top of your file, just after the opening `head` tag. Replace `<version>` with the appropriate version in the [`assets/`](https://github.com/eecs485staff/primer-spec/tree/b93df3bf257082983c00d09e246b8046463de1a7/assets) directory.

   ```html
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <link
     rel="stylesheet"
     href="https://eecs485staff.github.io/primer-spec/assets/<version>/css/primer-spec-base.css"
   />
   <script
     src="https://eecs485staff.github.io/primer-spec/assets/<version>/js/primer_spec_plugin.min.js"
     crossorigin="anonymous"
     defer
   ></script>
   ```

4. Add the following lines at the top of the `body` tag.

   ```html
   <div id="primer-spec-top"></div>
   <div id="primer-spec-app-container" onclick="return true;"></div>
   ```

Your final HTML file will probably look something like this:

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://eecs485staff.github.io/primer-spec/assets/<version>/css/primer-spec-base.css"
    />
    <script
      src="https://eecs485staff.github.io/primer-spec/assets/<version>/js/primer_spec_plugin.min.js"
      crossorigin="anonymous"
      defer
    ></script>

    <title>My long project spec</title>
  </head>
  <body>
    <div id="primer-spec-top"></div>
    <div id="primer-spec-app-container"></div>
    <div id="primer-spec-plugin-main-content">
      <!-- Main content goes in here. For example: -->
      <h1 class="primer-spec-toc-ignore">My long project spec</h1>
      ...
      <h2>Setup</h2>
      <h3>Installing Python</h3>
      ...
      <h2>Grading</h2>
      ...
    </div>
  </body>
</html>
```

That's it! The page should now display with Primer Spec styling.
