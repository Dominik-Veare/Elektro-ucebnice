# ⚡ ElektroUčebnice: Montér elektrických instalací (26-017-H)

Kompletní interaktivní učebnice a trenažér navržený pro přípravu na státní profesní zkoušku **Montér / montérka elektrických instalací (kód: 26-017-H)** dle standardu NSK, legislativy **NV č. 194/2022 Sb.** a elektrotechnických norem ČSN.

---

## 🚀 Jak aplikaci spustit na PC

Nejjednodušší způsob:
1. Dvakrát klikni na soubor **`Spustit-ElektroUcebnici.bat`** přímo ve složce.
2. Aplikace se automaticky otevře ve tvém výchozím webovém prohlížeči na adrese `http://localhost:4173`.

Nebo přes příkazovou řádku:
```bash
npm run preview
# nebo pro vývojářský režim:
npm run dev
```

---

## 📱 Jak mít aplikaci na mobilu v práci

Jelikož je aplikace postavena jako **PWA (Progressive Web App)**:

### 1. Způsob (Doporučeno – zdarma přes Vercel / GitHub):
1. Nahraj složku na bezplatný hosting (např. [Vercel](https://vercel.com) nebo GitHub Pages) – trvá to cca 2 minuty.
2. Na mobilu v práci otevřeš odkaz v prohlížeči (např. Chrome).
3. V nabídce prohlížeče klikneš na **„Přidat na plochu“** (nebo „Nainstalovat aplikaci“).
4. Aplikace se uloží do telefonu a **bude fungovat 100% offline** i v metru nebo na stavbě bez signálu.

### 2. Způsob (Sdílení postupu PC ↔ Mobil):
* V aplikaci vpravo nahoře klikni na tlačítko se **studijním kódem** (např. `EL-XY1234`).
* Na mobilu otevři aplikaci a do políčka „Připojit kód z druhého zařízení“ zadej tento kód a klikni na **Spárovat**.
* Všechny splněné kapitoly, výsledky testů i tvá **Kniha chyb** se automaticky synchronizují mezi oběma zařízeními!

---

## 🛠️ Funkce a moduly aplikace

1. 📖 **Interaktivní učebnice (8 kapitol dle standardu NSK)**
   * Aplikování základních pojmů a vztahů v elektrotechnice
   * Dodržování bezpečnosti, 5 pravidel beznapěťového stavu a NV 194/2022 Sb.
   * Dimenzování, jištění a kladení vedení (ČSN 33 2000-5-52)
   * Technická dokumentace a schematické značky (ČSN EN 60617)
   * Nářadí 1000 V (ČSN EN 60900) a revizní měření (Zs, Riso, RCD)
   * Provádění elektroinstalací a zapojování
   * Diagnostikování poruch elektroinstalací
   * Poskytování první pomoci při úrazu el. proudem (KPR 30:2)

2. ⏱️ **Simulátor písemné části zkoušky (45 minut)**
   * Časovaný test s náhodným výběrem otázek ze všech okruhů.
   * Možnost označování otázek k revizi.
   * Hodnocení dle oficiálních kritérií zkoušky (Vyhověl / Nevyhověl, hranice 75 %).
   * Režim podrobného rozboru chyb.

3. 🎯 **Inteligentní Kniha chyb**
   * Automatický sběr otázek, ve kterých jsi chyboval.
   * Režim zacíleného procvičování.
   * Otázka je označena jako zvládnutá po 2 správných odpovědích za sebou.

4. 🗂️ **Kartičky pro ústní část (Flashcards)**
   * Klíčové otázky a postupy pro ústní přezkoušení před komisí.
   * Filtrování dle témat: 5 pravidel beznapětí, revize, normy, první pomoc.

5. ⚡ **Elektrotechnické kalkulačky**
   * Výpočet průřezu vodiče a úbytku napětí $\Delta U$ dle ČSN 33 2130 ed. 3.
   * Výpočet impedance poruchové smyčky $Z_s$ a ověření odpojení pro jističe B, C, D.
   * Ohmův zákon a výpočet výkonu AC/DC.

6. 💡 **Interaktivní schémata zapojení**
   * Klikací simulátor spínačů: řazení 1, řazení 5, schodišťové 6+6, křížové 6-7-6.
   * Interaktivní simulátor proudového chrániče s posuvníkem únikového proudu.

7. 🔍 **Diagnostika poruch**
   * Simulované reálné scénáře závad v instalaci (svod N-PE, přerušený nulák, záměna N a PE).
   * Krok za krokem vyhledávání zkoušečkou a megmetem.
