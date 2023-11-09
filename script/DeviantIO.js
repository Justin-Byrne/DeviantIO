// @program:        DeviantIO
// @brief:          Additional functionality for Deviant Art
// @author:         Justin D. Byrne
// @email:          justin@byrne-systems.com
// @version:        0.0.1
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
         * @global
         * @constant        {Object}  _config                       Main configurations object
         * @param           {string}  _config.accent_colour         Favourited accent colour
         * @param           {string}  _config.mousetrap_cdn         Mousetrap CDN address
         * @param           {boolean} _config.favorite_next         Go to next portrait after favoriting
         * @param           {number}  _config.time_interval         How often to update this script
         * @param           {string}  _config.url_reference         Present Deviant Art URL
         * @param           {string}  _config.deviantarturl         Base Deviant Art URL
         * @param           {string}  _config.input_hotkeys         Hotkey(s) associated with each keyboard task; @see _keyboard_tasks
         * @param           {Object}  _config.shared_styles         Shared CSS styles for appendable UI elements
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
                profile:  [ "up"             ],
                redirect: [ "down"           ],
                user:     [ "/"              ]
            },
            shared_styles:
            {
                'position':           'absolute',
                'z-index':            999,

                'font-size':          '4em',
                'transform-origin':   '50% 5em'
            }
        }

        /**
         * Data hooks for UI elements
         * @private
         * @global
         * @constant        {Object} _ui_data_hooks                 Data hooks
         * @param           {string} _ui_data_hooks.watch           Data hook for watch button
         * @param           {string} _ui_data_hooks.favourite       Data hook for favourite button
         * @param           {string} _ui_data_hooks.stage           Data hook for background art stage of Portraits
         * @param           {string} _ui_data_hooks.thumbs          Data hook for Portrait thumbnails
         */
        let _ui_data_hooks =
        {
            watch:     "[data-hook='user_watch_button']",
            favourite: "[data-hook='fave_button']",
            stage:     "[data-hook='art_stage']",
            thumbs:    "[data-hook='deviation_std_thumb']",
            user:      "[data-hook='user_link']"
        }

        /**
         * Redirect URLs
         * @private
         * @global
         * @constant        {Array} _redirect_urls                  Redirect URLs
         */
        let _redirect_urls =
        [
            "https://google.com",
            "https://gmail.com",
            "https://github.com",
            "https://trello.com"
        ]

        /**
         * Regular expressions for page identification
         * @private
         * @global
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
                home:       `${_config.deviantarturl}/\\B`,
                watch:      `${_config.deviantarturl}/watch/deviations`,
                daily:      `${_config.deviantarturl}/daily-deviations`,
                popular:    `${_config.deviantarturl}/popular/deviations`,
                topic:      `${_config.deviantarturl}/topic/\w+`,
                tag:        `${_config.deviantarturl}/tag/\w+`,
                art:        `${_config.deviantarturl}/[^/]+/art/.+`
            },
            user:
            {
                favourites: `${_config.deviantarturl}/(?!watch|daily|tag|popular)\w+/?favourites`,
                gallery:    `${_config.deviantarturl}/(?!watch|daily|tag|popular)\w+/?gallery`,
                home:       `${_config.deviantarturl}/(?!watch|daily|tag|popular)\w+`
            }
        }

        /**
         * Appendable HTML & CSS content
         * @private
         * @global
         * @constant        {Object} _html_elements                 Appendable HTML & CSS content
         * @param           {Object} _html_elements.notifications   Notification elements
         */
        let _html_elements =
        {
            notifications:
            {
                watch:
                {
                    css:
                    {
                        ..._config.shared_styles,

                        'animation':          'wiggle 2s linear infinite',

                        'left':               'calc(77% - 1em)',
                        'top':                'calc(183% - 0em)',
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
                        ..._config.shared_styles,

                        'animation':          'bounce 1s ease-out infinite',

                        'left':               'calc(3% - 0em)',
                        'top':                'calc(183% - 0em)',

                        'transform-origin':   '50% 5em'
                    },
                    animation: '@keyframes bounce' +
                               '{' +
                                     '0%   { transform: translateY(0);     }' +
                                     '50%  { transform: translateY(-10px); }' +
                                     '100% { transform: translateY(0);     }' +
                               '}'
                }
            }
        }

        /**
         * CSS rules for accented portrait elements
         * @private
         * @global
         * @constant        {Object} _portrait_rules                Rules for accented portrait elements
         * @param           {Object} _portrait_rules.off            Rules for non-favorited elements
         * @param           {Object} _portrait_rules.on             Rules for favorited elements
         */
        let _portrait_rules =
        {
            off:
            {
                border:       'none',
                boxShadow:    'none',
                opacity:      1
            },
            on:
            {
                border:       `2px solid ${_config.accent_colour}`,
                boxShadow:    `0px 0px 5px 2px ${_config.accent_colour}`,
                opacity:      0.5
            }
        }

        /**
         * Keyboard HotKey tasks
         * @private
         * @global
         * @constant        {Object} _keyboard_tasks                Keyboard tasks
         * @param           {Object} _keyboard_tasks.favorite       Favorite task
         * @param           {Object} _keyboard_tasks.watch          Watch artist task
         * @param           {Object} _keyboard_tasks.previous       Previous portrait task
         * @param           {Object} _keyboard_tasks.next           Next portrait task
         * @param           {Object} _keyboard_tasks.profile        Profile task
         * @param           {Object} _keyboard_tasks.redirect       Redirect task
         */
        let _keyboard_tasks =
        {
            favorite: ( ) =>
            {
                Mousetrap.bind ( '%KEYS%', function ( event )
                {
                    event.preventDefault ( );


                    deviantIO.clearStatus ( 'favourite' );


                    fave_button = document.querySelectorAll ( "[data-hook='fave_button']" ) [ 0 ];

                    fave_button.click ( );


                    if ( deviantIO.config.favorite_next )

                        Mousetrap.trigger ( '%NEXT%' );
                });
            },
            watch: ( ) =>
            {
                Mousetrap.bind ( '%KEYS%', function ( event )
                {
                    event.preventDefault ( );


                    deviantIO.clearStatus ( 'watch' );


                    watch_button = document.querySelectorAll ( "[data-hook='user_watch_button']" ) [ 0 ];

                    watch_button.click ( );
                });
            },
            previous: ( ) =>
            {
                Mousetrap.bind ( '%KEYS%', function ( event )
                {
                    deviantIO.clearStatus ( 'favourite' );

                    deviantIO.clearStatus ( 'watch'     );


                    prev_button = document.querySelectorAll ( "[data-hook='arrowL']" ) [ 0 ].children [ 0 ];

                    prev_button.click ( );
                });
            },
            next:     ( ) =>
            {
                Mousetrap.bind ( '%KEYS%', function ( event )
                {
                    deviantIO.clearStatus ( 'favourite' );

                    deviantIO.clearStatus ( 'watch'     );


                    next_button = document.querySelectorAll ( "[data-hook='arrowR']" ) [ 0 ].children [ 0 ];

                    next_button.click ( );
                });
            },
            profile:  ( ) =>
            {
                Mousetrap.bind ( '%KEYS%', function ( event )
                {
                    event.preventDefault ( );


                    let _previous = [ 'Profile', 'Back', 'Home' ];

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
                });
            },
            redirect: ( ) =>
            {
                Mousetrap.bind ( '%KEYS%', function ( event )
                {
                    event.preventDefault ( );


                    entry = Math.floor ( Math.random ( ) * deviantIO.config.redirect_urls.length );


                    window.open ( deviantIO.config.redirect_urls [ entry ], "_blank" );
                });
            },
            user: ( ) =>
            {
                Mousetrap.bind ( '%KEYS%', function ( event )
                {
                    event.preventDefault ( );

                    user_button = document.querySelectorAll ( "[data-hook='user_link']" ) [ 0 ].children [ 0 ];

                    user_button.click ( );
                });
            }
        }

    ////////////////////////////////////////////////////////////////////////////
    ////    SETTERS    /////////////////////////////////////////////////////////

        /**
         * Append MouseTrap CDN to present DOM
         * @private
         * @name _setMouseTrap
         * @function
         */
        function _setMouseTrap ( )
        {
            let mousetrap = document.createElement ( 'script' );

                mousetrap.setAttribute ( 'src', _config.mousetrap_cdn );

                document.head.appendChild ( mousetrap );
        }

        /**
         * Set's the present URL under _config.url_reference
         * @private
         * @name _setUrlReference
         * @function
         */
        function _setUrlReference ( )
        {
            let url = window.location.href


            if ( url != _config.url_reference )
            {
                _config.url_reference = url;

                localStorage.clear ( );
            }
        }

        /**
         * Sets a status animation
         * @private
         * @name _setStatusAnimation
         * @function
         * @param           {Object} styles                         CSS styles object
         */
        function _setStatusAnimation ( styles )
        {
            let _script = document.createElement ( 'style' );

                _script.type      = 'text/css';

                _script.innerHTML = styles.animation;


            document.getElementsByTagName ( 'head' ) [ 0 ].appendChild ( _script );
        }

        /**
         * Sets a button for a status type
         * @private
         * @name _setStatusButton
         * @function
         * @param           {string} type                           Type of status
         * @param           {Object} styles                         CSS styles object
         */
        function _setStatusButton ( type, styles )
        {
            let _button = document.createElement ( 'span' );

                _button.id            = `${type}_button`;

                _button.innerHTML     = ( type == 'favourite' ) ? '❤️' : '🔍';

                _button.style.cssText = _jsonToCss ( styles.css );


            document.getElementsByTagName ( 'header' ) [ 0 ].appendChild ( _button );
        }

        /**
         * Sets both Button and Animation elements for a status type
         * @private
         * @name _setStatusHTMLElement
         * @function
         * @param           {string} type                           Type of status
         * @param           {Object} styles                         CSS styles object
         */
        function _setStatusHTMLElement ( type, styles )
        {
            _setStatusAnimation ( styles );

            _setStatusButton    ( type, styles );
        }

        /**
         * Sets a status type
         * @private
         * @name _setStatus
         * @function
         * @param           {string} type                           Type of status
         */
        function _setStatus ( type )
        {
            let _button      = document.getElementById ( `${type}_button` );

            let _styles      = _html_elements.notifications [ type ];

            let _flaggedType = 'flagged' + _toTitleCase ( type ) + 'Status';

            let _artStage    = document.querySelectorAll ( _ui_data_hooks.stage ) [ 0 ];

                _artStage.style.backgroundColor = ( type == 'favourite' ) ? _config.accent_colour : '';


            if ( _button == null )

                _setStatusHTMLElement ( type, _styles );


            localStorage.setItem ( _flaggedType, 'yes' );
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
            let _path = _getPortraitThumbPath ( portraitThumb );


            if ( /fill-rule=\"evenodd\"/.test ( _path ) )

                for ( let _rule in _portrait_rules.off )

                    portraitThumb.style [ _rule ] = _portrait_rules.off [ _rule ];

            else

                for ( let _rule in _portrait_rules.on  )

                    portraitThumb.style [ _rule ] = _portrait_rules.on  [ _rule ];
        }

        /**
         * Sets HotKey(s) with each keyboard task; @see _config.input_keys & _keyboard_tasks
         * @private
         * @name _setKeyboardTaskHotKeys
         * @function
         * @param           {string}   taskType                     Task type
         * @param           {Function} taskFunction                 Task function
         */
        function _setKeyboardTaskHotKeys ( taskType, taskFunction )
        {
            let _keys     = _config.input_hotkeys [ taskType ];

            let _function = taskFunction.toString ( );

            let _input    = '';


            if ( _keys.length == 1 )

                _input = `'${_keys [ 0 ]}'`;

            else

                for ( let _key in _keys )

                    _input += `'${_keys [ _key ]}',`


                _input = `[ ${_input.replace ( /,+$/, '' )} ]`;


            _function = ( taskType == 'favorite' )

                            ? _function.replace ( /\([^\{]+{/, '' ).replace ( /'%KEYS%'/, _input ).replace ( /'%NEXT%'/, `'${_config.input_hotkeys.next [ 0 ]}'` )

                            : _function.replace ( /\([^\{]+{/, '' ).replace ( /'%KEYS%'/, _input );


            return _function.substring ( 0, _function.length - 1 );
        }

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


                        for ( let _task in _keyboard_tasks )

                            _mousetrap.text += _setKeyboardTaskHotKeys ( _task, _keyboard_tasks [ _task ] );


                        _mousetrap.onload  = ( ) => console.info ( '>> Mousetrap script has loaded !'  );

                        _mousetrap.onerror = ( ) => console.warn ( '>> Mousetrap script has errored !' );


                        document.body.appendChild ( _mousetrap );

                    ////    USER DEFINED    ////////////////////////////////////

                    let _deviantIO         = document.createElement ( 'script' );

                        _deviantIO.type    = _elementType;

                        _deviantIO.text    = setInterval ( _main, _config.time_interval );


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
            let _uiFavouriteButtons = document.querySelectorAll ( deviantIO.config.ui_data_hooks.favourite );


                for ( let _uiFavouriteButton of _uiFavouriteButtons )

                    _uiFavouriteButton.addEventListener ( 'click', ( ) =>
                    {
                        deviantIO.checkStatus ( 'favourite' );
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
            let _uiWatchButtons = document.querySelectorAll ( deviantIO.config.ui_data_hooks.watch );


                for ( let _uiWatchButton of _uiWatchButtons )

                    _uiWatchButton.addEventListener ( 'click', ( ) =>
                    {
                        deviantIO.checkStatus ( 'watch' );
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
         * Returns the status of a particular status type
         * @private
         * @name _getStatus
         * @function
         * @param           {string} type                           Status type
         * @return          {boolean}                               True | False
         */
        function _getStatus ( type )
        {
            let _element = document.querySelectorAll ( _ui_data_hooks [ type ] ) [ 0 ]


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
            let _result = document.querySelectorAll ( _ui_data_hooks.thumbs );


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
         * Clears a status type
         * @private
         * @name _clearStatus
         * @function
         * @param           {string} type                           Status type
         */
        function _clearStatus ( type )
        {
            let _button = document.getElementById ( `${type}_button` );


            if ( type == 'favourite' )

                document.querySelectorAll ( _ui_data_hooks.stage ) [ 0 ].style.backgroundColor = '';


            if ( _button != null )

                _button.remove ( );
        }

        /**
         * Checks that status of a particular status type
         * @private
         * @name _checkStatus
         * @function
         * @param           {string} type                           Status type
         */
        function _checkStatus ( type )
        {
            let _flaggedType = 'flagged' + _toTitleCase ( type ) + 'Status';

            let _flagged     = localStorage.getItem ( _flaggedType ) || '';


            if ( _flagged != 'yes' )

                ( _getStatus ( type ) )

                    ? _setStatus   ( type )

                    : _clearStatus ( type );
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

                    _checkStatus ( 'favourite' );

                    _checkStatus ( 'watch'     );


                    break;

                case 'home':
                case 'watch':
                case 'daily':
                case 'popular':
                case 'topic':
                case 'tag':
                case 'favourites':
                case 'gallery':

                    let _thumbs = _getPortraitThumbs ( );


                    for ( let i = 0; i < _thumbs.length; i++ )

                        _setPortraitThumbStyles ( _thumbs [ i ] );


                    break;

                default:

                    console.warn ( `Nothing to do for present url: ${_config.url_reference}.` );
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
                 * @name config
                 * @public
                 * @constant        {Object}  config                    Main configurations object
                 * @param           {string}  config.accent_colour      Favourited accent colour
                 * @param           {string}  config.mousetrap_cdn      Mousetrap CDN address
                 * @param           {boolean} config.favorite_next      Go to next portrait after favoriting
                 * @param           {number}  config.time_interval      How often to update this script
                 * @param           {string}  config.url_reference      Present Deviant Art URL
                 * @param           {string}  config.deviantarturl      Base Deviant Art URL
                 * @param           {string}  config.input_hotkeys      Hotkey(s) associated with each keyboard task; @see _keyboard_tasks
                 * @param           {Object}  config.shared_styles      Shared CSS styles for appendable UI elements
                 */
                config: _config
            }

            ////    GLOBAL VARIABLES    ////////////////////

                /**
                 * Redirect URLs
                 * @name redirect_urls
                 * @public
                 * @constant        {Object} config.redirect_urls       Redirect URLs
                 */
                _lib.config.redirect_urls = _redirect_urls;

                /**
                 * Data hooks for UI elements
                 * @name ui_data_hooks
                 * @public
                 * @constant        {Object} config.ui_data_hooks       Data hooks
                 */
                _lib.config.ui_data_hooks = _ui_data_hooks;

            ////    FUNCTIONS    ///////////////////////////

                /**
                 * Clears a status type
                 * @name clearStatus
                 * @public
                 * @function
                 * @param       {string} type                       Status type
                 */
                _lib.clearStatus          = ( type ) => _clearStatus ( type );

                /**
                 * Checks that status of a particular status type
                 * @name checkStatus
                 * @public
                 * @function
                 * @param       {string} type                       Status type
                 */
                _lib.checkStatus          = ( type ) => _checkStatus ( type );


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
        }


        if ( typeof ( window.deviantIO ) === 'undefined' )

            _init ( );

} ) ( window );
