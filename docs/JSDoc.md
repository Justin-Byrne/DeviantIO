<a name="module_deviantIO"></a>

## deviantIO
Call main module


| Param | Type | Description |
| --- | --- | --- |
| window | <code>Object</code> | Window containing a DOM document |


* [deviantIO](#module_deviantIO)
    * [~config](#module_deviantIO..config) : <code>Object</code>
    * [~clearStatus(type)](#module_deviantIO..clearStatus)
    * [~checkStatus(type)](#module_deviantIO..checkStatus)

<a name="module_deviantIO..config"></a>

### deviantIO~config : <code>Object</code>
Main configuration settings

**Kind**: inner constant of [<code>deviantIO</code>](#module_deviantIO)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| config.accent_colour | <code>string</code> | Favourited accent colour |
| config.mousetrap_cdn | <code>string</code> | Mousetrap CDN address |
| config.favorite_next | <code>boolean</code> | Go to next portrait after favoriting |
| config.time_interval | <code>number</code> | How often to update this script |
| config.url_reference | <code>string</code> | Present Deviant Art URL |
| config.deviantarturl | <code>string</code> | Base Deviant Art URL |
| config.input_hotkeys | <code>string</code> | Hotkey(s) associated with each keyboard task; @see _keyboard_tasks |

<a name="module_deviantIO..clearStatus"></a>

### deviantIO~clearStatus(type)
Clears a status type

**Kind**: inner method of [<code>deviantIO</code>](#module_deviantIO)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Status type |

<a name="module_deviantIO..checkStatus"></a>

### deviantIO~checkStatus(type)
Checks that status of a particular status type

**Kind**: inner method of [<code>deviantIO</code>](#module_deviantIO)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Status type |

