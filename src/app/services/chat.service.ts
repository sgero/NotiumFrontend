import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ChatMensajeDTO} from "../models/ChatMensajeDTO";

@Injectable({
  providedIn: 'root'
})

export class ChatService{
  private apiUrl = 'http://127.0.0.1:8080/chat';
  constructor(private http: HttpClient) { }

  getMensajesByOcio(id:number){
    return this.http.get<ChatMensajeDTO[]>(`${this.apiUrl}/mensajes/${id}`);
  }

  verificarClienteEnChat(idCliente:number, idChat:number){
    return this.http.get<boolean>(`${this.apiUrl}/${idCliente}/${idChat}`);
  }

  guardar(dto:ChatMensajeDTO){
    return this.http.post<ChatMensajeDTO>(`${this.apiUrl}/guardar`, dto);
  }

  eliminarMensaje(id:number){
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizarClienteChat(idCliente:number, idChat:number){
    return this.http.post<void>(`${this.apiUrl}/actualizar/${idCliente}/${idChat}`, null);
  }


}
