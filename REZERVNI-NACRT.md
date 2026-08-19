# Rezervni načrti (če aplikacija na dan D ne dela)

Pravilo: **pred predstavitvijo imej pripravljen rezervni načrt B, ne šele takrat, ko A odpove.**
Vsi trije spodnji načini dajo enak rezultat — vsak človek izbere en film, zmaga film z največ glasovi.

---

## Načrt B — Google Obrazec (Forms)

Najbolj zanesljivo, kar obstaja: Google poskrbi za strežnik, obrazec je majhen,
odpre se tudi na počasni povezavi, rezultate pa sam sešteje v grafe.

**Postavitev (5 minut):**

1. Odpri <https://forms.new>
2. Naslov: `Kateri film gledamo?`
3. Dodaj **eno samo vprašanje**:
   - Vprašanje: `Kateri film gledamo?`
   - Tip: **Več možnih izbir** (Multiple choice) — dovoljuje samo en odgovor
   - Možnosti: `Gattaca` / `The Usual Suspects` / `Superbad`
   - Vklopi **Obvezno** (Required)
4. Neobvezno prvo vprašanje: `Tvoje ime` (kratek odgovor, ni obvezno).
5. V *Nastavitvah* pusti **Zbiranje e-poštnih naslovov izklopljeno** (hitrejše, bolj anonimno).
6. **Pošlji → ikona povezave → Skrajšaj URL** → tak naslov je berljiv na projektorju.
   QR koda: Chrome → desni klik na odprt obrazec → *Ustvari kodo QR*.
7. Rezultati: zavihek **Odgovori** → grafi so že narejeni, ali **Poveži s preglednico** za ročno seštevanje.

**Kako iz Obrazca dobiš rezultat:** Obrazec sam nariše tortni graf odgovorov — zmaga največji
kos. Nič računanja.

**Slabost:** obrazec je videti kot Googlov obrazec, ne kot vaša aplikacija — za nalogo
"vibe coding aplikacije" je to načrt B, ne A.

---

## Načrt C — Kiosk način (brez omrežja, nič internet)

Ko ni ne WiFi-ja ne mobilnega signala. Deluje na enem samem laptopu, popolnoma offline.

1. V `app/filmi.js` pusti `scriptUrl: ''` (prazno).
2. Odpri datoteko neposredno v brskalniku:
   ```
   file:///home/username/dev/claude/izbor-filma/app/index.html?kiosk=1
   ```
3. Laptop kroži po sobi. Vsak odda glas, stran se sama počisti za naslednjega (4 sekunde).
4. Rezultati: `rezultati.html` v isti mapi — bere glasove iz brskalnika.

Pri 30 ljudeh je to ~30 × 20 sekund ≈ 10 minut. Delno rešitev dobiš,
če pripraviš dva ali tri laptope/telefone in glasove na koncu sešteješ.

> **Ne briši zgodovine brskalnika in ne odpiraj v zasebnem načinu** — glasovi so v `localStorage`
> tega profila. Isti brskalnik, isti zavihek, do konca glasovanja.

---

## Načrt D — 30 sekund, nič tehnologije

Če odpove vse: na projektor napiši 5 naslovov, trikrat dvigneš roko po filmih
(*"kdo bi gledal Interstellar?"* — Ja = 2 točki), asistent šteje.
Rezultat je matematično enak, aplikacijo pa pokažeš kot demo na svojem zaslonu.

---

## Kontrolni seznam pred nastopom

- [ ] `filmi.js` ima prave filme in pravi `scriptUrl`
- [ ] Mapa `app/` je objavljena, naslov deluje **na telefonu preko mobilnih podatkov** (ne le na laptopu)
- [ ] Testni glas oddan → vrstica se je pojavila v preglednici → pobrisana s `pobrisiGlasove`
- [ ] QR koda shranjena kot slika **na laptopu** (ne odvisna od interneta v tistem trenutku)
- [ ] Google Obrazec (načrt B) že narejen in povezava shranjena
- [ ] `rezultati.html` odprt v ločenem zavihku za projektor
- [ ] Telefon z mobilnimi podatki pripravljen kot dostopna točka, če je WiFi res mrtev
