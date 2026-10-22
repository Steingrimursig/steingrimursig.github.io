# Ráðgátustofan

Verkefnavefur fyrir 7. bekk. Hver frétt er eitt „mál“ í sinni eigin möppu.

```
radgatur/
├── index.html              forsíðan með möppunum
├── css/stofan.css          sameiginlegt útlit fyrir allar síður
└── mal-01-radgatur/
    └── index.html          fréttin og öll verkefnin
```

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
