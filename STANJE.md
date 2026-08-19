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
| Glasovanje | ✅ samo **Ja / Ne**, **en glas na osebo** | — |

`scriptUrl` (zaledje):

```
https://script.google.com/macros/s/AKfycbyuUtUQXc3oAeJjLhQyDo1-trjfqVAN4AfOuG6jeHEmoy9QBEADkoWqclP0K0lTib-h3A/exec
```

ID preglednice (vpisan v `apps-script/Code.gs` kot `ID_PREGLEDNICE`):
`1oL7Rw1N-LUru9bRzpPktZeuIZZi0KE_LFjUwgTpi5vw`

## ⚠️ Eno opravilo zate: pobriši testne glasove

Kode iz aplikacije ni mogoče brisati po zaledju (nalašč — nihče ne sme pobrisati glasov z URL-jem),
zato reset naredi ti. Traja 15 sekund:

**Možnost A — v preglednici** (najhitreje):
[odpri preglednico](https://docs.google.com/spreadsheets/d/1oL7Rw1N-LUru9bRzpPktZeuIZZi0KE_LFjUwgTpi5vw/edit)
→ označi vrstice **2 naprej** (vse pod glavo `cas | ime | naprava | gattaca | suspects | superbad`)
→ desni klik → *Izbriši vrstice*. Glava mora ostati.

**Možnost B — v Apps Scriptu:**
[odpri projekt](https://script.google.com/home/projects/1Z5XhVYf4XHfzxKFJHHIRjmXUiPsQdkneWK93swrjL1Q_wVMsdZxORTkM/edit)
→ v spustnem meniju izberi funkcijo `pobrisiGlasove` → **Zaženi**. Pobriše vse glasove, glava ostane.

Po tem `rezultati.html` pokaže **0 oddanih glasov**. Ob zadnjem preverjanju (19. 8. 2026, 20:10)
sta bila v preglednici **2 testna glasova**.

> Če si na svojem telefonu že testno glasoval, je ta telefon zdaj zaklenjen. Odkleneš ga tako, da
> v brskalniku počistiš podatke strani, ali pa odpreš zasebno okno. (Brisanje vrstic v preglednici
> zaklepa v telefonu **ne** odstrani — zaklep je v brskalniku.)

## Kako deluje "en glas na osebo"

- Po oddaji se obrazec na tej napravi **zaklene**: namesto njega se pokaže potrditev in povezava na
  rezultate. Ponovno glasovanje ni mogoče.
- Zaledje vsak zapis veže na id naprave, zato ista naprava nikoli ne ustvari dveh vrstic — tudi če
  se pošiljanje po prekinjeni povezavi ponovi.
- Kdor izbriše podatke brskalnika ali odpre zasebno okno, dobi nov id naprave. Brez prijave se temu
  ni mogoče izogniti; za poletno šolo je to povsem dovolj.
- **Kiosk način** (`index.html?kiosk=1`) namenoma ni zaklenjen — tam en laptop kroži po sobi in
  vsak naslednji človek glasuje na isti napravi.

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
| **en glas na osebo** (živa stran) | po oddaji obrazca ni več, pokaže se "Tvoj glas je oddan" |
| kiosk način po oddaji | obrazec se normalno odpre za naslednjega |

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
