import { Player } from './player.model';
import { Country } from './countries.enum';

export interface Team{
    $key?: string;
    name: string;
    country: Country;
    players: Player[];
}