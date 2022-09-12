export class Employe {
  public id: string = "";
  public nCin: string = "";
  public nom: string = "";
  public prenom: string = ";"
  public poste: string = "";
  public matricule: string = "";
  public email: string = "";
  public adresse: string = "";
  public tel: string = "";
  public salaire: string = "";
  public userId: string = "";


  constructor(id: string, nCin: string, nom: string, prenom: string, poste: string, matricule: string, email: string, adresse: string, tel: string, salaire: string, userId: string) {
    this.id = id;
    this.nCin = nCin;
    this.nom = nom;
    this.prenom = prenom;
    this.poste = poste;
    this.matricule = matricule;
    this.email = email;
    this.adresse = adresse;
    this.tel = tel;
    this.salaire = salaire;
    this.userId = userId;
  }
}


