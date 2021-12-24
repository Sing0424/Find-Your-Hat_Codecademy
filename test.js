var term = require('terminal-kit').terminal;

term("Mike says: ");

term.saveCursor();
term.moveTo.bgWhite.black(1, 1).eraseLine();
term("This is a status bar update!");
term.white.bgBlack();
term.restoreCursor();

term('"Hey hey hey!"\n');
// Cursor is back to its previous position
// Thus producing: Mike says: "Hey hey hey!"