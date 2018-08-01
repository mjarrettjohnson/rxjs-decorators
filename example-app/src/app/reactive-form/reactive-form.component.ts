import { Component, OnInit } from '@angular/core';
import {
  ReactiveModel,
  Subscribe,
  CombineLatest,
  Transform,
  Debug,
  StartWith,
  Exists,
  createDecorator,
  MonoOperatorListMetadata,
  MonoOperatorMetadata,
  Pipe,
  ShareReplay,
  DebounceTime,
  Next,
  Call,
  Behaviour
} from 'rxjs-decorators';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { flowRight } from 'lodash-es';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ReactiveComponent } from './decorators';
import { Subject } from 'rxjs/internal/Subject';

export class Person {
  firstName = '';
  lastName = '';
  phoneNumber = '';
}

export interface PersonError {
  firstName: {
    error: string
  },
  lastName: {
    error: string
  }
}

const toSentence = (x: string) => x ? x[0].toUpperCase() + x.slice(1, x.length) : ''

const trim = (x: string) => x.trim();

const createPerson = ([firstName, lastName, phoneNumber]: [string, string, string]): Person => ({ firstName, lastName, phoneNumber })

const validateFirstName = (firstName: string) => {
  return firstName && firstName.length < 3;
}

const validateLastName = (lastName: string) => {
  return lastName && lastName.length < 3;
}

const validatePhone = (phone: string) => {
  return !phone.match(/^04\d{8}$/)
}

const createPersonError: (person: Person) => PersonError = (person: Person) => ({
  firstName: {
    error: validateFirstName(person.firstName) ? 'Required' : ''
  },
  lastName: {
    error: validateLastName(person.lastName) ? 'Required' : ''
  },
  phoneNumber: {
    error: validatePhone(person.phoneNumber) ? 'Invalid Format' : ''
  }
})

const ValidatePerson = (initial?: any) => Pipe([
  Behaviour(),
  Exists(),
  Debug(),
  Transform(createPersonError)
]);

const CreatePerson = (...personProps: string[]) => Pipe([
  CombineLatest(...personProps),
  Transform(createPerson),
  DebounceTime(250),
  ShareReplay(1),
])

const SentenceCase = (initial: string) => Pipe([
  StartWith(initial),
  Transform(toSentence),
  Transform(trim),
]);

const NumberInput = (initial: string = '') => Pipe([
  StartWith(initial),
  Transform((x: string) => x.replace(/[^\d]+/, ''))
]);

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent extends ReactiveComponent<Person> implements OnDestroy {

  @SentenceCase('miles')
  firstName: Observable<string>;

  @SentenceCase('johnson')
  lastName: Observable<string>;

  @NumberInput('0498092179aaaa')
  phoneNumber: Observable<string>;

  @ValidatePerson()
  errors$;

  @Next('errors$')
  @CreatePerson('firstName', 'lastName', 'phoneNumber')
  form$: Observable<Person>;

  constructor(fb: FormBuilder) {
    super(fb, new Person())
    this.initialize();
  }

  @Subscribe('form$')
  formSub(person: Person) {
    this.form.patchValue(person, { emitEvent: false });
  }

  @Subscribe('errors$')
  errors(error: PersonError) {
    console.log(error);
  }

  numbers() {
    console.log(this);
  }

  ngOnDestroy() {
    this.destroy();
  }
}
