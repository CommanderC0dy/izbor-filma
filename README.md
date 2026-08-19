# Izbor filma — glasovalna aplikacija za poletno šolo

Majhna spletna aplikacija, s katero 30 ljudi v nekaj minutah izbere film izmed 3–5 predlogov.
Vse besedilo je v slovenščini, brez zunanjih knjižnic, brez namestitve, brez strežnika na tvojem laptopu.

```
izbor-filma/
├── README.md              ← ta datoteka: zakaj tako in kako deluje
├── STANJE.md              ← kaj je že postavljeno, kaj še manjka
├── NAVODILA.md            ← korak za korakom: postavitev v ~15 minutah
├── REZERVNI-NACRT.md      ← načrti B/C/D + kontrolni seznam pred nastopom
├── app/                   ← to objaviš (Netlify Drop / GitHub Pages)
│   ├── index.html         ← glasovanje
│   ├── rezultati.html     ← lestvica v živo (za projektor)
│   ├── filmi.js           ← EDINA datoteka, ki jo urejaš (filmi + scriptUrl)
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

Aplikacija je objavljena na brezplačnem statičnem hostingu (Netlify) na pravem naslovu s HTTPS.
Vsak odpre povezavo prek **svojih mobilnih podatkov** — 30 neodvisnih povezav namesto ene skupne
ozke. Tvoj laptop je s tem popolnoma izven poti: v sobi je samo še za projekcijo rezultatov.

Poleg tega:

- **Nič zunanjih virov.** Brez Google Fonts, brez CDN-jev, brez slik plakatov. Ena stran, en CSS,
  en majhen JS. Nič, kar bi lahko obviselo pri nalaganju.
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

Vsak udeleženec vsak film oceni z **Ja / Mogoče / Ne**:

```
točke filma = 2 × (št. "Ja") + 1 × (št. "Mogoče")
```

To ni isto kot "vsak izbere svojega najljubšega". Pri 30 ljudeh in 5 filmih bi izbira enega
favorita dala zmagovalca s 8 glasovi in 22 nezadovoljnih. Ta sistem (t. i. točkovno glasovanje)
izbere film, ki je *največ ljudem sprejemljiv* — kar je pri skupinskem ogledu bistvo.

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

Pred oddajo tega projekta je bilo v pravem brskalniku (Chrome) preizkušeno:

- oddaja glasu → glas pravilno prispe v zaledje s pravimi točkami;
- 30 simuliranih glasov → lestvica pravilno sešteje in razvrsti filme;
- **prekinjena povezava** → glas se shrani v čakalno vrsto in se sam pošlje, ko se povezava vrne;
- ponovna oddaja z iste naprave → prejšnji glas se zamenja, ne podvoji;
- **kiosk način** brez omrežja → glasovi se seštevajo lokalno, obrazec se sam počisti za naslednjega;
- postavitev pri širini telefona (360 px): gumbi 91 × 50 px, brez vodoravnega drsenja, brez napak v konzoli.

Ni bilo preverjeno v živo: dejanska uvedba Apps Script (potrebuje tvoj Google račun) in objava na
Netlify. Zaledje je bilo testirano proti lokalni kopiji, ki posnema Apps Script; `Code.gs` pa ima
vgrajeno funkcijo `test`, ki jo zaženeš v urejevalniku (korak 2 v NAVODILA.md).

Skupna velikost aplikacije: **25 kB** (4 datoteke, nič zunanjih virov).
