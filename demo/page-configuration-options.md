---
layout: spec

disableSidebar: true
useLegacyCodeBlocks: true
---

# Page Configuration Options

This page demonstrates the [page configuration options](https://github.com/eecs485staff/primer-spec/blob/develop/docs/USAGE_ADVANCED.md#page-configuration-options) in Primer Spec.

This page has been configured with the following options:

### `disableSidebar: true`

This boolean indicates whether the sidebar with Table of Contents should be shown on the page. The option defaults to `false` (so that the sidebar is made available). Notice, however, that on this page, _there is no Sidebar_!

This configuration option is useful for small pages, or for pages with few headings. (On such pages, a Sidebar may not be useful, or might hamper the reading experience.)

### `useLegacyCodeBlocks: true`

This boolean indicates whether code blocks should _not_ be enhanced on the page. (By default, [code blocks are enhanced](./enhanced-code-blocks.md) by Primer Spec.)

Here's a code block. Notice how it uses the "legacy" formatting.

```python
import os
print("Spam & Eggs")
```

It's possible to [override this setting](./enhanced-code-blocks.md#single-code-block) at the codeblock level — simply add the `data-variant="enhanced"` attribute to the code block. Here's an example:

<!-- prettier-ignore-start -->
```python
import os
print("Spam & Eggs")
```
{: data-variant="enhanced" }
<!-- prettier-ignore-end -->

<details markdown="1">
  <summary>Source code for enhanced code block (overridden)</summary>
  
  ````markdown
```python
import os
print("Spam & Eggs")
```
{: data-variant="enhanced" }
  ````
</details>