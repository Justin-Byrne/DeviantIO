// @program:        DeviantIO
// @brief:          Additional functionality for Deviant Art
// @author:         Justin D. Byrne
// @email:          justin@byrne-systems.com
// @version:        0.0.3
// @license:        GPL-2.0

"use strict";

/**
 * Call main module
 * @module                                                  deviantIO
 * @param           {Object} window                         Window containing a DOM document
 */
( ( window ) =>
{
    ////////////////////////////////////////////////////////////////////////////
    ////    GLOBAL VARIABLES    ////////////////////////////////////////////////

        /**
         * Main configuration settings
         * @private
         * @constant        {Object} _config                        Main configurations object
         * @param           {Object} _config.input_hotkeys          Hotkey(s) associated with each keyboard task; @see _keyboard_tasks
         * @param           {Object} _config.feature_flags          Various flags for features
         * @param           {Array}  _config.redirect_urls          Redirect URLs
         * @param           {Object} _config.internal_data          General abstract data for program
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
                expand:    [ "f", "alt"            ],       // [Portrait Mode] : Hotkey(s) to toggle portrait expanse mode
                user:      [ "c", "/",   "command" ],       // [Portrait Mode] : Hotkey(s) to open current artist's gallery
                redirect:  [ "s", "down"           ]        //     [All Modes] : Hotkey(s) to open a new window with a random redirect; @see _config.redirect_urls
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
                mousetrap_cdn: '//cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.min.js', // Mousetrap CDN address
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

        /**
         * Regular expressions for page identification
         * @private
         * @constant        {Object} _regexp_urls                   Regular expressions
         * @param           {Object} _regexp_urls.site              Site regular expressions
         * @param           {string} _regexp_urls.site.home         RegExp for homepage
         * @param           {string} _regexp_urls.site.watch        RegExp for watch page
         * @param           {string} _regexp_urls.site.daily        RegExp for daily deviations page
         * @param           {string} _regexp_urls.site.popular      RegExp for popular deviations page
         * @param           {string} _regexp_urls.site.topic        RegExp for topics page
         * @param           {string} _regexp_urls.site.tag          RegExp for tagged page
         * @param           {string} _regexp_urls.site.art          RegExp for portrait pages
         * @param           {Object} _regexp_urls.user              User regular expressions
         * @param           {Object} _regexp_urls.user.favourites   RegExp for user's favourites page
         * @param           {Object} _regexp_urls.user.gallery      RegExp for user's gallery page
         * @param           {Object} _regexp_urls.user.home         RegExp for user's homepage
         */
        let _regexp_urls =
        {
            site:
            {
                home:       `${_config.internal_data.deviantarturl}/\\B`,
                search:     `${_config.internal_data.deviantarturl}/search?`,
                watch:      `${_config.internal_data.deviantarturl}/watch/deviations`,
                daily:      `${_config.internal_data.deviantarturl}/daily-deviations`,
                popular:    `${_config.internal_data.deviantarturl}/popular/deviations`,
                topic:      `${_config.internal_data.deviantarturl}/topic/\\w+`,
                tag:        `${_config.internal_data.deviantarturl}/tag/\\w+`,
                art:        `${_config.internal_data.deviantarturl}/[^/]+/art/.+`,
                tier:       `${_config.internal_data.deviantarturl}/[^/]+/tier`,
            },
            user:
            {
                favourites: `${_config.internal_data.deviantarturl}/(?!watch|daily|tag|popular)\\w+/favourites`,
                gallery:    `${_config.internal_data.deviantarturl}/(?!watch|daily|tag|popular)\\w+/gallery`,
                home:       `${_config.internal_data.deviantarturl}/(?!watch|daily|tag|popular)\\w+`
            }
        }

        /**
         * Shared CSS styles for appendable UI elements
         * @private
         * @constant        {Object} _shared_styles                 Shared styles
         */
        let _shared_styles =
        {
            'position':           'absolute',
            'z-index':            999,

            'font-size':          '4em',
        }

        /**
         * Appendable HTML & CSS content
         * @private
         * @constant        {Object} _ui_elements                   Appendable HTML & CSS content
         * @param           {Object} _ui_elements.notifications     Notification elements
         */
        let _ui_elements =
        {
            notifications:
            {
                watch:
                {
                    css:
                    {
                        ..._shared_styles,

                        'animation':          'wiggle 2s linear infinite',

                        'right':              '1em',
                    },
                    animation: '@keyframes wiggle' +
                               '{' +
                                   '0%, 7%    { transform: rotateZ(0);      }' +
                                   '15%       { transform: rotateZ(-15deg); }' +
                                   '20%       { transform: rotateZ(10deg);  }' +
                                   '25%       { transform: rotateZ(-10deg); }' +
                                   '30%       { transform: rotateZ(6deg);   }' +
                                   '35%       { transform: rotateZ(-4deg);  }' +
                                   '40%, 100% { transform: rotateZ(0);      }' +
                               '}'
                },
                favourite:
                {
                    css:
                    {
                        ..._shared_styles,

                        'animation':          'bounce 1s ease-out infinite',

                        'left':               '1em',
                    },
                    animation: '@keyframes bounce' +
                               '{' +
                                   '0%   { transform: scale(0.75); }' +
                                   '100% { transform: scale(1);    }' +
                               '}'
                }
            },
            status:
            {
                favourite:
                {
                    css:
                    {
                        ..._shared_styles,
                    }
                }
            },
            icons:
            {
                favourite: '❤️',
                watch:     '🔍'
            }
        }

        /**
         * Keyboard HotKey tasks
         * @private
         * @constant        {Object} _keyboard_tasks                Keyboard tasks
         * @param           {Object} _keyboard_tasks.previous       Previous portrait task
         * @param           {Object} _keyboard_tasks.next           Next portrait task
         * @param           {Object} _keyboard_tasks.home           Home task
         * @param           {Object} _keyboard_tasks.favourite      Favorite task
         * @param           {Object} _keyboard_tasks.watch          Watch artist task
         * @param           {Object} _keyboard_tasks.expand         Expand task
         * @param           {Object} _keyboard_tasks.user           User task
         * @param           {Object} _keyboard_tasks.redirect       Redirect task
         */
        let _keyboard_tasks =
        {
            previous: ( ) =>
            {
                Mousetrap.bind ( "%HOT_KEYS%", function ( event )
                {
                    if ( deviantIO.getPageType ( ).type == 'art' )
                    {
                        deviantIO.clearNotification ( 'favourite' );

                        deviantIO.clearNotification ( 'watch'     );


                        let _prev_button = document.querySelectorAll ( "[data-hook='arrowL']" ) [ 0 ].children [ 0 ];

                            _prev_button.click ( );
                    }
                });
            },
            next:     ( ) =>
            {
                Mousetrap.bind ( "%HOT_KEYS%", function ( event )
                {
                    if ( deviantIO.getPageType ( ).type == 'art' )
                    {
                        deviantIO.clearNotification ( 'favourite' );

                        deviantIO.clearNotification ( 'watch'     );


                        let _next_button = document.querySelectorAll ( "[data-hook='arrowR']" ) [ 0 ].children [ 0 ];

                            _next_button.click ( );
                    }
                });
            },
            home:     ( ) =>
            {
                Mousetrap.bind ( "%HOT_KEYS%", function ( event )
                {
                    event.preventDefault ( );

                    if ( deviantIO.getPageType ( ).type == 'art' )
                    {
                        let _previous = [ 'Home', 'Back', 'Profile', 'Search' ];

                        let _element  = null


                        for ( let _main of _previous )

                            try
                            {
                              _element = document.evaluate (
                                            `//span[text()='${_main}']`,
                                            document,
                                            null,
                                            XPathResult.FIRST_ORDERED_NODE_TYPE,
                                            null
                                        ).singleNodeValue.parentElement;
                            }
                            catch ( e ) { }


                        if ( _element != null )

                            _element.click ( );
                    }
                });
            },
            favourite: ( ) =>
            {
                Mousetrap.bind ( "%HOT_KEYS%", function ( event )
                {
                    event.preventDefault ( );


                    if ( deviantIO.getPageType ( ).type == 'art' )
                    {
                        deviantIO.clearNotification ( 'favourite' );


                        let _fave_button = document.querySelectorAll ( "[data-hook='fave_button']" ) [ 0 ];

                            _fave_button.click ( );


                        if ( deviantIO.config.feature_flags.favourite_to_next )

                            Mousetrap.trigger ( "%NEXT%" );
                    }
                });
            },
            watch:    ( ) =>
            {
                Mousetrap.bind ( "%HOT_KEYS%", function ( event )
                {
                    event.preventDefault ( );


                    if ( deviantIO.getPageType ( ).type == 'art' )
                    {
                        deviantIO.clearNotification ( 'watch' );


                        let _watch_button = document.querySelectorAll ( "[data-hook='user_watch_button']" ) [ 0 ];

                            _watch_button.click ( );
                    }
                });
            },
            expand:   ( ) =>
            {
                Mousetrap.bind ( "%HOT_KEYS%", function ( event )
                {
                    if ( deviantIO.getPageType ( ).type == 'art' )

                        deviantIO.setExpand ( );
                });
            },
            user: ( ) =>
            {
                Mousetrap.bind ( "%HOT_KEYS%", function ( event )
                {
                    event.preventDefault ( );


                    if ( deviantIO.getPageType ( ).type == 'art' )
                    {
                        let _deviant_meta = document.querySelectorAll ( "[data-hook='deviation_meta']" ) [ 0 ];

                        let _href         = _deviant_meta.querySelectorAll ( "[data-hook='user_link']" ) [ 0 ].href;


                        window.open ( `${_href}/gallery`, "_blank" );
                    }
                });
            },
            redirect: ( ) =>
            {
                Mousetrap.bind ( "%HOT_KEYS%", function ( event )
                {
                    event.preventDefault ( );


                    entry = Math.floor ( Math.random ( ) * deviantIO.config.redirect_urls.length );


                    window.open ( deviantIO.config.redirect_urls [ entry ], "_blank" );
                });
            }
        }

    ////////////////////////////////////////////////////////////////////////////
    ////    SETTERS    /////////////////////////////////////////////////////////

        ////    NOTIFICATION    ////////////////////////////

            /**
             * Sets a notification animation
             * @private
             * @name _setNotificationAnimation
             * @function
             * @param           {Object} styles                         CSS styles object
             */
            function _setNotificationAnimation ( styles )
            {
                let _script = document.createElement ( 'style' );

                    _script.type      = 'text/css';

                    _script.innerHTML = styles.animation;


                document.getElementsByTagName ( 'head' ) [ 0 ].appendChild ( _script );
            }

            /**
             * Sets a button for a notification type
             * @private
             * @name _setNotificationButton
             * @function
             * @param           {string} type                           Type of notification
             * @param           {Object} styles                         CSS styles object
             */
            function _setNotificationButton ( type, styles )
            {
                let _button = document.createElement ( 'span' );

                    _button.id            = `${type}_button`;

                    _button.innerHTML     = ( type == 'favourite' ) ? _ui_elements.icons.favourite : _ui_elements.icons.watch;

                    _button.style.cssText = _jsonToCss ( styles.css );


                document.querySelectorAll ( _config.internal_data.ui_data_hooks.stage ) [ 0 ].appendChild ( _button )
            }

            /**
             * Sets both Button and Animation elements for a notification type
             * @private
             * @name _setNotificationHTMLElement
             * @function
             * @param           {string} type                           Type of notification
             * @param           {Object} styles                         CSS styles object
             */
            function _setNotificationHTMLElement ( type, styles )
            {
                _setNotificationAnimation ( styles );

                _setNotificationButton    ( type, styles );
            }

            /**
             * Sets a notification type
             * @private
             * @name _setNotification
             * @function
             * @param           {string} type                           Type of notification
             */
            function _setNotification ( type )
            {
                let _button      = document.getElementById ( `${type}_button` );

                let _styles      = _ui_elements.notifications [ type ];

                let _flaggedType = 'flagged' + _toTitleCase ( type ) + 'Status';


                if ( type === 'favourite' && _config.feature_flags.show_notification_favourite_stage )
                {
                    let _artStage = document.querySelectorAll ( _config.internal_data.ui_data_hooks.stage ) [ 0 ];

                        _artStage.style.backgroundColor = _config.internal_data.accent_colour;
                }


                if ( _button == null )

                    if ( _config.feature_flags [ `show_notification_${type}` ] )

                        _setNotificationHTMLElement ( type, _styles );


                localStorage.setItem ( _flaggedType, 'yes' );
            }

        ////    LISTENERS    ///////////////////////////////

            /**
             * Sets Mousetrap & DeviantIO listeners to the DOM's window element
             * @private
             * @name _setWindowListener
             * @function
             */
            function _setWindowListener ( )
            {
                let _window = window;

                    _window.addEventListener ( 'load', ( ) =>
                    {
                        let _elementType = 'text/javascript';

                        ////    MOUSE TRAP    //////////////////////////////////////

                        let _mousetrap      = document.createElement ( 'script' );

                            _mousetrap.type = _elementType;

                            _mousetrap.text = _setKeyboardTaskHotKeys ( );


                            _mousetrap.onload  = ( ) => console.info ( '>> Mousetrap script has loaded !'  );

                            _mousetrap.onerror = ( ) => console.warn ( '>> Mousetrap script has errored !' );


                            document.body.appendChild ( _mousetrap );

                        ////    USER DEFINED    ////////////////////////////////////

                        let _deviantIO         = document.createElement ( 'script' );

                            _deviantIO.type    = _elementType;

                            _deviantIO.text    = setInterval ( _main, _config.internal_data.time_interval );


                            _deviantIO.onload  = ( ) => console.info ( '>> DeviantIO script has loaded !'  );

                            _deviantIO.onerror = ( ) => console.warn ( '>> DeviantIO script has errored !' );


                            document.body.appendChild ( _deviantIO );
                    } );
            }

            /**
             * Sets listener for favourite button within portrait mode
             * @private
             * @name _setFavouriteButtonListener
             * @function
             */
            function _setFavouriteButtonListener ( )
            {
                let _uiFavouriteButtons = document.querySelectorAll ( _config.internal_data.ui_data_hooks.favourite );


                    for ( let _uiFavouriteButton of _uiFavouriteButtons )

                        _uiFavouriteButton.addEventListener ( 'click', ( ) =>
                        {
                            deviantIO.checkNotification ( 'favourite' );
                        } );
            }

            /**
             * Sets listener for watch button within portrait mode
             * @private
             * @name _setWatchButtonListener
             * @function
             */
            function _setWatchButtonListener ( )
            {
                let _uiWatchButtons = document.querySelectorAll ( _config.internal_data.ui_data_hooks.watch );


                for ( let _uiWatchButton of _uiWatchButtons )

                    _uiWatchButton.addEventListener ( 'click', ( ) =>
                    {
                        deviantIO.checkNotification ( 'watch' );
                    } );
            }

            /**
             * Sets all event listeners
             * @private
             * @name _setEventListeners
             * @function
             */
            function _setEventListeners ( )
            {
                _setWindowListener          ( );

                _setFavouriteButtonListener ( );

                _setWatchButtonListener     ( );
            }

        ////    GENERAL    /////////////////////////////////

            /**
             * Append MouseTrap CDN to present DOM
             * @private
             * @name _setMouseTrap
             * @function
             */
            function _setMouseTrap ( )
            {
                let _mousetrap = document.createElement ( 'script' );

                    _mousetrap.setAttribute ( 'src', _config.internal_data.mousetrap_cdn );


                document.head.appendChild ( _mousetrap );
            }

            /**
             * Sets the present URL under _config.url_reference
             * @private
             * @name _setUrlReference
             * @function
             */
            function _setUrlReference ( )
            {
                let _url       = window.location.href

                let _reference = _config.internal_data.url_reference;


                if ( _url != _reference )
                {
                    _reference = _url;

                    localStorage.clear ( );
                }
            }

            /**
             * Sets portrait thumb icon
             * @private
             * @name _setPortraitThumbIcon
             * @function
             * @param           {Object} portraitThumb                  Portrait thumb element
             */
            function _setPortraitThumbIcon ( portraitThumb )
            {
                let _portraitContainer = portraitThumb.children [ 0 ].children [ 0 ];

                let _styles            = _ui_elements.status.favourite;

                let _div               = document.createElement ( 'div' );

                    _div.className     = 'io_favourite';

                    _div.innerHTML     = _ui_elements.icons.favourite;

                    _div.style.cssText = _jsonToCss ( _styles.css );


                if ( _portraitContainer.children.length == 1 )

                    _portraitContainer.appendChild ( _div );
            }

            /**
             * Sets general UI styles
             * @private
             * @name _setGeneralStyles
             * @function
             */
            function _setGeneralStyles ( )
            {
                let _styles = document.createElement ( 'style' );

                    _styles.innerText = '.io_favourite' +
                                        '{' +
                                            'animation: bounce 1s ease-out infinite;' +
                                        '}' +
                                        ' ' +
                                        '@keyframes bounce' +
                                        '{' +
                                            '0%   { transform: scale(0.75); }' +
                                            '100% { transform: scale(1);    }' +
                                        '}'

                document.head.appendChild ( _styles );
            }

            /**
             * Sets portrait thumb styles
             * @private
             * @name _setPortraitThumbStyles
             * @function
             * @param           {Object} portraitThumb                  Portrait thumb element
             */
            function _setPortraitThumbStyles ( portraitThumb )
            {
                let _path  = _getPortraitThumbPath ( portraitThumb );

                let _rules = _config.internal_data.picture_rules;


                if ( /fill-rule=\"evenodd\"/.test ( _path ) )
                {
                    for ( let _rule in _rules.off )

                        portraitThumb.style [ _rule ] = _rules.off [ _rule ];
                }
                else
                {
                    _setPortraitThumbIcon ( portraitThumb );


                    for ( let _rule in _rules.on  )
                    {
                        let _css = _rules.on [ _rule ];

                            _css = _setTemplateVariable ( _css, '%ACCENT_COLOUR%' );


                        portraitThumb.style [ _rule ] = _css;
                    }
                }
            }

            /**
             * Sets HotKey(s) with each keyboard task, and returns Moustrap bindings for DOM injection; @see _config.input_keys & _keyboard_tasks
             * @private
             * @name _setKeyboardTaskHotKeys
             * @function
             * @return          {string}                                Moustrap bindings for DOM injection
             */
            function _setKeyboardTaskHotKeys ( )
            {
                let _result = '';

                let _index  = 0;

                ////    FUNCTIONS    ///////////////////////////

                    /**
                     * Binds keyboard input(s) to a keyboard task; @see _config.input_hotkeys, _keyboard_tasks
                     * @private
                     * @name _bindKeyboardInputs
                     * @function
                     * @param           {string} task                           Task type
                     * @param           {string} func                           Task function
                     * @return          {string}                                Key bound task function
                     */
                    function _bindKeyboardInputs ( task, func )
                    {
                        let _keys   = _config.input_hotkeys [ task ];

                        let _inputs = _getKeyboardInputs ( _keys );


                        func = ( task === 'favourite' )

                                   ? func.replace ( /\([^\{]+{/, '' )
                                         .replace ( /"%HOT_KEYS%"/, _inputs )
                                         .replace ( /"%NEXT%"/, `'${_config.input_hotkeys.next [ 0 ]}'` )

                                   : func.replace ( /\([^\{]+{/, '' )
                                         .replace ( /"%HOT_KEYS%"/, _inputs );


                        ( _index ) ? func = func.slice ( 9 ) : _index++;


                        return func.substring ( 0, func.length - 1 );
                    }

                ////    LOGIC    ///////////////////////////////

                    for ( let _task in _keyboard_tasks )
                    {
                        let _function = _keyboard_tasks [ _task ].toString ( );

                            _function = _bindKeyboardInputs ( _task, _function );


                            _result += _function;
                    }


                    return _result;
            }

            /**
             * Sets whether portrait mode is expanded or not
             * @private
             * @name _setExpand
             * @function
             */
            function _setExpand ( )
            {
                let _artStage   = document.querySelectorAll ( deviantIO.config.internal_data.ui_data_hooks.stage ) [ 0 ];

                let _mainWindow = _artStage.parentElement;

                    _mainWindow.style.width = ( _mainWindow.style.width == '' ) ? '100%' : '';


                let _elements =
                {
                    header:         { display: 'flex' , element: document.getElementsByTagName ( 'header' ) [ 0 ]                                                                                     },

                    contributing:   { display: 'block', element: _mainWindow.nextElementSibling                                                                                                       },

                    support:        { display: 'block', element: _artStage.nextElementSibling                                                                                                         },

                    action:         { display: 'flex' , element: document.querySelectorAll ( deviantIO.config.internal_data.ui_data_hooks.action ) [ 0 ]                                              },

                    meta:           { display: 'flex' , element: document.querySelectorAll ( deviantIO.config.internal_data.ui_data_hooks.meta ) [ 0 ].parentElement.parentElement                    },

                    comments:       { display: 'flex' , element: document.querySelectorAll ( deviantIO.config.internal_data.ui_data_hooks.meta ) [ 0 ].parentElement.parentElement.nextElementSibling },

                    footer:         { display: 'flex' , element: document.getElementsByTagName ( 'footer' ) [ 0 ]                                                                                     }
                }


                for ( let _element in _elements )
                {
                    let _Element      = _elements [ _element ];

                    let _ElementStyle = window.getComputedStyle ( _Element.element );


                    _Element.element.style.display = ( _ElementStyle.display == _Element.display ) ? 'none' : _Element.display;
                }
            }

            /**
             * Sets a template variable located within the passed string
             * @private
             * @name  _setTemplateVariable
             * @param           {string} css                            CSS declarations
             * @param           {string} variable                       Template variable to re-assign
             */
            function _setTemplateVariable ( css, variable )
            {
                return ( typeof ( css ) == 'string' && css.includes ( variable ) )

                           ? css.replace ( variable, _config.internal_data [ variable.toLowerCase ( ).replace ( /%/g, '' ) ] )

                           : css;
            }

    ////////////////////////////////////////////////////////////////////////////
    ////    GETTERS    /////////////////////////////////////////////////////////

        /**
         * Returns the present page type
         * @private
         * @name _getPageType
         * @function
         * @return          {Object}                                Page type
         */
        function _getPageType ( )
        {
            let _url     = window.location.href;

            let _regexes = _regexp_urls;

            let _regex   = undefined;


            for ( let _category in _regexes )

                for ( let _type in _regexes [ _category ] )
                {
                    _regex = new RegExp ( _regexes [ _category ] [ _type ] );


                    if ( _regex.test ( _url ) )

                        return { category: _category, type: _type };
                }
        }

        /**
         * Returns the notification of a particular notification type
         * @private
         * @name _getStatus
         * @function
         * @param           {string} type                           Notification type
         * @return          {boolean}                               True | False
         */
        function _getStatus ( type )
        {
            let _element = document.querySelectorAll ( _config.internal_data.ui_data_hooks [ type ] ) [ 0 ]


            switch ( type )
            {
                case 'watch':

                    return ( _element != undefined && _element.innerText === 'Watch' );

                case 'favourite':

                    return ( _element.innerText === 'In Favourites' );
            }
        }

        /**
         * Returns a NodeList of all portrait thumbnails
         * @private
         * @name _getPortraitThumbs
         * @function
         * @return          {Object}                                NodeList of portrait thumbnails
         */
        function _getPortraitThumbs ( )
        {
            let _result = document.querySelectorAll ( _config.internal_data.ui_data_hooks.thumbs );


            return ( _result.length > 0 )

                       ? _result

                       : console.warn ( 'Portrait thumbs could not be cached !' );
        }

        /**
         * Returns the favourited star <path> of a single portrait thumbnail
         * @private
         * @name _getPortraitThumbPath
         * @function
         * @param           {Object} portraitThumb                  Single portrait thumbnail
         * @return          {HTMLElement}                           SVG favourite path element
         */
        function _getPortraitThumbPath ( portraitThumb )
        {
            let _thumbPath = undefined;


            try
            {
                _thumbPath = portraitThumb.children [ 1 ].children [ 2 ].children [ 2 ].children [ 1 ].children [ 1 ].children [ 0 ].children [ 0 ].children [ 0 ].outerHTML;
            }
            catch ( e ) { }


            return ( _thumbPath != undefined ) ? _thumbPath : console.warn ( 'Could not get portrait thumb\'s path !' );
        }

        /**
         * Returns formatted keyboard input(s) for Mousetrap key binding
         * @private
         * @name _getKeyboardInputs
         * @function
         * @param           {Array} keys                            Array of keyboard input(s) for one keyboard task; @see _keyboard_tasks
         * @return          {string}                                Formatted keyboard input(s) for a Mousetrap key binding
         */
        function _getKeyboardInputs ( keys )
        {
            let _result = '';


            if ( keys.length == 1 )

                _result = `'${keys [ 0 ]}'`;

            else

                for ( let _key in keys )

                    _result += `'${keys [ _key ]}',`


                _result = `[ ${_result.replace ( /,+$/, '' )} ]`;


            return _result;
        }

    ////////////////////////////////////////////////////////////////////////////
    ////    GENERAL FUNCTIONS    ///////////////////////////////////////////////

        /**
         * Converts JSON to CSS
         * @private
         * @name _jsonToCss
         * @function
         * @param           {Object} json                           JSON object with CSS styles
         * @return          {string}                                CSS readable styles
         */
        function _jsonToCss ( json )
        {
            let _result = '';


            for ( let [ _key, _value ] of Object.entries ( json ) )
            {
                _value   = ( typeof _value === 'number' && _key != 'z-index') ? `${_value}px` : _value;


                _result += `${_key}: ${_value}; `
            }


            return _result;
        }

        /**
         * Converts a string to title-case
         * @private
         * @name _toTitleCase
         * @function
         * @param           {string} string                         String to convert
         * @return          {string}                                Title-case string
         */
        function _toTitleCase ( string )
        {
            return string.charAt ( 0 ).toUpperCase ( ) + string.slice ( 1 );
        }

        /**
         * Clears a notification type
         * @private
         * @name _clearNotification
         * @function
         * @param           {string} type                           Notification type
         */
        function _clearNotification ( type )
        {
            let _button = document.getElementById ( `${type}_button` );


            if ( type === 'favourite' )

                document.querySelectorAll ( _config.internal_data.ui_data_hooks.stage ) [ 0 ].style.backgroundColor = '';


            if ( _button != null )

                _button.remove ( );
        }

        /**
         * Checks whether a feature flag is set; @see _config.feature_flags
         * @private
         * @name _checkNotificationFeatureFlags
         * @function
         * @param           {string} type                           Notification type
         */
        function _checkNotificationFeatureFlags ( type )
        {
            if ( _config.feature_flags [ `skip_${type}` ] && _getStatus ( type ) )
            {
                [ 'favourite', 'watch' ].forEach ( ( value ) => _clearNotification ( value ) );

                Mousetrap.trigger ( `${_config.input_hotkeys.next [ 0 ]}` );
            }
        }

        /**
         * Checks that notification of a particular notification type
         * @private
         * @name _checkNotification
         * @function
         * @param           {string} type                           Notification type
         */
        function _checkNotification ( type )
        {
            _checkNotificationFeatureFlags ( type );


            let _flaggedType = 'flagged' + _toTitleCase ( type ) + 'Status';

            let _flagged     = localStorage.getItem ( _flaggedType ) || '';


            if ( _flagged != 'yes' )

                ( _getStatus ( type ) )

                    ? _setNotification   ( type )

                    : _clearNotification ( type );
        }

    ////////////////////////////////////////////////////////////////////////////
    ////    MAIN    ////////////////////////////////////////////////////////////

        /**
         * Main function
         * @private
         * @name _main
         * @function
         */
        function _main ( )
        {
            _setUrlReference ( );


            switch ( _getPageType ( ).type )
            {
                case 'art':

                    _checkNotification ( 'favourite' );

                    _checkNotification ( 'watch'     );


                    break;

                case 'home':
                case 'search':
                case 'watch':
                case 'daily':
                case 'popular':
                case 'topic':
                case 'tag':
                case 'favourites':
                case 'gallery':

                    if ( _config.feature_flags.show_status_favourite )
                    {
                        let _thumbs = _getPortraitThumbs ( );


                        for ( let i = 0; i < _thumbs.length; i++ )

                            _setPortraitThumbStyles ( _thumbs [ i ] );
                    }

                    break;

                case 'tier':

                    if ( _config.feature_flags.skip_tier )
                    {
                        let _key = _config.input_hotkeys.next [ 0 ];

                        Mousetrap.trigger ( `${_key}` );
                    }

                    break;

                default:

                    console.warn ( `Nothing to do for present url: ${_config.internal_data.url_reference}.` );
            }
        }

    ////////////////////////////////////////////////////////////////////////////
    ////    LIBRARY WRAPPER    /////////////////////////////////////////////////

        /**
         * Returns library object
         * @private
         * @name _library
         * @function
         * @return          {Object}                            Library object
         */
        function _library ( )
        {
            let _lib =
            {
                /**
                 * Main configuration settings
                 * @private
                 * @constant        {Object} config                         Main configurations object
                 * @param           {Object} config.input_hotkeys           Hotkey(s) associated with each keyboard task; @see _keyboard_tasks
                 * @param           {Object} config.feature_flags           Various flags for features
                 * @param           {Array}  config.redirect_urls           Redirect URLs
                 * @param           {Object} config.internal_data           General abstract data for program
                 */
                config: _config
            }

            ////    FUNCTIONS    ///////////////////////////

                /**
                 * Clears a notification type
                 * @public
                 * @name clearNotification
                 * @function
                 * @param       {string} type                       Notification type
                 */
                _lib.clearNotification  = ( type ) => _clearNotification ( type );

                /**
                 * Checks that notification of a particular notification type
                 * @public
                 * @name checkNotification
                 * @function
                 * @param       {string} type                       Notification type
                 */
                _lib.checkNotification  = ( type ) => _checkNotification ( type );

                /**
                 * Sets whether portrait mode is expanded or not
                 * @public
                 * @name setExpand
                 * @function
                 */
                _lib.setExpand          = ( )      => _setExpand   ( );

                /**
                 * Returns the present page type
                 * @public
                 * @name getPageType
                 * @function
                 * @return      {Object}                            Page type
                 */
                _lib.getPageType        = ( )      => _getPageType ( );


            return _lib;
        }

    ////////////////////////////////////////////////////////////////////////////
    ////    INITIALIZATION    //////////////////////////////////////////////////

        /**
         * Initiates deviantIO
         * @private
         * @name _init
         * @function
         */
        function _init ( )
        {
            window.deviantIO = _library ( );


            _setMouseTrap      ( );

            _setEventListeners ( );

            _setGeneralStyles  ( );
        }


        if ( typeof ( window.deviantIO ) === 'undefined' )

            _init ( );

} ) ( window );
