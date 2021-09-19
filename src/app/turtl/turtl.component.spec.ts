import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareInfo, TurtlComponent } from './turtl.component';

describe('TurtlComponent', () => {
  let component: TurtlComponent;
  let fixture: ComponentFixture<TurtlComponent>;
  const clientWidth = 2560;
  const clientHeight = 1289;
  const indexes: number[] = [];

  const squareSize = clientHeight < clientWidth ? clientHeight : clientWidth;

  const divWithId768Info = new SquareInfo(429, 1289, 636.5, 1);

  for (let index = squareSize; index > 0; index--) {
    // Only take odd numbers to consider 1px space in between
    if (index % 3 === 0) {
      indexes.push(index);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurtlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check how many squares it should fit for a resultion of 2560 x 1289', () => {
    // We take only odd numbers
    expect(indexes.length).toEqual(Math.floor(squareSize / 3));
  });

  it('should check the coordinates for div with id 1287', () => {
    // Find the node with id 1287
    let node = document.querySelectorAll(
      indexes.map((id: number) => `[id="${1287}"]`).join(', ')
    ) as unknown as HTMLElement[];

    let result: SquareInfo[] = [];

    // Get information about square element with id 1287
    node.forEach((element: HTMLElement) => {
      const rect = element.getBoundingClientRect();

      result.push(
        new SquareInfo(
          Number(element.id) / 3, // Considering that we take only odd numbers
          Number(element.id) + 2, // Considering that we take only odd numbers:  1289 is not dividable by 3 -> 1287 is dividable by 3
          rect.x + 17, // Considering the vertical scrollbar
          rect.y
        )
      );
    });
    expect(divWithId768Info).toEqual(result[0]);
  });
});
