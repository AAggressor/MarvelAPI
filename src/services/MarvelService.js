class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=4f27171417234c0665ab944ec506270f";
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };
  // Создаем методи для запросов Api

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  // создаем метод которий включає функцию по вичлению данних яку ми переносимо сюди з RandomChar/
  _transformCharacter = (char) => {
    // МОЕ РЕШЕНИЕ
    // let desc = () => {
    //   if (char.description.length === 0) {
    //     return "now and again";
    //   } else if (char.description.length > 25) {
    //     return char.description.substring(0, 25) + "...";
    //   } else {
    //     return char.description;
    //   }
    // };
    return {
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
