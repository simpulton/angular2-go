import {
    Component,
    NgFor,
    NgIf,
    View,
    Directive,
    ElementRef,
    Attribute,
    NgStyle
} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {CharacterService} from './character-service';
import {Character} from './character';

@Directive({
  // using [ ] means selecting an attribute
  selector: '[x-large]'
})
class XLarge {
  constructor(element: ElementRef) {
    element.nativeElement.style.fontSize = 'x-large';
  }
}


@Directive({
  // using [ ] means selecting an attribute
  selector: '[set-font]'
})
class SetFont {
  constructor(element: ElementRef, @Attribute('set-font') color: string) {
    element.nativeElement.style.color = color;
  }
}


@Component({ selector: 'my-characters' })
@View({
  directives: [
    NgFor,
    NgIf,
    XLarge,
    SetFont
  ],
  template: `
    <h2>Select a Character</h2>
    <ul class="characters">
      <li *ng-for="#character of characters" (click)="onSelect(character)">
        <span class="badge">{{character.id}}</span> {{character.name}}</a>
      </li>
    </ul>
    <span *ng-if="currentCharacter" x-large set-font="blue">
      {{currentCharacter.name | uppercase}} is my character
    </span>
  `,
  styles: [`
    .characters {list-style-type: none; margin-left: 1em; padding: 0; width: 14em;}
    .characters li { cursor: pointer; }
    .characters li:hover {color: #369; background-color: #EEE; }
  `]
})
export class CharactersComponent {
  private _characters: Character[];
  public currentCharacter: Character;

  constructor(private _characterService: CharacterService) { }

  get characters() {
    return this._characters || this.getCharacters()
  }

  onSelect(character: Character) { this.currentCharacter = character; }

  /////////////////

  private getCharacters() {
    this._characters = [];

    this._characterService.getCharacters()
      .then(characters => this._characters = characters);

    return this._characters;
  }
}
