export class User{
    public id : string = "";
    public username : string ="";
    public prenom : string ="";
    public adresse : string = "";
    public nom_Entreprise : string = "";
    public email : string="";
    public telephone : string = "";
    public activite_Entreprise : string = "";
    public taille_Entreprise : string = "";
    public code_Fiscale : string = "";
    public role : string ="";


  constructor(id: string, username: string, prenom: string, adresse: string, nom_Entreprise: string, email: string, telephone: string, activite_Entreprise: string, taille_Entreprise: string, code_Fiscale: string, role: string) {
    this.id = id;
    this.username = username;
    this.prenom = prenom;
    this.adresse = adresse;
    this.nom_Entreprise = nom_Entreprise;
    this.email = email;
    this.telephone = telephone;
    this.activite_Entreprise = activite_Entreprise;
    this.taille_Entreprise = taille_Entreprise;
    this.code_Fiscale = code_Fiscale;
    this.role = role;
  }
}
