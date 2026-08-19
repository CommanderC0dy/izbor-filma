/**
 * Izbor filma — zaledje (backend) v Google Apps Script.
 *
 * Kaj dela:
 *   - sprejme glas in ga zapiše v Google Preglednico
 *   - vrne sešteke za stran z rezultati
 *
 * Zakaj GET in ne POST: JSONP klic (script tag) deluje tudi tam,
 * kjer CORS ali slaba povezava ponagajata, in nam vrne potrditev,
 * da je glas res prišel skozi.
 *
 * Namestitev je opisana v NAVODILA.md (korak 2).
 */

/* ID preglednice.
   - Pusti prazno (''), ce je skript vezan na preglednico
     (odprt preko Razsiritve -> Apps Script).
   - Vpisi ID, ce je skript samostojen (standalone) projekt.
     ID je v naslovu preglednice med /d/ in /edit. */
var ID_PREGLEDNICE = '1oL7Rw1N-LUru9bRzpPktZeuIZZi0KE_LFjUwgTpi5vw';

var IME_LISTA = 'Glasovi';
var OSNOVNI_STOLPCI = ['cas', 'ime', 'naprava'];

function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    var izhod;
    if (p.action === 'glas') {
      izhod = zapisiGlas(p);
    } else if (p.action === 'rezultati' || !p.action) {
      izhod = rezultati();
    } else {
      izhod = { ok: false, napaka: 'neznana akcija: ' + p.action };
    }
    return odgovor(izhod, p.callback);
  } catch (err) {
    return odgovor({ ok: false, napaka: String(err && err.message ? err.message : err) }, p.callback);
  }
}

/** POST pustimo za vsak slucaj (npr. ce kdo raje uporabi fetch). */
function doPost(e) {
  var p = {};
  try {
    if (e && e.postData && e.postData.contents) {
      var telo = JSON.parse(e.postData.contents);
      p.action = 'glas';
      p.ime = telo.ime || '';
      p.naprava = telo.naprava || '';
      p.ocene = JSON.stringify(telo.ocene || {});
    }
    return odgovor(zapisiGlas(p), null);
  } catch (err) {
    return odgovor({ ok: false, napaka: String(err) }, null);
  }
}

function odgovor(objekt, callback) {
  var json = JSON.stringify(objekt);
  if (callback && /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(callback)) {
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function list() {
  var ss = ID_PREGLEDNICE
    ? SpreadsheetApp.openById(ID_PREGLEDNICE)
    : SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(IME_LISTA);
  if (!sh) {
    sh = ss.insertSheet(IME_LISTA);
  }
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, OSNOVNI_STOLPCI.length).setValues([OSNOVNI_STOLPCI]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function glava(sh) {
  var stolpcev = Math.max(sh.getLastColumn(), OSNOVNI_STOLPCI.length);
  return sh.getRange(1, 1, 1, stolpcev).getValues()[0].filter(function (v) {
    return String(v) !== '';
  });
}

function zapisiGlas(p) {
  var ocene = JSON.parse(p.ocene || '{}');
  var naprava = String(p.naprava || '').slice(0, 80);
  var ime = String(p.ime || '').slice(0, 40);

  if (!naprava) return { ok: false, napaka: 'manjka id naprave' };
  if (!Object.keys(ocene).length) return { ok: false, napaka: 'ni ocen' };

  var zaklep = LockService.getScriptLock();
  zaklep.waitLock(25000);
  try {
    var sh = list();
    var h = glava(sh);

    // dodaj manjkajoce stolpce za nove filme
    Object.keys(ocene).forEach(function (id) {
      if (h.indexOf(id) === -1) {
        h.push(id);
        sh.getRange(1, h.length).setValue(id);
      }
    });

    // sestavi vrstico po vrstnem redu glave
    var vrstica = h.map(function (stolpec) {
      if (stolpec === 'cas') return new Date();
      if (stolpec === 'ime') return ime;
      if (stolpec === 'naprava') return naprava;
      var v = ocene[stolpec];
      return v === undefined ? '' : Number(v);
    });

    // ali ta naprava ze ima glas? -> zamenjaj ga
    var vrstic = sh.getLastRow();
    var indeksNaprave = h.indexOf('naprava') + 1;
    var ciljna = 0;
    if (vrstic > 1 && indeksNaprave > 0) {
      var obstojece = sh.getRange(2, indeksNaprave, vrstic - 1, 1).getValues();
      for (var i = 0; i < obstojece.length; i++) {
        if (String(obstojece[i][0]) === naprava) { ciljna = i + 2; break; }
      }
    }
    if (!ciljna) ciljna = vrstic + 1;

    sh.getRange(ciljna, 1, 1, vrstica.length).setValues([vrstica]);

    return { ok: true, zamenjan: ciljna <= vrstic, vrstica: ciljna };
  } finally {
    zaklep.releaseLock();
  }
}

function rezultati() {
  var sh = list();
  var vrstic = sh.getLastRow();
  var h = glava(sh);
  var idFilmov = h.filter(function (s) { return OSNOVNI_STOLPCI.indexOf(s) === -1; });

  var filmi = {};
  idFilmov.forEach(function (id) {
    filmi[id] = { tocke: 0, ja: 0, mogoce: 0, ne: 0 };
  });

  if (vrstic > 1 && idFilmov.length) {
    var podatki = sh.getRange(2, 1, vrstic - 1, h.length).getValues();
    podatki.forEach(function (r) {
      idFilmov.forEach(function (id) {
        var t = Number(r[h.indexOf(id)] || 0);
        filmi[id].tocke += t;
        if (t >= 2) filmi[id].ja++;
        else if (t === 1) filmi[id].mogoce++;
        else filmi[id].ne++;
      });
    });
  }

  return {
    ok: true,
    glasovalci: Math.max(0, vrstic - 1),
    filmi: filmi,
    posodobljeno: new Date().toISOString()
  };
}

/** Rocno v urejevalniku: pobrise vse glasove (glava ostane). */
function pobrisiGlasove() {
  var sh = list();
  if (sh.getLastRow() > 1) {
    sh.deleteRows(2, sh.getLastRow() - 1);
  }
}

/** Rocno v urejevalniku: hiter test, da zaledje dela. */
function test() {
  Logger.log(zapisiGlas({
    ime: 'Test',
    naprava: 'test-naprava',
    ocene: JSON.stringify({ gattaca: 2, suspects: 1, superbad: 0 })
  }));
  Logger.log(rezultati());
}
