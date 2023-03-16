// 1.внутри компонента будет какое-то состояние потомучто когда ми будемо робити запрос
// ці данні потрібно буде десь сохранити у зв'язку з цим ми переробляємо цей компонент у формат класса
import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  // 2. наступним кроком ми будемо наше состояние, тута будемо використовувати сінтаксис полей класа,
  // тому конструктор використовувати не будемо.
  state = {
    char: {},
    loading: true,
    error: false,
  };
  // 6.ми створили нове свойство внутрі класу RandomChar/
  marvelService = new MarvelService();
  // для того чтобі во время работі спинера проходила загрузка добовляем ее в метод
  // ончарлоєдид
  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = (char) => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  // 7. cтворюємо новий метод котрий буде обращаться к серверу получать данні і записувати це в стейт
  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    //   3. якщо стейт готов то ми його повинні викорористи у методі render/
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    // Для контента условие звучит так: если у нас нет загрузки и нет ошибки тогда ми вставляем контент.
    const content = !(loading || error) ? <View char={char} /> : null;

    // треба не забувати про this/
    // 4. теперь ми підставляємо наші переменні в нужні места
    //   5. наступна задача отримати ці данні від сервера, записати їх в стейт а потім використи у нашій верстке.
    //  Для цього нам потребуєтся marvelService/

    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}
// 8. Для того чтобі спинер работал создаем рендерищей компонент
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  let imgStyles = { objectFit: "cover" };
  if (
    char.thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyles = { objectFit: "unset" };
  }
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyles}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
