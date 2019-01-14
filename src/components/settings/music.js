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
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQyVlZLQ0o2TTgifQ.eyJpYXQiOjE1MzQ0Njc1NzMsImV4cCI6MTU1MDAxOTU3MywiaXNzIjoiUDlLSzQ1Mks4UCJ9.wYlP9vG4KQwmT3fq7Ohledoe_PppgqqHCN9DornwzUFosaBaNMKCqGAarNpDiPOuM7ngDgENAMpZz7EfYsWEag",
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
