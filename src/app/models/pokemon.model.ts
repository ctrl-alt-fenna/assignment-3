import { environment } from "src/environments/environment";
export class Pokemon {
    public name: string = '';
    private id: string;
    public avatar: string;

    public constructor(_name: string, _id: string) {
        this.formatName(_name);
        this.id = _id;
        this.avatar = `${environment.apiSprites}/${this.id}.png`;
    }
    public formatName(name:string){
        let splitName = name.split('-')
        let formattedName = ''
        for (const word of splitName) {
            formattedName += (word[0].toUpperCase() + word.substring(1) + " ");
        }
        this.name = formattedName.trim();
    }
}