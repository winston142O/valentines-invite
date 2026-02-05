# How to use

## For actual couples

This one says I love you and stuff like that so it's definitely more for an actual couple.

1. Add the following environment variable

It should be the URL to the place you want to go to:

```
VITE_REACT_APP_PLACE_URL=URL
```

2. Open the link using the following format

```
http://localhost:5173/i-love-you/NAME-OF-YOUR-LOVED-ONE/wanna-be-my-valentine
```

And the component will be displayed with the name of your loved one.

## For a friend you'd like to invite

This one is more toned down, and it allows changing the messages through environment variables:

```
VITE_REACT_APP_PLACE_URL
VITE_REACT_APP_FIRST_MESSAGE
VITE_REACT_APP_SECOND_MESSAGE
VITE_REACT_APP_THIRD_MESSAGE
VITE_REACT_APP_FOURTH_MESSAGE
VITE_REACT_APP_DATE_DAY
VITE_REACT_APP_DATE_TIME
```

Make sure that the messages aren't too long or they won't fit well.

And then visit the following URL:

```
http://localhost:5173/hey-there/NAME-OR-PERSON/do-u-wanna-be-my-valentine
```