export class Offre {
  public id: string = "";
  public titre: string = "";
  public description: string = "";
  public reference: string = ";"
  public dateCreation: string = "";
  public domaineId: string = "";
  public Employe: string = "";
  public UserId: string = "";


  constructor(id: string, titre: string, description: string, reference: string, dateCreation: string, domaineId: string, Employe: string,UserId: string) {
    this.id = id;
    this.titre = titre;
    this.description = description;
    this.reference = reference;
    this.dateCreation = dateCreation;
    this.domaineId = domaineId;
    this.Employe = Employe;
    this.UserId = UserId;
  }
}
