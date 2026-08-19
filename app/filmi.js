/* ============================================================
   NASTAVITVE — edino, kar moraš urejati pred uporabo.
   ============================================================ */

window.KONFIG = {

  /* Naslov na vrhu strani */
  naslov: 'Kateri film gledamo?',
  podnaslov: 'Izberi en film. Vsak ima en glas.',

  /* --------------------------------------------------------
     POVEZAVA DO GOOGLE APPS SCRIPT (glej NAVODILA.md, korak 2)
     Pusti prazno ('') => aplikacija dela v LOKALNEM načinu:
     glasovi se shranijo samo v ta brskalnik (uporabno za
     "kiosk" rezervni načrt, ko en laptop kroži po sobi).
     -------------------------------------------------------- */
  scriptUrl: 'https://script.google.com/macros/s/AKfycbyuUtUQXc3oAeJjLhQyDo1-trjfqVAN4AfOuG6jeHEmoy9QBEADkoWqclP0K0lTib-h3A/exec',

  /* Koliko sekund naj se stran z rezultati sama osvežuje */
  osvezevanjeSekund: 6,

  /* --------------------------------------------------------
     FILMI — zamenjaj z vašimi. Priporočeno 3-5 filmov.
     'id' mora biti kratek, brez šumnikov in presledkov,
     ker postane ime stolpca v Google Preglednici.
     'plakat' je pot do slike v mapi app/plakati/ (neobvezno —
     brez nje se kartica izriše samo z besedilom). Slike so lokalne,
     da stran ne potrebuje nobenega zunanjega strežnika.
     -------------------------------------------------------- */
  filmi: [
    {
      id: 'gattaca',
      plakat: 'plakati/gattaca.jpg',
      naslov: 'Gattaca',
      leto: 1997,
      zanr: 'ZF drama / triler',
      dolzina: '106 min',
      opis: 'V svetu, kjer o tvoji usodi odloči DNK, si moški z "napačnimi" geni izposodi tujo identiteto, da bi prišel v vesolje.'
    },
    {
      id: 'suspects',
      plakat: 'plakati/suspects.jpg',
      naslov: 'The Usual Suspects',
      leto: 1995,
      zanr: 'Kriminalka / triler',
      dolzina: '106 min',
      opis: 'Edini preživeli iz krvavega obračuna v pristanišču policiji pripoveduje, kdo je skrivnostni Keyser Söze.'
    },
    {
      id: 'superbad',
      plakat: 'plakati/superbad.jpg',
      naslov: 'Superbad',
      leto: 2007,
      zanr: 'Komedija',
      dolzina: '113 min',
      opis: 'Dva prijatelja poskušata pred koncem srednje šole priskrbeti pijačo za zabavo. Narobe gre vse, kar lahko.'
    }
  ],

  /* Kaj se zapiše v preglednico za izbrani film. Ne spreminjaj:
     zaledje (Code.gs) šteje vrednost 2 kot glas ZA, 0 pa kot "ni izbral". */
  vrednostIzbranega: 2
};
