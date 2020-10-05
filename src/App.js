import React from 'react';
import './App.css';
import axios from 'axios'
import VideoBackground from './components/Background'
import Dice from './components/Dice'

class App extends React.Component {

  gameLength = 30;

  state = {
    iteration: 0,
    betsHistory: [],
    resultsHistory: [],
    score: 0,
    gameStarted: false,
    loading: false,
    randomValue: 1,
    randomInterval: null,
    gameInstance: localStorage.getItem('gameInstance'),
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // is end of game
    if (this.state.iteration === this.gameLength - 1)
      localStorage.removeItem('gameInstance');

    if (this.state.gameStarted) {
      // stop interval
      if (prevState.loading === true && this.state.loading === false) {
        clearInterval(this.state.randomInterval)
      }

      // start interval
      if (prevState.loading === false && this.state.loading === true) {
        let interval = setInterval(() => this.setState({ randomValue: Math.floor(Math.random() * 6) + 1 }), 100);
        this.setState({ randomInterval: interval });
      }
    }
  }

  roleDice(bet) {

    let { iteration, betsHistory, resultsHistory, score } = this.state

    this.setState({ loading: true })

    axios.get('http://roll.diceapi.com/json/d6')
      .then((res) => {
        let result = res.data.dice[0].value;
        let newScore = score;

        switch (bet) {
          case 1:
            if (resultsHistory[iteration] < result)
              newScore = newScore + 0.1;
            break;
          case -1:
            if (resultsHistory[iteration] > result)
              newScore = newScore + 0.1;
            break;
          case 0:
            // no bet
            this.setState({
              resultsHistory: [...resultsHistory, result],
              loading: false
            })
            return;
          default: throw new Error('Unknow bet value!');
        }

        localStorage.setItem('gameInstance', JSON.stringify({
          resultsHistory: [...resultsHistory, result],
          betsHistory: [...betsHistory, bet],
          iteration: iteration + 1,
          score: newScore,
        }));

        this.setState({
          resultsHistory: [...resultsHistory, result],
          betsHistory: [...betsHistory, bet],
          iteration: iteration + 1,
          score: newScore,
          loading: false
        })
      })
      .catch((err) => {
        if (resultsHistory.length === 0)
          this.setState({
            gameStarted: false,
            loading: false
          })

        alert('Coś poszło nie tak, spróbuj ponownie');
      })
  }

  startNewGame() {

    localStorage.removeItem('gameInstance');

    this.setState({
      gameStarted: true,
      loading: true,
      iteration: 0,
      betsHistory: [],
      resultsHistory: [],
      score: 0,
      randomValue: 1,
      randomInterval: null
    })

    this.roleDice(0);
  }

  loadOldGame() {
    let { gameInstance } = this.state;

    gameInstance = JSON.parse(gameInstance);

    this.setState({
      gameStarted: true,
      loading: false,
      iteration: gameInstance.iteration,
      betsHistory: gameInstance.betsHistory,
      resultsHistory: gameInstance.resultsHistory,
      score: gameInstance.score
    })
  }

  render() {

    const { gameStarted, iteration, resultsHistory, score, loading, randomValue, betsHistory, gameInstance } = this.state;

    // game start
    if (!gameStarted)
      return (
        <React.Fragment>
          <VideoBackground ogg='/background.ogv' />
          <h1>Ragnrason dice</h1>
          {gameInstance !== null ? (
            <React.Fragment>
              <p>Masz zaczętą inną grę, czy chcesz ją dokończyć?</p>
              <button className="btn" onClick={() => this.loadOldGame()}>Tak</button><button className="btn" onClick={() => this.startNewGame()}>Nie</button>
            </React.Fragment>
          ) : (
              <button className="start btn center" onClick={() => this.startNewGame()}>Start game</button>
            )}
        </React.Fragment>
      )

    // game end
    if (iteration === this.gameLength - 1)
      return (
        <React.Fragment>
          <VideoBackground ogg='/background.ogv' />
          <h1>Koniec gry</h1>
          <p>Twój wynik to: {score.toFixed(1)}</p>
          <button className='btn' onClick={() => this.startNewGame()}>Zagraj ponownie</button>
          <br />
          Historia twoich zakładów:
          {resultsHistory.map((result, index) => {
            return <p>ilość oczek:{result}; zakład, że będzie {betsHistory[index] === -1 ? 'mniej' : 'więcej'}</p>
          })}
        </React.Fragment>
      )

    return (
      <React.Fragment>
        <VideoBackground ogg='/background.ogv' />
        Runda {iteration + 1} z {this.gameLength}
        <p>Twój wynik: {score.toFixed(1)}</p>

        <div className="game-iteration center">
          <div className="dice-result">
            <Dice variant={loading ? randomValue : resultsHistory[iteration]} />
            {/* Ilość oczek wyrzuconych na kości: {resultsHistory[iteration] && resultsHistory[iteration]} */}
          </div>
          {!loading && (
            <div className="game-controls">
              <p>Założę się, że w kolejnym rzucie ilość oczek będzie</p>
              <button className="bet btn" onClick={() => this.roleDice(-1)}>mniejsza</button>
              <button className="bet btn" onClick={() => this.roleDice(1)}>większa</button>
            </div>
          )}

        </div>

      </React.Fragment>
    );
  }

}

export default App;
