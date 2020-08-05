import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Team } from '../interfaces/team.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const TeamsTableHeaders = ['name', 'country', 'players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamDB: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamDB = this.db.list('/teams', (ref) => ref.orderByChild('name'));
  }

  // Buscar equipo
  getTeams(): Observable<Team[]>{
    return this.teamDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  // Agregar jugadores
  addTeam(team: Team){
    return this.teamDB.push(team);
  }

  // Borrar jugadores
  deleteTeams(id: string){
    this.db.list('/teams').remove(id);
  }

  // Editar equipo
  uploadTeam(newTeamData){
    const $key = newTeamData.$key;
    delete(newTeamData.$key);
    this.db.list('/teams').update($key, newTeamData);
  }
}
