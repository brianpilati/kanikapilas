module.exports = {
  buildBody: function(song) {
    return `
      <body>
        <div>
          ${song.title}
        </div>
      </body>
    `;
  }
};
