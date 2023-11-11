# Changelog
All notable changes to this project will be documented in this file.

## [0.0.2] - 2023-11-10
### Added
- `_bindKeyboardInputs ( )`, to bind keyboard input(s) to a keyboard task
- `_getKeyboardInputs ( )`, to return formatted keyboard input(s) for Mousetrap key binding

### Changed
- `_setKeyboardTaskHotKeys ( )`, changed to handle setting all keyboard inputs with keyboard tasks

### Fixed
- `DeviantIO.js`, unexpected identifier issue when initiating `_setKeyboardTaskHotKeys ( )` from minified version

## [0.0.1] - 2023-11-09
### Added
- `DeviantIO-min.js`

### Fixed
- `compile.sh`, fixed issue where `echo` escapes backslashes, mangling regexes found throughout the master script
- `DeviantIO.js`, mangled regexes for `_regexp_urls`

## [0.0.0] - 2023-11-07
### Added
- DeviantIO.js script
- Directory structure
- Basic build tools
- Base images
- JSDocs
- CHANGELOG.md
- LICENSE.md

---

| Version | Date       | Commit                                                              | Comments                                                                                     |
| :-----: | :--------: | :-----------------------------------------------------------------: | :------------------------------------------------------------------------------------------- |
| [0.0.2] | 2020-11-10 | CURRENT                                                             | Fixed unexpected identifier issue from minified version                                      |
| [0.0.1] | 2020-11-09 | [ad850e6](https://github.com/Justin-Byrne/DeviantIO/commit/ad850e6) | Added minification, fixed mangled regexes                                                    |
| [0.0.0] | 2020-11-07 | [1971950](https://github.com/Justin-Byrne/DeviantIO/commit/1971950) | Initial upload                                                                               |

---

## Types of changes
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## Copyright

![Byrne-Systems](https://github.com/Justin-Byrne/Justin-Byrne/blob/main/images/cube_sm.png)

==Byrne-Systems © 2023 - All rights reserved.==
