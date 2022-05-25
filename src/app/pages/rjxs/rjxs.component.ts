import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rjxs',
  templateUrl: './rjxs.component.html',
  styles: [
  ]
})
export class RjxsComponent implements OnDestroy {

  public intervalSubs!: Subscription;


  constructor() {
    // let i = -1;

    // const obs$ = new Observable<number>(observer => {

    //   const intervalo = setInterval(() => {



    //     i++;
    //     observer.next(i);

    //     if (i === 4) {
    //       clearInterval(intervalo);
    //       observer.complete();

    //     }

    //     if (i === 2) {
    //       observer.error("i llego al valor de 2");
    //     }

    //   }, 1000)
    // });


    // obs$.pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log("Subs", valor),
    //   error => console.warn("Error", error),
    //   () => console.info("Obs terminado")
    // );





  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(500).pipe(
      // take(10),
      map(valor => {
        return valor + 1;
      }),
      filter(valor => (valor % 2 === 0) ? true : false),
    )
    return intervalo$;
  }


}
