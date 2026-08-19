# Stanje postavitve

Zadnja sprememba: 19. 8. 2026

## Kaj je že postavljeno in preverjeno

| Del | Stanje | Naslov |
|---|---|---|
| Google Preglednica `Izbor filma` | ✅ deluje, list `Glasovi` z glavo, 0 glasov | [odpri](https://docs.google.com/spreadsheets/d/1oL7Rw1N-LUru9bRzpPktZeuIZZi0KE_LFjUwgTpi5vw/edit) |
| Apps Script projekt `Izbor filma - zaledje` | ✅ koda shranjena, avtoriziran | [odpri](https://script.google.com/home/projects/1Z5XhVYf4XHfzxKFJHHIRjmXUiPsQdkneWK93swrjL1Q_wVMsdZxORTkM/edit) |
| Uvedba spletne aplikacije (Web app) | ✅ Verzija 1, dostop **Kdor koli** (brez prijave) | glej `scriptUrl` spodaj |
| `app/filmi.js` → `scriptUrl` | ✅ vpisan | — |
| Filmi v `app/filmi.js` | ✅ Gattaca, The Usual Suspects, Superbad | — |
| Objava aplikacije (Netlify) | ⏳ **čaka na tvojo prijavo v Netlify** | — |
| QR koda | ⏳ šele ko bo znan končni naslov | — |

`scriptUrl` (zaledje):

```
https://script.google.com/macros/s/AKfycbyuUtUQXc3oAeJjLhQyDo1-trjfqVAN4AfOuG6jeHEmoy9QBEADkoWqclP0K0lTib-h3A/exec
```

ID preglednice (vpisan v `apps-script/Code.gs` kot `ID_PREGLEDNICE`):
`1oL7Rw1N-LUru9bRzpPktZeuIZZi0KE_LFjUwgTpi5vw`

## Kako je bilo zaledje preverjeno

Klici z terminala, torej **brez prijave v Google** — enako, kot bo pri udeležencih:

| Test | Rezultat |
|---|---|
| `?action=rezultati` | `200`, `application/json` — anonimni dostop deluje |
| `?action=glas&...` | `{"ok":true,"zamenjan":false,"vrstica":2}` — glas se zapiše |
| ponovni glas z isto `naprava` | `{"ok":true,"zamenjan":true,"vrstica":2}` — zamenja, ne podvoji |
| `?action=rezultati` po glasu | pravilne točke (2/1/0 → interstellar 2, vrnitev 1, spiderverse 0 …) |
| `?...&callback=cb1` | `cb1({...})` — JSONP, kot ga kliče aplikacija |

Testni glas je bil po preverjanju pobrisan; števec je spet 0.

Po zamenjavi filmov (19. 8. 2026) je bila glava lista `Glasovi` počiščena in znova preverjena:
testni glas z novimi `id`-ji je ustvaril natanko stolpce `gattaca | suspects | superbad`
(brez ostankov starih filmov), nato je bil pobrisan. Trenutno stanje: **0 glasov**.

## Kaj moraš narediti ti

1. **Prijava v Netlify** (računa ne morem odpreti namesto tebe). Ko si prijavljen, se
   aplikacija objavi kot trajna stran.
2. Ime poddomene po želji (npr. `izbor-filma-ps.netlify.app`) — Netlify:
   *Project configuration → Change site name*.
3. QR koda končnega naslova: v Chromu desni klik na stran → *Ustvari kodo QR za to stran*,
   ali `qrencode -o qr.png -s 12 'https://<naslov>'`.

## Opozorilo o Netlify Drop brez računa

Brez prijave Netlify Drop:

- stran **zaklene z geslom** (`My-Drop-Site`) → udeleženci ne morejo dostopati (HTTP 401), in
- jo **po eni uri izbriše**.

Zato brez prijave ta pot ni uporabna za dogodek. Alternativa, če Netlify ne pride v poštev:
GitHub Pages ali Cloudflare Pages (obe zahtevata prijavo) — ali pa kiosk način iz
`REZERVNI-NACRT.md`, ki omrežja ne rabi.

## Preverjanje po objavi

Ko bo stran objavljena, na telefonu **z mobilnimi podatki** (ne po WiFi):

1. odpri naslov, oddaj testni glas,
2. na `rezultati.html` preveri, da se je števec povečal,
3. testni glas pobriši: v Apps Script urejevalniku zaženi funkcijo `pobrisiGlasove`,
   ali ročno pobriši vrstico v preglednici.
