import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServService } from '../app/serv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // aqui é onde ficarão todas as opções trazidas pela requisição
  public options: string[] = [];

  // aqui é onde ficarão apenas os nomes que contém na string o valor que for inserido no input
  public filteredOptions: string[] = [];

  public form: FormGroup;

  constructor(private _service: ServService, private _fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.getData();
  }

  // construção do formulário
  public initForm() {
    this.form = this._fb.group({
      name: [null],
    });

    // detecção de mudanças no valor do input
    this.form.get('name').valueChanges.subscribe((response: string) => {
      this.filterData(response);
    });
  }

  // filtro
  public filterData(entryValue: string) {
    this.filteredOptions = this.options.filter((item) => {
      return item.toLowerCase().includes(entryValue.toLocaleLowerCase());
    });
  }

  // requisição
  public getData() {
    this._service.getData().subscribe(response => {
      this.options = response.map(item => item.name);
      this.filteredOptions = this.options;
    });
  }
}
