# Ragnorson zadanie rekrutacyjne

[DEMO](http://kamilmodzelewski.com/ragnarson/index.html)

Zadanie polega na stworzeniu gry z wykorzystaniem API http://roll.diceapi.com/ 

## Na czym polega gra:

+ Gracz ma jedną aktualną kostkę/kartę

+ Gracz ma dwa przyciski gdzie decyduję czy następna wartość będzie wyższa czy niższa

+ Po decyzji gracza losowana jest nowa kostka/karta i gracz dostaje 0.1pkt jeśli jego decyzja była trafna

+ Gra powinna trwać 30 rund


## Wymagania dotyczące zadania:

+ Wyświetlić obecną kostkę/kartę razem z obrazkiem

+ Musi zostać stworzona i wyświetlona historia kolejnych rund i wyników tych rund

+ Gra musi wyświetlać ilość pozostałych ruchów oraz ilość punktów

+ Po zamknięciu strony stan gry musi być zapisany

+ Powrócenie do gry wyprzedzone jest pytaniem "Czy załadować poprzednią grę?"

+ Jeśli gracz wybierze "TAK" to wczytujemy grę ze stanem jak przed zamknięciem

+ Jeśli "NIE" rozpoczynamy nową grę

## This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
