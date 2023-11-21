// Vytváříme třídu Pojistenec , od které se budou vytvářet instance na základě uživatelem vyplněných dat.

class Pojistenec {
  constructor(jmeno, prijmeni, vek, telefon) {
    this.jmeno = jmeno;
    this.prijmeni = prijmeni;
    this.vek = vek;
    this.telefon = telefon;
  }

  // Při vytváření nové instance z třídy Pojistenec zavoláme metodu toString, která převadí objekt na string.

  toString() {
    return `Jméno : ${this.jmeno}, Příjmení ${this.prijmeni}, Věk: ${this.vek}, Telefon: ${this.telefon}`;
  }
}
