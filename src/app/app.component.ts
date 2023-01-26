import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServService } from '../app/serv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title = 'autocomplete';

  public options: string[] = [];
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
      employee: [null],
    });

    // detecção de mudanças no valor do input
    this.form.get('employee').valueChanges.subscribe((response: string) => {
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
