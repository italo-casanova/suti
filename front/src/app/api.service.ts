import { Injectable } from '@angular/core';

class HttpHeaders {
  constructor(param: { "Content-Type": string }) {
    
  }

}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json;charset=utf-8'}
    )
  };
  errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  constructor(private http: HttpClient) { }

  registrarPuntuacion(data: puntaje): Observable<puntaje>{
    return this.http.post<puntaje>('http://localhost:8080/registrarPuntuacion', null, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  actualizarFlagsAtleta(data: atleta): Observable<atleta>{
    return this.http.post<atleta>('http://localhost:8080/actualizarFlagsAtleta', data, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  obtenerPuntajePromedio(): Observable<RespuestaAtletaDetalle>{
    return this.http.post<RespuestaAtletaDetalle>('http://localhost:8080/obtenerPromedio', null, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }
}
