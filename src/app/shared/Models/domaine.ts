export class Domaine {
  public id:string="";
  public nom: string="";
  public offre : string="";

  constructor(id : string,nom : string, offre:string) {
    this.nom= nom;
    this.id=id;
    this.offre= offre;
  }
}
