import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServService } from '../app/serv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // aqui é onde ficarão todas as opções trazidas pela requisição
  public options: string[] = [];

  // aqui é onde ficarão apenas os nomes que contém na string o valor que for inserido no input
  public filteredOptions: string[] = [];

  public form: FormGroup;

  public subscriptions$ = new Subscription();

  constructor(private _service: ServService, private _fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.getData();
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

  // construção do formulário
  public initForm() {
    this.form = this._fb.group({
      name: [null],
    });

    // detecção de mudanças no valor do input
    this.subscriptions$.add(
      this.form.get('name').valueChanges.subscribe((response: string) => {
        this.filterData(response);
      })
    );
  }

  // filtro
  public filterData(entryValue: string) {
    this.filteredOptions = this.options.filter((item) => {
      return item.toLowerCase().includes(entryValue.toLowerCase());
    });
  }

  // requisição
  public getData() {
    this.subscriptions$.add(
      this._service.getData().subscribe((response) => {
        this.options = response.map((item) => item.name);
        this.filteredOptions = this.options;
      })
    );
  }
}
