import { ReactiveModel } from 'rxjs-decorators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


export class ReactiveComponent<T> extends ReactiveModel {

  protected form: FormGroup;

  constructor(private fb: FormBuilder, private model: T) {
    super()
    this.form = this.fb.group(this.model);
    for (const control in this.form.controls) {
      this[control] = this.form.get(control).valueChanges;
    }
  }
}