import { environment } from "src/environments/environment";
export class Pokemon {
    public name: string;
    private id: string;
    public avatar: string;

    public constructor(_name:string, _id:string)
    {
        this.name = _name;
        this.id = _id;
        this.avatar = `${environment.apiSprites}/${this.id}.png`;
    }
}