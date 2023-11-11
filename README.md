# DeviantIO

![issues](https://img.shields.io/github/issues/Justin-Byrne/DeviantIO?style=flat-square)
![license](https://img.shields.io/github/license/Justin-Byrne/DeviantIO?style=flat-square)
<img src="https://img.shields.io/badge/Version-0.0.2-green?style=flat-square" />
<img src="https://img.shields.io/github/languages/code-size/Justin-Byrne/DeviantIO?style=flat-square" />

Additional functionality for Deviant Art

- [Installation](#installation)
  - [Injection](#injection)
    - [Console](#console)
    - [Extension](#extension)
    - [Gist](#gist)
- [Usage](#usage)
  - [Hotkeys](#hotkeys)
  - [Configuration](#configuration)
- [Documentation](#documentation)
- [Support](#support)
- [Structure](#structure)

## Installation

Migrate to your desired download location, and download this repository to your system using git clone:

```sh
git clone https://github.com/Justin-Byrne/DeviantIO.git
```

### Injection

#### Console

Open your browser's console...

| OS      | *Chrome, FireFox, & Edge* 						   |
| ------- | -------------------------------------------------- |
| **Win** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd>  + <kbd>J</kbd> |
| **Mac** | <kbd>Cmd</kbd>  + <kbd>Option</kbd> + <kbd>J</kbd> |

Paste (either) `DeviantIO.js` or `DeviantIO-min.js` within your browser's console, and hit <kbd>enter</kbd>

#### Extension

Download a JavaScript injection extension for your browser, and paste (either) `DeviantIO.js` or `DeviantIO-min.js`

#### Gist

There's always a live gist for this project, in case you want to import this script that way.

```HTML
<script src="https://gist.github.com/Justin-Byrne/5aa9b9f2d2d3567632979e48126900b1.js"></script>
```

## Usage

### HotKeys

:warning: **Note:** only work in gallery mode

| Input                              | Task                                     |
| :--------------------------------: | ---------------------------------------- |
| <kbd>Space</kbd>, <kbd>Enter</kbd> | :warning: Add Portrait to Favorites      |
| <kbd>Shift</kbd>                   | :warning: Add Deviant User to Watch List |
| <kbd>←</kbd>                       | :warning: Previous Portrait              |
| <kbd>→</kbd>                       | :warning: Next Portrait                  |
| <kbd>↑</kbd>                       | :warning: Back to Home or Profile        |
| <kbd>↓</kbd>                       | Redirect to randomized URL in config     |

### Configuration

Configuration settings are accessible through the `_config` object

> You can view the current configurations through `DeviantIO.config`; via the console log

| Name                    | Type      | Description                          |
| ----------------------- | --------- | ------------------------------------ |
| _config               | `Object`  | Main configurations object           |
| _config.accent_colour | `string`  | Favourited accent colour             |
| _config.mousetrap_cdn | `string`  | Mousetrap CDN address                |
| _config.favorite_next | `boolean` | Go to next portrait after favoriting |
| _config.time_interval | `number`  | How often to update this script      |
| _config.url_reference | `string`  | Present Deviant Art URL              |
| _config.deviantarturl | `string`  | Base Deviant Art URL                 |
| _config.input_hotkeys | `string`  | Hotkey(s) for each keyboard task     |

<details>

<summary><b>Note:</b> <code>_config</code> object expanded</summary>

```Javascript
/**
 * Main configuration settings
 * @global
 * @constant        {Object}  _config                       Main configurations object
 * @param           {string}  _config.accent_colour         Favourited accent colour
 * @param           {string}  _config.mousetrap_cdn         Mousetrap CDN address
 * @param           {boolean} _config.favorite_next         Go to next portrait after favoriting
 * @param           {number}  _config.time_interval         How often to update this script
 * @param           {string}  _config.url_reference         Present Deviant Art URL
 * @param           {string}  _config.deviantarturl         Base Deviant Art URL
 * @param           {string}  _config.input_hotkeys         Hotkey(s) associated with each keyboard task; @see _keyboard_tasks
 */
let _config =
{
    accent_colour: 'rgba(118, 228, 177, 1)',
    mousetrap_cdn: '//cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.min.js',
    favorite_next: true,
    time_interval: 500,
    url_reference: undefined,                       // Note: defined at runtime
    deviantarturl: 'https://www.deviantart.com',
    input_hotkeys:
    {
        favorite: [ "space", "enter" ],
        watch:    [ "shift"          ],
        previous: [ "left"           ],
        next:     [ "right"          ],
        home:     [ "up"             ],
        redirect: [ "down"           ],
        user:     [ "/"              ]
    }
}
```

</details>

## Documentation

[:book: JSDoc](https://github.com/Justin-Byrne/DeviantIO/blob/main/docs/JSDoc.md)


## Support

Please [open an issue](https://github.com/Justin-Byrne/DeviantIO/issues/new) for support.

## Structure

```
.
├── build
│   ├── compile.sh
│   └── watch.sh
├── docs
│   ├── CHANGELOG.md
│   └── JSDoc.md
├── script
│   ├── DeviantIO-min.js
│   └── DeviantIO.js
├── LICENSE
└── README.md
```
 
## Copyright

![Byrne-Systems](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/cube_sm.png)

== Byrne-Systems © 2023 - All rights reserved. ==
