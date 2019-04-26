export default class Music {
  static sharedProvider() {
    if (!Music.instance) {
      Music.instance = new Music();
    }
    return Music.instance;
  }

  configure() {
    window.MusicKit.configure({
      developerToken:
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlI0SzdGWFc4SDYifQ.eyJpYXQiOjE1NTYyNjQ0NzEsImV4cCI6MTU3MTgxNjQ3MSwiaXNzIjoiUDlLSzQ1Mks4UCJ9.N5tFF_TFkCzMqXUNdL4PskkJV8htTwXPm6MGnwusqnH-GEKnbxBAZCy1clfdL_jEHkbpX4a_7Bya0pmVkTXB-A",
      app: {
        name: "My Cool Web App",
        build: "1978.4.1"
      }
    });
  }

  getMusicInstance() {
    return window.MusicKit.getInstance();
  }

  static getFormatArtworkURL(url, width = 150, height = 150) {
    console.log(url);
    let u = window.MusicKit.formatArtworkURL();
    console.log(u);
    return u;
  }
}
