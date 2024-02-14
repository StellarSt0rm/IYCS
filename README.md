# IYCS (&nbsp; *(Improved)* Youtube Comment Search &nbsp;)
Improved Version Of "YCS - Youtube Comment Search" Extension.

This extension improves:
- Filters:
  - Filters now have 3 sections "Filters", "Sort Method" and "Other"
    - "Filters", All of the filters are pairable with eachother, so you can do "Hearted" and "Links", which will show all that are Hearted and contain Links
    - "Sort Method", These are not pairable with eachother - Except "Sort Direction" -
    - "Other", Contains "All" which shows everything, "Clear" which clears selected filters and search (configurable in options)
- Options:
  - There are 6 settings and 2 sections currently:
      - Autoload:
          - "Comments", Lets you enable comments autloading - "Comment Limit", Lets you set a limit of comments which can be loaded
          - "Live Replay", Lets you enable live replay autoloading \[Live replay is not implemented, yet\]
          - "Transcript", Lets you enable transcript autoloading
          - "Limit Style", Lets you choose limiting style, there are two options:
              - "Stop Loading If Limit Reached", It will start loading, but then stop if the limit is surpassed
              - "Dont Load If Count Above Limit", It will not load if the comment count is higher than the limit
      - Other
          - "Clear Button Action", Lets you choose what the Clear button does:
              - "Clear Filters And Search", clears the filters and search
              - "Clear Search", clears only the search
              - "Clear Filters", clears only the filters
          - "Start Status", Lets you choose how IYCS UI will start
              - "Maximized", The UI will start maximized
              - "Minimized", The UI will start minimized
