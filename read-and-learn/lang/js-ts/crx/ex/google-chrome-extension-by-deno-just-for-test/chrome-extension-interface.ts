
export type Coordinate = {
    readonly chromeSettingsOverrides?: any;
    /**
     * Override pages are a way to substitute an HTML file from your extension for a page that
     * Google Chrome normally provides.
     */
    readonly chromeURLOverrides?: ChromeURLOverrides;
    /**
     * Use the commands API to add keyboard shortcuts that trigger actions in your extension,
     * for example, an action to open the browser action or send a command to the extension.
     */
    readonly commands?:    { [key: string]: { [key: string]: any } };
    readonly contentPack?: any;
    /**
     * Content scripts are JavaScript files that run in the context of web pages.
     */
    readonly contentScripts?: ContentScript[];
    readonly currentLocale?:  any;
    /**
     * Specifies the subdirectory of _locales that contains the default strings for this
     * extension.
     */
    readonly defaultLocale?: string;
    /**
     * A plain text description of the extension
     */
    readonly description?: string;
    /**
     * A DevTools extension adds functionality to the Chrome DevTools. It can add new UI panels
     * and sidebars, interact with the inspected page, get information about network requests,
     * and more.
     */
    readonly devtoolsPage?: string;
    /**
     * Declares which extensions, apps, and web pages can connect to your extension via
     * runtime.connect and runtime.sendMessage.
     */
    readonly externallyConnectable?: ExternallyConnectable;
    /**
     * You can use this API to enable users to upload files to your website.
     */
    readonly fileBrowserHandlers?: FileBrowserHandler[];
    /**
     * The URL of the homepage for this extension.
     */
    readonly homepageURL?: string;
    /**
     * One or more icons that represent the extension, app, or theme. Recommended format: PNG;
     * also BMP, GIF, ICO, JPEG.
     */
    readonly icons?:  Icons;
    readonly import?: any;
    /**
     * Specify how this extension will behave if allowed to run in incognito mode.
     */
    readonly incognito?: Incognito;
    /**
     * Allows your extension to handle keystrokes, set the composition, and manage the candidate
     * window.
     */
    readonly inputComponents?: InputComponent[];
    /**
     * This value can be used to control the unique ID of an extension, app, or theme when it is
     * loaded during development.
     */
    readonly key?: string;
    /**
     * One integer specifying the version of the manifest file format your package requires.
     */
    readonly manifestVersion: number;
    /**
     * The version of Chrome that your extension, app, or theme requires, if any.
     */
    readonly minimumChromeVersion?: string;
    /**
     * One or more mappings from MIME types to the Native Client module that handles each type.
     */
    readonly naclModules?: NaclModule[];
    /**
     * The name of the extension
     */
    readonly name: string;
    /**
     * Use the Chrome Identity API to authenticate users: the getAuthToken for users logged into
     * their Google Account and the launchWebAuthFlow for users logged into a non-Google account.
     */
    readonly oauth2?: Oauth2;
    /**
     * Whether the app or extension is expected to work offline. When Chrome detects that it is
     * offline, apps with this field set to true will be highlighted on the New Tab page.
     */
    readonly offlineEnabled?: boolean;
    /**
     * The omnibox API allows you to register a keyword with Google Chrome's address bar, which
     * is also known as the omnibox.
     */
    readonly omnibox?: Omnibox;
    /**
     * Use the chrome.permissions API to request declared optional permissions at run time
     * rather than install time, so users understand why the permissions are needed and grant
     * only those that are necessary.
     */
    readonly optionalPermissions?: string[];
    /**
     * To allow users to customize the behavior of your extension, you may wish to provide an
     * options page. If you do, a link to it will be provided from the extensions management
     * page at chrome://extensions. Clicking the Options link opens a new tab pointing at your
     * options page.
     */
    readonly optionsPage?: string;
    /**
     * To allow users to customize the behavior of your extension, you may wish to provide an
     * options page. If you do, an Options link will be shown on the extensions management page
     * at chrome://extensions which opens a dialogue containing your options page.
     */
    readonly optionsUI?: OptionsUI;
    /**
     * Permissions help to limit damage if your extension or app is compromised by malware. Some
     * permissions are also displayed to users before installation, as detailed in Permission
     * Warnings.
     */
    readonly permissions?: string[];
    readonly platforms?:   any;
    /**
     * Technologies required by the app or extension. Hosting sites such as the Chrome Web Store
     * may use this list to dissuade users from installing apps or extensions that will not work
     * on their computer.
     */
    readonly requirements?: Requirements;
    /**
     * Defines an collection of app or extension pages that are to be served in a sandboxed
     * unique origin, and optionally a Content Security Policy to use with them.
     */
    readonly sandbox?: Sandbox;
    /**
     * The short name is typically used where there is insufficient space to display the full
     * name.
     */
    readonly shortName?:       string;
    readonly signature?:       any;
    readonly spellcheck?:      any;
    readonly storage?:         any;
    readonly systemIndicator?: any;
    /**
     * Register itself as a speech engine.
     */
    readonly ttsEngine?: TTSEngine;
    /**
     * If you publish using the Chrome Developer Dashboard, ignore this field. If you host your
     * own extension or app: URL to an update manifest XML file.
     */
    readonly updateURL?: string;
    /**
     * One to four dot-separated integers identifying the version of this extension.
     */
    readonly version: string;
    /**
     * In addition to the version field, which is used for update purposes, version_name can be
     * set to a descriptive version string and will be used for display purposes if present.
     */
    readonly versionName?: string;
    [property: string]: any;
}

/**
 * Override pages are a way to substitute an HTML file from your extension for a page that
 * Google Chrome normally provides.
 */
export type ChromeURLOverrides = {
    /**
     * The page that appears when the user chooses the Bookmark Manager menu item from the
     * Chrome menu or, on Mac, the Bookmark Manager item from the Bookmarks menu. You can also
     * get to this page by entering the URL chrome://bookmarks.
     */
    readonly bookmarks?: string;
    /**
     * The page that appears when the user chooses the History menu item from the Chrome menu
     * or, on Mac, the Show Full History item from the History menu. You can also get to this
     * page by entering the URL chrome://history.
     */
    readonly history?: string;
    /**
     * The page that appears when the user creates a new tab or window. You can also get to this
     * page by entering the URL chrome://newtab.
     */
    readonly newtab?: string;
}

export type ContentScript = {
    /**
     * Controls whether the content script runs in all frames of the matching page, or only the
     * top frame.
     */
    readonly allFrames?: boolean;
    /**
     * The list of CSS files to be injected into matching pages. These are injected in the order
     * they appear in this array, before any DOM is constructed or displayed for the page.
     */
    readonly css?: string[];
    /**
     * Applied after matches to exclude URLs that match this glob. Intended to emulate the
     * @exclude Greasemonkey keyword.
     */
    readonly excludeGlobs?: string[];
    /**
     * Excludes pages that this content script would otherwise be injected into.
     */
    readonly excludeMatches?: string[];
    /**
     * Applied after matches to include only those URLs that also match this glob. Intended to
     * emulate the @include Greasemonkey keyword.
     */
    readonly includeGlobs?: string[];
    /**
     * The list of JavaScript files to be injected into matching pages. These are injected in
     * the order they appear in this array.
     */
    readonly js?: string[];
    /**
     * Whether to insert the content script on about:blank and about:srcdoc.
     */
    readonly matchAboutBlank?: boolean;
    /**
     * Specifies which pages this content script will be injected into.
     */
    readonly matches: string[];
    /**
     * Controls when the files in js are injected.
     */
    readonly runAt?: RunAt;
    /**
     * The JavaScript world for a script to execute within.
     */
    readonly world?: World;
}

/**
 * Controls when the files in js are injected.
 */
export type RunAt = "document_start" | "document_end" | "document_idle";

/**
 * The JavaScript world for a script to execute within.
 */
export type World = "ISOLATED" | "MAIN";

/**
 * Declares which extensions, apps, and web pages can connect to your extension via
 * runtime.connect and runtime.sendMessage.
 */
export type ExternallyConnectable = {
    /**
     * Indicates that the extension would like to make use of the TLS channel ID of the web page
     * connecting to it. The web page must also opt to send the TLS channel ID to the extension
     * via setting includeTlsChannelId to true in runtime.connect's connectInfo or
     * runtime.sendMessage's options.
     */
    readonly acceptsTLSChannelID?: boolean;
    readonly ids?:                 string[];
    readonly matches?:             string[];
}

export type FileBrowserHandler = {
    /**
     * What the button will display.
     */
    readonly defaultTitle: string;
    /**
     * Filetypes to match.
     */
    readonly fileFilters: string[];
    /**
     * Used by event handling code to differentiate between multiple file handlers
     */
    readonly id: string;
}

/**
 * One or more icons that represent the extension, app, or theme. Recommended format: PNG;
 * also BMP, GIF, ICO, JPEG.
 */
export type Icons = {
    /**
     * Used during installation and in the Chrome Web Store.
     */
    readonly the128?: string;
    /**
     * Used as the favicon for an extension's pages and infobar.
     */
    readonly the16?: string;
    /**
     * Used during installation and in the Chrome Web Store.
     */
    readonly the256?: string;
    /**
     * Used on the extension management page (chrome://extensions).
     */
    readonly the48?: string;
    [property: string]: any;
}

/**
 * Specify how this extension will behave if allowed to run in incognito mode.
 */
export type Incognito = "spanning" | "split" | "not_allowed";

export type InputComponent = {
    readonly description: string;
    readonly id:          string;
    readonly language:    string;
    readonly layouts:     any[];
    readonly name:        string;
    readonly type:        string;
}

export type NaclModule = {
    /**
     * The MIME type for which the Native Client module will be registered as content handler.
     */
    readonly mimeType: string;
    /**
     * The location of a Native Client manifest (a .nmf file) within the extension directory.
     */
    readonly path: string;
}

/**
 * Use the Chrome Identity API to authenticate users: the getAuthToken for users logged into
 * their Google Account and the launchWebAuthFlow for users logged into a non-Google account.
 */
export type Oauth2 = {
    /**
     * You need to register your app in the Google APIs Console to get the client ID.
     */
    readonly clientID: string;
    readonly scopes:   string[];
}

/**
 * The omnibox API allows you to register a keyword with Google Chrome's address bar, which
 * is also known as the omnibox.
 */
export type Omnibox = {
    /**
     * The keyword that will trigger your extension.
     */
    readonly keyword: string;
}

/**
 * To allow users to customize the behavior of your extension, you may wish to provide an
 * options page. If you do, an Options link will be shown on the extensions management page
 * at chrome://extensions which opens a dialogue containing your options page.
 */
export type OptionsUI = {
    /**
     * If true, a Chrome user agent stylesheet will be applied to your options page. The default
     * value is false, but we recommend you enable it for a consistent UI with Chrome.
     */
    readonly chromeStyle?: boolean;
    /**
     * If true, your extension's options page will be opened in a new tab rather than embedded
     * in chrome://extensions. The default is false, and we recommend that you don't change it.
     * This is only useful to delay the inevitable deprecation of the old options UI! It will be
     * removed soon, so try not to use it. It will break.
     */
    readonly openInTab?: boolean;
    /**
     * The path to your options page, relative to your extension's root.
     */
    readonly page: string;
    [property: string]: any;
}

/**
 * Technologies required by the app or extension. Hosting sites such as the Chrome Web Store
 * may use this list to dissuade users from installing apps or extensions that will not work
 * on their computer.
 */
export type Requirements = {
    /**
     * The '3D' requirement denotes GPU hardware acceleration.
     */
    readonly the3D?: The3D;
    /**
     * Indicates if an app or extension requires NPAPI to run. This requirement is enabled by
     * default when the manifest includes the 'plugins' field.
     */
    readonly plugins?: Plugins;
}

/**
 * Indicates if an app or extension requires NPAPI to run. This requirement is enabled by
 * default when the manifest includes the 'plugins' field.
 */
export type Plugins = {
    readonly npapi: boolean;
}

/**
 * The '3D' requirement denotes GPU hardware acceleration.
 */
export type The3D = {
    /**
     * List of the 3D-related features your app requires.
     */
    readonly features: "webgl"[];
}

/**
 * Defines an collection of app or extension pages that are to be served in a sandboxed
 * unique origin, and optionally a Content Security Policy to use with them.
 */
export type Sandbox = {
    readonly contentSecurityPolicy?: string;
    readonly pages:                  string[];
}

/**
 * Register itself as a speech engine.
 */
export type TTSEngine = {
    /**
     * Voices the extension can synthesize.
     */
    readonly voices: Voice[];
}

export type Voice = {
    /**
     * Events sent to update the client on the progress of speech synthesis.
     */
    readonly eventTypes: EventType[];
    /**
     * If your voice corresponds to a male or female voice, you can use this parameter to help
     * clients choose the most appropriate voice for their application.
     */
    readonly gender?: string;
    /**
     * Almost always, a voice can synthesize speech in just a single language. When an engine
     * supports more than one language, it can easily register a separate voice for each
     * language.
     */
    readonly lang?: string;
    /**
     * Identifies the name of the voice and the engine used.
     */
    readonly voiceName: string;
}

export type EventType = "start" | "word" | "sentence" | "marker" | "end" | "error";
