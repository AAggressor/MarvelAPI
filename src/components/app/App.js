import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

// 1. Для поднятия состояния переводим в класс

class App extends Component {
  // 2. Создаем новое состояние и присваиваем ему значение ноль.
  state = {
    selectedChar: null,
  };

  // 3.Создаем метод для того чтобі устанавливать новое  созданное свойство через аргумент (id)

  onCharSelected = (id) => {
    this.setState({ selectedChar: id });
  };
  // 4/ Передаем вновь созданній метод в charlist/.
  // 5. А в компонент charlist мі будем передавать id  из нашего state.
  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
