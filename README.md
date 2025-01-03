# IYCS (&nbsp; *(Improved)* Youtube Comment Search &nbsp;)
Improved Version Of "YCS - Youtube Comment Search" Extension.
<br>
For instructions on how to use the `youtubei/v1` API go to [CORE.md](https://github.com/StellarSt0rm/IYCS/blob/main/CORE.md)

This project has been abandoned due to various reasons, mainly because I have been exploring Rust and realized how much I hate JS. In the future I could try to remake it in Rust, but for now I'll archive this repo.

## Enhancements in IYCS

### Filters:
- **Refined Search**: Filters are categorized into three sections: "Filters", "Sort Method", and "Other".
  - **Filters**: All filters can be paired with each other, enabling simultaneous filtering. For instance, you can filter by "Hearted" and "Links" to view hearted items with links.
  - **Sort Method**: Sorting options are independent, except for "Sort Direction" which dictates the direction of the sorting.
  - **Other**: Includes "All" to display all items, and "Clear" to reset selected filters and search (configurable in options).

### Options:
- **Expanded Settings**: The options menu currently offers 6 settings across 2 sections:
  - **Autoload**:
    - **Comments**: Enables automatic loading of comments. You can set a limit for how many comments can be loaded (Defaults to no limit). (Default: off)
    - **Chat Replay**: (Not yet implemented) Enables automatic loading of chat replay / live chat. (Default: off)
    - **Transcript**: Enables automatic loading of the transcript. (Default: off)
    - **Limit Style**: Change how limiting works:
      - "Stop Loading If Limit Reached": Ceases loading once the limit is reached. (Default)
      - "Don't Load If Count Above Limit": Prevents loading if the comment count exceeds the limit.
  - **Other**:
    - **Clear Button Action**: Define the action for the Clear button:
      - "Clear Filters And Search": Resets both filters and search queries. (Default)
      - "Clear Search": Clears only the search query.
      - "Clear Filters": Clears selected filters.
    - **Start Status**: Choose the initial UI state:
      - "Maximized": The UI starts in a maximized state. (Default)
      - "Minimized": The UI starts in a minimized state.

### And Most Importantly: Open Source