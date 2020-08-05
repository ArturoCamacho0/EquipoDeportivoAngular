import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Player } from '../interfaces/player.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersDB: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDB = this.db.list('/players', (ref) => ref.orderByChild('name'));
  }

  // Buscar jugadores
  getPlayers(): Observable<Player[]>{
    return this.playersDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  // Agregar jugadores
  addPlayer(player: Player){
    return this.playersDB.push(player);
  }

  // Borrar jugadores
  deletePlayers(id: string){
    this.db.list('/players').remove(id);
  }

  // Editar jugadores
  uploadPlayer(newPlayerData){
    const $key = newPlayerData.$key;
    delete(newPlayerData.$key);
    this.db.list('/players').update($key, newPlayerData);
  }
}
