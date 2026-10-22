# Ráðgátustofan

Verkefnavefur fyrir 7. bekk. Hver frétt er eitt „mál“ í sinni eigin möppu.

```
radgatur/
├── index.html              forsíðan með möppunum
├── css/stofan.css          sameiginlegt útlit fyrir allar síður
└── mal-01-radgatur/
    ├── index.html          fréttin og öll verkefnin
    └── stillingar.js       hér opnar kennarinn læsta hluta
```

## Að opna læsta hluta

Samfélagsfræði og Að lokum eru læst þar til þú opnar þau.

1. Opnaðu `radgatur/mal-01-radgatur/stillingar.js` á GitHub og ýttu á blýantinn (Edit).
2. Breyttu `false` í `true` við þann hluta sem á að opna.
3. Ýttu á **Commit changes**. Breytingin sést hjá nemendum eftir 1–10 mínútur. Nemendur sem eru með síðuna opna þurfa að endurhlaða hana.

`rod: true` þýðir að nemendur verða að klára *Fyrir lestur* og *Á meðan lesið er* áður en orðaforði og lesskilningur opnast. Ef þú setur `false` er það opið strax.

## Leiðin

| Hluti | Krafa |
| --- | --- |
| Fyrir lestur | Bæði verkefnin |
| Á meðan lesið er | Verkefnið |
| Orðaforði | Tvö af fimm |
| Lesskilningur | Tvö af fjórum |
| Samfélagsfræði | Öll, læst þar til kennari opnar |
| Að lokum | Öll, læst þar til kennari opnar |

Nemendur merkja sjálfir við *Ég er búin(n) með verkefnið* neðst á hverri verkefnasíðu.

Slóðin verður `steingrimursig.github.io/radgatur/`.

## Nýtt mál

1. Afritaðu möppuna `mal-01-radgatur` og gefðu henni nýtt nafn, t.d. `mal-02-eldgos`.
2. Opnaðu `index.html` í nýju möppunni og breyttu:
   - `const KEY = 'mal01:'` í `'mal02:'`. Annars blandast svör nemenda á milli mála.
   - `ARTICLE`, sem er hlekkurinn á fréttina.
   - Gögnunum efst: `CORE` (kjarnaorð og hvar þau eru), `IDIOMS`, `POS`, `COMPOUNDS`, `EVENTS` og `MYST`.
   - Textunum í hverju `def(...)`-verkefni og í `news()`.
   - `<title>` efst í skránni.
3. Í `radgatur/index.html` afritarðu `<a class="folder">`-blokkina og breytir `href`, dagsetningu, fyrirsögn og lýsingu.

Verkefni sem passa ekki við nýja frétt fjarlægirðu úr `GROUPS`.

## Gott að vita

- Það sem nemendur skrifa og merkja geymist aðeins í vafranum á tækinu þeirra. Það fer hvorki til kennara né á milli tækja.
- Hægt er að senda hlekk beint á verkefni, t.d. `.../mal-01-radgatur/#ordtok`.
