// Vytváříme třídu SeznamPojistenců a do ní vkládáme metody na spracování dat zadanných uživatelem.

class SpravaPojisteni {
  constructor() {
    //používáme DOM a načítáme html elementy
    this.seznamPojistencu = document.querySelector(".seznam-pojistencu");
    this.ulozit = document.getElementById("ulozit");
    this.formular = document.getElementById("formular");

    // Přidáváme event listener, který bude čekat na moment kdy uživatel klikne na tlačítko "Uložit", poté voláme callbackem metodu pridejPojistence
    this.ulozit.addEventListener("click", () => this.pridejPojistence());

    // Načítáme pojištěnce uložené v LocalStoragi
    this.nactiPojistence();
  }

  // V této metodě získáváme hodnoty, které uživatel vložil do políček v době kliknutí na tlačítko uložit a ukládáme je do příslušných proměnných
  pridejPojistence() {
    const jmeno = document.getElementById("jmeno").value;
    const prijmeni = document.getElementById("prijmeni").value;
    const vek = document.getElementById("vek").value;
    const telefon = document.getElementById("telefon").value;

    // Voláme metodu pro validaci hodnot v políčcích, pokud validace selže, data se neodešlou.
    if (!this.zkontrolujData(jmeno, prijmeni, vek, telefon)) {
      return;
    }

    // Načítáme existující data z LocalStorage, parsujeme je z JSON stringu a případně vkládáme prázdné pole pro případ že by v LocalStoragi nebyly žádné záznamy.
    let udajePojistencu = JSON.parse(localStorage.getItem("pojistenec")) || [];

    // Vytváříme novou instanci z třídy Pojistenec, využíváme hodnoty z políček zadané uživatelem.
    const pojistenec = new Pojistenec(jmeno, prijmeni, vek, telefon);

    // Kontrolujeme zda jsou údaje uložené v poli, pokud ne pole vytváříme. Tím pádem se vyhneme případu kdy nelze použít push metodu.
    if (!Array.isArray(udajePojistencu)) {
      udajePojistencu = [];
    }

    // Přidáváme nový záznam do pole pojištěnců
    udajePojistencu.push(pojistenec);

    // Nové pole pojistěnců převadíme na JSON string a ukládáme do LocalStorage
    localStorage.setItem("pojistenec", JSON.stringify(udajePojistencu));

    // Voláme metodu na vymazaní hodnot políček po odeslání
    this.mazaniPolicek();

    // Zobrazujeme aktuální seznam pojištěnců
    this.nactiPojistence();
  }

  // Metoda pro načtení dat pojištěnců z LocalStorage a jejich následné zobrazení v tabulce na stránce.
  nactiPojistence() {
    // Získání dat z LocalStorage a parsovaní dat na JS objekt. Případně opět v kládáme prázné pole abychom udrželi validitu pro zbytek kódu, který předpokládá, že pojistenci jsou pole.
    const pojistenci = JSON.parse(localStorage.getItem("pojistenec")) || [];

    // Vytvaříme html tabulku a ukládáme jí do proměnné.
    const tabulka = document.createElement("table");

    /* V této metodě vytváříme hlavičku tabulky poté procházíme každou vlastnost(key hodnotu) na začátku pole pojistenci a
    každou vlastnost dělíme na začáteční písmeno, které převádíme na Velké metodou toUpperCase a poté přidáváme zbytek slova a opět spojujeme do jednoho stringu pro každou vlastnost. Při každé iteraci apendujeme buňky hlavičky k řádku hlavičky*/
    const radekHlavicky = tabulka.insertRow(0);
    for (const vlastnost in pojistenci[0]) {
      const bunkaHlavicky = document.createElement("th");
      bunkaHlavicky.textContent =
        vlastnost.charAt(0).toUpperCase() + vlastnost.substring(1);
      radekHlavicky.appendChild(bunkaHlavicky);
    }

    /* Pro každý uložený záznam v poli pojištěnci vytváříme řáděk a buňky v těle tabulky */
    for (const pojistenec of pojistenci) {
      const radekTabulky = tabulka.insertRow();
      for (const zaznam in pojistenec) {
        const bunkaTabulky = radekTabulky.insertCell();
        bunkaTabulky.textContent = pojistenec[zaznam];
      }
    }

    // Appendujeme vytvořenou tabulky do našeho připravného divu v html struktuře
    this.seznamPojistencu.innerHTML = "";
    this.seznamPojistencu.appendChild(tabulka);
  }

  // Metoda pro vymazaní hodnot políček. Vkládáme prázdný string.
  mazaniPolicek() {
    document.getElementById("jmeno").value = "";
    document.getElementById("prijmeni").value = "";
    document.getElementById("vek").value = "";
    document.getElementById("telefon").value = "";
  }

  // Metoda pro kontrolu a validaci vkládaných hodnot za využítí "regular Expressions".
  zkontrolujData(jmeno, prijmeni, vek, telefon) {
    // tato výjimka umožňuje do Jména a příjmení vložit jakékoliv UTF-8 písmena, mimo čísel a speciálních znaků.
    const kontrolaJmena = /^[^\d!@#$%^&*()_+={}\[\]:;<>,.?\/~\\|-]+$/;
    // Můžeme vložit pouze čísla 0-9
    const kontrolaVeku = /^\d+$/;
    // Můžeme vložit pouze 9-ti místnou kombinaci čísel
    const kontrolaTelCisla = /^\d{9}$/;

    // Kontrolujeme zda hodnoty políček, neopsahují žádnou z vyjímek, které jsme právě stanovili.
    if (!kontrolaJmena.test(jmeno)) {
      alert("Zkontrolujte jméno a zkuste to znovu.");
      return false;
    }

    if (!kontrolaJmena.test(prijmeni)) {
      alert("Zkontrolujte příjmení a zkuste to znovu.");
      return false;
    }
    // U věku přidáváme pomocí OR operátoru podmínky pro výšku věku, které by byly taktéž nevalidní
    if (!kontrolaVeku.test(vek) || vek < 15 || vek > 125) {
      alert("Zkontrolujte věk a zkuste to znovu.");
      return false;
    }

    if (!kontrolaTelCisla.test(telefon)) {
      alert(
        "Zkontrolujte telefonní číslo (zadejte 9-ti místné číslo bez předvolby)."
      );
      return false;
    }
    // Vracíne true pouze pokud jsou všechny podmínky splněny.
    return true;
  }
}
