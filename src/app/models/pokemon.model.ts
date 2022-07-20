import { environment } from "src/environments/environment";
export class Pokemon {
    public name: string;
    private id: string;
    public avatar: string;
    public defaultURL: string = `${environment.apiSprites}/0.png`

    public constructor(_name: string, _id: string) {
        this.name = _name[0].toUpperCase() + _name.substring(1);
        this.id = _id;
        this.avatar = `${environment.apiSprites}/${this.id}.png`;
    }
}