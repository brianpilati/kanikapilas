module.exports = {
  buildBody: function(song) {
    return `
      <body>
        <div class="border">
          ${song.title}
        </div>
      </body>
    `;
  }
};
