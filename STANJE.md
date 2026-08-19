# Stanje postavitve

Zadnja sprememba: 19. 8. 2026 — **aplikacija je objavljena in preverjena v živo.**

## Naslov za udeležence

```
https://commanderc0dy.github.io/izbor-filma/
```

- QR koda tega naslova: `qr.png` (444 × 444 px) in `qr.svg` (za projekcijo/tisk v poljubni velikosti).
  Obe sta preverjeni z bralnikom — vrneta točno zgornji naslov.
- Lestvica v živo za projektor: <https://commanderc0dy.github.io/izbor-filma/rezultati.html>
  (osveži se sama vsakih 6 sekund).

## Kaj je postavljeno

| Del | Stanje | Naslov |
|---|---|---|
| Google Preglednica `Izbor filma` | ✅ list `Glasovi` | [odpri](https://docs.google.com/spreadsheets/d/1oL7Rw1N-LUru9bRzpPktZeuIZZi0KE_LFjUwgTpi5vw/edit) |
| Apps Script `Izbor filma - zaledje` | ✅ uveden, dostop **Kdor koli** (brez prijave) | [odpri](https://script.google.com/home/projects/1Z5XhVYf4XHfzxKFJHHIRjmXUiPsQdkneWK93swrjL1Q_wVMsdZxORTkM/edit) |
| Objava aplikacije | ✅ GitHub Pages, veja `gh-pages` | [repozitorij](https://github.com/CommanderC0dy/izbor-filma) |
| QR koda | ✅ `qr.png`, `qr.svg` | — |
| Filmi | ✅ Gattaca, The Usual Suspects, Superbad (s plakati) | — |
| Glasovanje | ✅ samo **Ja / Ne** | — |

`scriptUrl` (zaledje):

```
https://script.google.com/macros/s/AKfycbyuUtUQXc3oAeJjLhQyDo1-trjfqVAN4AfOuG6jeHEmoy9QBEADkoWqclP0K0lTib-h3A/exec
```

ID preglednice (vpisan v `apps-script/Code.gs` kot `ID_PREGLEDNICE`):
`1oL7Rw1N-LUru9bRzpPktZeuIZZi0KE_LFjUwgTpi5vw`

## ⚠️ Eno opravilo zate: pobriši testni glas

V preglednici je **1 testna vrstica** (ime `TEST-POBRISI`, pri vseh filmih `Ne`, torej 0 glasov ZA —
lestvice ne popači, poveča pa števec glasovalcev za 1).

Pobriši jo tako:

- v [preglednici](https://docs.google.com/spreadsheets/d/1oL7Rw1N-LUru9bRzpPktZeuIZZi0KE_LFjUwgTpi5vw/edit)
  izbriši vrstico 2, **ali**
- v Apps Script urejevalniku zaženi funkcijo `pobrisiGlasove` (pobriše vse glasove, glava ostane).

To naredi tik pred dogodkom — takrat gre števec na 0.

## Kako je bilo preverjeno (19. 8. 2026)

V pravem Chromu, proti **objavljenemu naslovu** in **živemu zaledju**:

| Test | Rezultat |
|---|---|
| nalaganje objavljene strani | vsi viri 200 (HTML, CSS, JS, logo, 3 plakati) |
| izris | 3 filmi s plakati, gumba `Ja`/`Ne` 156 × 50 px, brez vodoravnega drsenja |
| oddaja glasu z objavljenega naslova | potrditev v ~3,7 s, vrstica zapisana v preglednico |
| stran z rezultati | prebere iste podatke iz zaledja, pravilno razvrsti |
| ponovna oddaja z iste naprave | vrstica **zamenjana**, števec glasovalcev ostane 1 |
| zataknjen glas v čakalni vrsti | stran z rezultati ga sama pošlje, vrsta se izprazni |
| lokalni (kiosk) način brez zaledja | glasovi se seštevajo v brskalniku, lestvica pravilna |
| konzola brskalnika | brez napak |

## Drobni opozorili

- **Predpomnilnik.** GitHub Pages postreže staro različico še nekaj minut po objavi. Če si stran
  odprl prej in vidiš staro (tri možnosti, brez plakatov), naredi trdo osvežitev
  (Ctrl+Shift+R oz. na telefonu ponovno odpri zavihek). Udeleženci, ki naslov odprejo prvič,
  vedno dobijo aktualno.
- **Repozitorij je javen**, torej je javen tudi `scriptUrl`. Za anonimno glasovanje to ni nič
  novega (naslov ima itak vsak udeleženec), samo vedi, da glas lahko odda kdorkoli s povezavo.

## Če kaj spremeniš

```bash
# uredi app/filmi.js (filmi, plakati, naslovi)
git add -A && git commit -m "opis" && git push origin main
git branch -D gh-pages; git subtree split --prefix app -b gh-pages && git push -f origin gh-pages
```

Objava traja ~1 minuto. Rezervni načrti so v [REZERVNI-NACRT.md](REZERVNI-NACRT.md).
