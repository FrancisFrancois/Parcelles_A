import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListAccount, ReadAccount, RegisterAccount, ResetPassword, ResetPasswordRequest, UpdateAccount } from '../../features/account-management/models/registerAccount';
import { searchAccount } from '../../features/account-management/models/searchAccount';

/**
 * Service utilisé pour réalisé des requêtes http aux backend concernant les objets utilisateurs
 */
@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  /**
   * variable de la base commune des urls utilisés dans ce service
   */
  private _url: string = this._urlBase+'/user';

  /**
   * Constructeur du service
   * 
   * @param _httpClient injection de dépendance du service permettant l'envoi de requête http
   * @param _urlBase Injection de l'information centralisée de l'adresse du backend
   */
  constructor(private _httpClient: HttpClient,
    @Inject('urlBackend') private _urlBase : string) { }

  /**
   * Fonction de récupération d'une liste brute d'utilisateur
   * 
   * @returns l'observalbe de la requête
   */
  getAll() : Observable<ListAccount[]> {
    return this._httpClient.get<ListAccount[]>(`${this._url}/all`);	
  }
  /**
   * Fonction de récupération des informations détaillées d'un utilisateur spécifique
   * 
   * @param id identifiant de l'utilisateur
   * @returns l'observalbe de la requête
   */
  getById(id : number) : Observable<ReadAccount> {
    return this._httpClient.get<ReadAccount>(`${this._url}/${id}`);
  }
  /**
   * Fonction permettant la création d'un utilisateur
   * 
   * @param registerAccount objet contenant les données du nouvel utilisateur
   * @returns l'observalbe de la requête
   */
  create(registerAccount : RegisterAccount): Observable<RegisterAccount> {
    return this._httpClient.post<RegisterAccount>(`${this._url}/register`, registerAccount);
  }
    /**
   * Fonction permettant la mise à jour des informations d'un utilisateur
   * 
   * @param registerAccount objet contenant les données du nouvel utilisateur
   * @returns l'observalbe de la requête
   */
  update(id : number, registerAccount : UpdateAccount) : Observable<UpdateAccount> {
    return this._httpClient.put<UpdateAccount>(`${this._url}/${id}`, registerAccount);
  }
  /**
   * Fonction permettant la "suppression" d'un utilisateur
   * 
   * L'utilisateur sera surtout marqué en bloqué
   * 
   * @param id l'identifiant de l'utilisateur visé
   * @returns l'observalbe de la requête
   */
  delete(id : number) : Observable<RegisterAccount> {
    return this._httpClient.delete<RegisterAccount>(`${this._url}/${id}`);
  }
  /**
   * Fonction permettant d'afiner la liste des utilisateurs selon certains critères
   * 
   * @param criteria un objet contenant les critères de recherches
   * @returns l'observalbe de la requête
   */
  searchUsers(criteria : searchAccount): Observable<ListAccount[]> {
    let updateUrl: string = `${this._url}/all/search`;
    return this._httpClient.post<ListAccount[]>(updateUrl, criteria)
  }

  /**
   * Fonction permettant d'envoyer une requête de récupération du mot de passe
   * 
   * @param resetPasswordRequest objet contenant les données de l'utilisateur
   * @returns l'observalbe de la requête
   */
  resetPasswordRequest(resetPasswordRequest : ResetPasswordRequest) : Observable<ResetPasswordRequest> {
    return this._httpClient.post<ResetPasswordRequest>(`${this._url}/resetpasswordrequest`, resetPasswordRequest)
  }
  /**
   * Fonction permettant le reset d'un mot de passe oublié
   * 
   * @param resetPassword objet contenant les données du nouveau mot de passe
   * @returns l'observalbe de la requête
   */
  resetPassword(resetPassword : ResetPassword, token : string) : Observable<ResetPassword> {
    return this._httpClient.put<ResetPassword>(`${this._url}/resetpassword?token=${token}`, resetPassword)
  }
};
