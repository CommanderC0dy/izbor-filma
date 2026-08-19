# Navodila za postavitev (≈15 minut)

Vse skupaj narediš enkrat, na svojem laptopu, kjer je internet še kolikor toliko v redu.
Pri glasovanju sam laptop ni več potreben.

---

## Korak 1 — Uredi filme

Odpri `app/filmi.js` in zamenjaj seznam `filmi` z vašimi 3–5 filmi.

```js
{
  id: 'interstellar',            // kratko, brez šumnikov in presledkov -> ime stolpca v preglednici
  naslov: 'Interstellar',
  leto: 2014,
  zanr: 'ZF drama',
  dolzina: '169 min',
  opis: 'Ena poved, o čem gre.'
}
```

Spremeni lahko tudi `naslov` in `podnaslov` strani.

> Če boš `id` filma spremenil **po** tem, ko je kdo že glasoval, se v preglednici pojavi nov stolpec
> in stari glasovi za ta film se ne bodo šteli. Uredi filme pred glasovanjem.

---

## Korak 2 — Zaledje: Google Preglednica + Apps Script

> **To je že narejeno** — glej [STANJE.md](STANJE.md) za naslove in rezultate preverjanja.
> Spodnja navodila potrebuješ le, če postavljaš od začetka ali kaj popravljaš.

Tu se shranjujejo glasovi. Brezplačno, brez računa za strežnik.

Dve poti, obe delujeta:

- **A: skript vezan na preglednico** — v preglednici *Razširitve → Apps Script*.
  V `Code.gs` pusti `ID_PREGLEDNICE = ''`.
- **B: samostojen (standalone) projekt** — na <https://script.google.com> *New project*.
  V `Code.gs` vpiši ID preglednice v `ID_PREGLEDNICE` (ID je v naslovu preglednice med
  `/d/` in `/edit`). Ta pot je uporabljena v tej postavitvi.

1. Odpri <https://sheets.new> → nastane nova preglednica. Poimenuj jo npr. `Izbor filma`.
2. V meniju: **Razširitve → Apps Script**. Odpre se urejevalnik kode.
3. Pobriši vse, kar je v `Code.gs`, in prilepi celotno vsebino `apps-script/Code.gs` iz te mape.
4. Klikni **Shrani** (ikona diskete).
5. Klikni **Uvedi (Deploy) → Nova uvedba**.
   - Vrsta: **Spletna aplikacija** (Web app)
   - Opis: `izbor filma`
   - Izvedi kot: **Jaz** (Me)
   - Kdo ima dostop: **Vsi** (Anyone) — to je nujno, sicer udeleženci ne morejo oddati glasu
6. Klikni **Uvedi**. Google bo zahteval dovoljenje:
   **Preglej dovoljenja → izberi svoj račun → Napredno → Pojdi na … (nevarno) → Dovoli.**
   (Opozorilo je normalno, ker je skript tvoj in ni pregledan pri Googlu.)
7. Kopiraj **URL spletne aplikacije**. Videti je približno takole:

   ```
   https://script.google.com/macros/s/AKfycbx...dolg-niz-znakov.../exec
   ```

8. Ta URL prilepi v `app/filmi.js`:

   ```js
   scriptUrl: 'https://script.google.com/macros/s/AKfycb…/exec',
   ```

**Hiter test brez brskalnika:** v urejevalniku Apps Script izberi funkcijo `test` in klikni **Zaženi**.
V preglednici na listu `Glasovi` se mora pojaviti ena testna vrstica. Pobriši jo ročno ali zaženi funkcijo `pobrisiGlasove`.

---

## Korak 3 — Objavi aplikacijo (Netlify Drop, brez računa)

1. Odpri <https://app.netlify.com/drop>
2. Povleci **mapo `app/`** (celo mapo, ne posameznih datotek) v okno brskalnika.
   Deluje tudi zip te mape.
3. Dobiš naslov, npr. `https://kljucni-nakljucni-niz.netlify.app`.
   V nastavitvah strani ga lahko preimenuješ v nekaj berljivega, npr. `izbor-filma-ps.netlify.app`.
4. **Prijavi se in klikni "Claim this site".** Brez prijave Netlify stran zaklene z geslom
   (udeleženci dobijo HTTP 401) in jo po eni uri izbriše — torej brez tega koraka objava
   ni uporabna.

Alternativi, če ti je bližje:
- **GitHub Pages** — repo → vsebina mape `app/` v korenu → Settings → Pages.
- **Cloudflare Pages** — enak drag & drop princip.

> Objaviti moraš **znova** vsakič, ko spremeniš `filmi.js` (spet povleci mapo `app/`).

---

## Korak 4 — QR koda

Najhitreje, brez orodij:

- **Chrome:** odpri naslov aplikacije → desni klik na stran → *Ustvari kodo QR za to stran*
  (ali ikona QR v naslovni vrstici). Sliko shrani in projiciraj.
- **Terminal (če imaš `qrencode`):**
  ```bash
  qrencode -o qr.png -s 12 'https://tvoj-naslov.netlify.app'
  ```

Na projektorju naj bo hkrati vidno: **QR koda + naslov strani v besedilu** (nekdo bo QR-ja imel težavo prebrati).

---

## Korak 5 — Izvedba v sobi (5 minut)

1. Na projektorju odpri `rezultati.html` — lestvica se osvežuje sama.
2. Udeležencem povej: *"Odprite to povezavo. Če je WiFi obupen, izklopite WiFi in uporabite mobilne podatke — stran je majhna, deluje."*
3. Vsak oceni vse filme z **Ja / Mogoče / Ne** in odda glas.
4. Ko števec doseže ~30, razglasi zmagovalca.

**Točkovanje:** Ja = 2, Mogoče = 1, Ne = 0. Zmaga film z največ točkami.
To ni isto kot "vsak izbere svojega najljubšega" — tako izbereš film, ki ga *nihče ne sovraži*,
kar je pri skupini 30 ljudi praktično boljši rezultat.

---

## Pogoste težave

| Simptom | Vzrok in rešitev |
|---|---|
| "Rezultatov ni bilo mogoče prenesti" | `scriptUrl` manjka ali je narobe prepisan; uvedba ni nastavljena na *Vsi*. |
| Glasovi ne pridejo v preglednico | Po spremembi `Code.gs` moraš narediti **novo uvedbo** (ali *Uredi uvedbo → Nova različica*). |
| Nekdo je glasoval dvakrat | Druga oddaja z iste naprave **zamenja** prvo. Ročno čiščenje: pobriši vrstico v preglednici. |
| Stran je videti neurejena | `stil.css` ni bil objavljen — povleci celo mapo `app/`, ne le `index.html`. |
| Udeleženec ima 0 signala | Naj glasuje pri sosedu ali na laptopu v kiosk načinu (glej `REZERVNI-NACRT.md`). |
