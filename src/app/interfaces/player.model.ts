import { Country } from "./countries.enum";
import { SquadNumber } from "./squadNumber.enum";

export interface Player{
    $key?: string;
    name: string;
    lastName: string;
    position: SquadNumber;
    weight: number;
    height: number;
    nationality: Country;
    leftFooted: boolean;
}