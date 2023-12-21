# DeviantIO

![issues](https://img.shields.io/github/issues/Justin-Byrne/DeviantIO?style=flat-square)
![license](https://img.shields.io/github/license/Justin-Byrne/DeviantIO?style=flat-square)
<img src="https://img.shields.io/badge/Version-0.0.3-green?style=flat-square" />
<img src="https://img.shields.io/github/languages/code-size/Justin-Byrne/DeviantIO?style=flat-square" />

Additional functionality for Deviant Art

- [Hotkeys](#hotkeys)
- [Installation](#installation)
  - [Injection](#injection)
    - [Console](#console)
    - [Extension](#extension)
    - [Gist](#gist)
- [Usage](#usage)
  - [Input](#input)
  - [Feature Flags](#feature-flags)
  - [General Configuration](#general-configuration)
- [Documentation](#documentation)
- [Support](#support)
- [Structure](#structure)

## Hotkeys

### Hotkeys

<table>

<tr>
<td>

<sub>**PORTRAIT**</sub>
<br>
<sub>(Favourite)</sub>

</td>
<td>

<!-- nothing -->

</td>
<td>

<sub>**REDIRECT**</sub>
<br>
<sub>Home</sub>

</td>
<td>

<details>

<summary>:arrow_down:</summary>

![Next](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/features/Portrait_Home.gif)

</details>

</td>
<td>

<sub>**WATCH**</sub>
<br>
<sub>User</sub>

</td>
</tr>

<tr>
<td>

<!-- nothing -->

<details>

<summary>:arrow_right:</summary>

![Next](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/features/Portrait_Favourite.gif)

</details>

</td>
<td>

<img width="64" src="https://github.com/Justin-Byrne/DeviantIO/blob/main/images/keys/key-q.svg" />

</td>
<td>

<img width="64" src="https://github.com/Justin-Byrne/DeviantIO/blob/main/images/keys/key-w.svg" />

</td>
<td>

<img width="64" src="https://github.com/Justin-Byrne/DeviantIO/blob/main/images/keys/key-e.svg" />

</td>
<td>

<details>

<summary>:arrow_left:</summary>

![Next](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/features/Portrait_Watch.gif)

</details>

</td>
</tr>

<tr>
<td>

<sub>**PORTRAIT**</sub>
<br>
<sub>Previous</sub>

</td>
<td>

<img width="64" src="https://github.com/Justin-Byrne/DeviantIO/blob/main/images/keys/key-a.svg" />

</td>
<td>

<img width="64" src="https://github.com/Justin-Byrne/DeviantIO/blob/main/images/keys/key-s-dark.svg" />

</td>
<td>

<img width="64" src="https://github.com/Justin-Byrne/DeviantIO/blob/main/images/keys/key-d.svg" />

</td>
<td>

<sub>**PORTRAIT**</sub>
<br>
<sub>Next</sub>

</td>
</tr>

<tr>
<td>

<details>

<summary>:arrow_right:</summary>

![Previous](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/features/Portrait_Previous.gif)

</details>

</td>
<td>

<img width="64" src="https://github.com/Justin-Byrne/DeviantIO/blob/main/images/keys/key-z.svg" />

</td>
<td>

<sub>**REDIRECT**</sub>
<br>
<sub>Random</sub>
<br>
<sub>URL</sub>

</td>
<td>

<img width="64" src="https://github.com/Justin-Byrne/DeviantIO/blob/main/images/keys/key-c.svg" />

</td>
<td>

<details>

<summary>:arrow_left:</summary>

![Next](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/features/Portrait_Next.gif)

</details>

</td>
</tr>

<tr>
<td>

<sub>**PORTRAIT**</sub>
<br>
<sub>Expand</sub>

</td>
<td>

<details>

<summary>:arrow_up:</summary>

![Next](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/features/Portrait_Expand.gif)

</details>

</td>
<td>

<details>

<summary>:arrow_up:</summary>

![Next](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/features/Global_Redirect.gif)

</details>

</td>
<td>

<details>

<summary>:arrow_up:</summary>

![Next](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/features/Portrait_User.gif)

</details>

</td>
<td>

<sub>**REDIRECT**</sub>
<br>
<sub>User</sub>
<br>
<sub>Gallery</sub>

</td>
</tr>
</table>

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

Download a JavaScript injection extension for your browser, and paste `DeviantIO.js` or `DeviantIO-min.js`

#### Gist

There's always a live gist for this project, in case you want to import this script that way.

```HTML
<script src="https://gist.github.com/Justin-Byrne/5aa9b9f2d2d3567632979e48126900b1.js"></script>
```

## Usage

### Input

| Input                                            | Task                                     | Mode     |
| :----------------------------------------------- | ---------------------------------------- | :------: |
| <kbd>a</kbd>, <kbd>←</kbd>                       | Previous Portrait                        | Portrait |
| <kbd>d</kbd>, <kbd>→</kbd>                       | Next Portrait                            | Portrait |
| <kbd>w</kbd>, <kbd>↑</kbd>                       | Back to Home or Profile                  | Portrait |
| <kbd>q</kbd>, <kbd>Space</kbd>, <kbd>Enter</kbd> | Add Portrait to Favorites                | Portrait |
| <kbd>e</kbd>, <kbd>Shift</kbd>                   | Add Deviant User to Watch List           | Portrait |
| <kbd>x</kbd>, <kbd>Alt</kbd>                     | Toggle Portrait Expanse Mode             | Portrait |
| <kbd>c</kbd>, <kbd>/</kbd>, <kbd>Command</kbd>   | Open Artist's Gallery in New Tab         | Portrait |
| <kbd>s</kbd>, <kbd>↓</kbd>                       | Redirect to randomized URL in `config`   | Gallery  |

<details>

<summary><b>Note:</b> Hotkeys are assignable under <code>_config.input_hotkeys</code></summary>

```Javascript
let _config =
{
    input_hotkeys:
    {
        previous:  [ "a", "left"           ],       // [Portrait Mode] : Hotkey(s) to go to the previous portrait
        next:      [ "d", "right"          ],       // [Portrait Mode] : Hotkey(s) to go to the next portrait
        home:      [ "w", "up"             ],       // [Portrait Mode] : Hotkey(s) to go to the main gallery page
        favourite: [ "q", "space", "enter" ],       // [Portrait Mode] : Hotkey(s) to add picture to favourites
        watch:     [ "e", "shift"          ],       // [Portrait Mode] : Hotkey(s) to add user to watch list
        expand:    [ "x", "alt"            ],       // [Portrait Mode] : Hotkey(s) to toggle portrait expanse mode
        user:      [ "c", "/",   "command" ],       // [Portrait Mode] : Hotkey(s) to open current artist's gallery
        redirect:  [ "s", "down"           ]        //     [All Modes] : Hotkey(s) to open a new window with a random redirect; @see _config.redirect_urls
    },
    ...
}
```

</details>

### Feature Flags

| Feature                           | Description                                                       | Default |
| :-------------------------------- | ----------------------------------------------------------------- | :-----: |
| Favourite to Next                 | Favouriting portrait will also cycle to the next portrait         | `true`  |
| Show Notification Favourite       | Shows favourite notifications                                     | `true`  |
| Show Notification Favourite Stage | Shows favourite notification stage background as `accent_colour`  | `true`  |
| Show Notification Watch           | Shows watch notifications                                         | `true`  |
| Show Status Favourite             | Shows favourite status of favourited portraits                    | `true`  |
| Skip Favourite                    | Skips already favourited portraits                                | `false` |
| Skip Watch                        | Skips portraits that you are not already watching                 | `false` |
| Skip Tier                         | Skips tier programs while cycling through portraits               | `true`  |

<details>

<summary><b>Note:</b> Feature flags are assignable under <code>_config.feature_flags</code></summary>

```Javascript
let _config =
{
    ... ,
    feature_flags:
    {
        favourite_to_next:                  true,   // [Portrait Mode] : Favouriting portrait will also cycle to the next portrait
        show_notification_favourite:        true,   // [Portrait Mode] : Shows favourite notifications
        show_notification_favourite_stage:  true,   // [Portrait Mode] : Shows favourite notification stage background as accent_colour: @see _config.internal_data.accent_colour
        show_notification_watch:            true,   // [Portrait Mode] : Shows watch notifications
        show_status_favourite:              true,   //  [Gallery Mode] : Shows favourite status of favourited portraits
        skip_favourite:                     false,  // [Portrait Mode] : Skips already favourited portraits
        skip_watch:                         false,  // [Portrait Mode] : Skips portraits that you are not already watching
        skip_tier:                          true,   // [Portrait Mode] : Skips tier programs while cycling through portraits
    },
    ...
}
```
</details>

### General Configuration

Configuration settings are accessible through the `_config` object

> You can view the current configurations through `DeviantIO.config`; via the console log

| Name                 | Type      | Description                                  |
| -------------------- | --------- | -------------------------------------------- |
| config               | `Object`  | Main configurations object                   |
| config.input_hotkeys | `Object`  | Hotkey(s) associated with each keyboard task |
| config.feature_flags | `Object`  | Various flags for features                   |
| config.redirect_urls | `Array`   | Redirect URLs                                |
| config.internal_data | `Object`  | General abstract data for program            |

<details>

<summary><b>Note:</b> <code>_config</code> object expanded</summary>

```Javascript
/**
 * Main configuration settings
 * @private
 * @constant        {Object} _config                                        Main configurations object
 * @param           {Object} _config.input_hotkeys                          Hotkey(s) associated with each keyboard task; @see _keyboard_tasks
 * @param           {Object} _config.feature_flags                          Various flags for features
 * @param           {Array}  _config.redirect_urls                          Redirect URLs
 * @param           {Object} _config.internal_data                          General abstract data for program
 */
let _config =
{
    input_hotkeys:
    {
        previous:  [ "a", "left"           ],       // [Portrait Mode] : Hotkey(s) to go to the previous portrait
        next:      [ "d", "right"          ],       // [Portrait Mode] : Hotkey(s) to go to the next portrait
        home:      [ "w", "up"             ],       // [Portrait Mode] : Hotkey(s) to go to the main gallery page
        favourite: [ "q", "space", "enter" ],       // [Portrait Mode] : Hotkey(s) to add picture to favourites
        watch:     [ "e", "shift"          ],       // [Portrait Mode] : Hotkey(s) to add user to watch list
        expand:    [ "x", "alt"            ],       // [Portrait Mode] : Hotkey(s) to toggle portrait expanse mode
        user:      [ "c", "/",   "command" ],       // [Portrait Mode] : Hotkey(s) to open current artist's gallery
        redirect:  [ "r", "down"           ]        //     [All Modes] : Hotkey(s) to open a new window with a random redirect; @see _config.redirect_urls
    },
    feature_flags:
    {
        favourite_to_next:                  true,   // [Portrait Mode] : Favouriting portrait will also cycle to the next portrait
        show_notification_favourite:        true,   // [Portrait Mode] : Shows favourite notifications
        show_notification_favourite_stage:  true,   // [Portrait Mode] : Shows favourite notification stage background as accent_colour: @see _config.internal_data.accent_colour
        show_notification_watch:            true,   // [Portrait Mode] : Shows watch notifications
        show_status_favourite:              true,   //  [Gallery Mode] : Shows favourite status of favourited portraits
        skip_favourite:                     false,  // [Portrait Mode] : Skips already favourited portraits
        skip_watch:                         false,  // [Portrait Mode] : Skips portraits that you are not already watching
        skip_tier:                          true,   // [Portrait Mode] : Skips tier programs while cycling through portraits
    },
    redirect_urls:
    [
        "https://google.com",
        "https://gmail.com",
        "https://github.com",
        "https://trello.com"
    ],
    internal_data:
    {
        accent_colour: 'rgba(118, 228, 177, 1)',            // Favourited accent colour
        time_interval: 500,                                 // How often to update this script
        url_reference: undefined,                           // Present Deviant Art URL; defined at runtime
        deviantarturl: 'https://www.deviantart.com',        // Base Deviant Art URL
        mousetrap_cdn: '//cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.min.js',         // Mousetrap CDN address
        ui_data_hooks:
        {
            watch:     "[data-hook='user_watch_button']",   // Data hook for watch button
            favourite: "[data-hook='fave_button']",         // Data hook for favourite button
            stage:     "[data-hook='art_stage']",           // Data hook for background art stage of Portraits
            thumbs:    "[data-hook='deviation_std_thumb']", // Data hook for Portrait thumbnails
            user:      "[data-hook='user_link']",           // Data hook for user link
            action:    "[data-hook='action_bar']",          // Data hook for action bar
            meta:      "[data-hook='deviation_meta']"       // Data hook for deviation meta data
        },
        picture_rules:
        {
            off:                                            // Rules for non-favourited elements
            {
                border:    'none',
                boxShadow: 'none',
                opacity:    1
            },
            on:                                             // Rules for favourited elements
            {
                border:    `2px solid %ACCENT_COLOUR%`,
                boxShadow: `0px 0px 5px 2px %ACCENT_COLOUR%`,
                opacity:    0.5
            }
        }
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
│   ├── FUNDING.yml
│   └── JSDoc.md
├── script
│   ├── DeviantIO-min.js
│   └── DeviantIO.js
├── LICENSE
└── README.md
```
 
## Copyright

![Byrne-Systems](https://github.com/Justin-Byrne/DeviantIO/blob/main/images/cube_sm.png)

= Byrne-Systems © 2023 - All rights reserved. =
