# Izbor filma — glasovalna aplikacija za poletno šolo

Majhna spletna aplikacija, s katero 30 ljudi v nekaj minutah izbere film izmed 3–5 predlogov.
Vse besedilo je v slovenščini, brez zunanjih knjižnic, brez namestitve, brez strežnika na tvojem laptopu.

```
izbor-filma/
├── README.md              ← ta datoteka: zakaj tako in kako deluje
├── STANJE.md              ← kaj je že postavljeno, kaj še manjka
├── NAVODILA.md            ← korak za korakom: postavitev v ~15 minutah
├── REZERVNI-NACRT.md      ← načrti B/C/D + kontrolni seznam pred nastopom
├── app/                   ← to je objavljeno (GitHub Pages, veja gh-pages)
│   ├── index.html         ← glasovanje
│   ├── rezultati.html     ← lestvica v živo (za projektor)
│   ├── filmi.js           ← EDINA datoteka, ki jo urejaš (filmi + scriptUrl)
│   ├── plakati/           ← plakati filmov (lokalni, pomanjšani)
│   └── stil.css
└── apps-script/
    └── Code.gs            ← zaledje: shranjuje glasove v Google Preglednico
```

**Trenutno stanje postavitve: [STANJE.md](STANJE.md)** — kaj že deluje in kaj še manjka.

Navodila od začetka: [NAVODILA.md](NAVODILA.md).

---

## Zakaj ne lokalno gostovanje na laptopu

Tvoja skrb je upravičena, ampak vzrok je vredno ločiti na dva dela:

- **Prenos podatkov ni problem.** Cela aplikacija je nekaj deset kilobajtov. 30 telefonov, ki
  vsak enkrat naložijo tako stran, je manj prometa kot ena sama fotografija na Instagramu.
- **Problem je zanesljivost povezave.** Gostovanje v LAN pomeni, da mora *vsak* telefon uspešno
  priti na *tvoj* laptop preko istega preobremenjenega dostopne točke: `http://192.168.x.x:8000`
  ročno vtipkan, brez HTTPS, odvisen od tega, da AP dovoli komunikacijo med napravami
  (marsikateri gostujoči WiFi tega namenoma **ne** dovoli — "client isolation"), in da tvoj laptop
  ne zaspi, ne zamenja IP-ja in ostane na omrežju. Preveč stvari, ki lahko odpovejo pred publiko.

## Zakaj ta rešitev deluje kljub slabemu WiFi-ju

Ključna poteza: **udeleženci ne uporabljajo tamkajšnjega WiFi-ja.**

Aplikacija je objavljena na brezplačnem statičnem hostingu (GitHub Pages) na pravem naslovu s HTTPS:
**<https://commanderc0dy.github.io/izbor-filma/>**.
Vsak odpre povezavo prek **svojih mobilnih podatkov** — 30 neodvisnih povezav namesto ene skupne
ozke. Tvoj laptop je s tem popolnoma izven poti: v sobi je samo še za projekcijo rezultatov.

Poleg tega:

- **Nič zunanjih virov.** Brez Google Fonts, brez CDN-jev. Plakati filmov so pomanjšani in
  shranjeni lokalno v `app/plakati/` (skupaj ~53 kB), zato stran ne kliče nobenega tujega
  strežnika. Nič, kar bi lahko obviselo pri nalaganju.
- **Čakalna vrsta za glasove.** Če oddaja glasu ne uspe, se glas shrani v brskalnik in se pošlje
  sam, ko se povezava vrne. Nihče ne izgubi glasu zaradi enega prekinjenega paketa.
- **Deluje tudi brez zaledja.** Če `scriptUrl` ni nastavljen, aplikacija teče v lokalnem načinu —
  uporabno za kiosk rezervni načrt (glej [REZERVNI-NACRT.md](REZERVNI-NACRT.md)).

## Je Google Obrazec boljši?

Za *zanesljivost* je Obrazec odličen in ga imaš pripravljenega kot načrt B — Google ima
boljšo infrastrukturo kot kdorkoli od nas. Za *nalogo* pa ne: pokazati moraš aplikacijo, ki si jo
naredil, ne Googlovega obrazca. Zato je razporeditev takšna:

| | Načrt A (ta aplikacija) | Načrt B (Google Obrazec) |
|---|---|---|
| Ustreza nalogi | ✅ vaša aplikacija | ⚠️ Googlov vmesnik |
| Zanesljivost | zelo dobra (statični hosting) | najvišja |
| Rezultati v živo na projektorju | ✅ lestvica, ki se sama osvežuje | ⚠️ ročno osveževanje grafov |
| Postavitev | ~15 min | ~5 min |
| Zmagovalec izračunan sam | ✅ | ✗ (sešteješ sam) |

Zaledje pri načrtu A je vseeno Googlova Preglednica, torej glasovi pristanejo na istem mestu —
samo vmesnik je vaš.

## Kako se šteje

Vsak udeleženec pri vsakem filmu pove **Ja** ali **Ne**:

```
rezultat filma = število glasov "Ja"
```

To ni isto kot "vsak izbere svojega najljubšega". Pri 30 ljudeh in 3 filmih bi izbira enega
favorita dala zmagovalca z 12 glasovi in 18 nezadovoljnimi. Ta sistem (t. i. odobritveno
glasovanje) izbere film, ki je *največ ljudem sprejemljiv* — kar je pri skupinskem ogledu bistvo.

> V preglednici je "Ja" zapisan kot **2** in "Ne" kot **0** (tako zaledje loči obe možnosti).
> Na lestvici se prikaže število glasov ZA, ne surova vrednost iz stolpca.

Podrobnosti, ki so že rešene:

- Ponovna oddaja z iste naprave **zamenja** prejšnji glas, ne doda novega.
- Ime je neobvezno; anonimno glasovanje je bolj iskreno.
- Stran za rezultate zna izvoziti CSV, če jih rabiš v poročilu.
- Vsi gumbi so veliki (≥50 px), tipkovnica in bralniki zaslona delujejo, animacije se izklopijo
  ob `prefers-reduced-motion`.

## Naslednji koraki

1. [NAVODILA.md](NAVODILA.md) — korak 1 do 5.
2. [REZERVNI-NACRT.md](REZERVNI-NACRT.md) — pojdi skozi kontrolni seznam **dan prej**, ne zjutraj.

---

## Kaj je bilo preverjeno

19. 8. 2026, v pravem Chromu proti **živi** postavitvi (objavljen naslov + Apps Script zaledje):

- oddaja glasu z objavljenega naslova → glas prispe v Google Preglednico, potrditev v ~2,7 s;
- stran z rezultati prebere iste podatke iz zaledja in jih pravilno prikaže;
- ponovna oddaja z iste naprave → prejšnja vrstica se **zamenja**, števec glasovalcev ostane isti;
- **zataknjen glas** v čakalni vrsti → stran za rezultate ga pošlje sama, vrsta se izprazni;
- lokalni (kiosk) način brez zaledja → glasovi se seštevajo v brskalniku, lestvica pravilno razvrsti;
- vsi viri (`index.html`, `rezultati.html`, `filmi.js`, `stil.css`, logo, plakati) se naložijo z
  objavljenega naslova s statusom 200;
- postavitev pri širini telefona (390 px): gumba `Ja`/`Ne` 156 × 50 px, brez vodoravnega drsenja,
  **brez napak v konzoli**.

Skupna velikost aplikacije: **~120 kB** (vključno s plakati in logotipom, nič zunanjih virov).
