/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import type { ConditionalPluginInput, PluginDefinition } from './types';

export function initialize(): PluginDefinition {
  return {
    id: 'halloween',
    plugin: HalloweenPlugin,
    shouldRun: () => {
      const today = new Date();
      // Console message if we are *just* past the Halloween-mode end-date.
      if (
        today.getMonth() === 10 &&
        today.getDate() > 5 &&
        today.getDate() <= 15
      ) {
        const enabled_url = new URL(window.location.href);
        enabled_url.searchParams.set('enable_halloween', '1');
        console.info(
          "🤫 Psst... It's well past halloween, but you can re-enable halloween mode by clicking this url:\n",
          enabled_url.toString(),
        );
      }

      // Remember that months are 0-indexed in JS!
      return (
        (today.getMonth() === 9 && today.getDate() >= 25) ||
        (today.getMonth() === 10 && today.getDate() <= 5)
      );
    },
  };
}

async function HalloweenPlugin(input: ConditionalPluginInput): Promise<void> {
  registerHalloweenSubthemeIfNeeded();
  if (!input.settings_shown) {
    replaceSettingsToggleWithHat();
  } else {
    insertPumpkinsInThemePreview();
  }
  replaceSidebarToggleWithBook();
  toggleFontIfNeeded(input.subtheme_name);
  registerDblclickEasterEggIfNeeded(input.subtheme_name);
}

function replaceSettingsToggleWithHat() {
  const settingsIconClassList = document.querySelector(
    '.primer-spec-settings-toggle i.fa-cog',
  )?.classList;
  if (settingsIconClassList) {
    settingsIconClassList.remove('fa-cog');
    settingsIconClassList.add('fa-hat-wizard');
  }
}

function replaceSidebarToggleWithBook() {
  const sidebarToggles = document.querySelectorAll(
    '.primer-spec-hoverable i.fa-bars',
  );
  sidebarToggles.forEach((sidebarToggle) => {
    sidebarToggle.classList.remove('fa-cog');
    sidebarToggle.classList.add('fa-book-dead');
  });
}

// Acknowledgement: The _design_ inspiration for this easter egg comes from a
// similar easter egg in WhatsApp Web, where clicking on an expired "view-once"
// media message shows an animated "🤫" emoji.
function createGhostEasterEggOnClick(event: MouseEvent | TouchEvent) {
  let startX, startY;
  if (event instanceof TouchEvent) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  } else {
    startX = event.clientX;
    startY = event.clientY;
  }

  const ghostSize = 32;
  startX -= ghostSize / 2;
  startY -= ghostSize / 2;
  const easterEggEmoji = (
    <span
      style={`position: fixed; top: ${startY}px; left: ${startX}px; z-index: 1000; font-size: ${ghostSize}px; transition: all 1s ease-out; user-select: none;`}
    >
      👻
    </span>
  );

  // Animate the ghost right after it's rendered.
  setTimeout(() => {
    easterEggEmoji.style.transform = `translateY(-${Math.round(
      ghostSize * 1.5,
    )}px)`;
    easterEggEmoji.style.opacity = '0';
  }, 0);
  // And clean up after the animation is complete.
  setTimeout(() => {
    easterEggEmoji.remove();
  }, 1500);

  // Add the ghost to the page!
  document.body.append(easterEggEmoji);
}

function registerDblclickEasterEggIfNeeded(subtheme_name: string) {
  if (subtheme_name === 'spooky') {
    document.body.addEventListener('dblclick', createGhostEasterEggOnClick, {
      passive: true,
    });
    document.body.addEventListener('touchend', createGhostEasterEggOnClick, {
      passive: true,
    });
  } else {
    document.body.removeEventListener('dblclick', createGhostEasterEggOnClick);
    document.body.removeEventListener('touchend', createGhostEasterEggOnClick);
  }
}

function insertPumpkinsInThemePreview() {
  document
    .querySelectorAll(
      'svg.primer-spec-theme-preview-spooky-light, svg.primer-spec-theme-preview-spooky-dark',
    )
    .forEach((svg) => {
      if (!svg.querySelector('.spooky-pumpkins')) {
        svg.appendChild(
          <text class="spooky-pumpkins" x="80" y="140" style="font-size: 72px;">
            🎃🎃🎃
          </text>,
        );
      }
    });
}

function registerHalloweenSubthemeIfNeeded() {
  if (!window.PrimerSpec?.REGISTERED_SUBTHEMES?.['spooky']) {
    // NOTE: This block of code will only ever be called ONCE per page session.
    window.PrimerSpec?.registerNewSubtheme?.(
      'spooky',
      '🎃 Spooky 👻',
      constructHalloweenSubtheme(),
    );
    // Force-update the theme. The page will have already loaded with the
    // default theme, so we need to re-render with the spooky theme.
    window.PrimerSpec?.updateTheme?.({}, false);
  }
}

function constructHalloweenSubtheme() {
  // NOTE: This method will only ever be called ONCE per page session.
  // Hence, we can perform actions that modify the page state without
  // having to worry about duplicated effects.

  // Start by deep-copying the default theme's definition.
  const defaultSubthemeDef =
    window.PrimerSpec.REGISTERED_SUBTHEMES['default'].theme_definition;
  const halloweenSubthemeDef = JSON.parse(JSON.stringify(defaultSubthemeDef));

  // Since we want to use a custom font, we need to inject it into the page.
  document.head.appendChild(
    <link
      href="https://fonts.googleapis.com/css2?family=Creepster&family=Architects+Daughter&display=swap"
      rel="stylesheet"
    />,
  );

  // 'Spooky' is a dark-only theme. We'll first define the dark-mode colors,
  // then we'll completely remove the light-mode colors.

  // Finally, replace the light colors with the dark ones.
  halloweenSubthemeDef['light'] = halloweenSubthemeDef['dark'];
  return halloweenSubthemeDef;
}

function toggleFontIfNeeded(subtheme_name: string) {
  const existingStyleTag = document.getElementById(
    'primer-spec-halloween-font',
  );
  if (subtheme_name === 'spooky' && !existingStyleTag) {
    document.body.appendChild(
      <style id="primer-spec-halloween-font">
        body, .markdown-body, p {'{'}font-family: 'Architects Daughter'; {'}'}
        h1, h2, h3, h4, h5, h6 {'{'}font-family: 'Creepster' !important; {'}'}
      </style>,
    );
  } else if (subtheme_name !== 'spooky' && existingStyleTag) {
    existingStyleTag.remove();
  }
}
