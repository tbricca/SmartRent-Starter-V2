type WebKeyboardEventListener = (e: KeyboardEvent) => void;

declare module "react-native" {
  interface WebFocusable {
    /**
     * @platform web
     */
    focusable?: boolean;
  }

  interface HrefAttrs {
    /**
     * @platform web
     */
    download?: string;
    /**
     * @platform web
     */
    rel?: string;
    /**
     * @platform web
     */
    target?: string;
  }
  interface WebLink {
    /**
     * @platform web
     */
    href?: string;
    /**
     * @platform web
     */
    hrefAttrs?: HrefAttrs;
  }

  interface WebClickProps {
    /**
     * @platform web
     */
    onClick?: (e: MouseEvent) => void;
    /**
     * @platform web
     */
    onClickCapture?: (e: MouseEvent) => void;
    /**
     * @platform web
     */
    onContextMenu?: (e: MouseEvent) => void;
  }

  interface PressableStateCallbackType {
    /**
     * @platform web
     */
    focused: boolean;
    /**
     * @platform web
     */
    hovered: boolean;
  }

  interface WebHoverProps {
    /**
     * @platform web
     */
    onHoverIn?: (e: MouseEvent) => void;
    /**
     * @platform web
     */
    onHoverOut?: (e: MouseEvent) => void;
  }

  interface WebFocusProps {
    /**
     * @platform web
     */
    onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
    /**
     * @platform web
     */
    onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  }

  interface WebKeyboardProps {
    /**
     * @platform web
     */
    onKeyDown?: WebKeyboardEventListener;
    /**
     * @platform web
     */
    onKeyDownCapture?: WebKeyboardEventListener;
    /**
     * @platform web
     */
    onKeyUp?: WebKeyboardEventListener;
    /**
     * @platform web
     */
    onKeyUpCapture?: WebKeyboardEventListener;
  }

  /**
   * @platform web
   */
  type WebAccessibilityRole =
    | "adjustable"
    | "alert"
    | "alertdialog"
    | "banner"
    | "button"
    | "checkbox"
    | "columnheader"
    | "combobox"
    | "command"
    | "complementary"
    | "composite"
    | "definition"
    | "dialog"
    | "directory"
    | "feed"
    | "gridcell"
    | "group"
    | "header"
    | "image"
    | "imagebutton"
    | "input"
    | "keyboardkey"
    | "label"
    | "landmark"
    | "link"
    | "list"
    | "listbox"
    | "listitem"
    | "log"
    | "marquee"
    | "math"
    | "menu"
    | "menubar"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "none"
    | "note"
    | "option"
    | "presentation"
    | "progressbar"
    | "radio"
    | "radiogroup"
    | "range"
    | "region"
    | "roletype"
    | "rowheader"
    | "scrollbar"
    | "search"
    | "searchbox"
    | "section"
    | "sectionhead"
    | "select"
    | "separator"
    | "slider"
    | "spinbutton"
    | "status"
    | "structure"
    | "summary"
    | "switch"
    | "tab"
    | "tabbar"
    | "tablist"
    | "tabpanel"
    | "term"
    | "text"
    | "timer"
    | "togglebutton"
    | "toolbar"
    | "tooltip"
    | "tree"
    | "treegrid"
    | "treeitem"
    | "widget"
    | "window";

  interface WebAccessibilityProps {
    /**
     * @platform web
     */
    accessibilityHasPopup?: boolean;
  }

  interface ViewProps
    extends WebClickProps,
      WebFocusProps,
      WebKeyboardProps,
      WebFocusable,
      WebAccessibilityProps,
      WebLink {
    /**
     * this contains a merge of both the react-native accessibilityRole's as well as all valid web aria-role's
     *
     * @platform web
     */
    accessibilityRole?: WebAccessibilityRole;
  }

  interface TextProps
    extends WebClickProps,
      WebFocusProps,
      WebKeyboardProps,
      WebFocusable,
      WebAccessibilityProps,
      WebLink {
    /**
     * this contains a merge of both the react-native accessibilityRole's as well as all valid web aria-role's
     *
     * @platform web
     */
    accessibilityRole?: WebAccessibilityRole;
  }

  interface ImagePropsBase extends WebAccessibilityProps {
    /**
     * this contains a merge of both the react-native accessibilityRole's as well as all valid web aria-role's
     *
     * @platform web
     */
    accessibilityRole?: WebAccessibilityRole;
  }

  interface TouchableWithoutFeedbackProps extends WebAccessibilityProps {
    /**
     * this contains a merge of both the react-native accessibilityRole's as well as all valid web aria-role's
     *
     * @platform web
     */
    accessibilityRole?: WebAccessibilityRole;
  }
}

export * from "react-native";
