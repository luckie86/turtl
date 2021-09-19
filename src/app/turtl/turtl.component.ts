import { AfterViewInit, Component } from '@angular/core';

export class SquareInfo {
  maxNumberOfSquares: number;
  edgeLength: number;
  xCoordinate: number;
  yCoordinate: number;

  constructor(
    maxNumberOfSquares: number,
    edgeLength: number,
    xCoordinate: number,
    yCoordinate: number
  ) {
    this.maxNumberOfSquares = maxNumberOfSquares;
    this.edgeLength = edgeLength;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
  }
}

@Component({
  selector: 'app-turtl',
  templateUrl: './turtl.component.html',
  styleUrls: ['./turtl.component.scss'],
})
export class TurtlComponent implements AfterViewInit {
  public indexes: number[] = [];
  public squareSize: number;
  public resultArray: SquareInfo[] = [];

  constructor() {
    // Get width and height of the document and also consider different browsers
    const width =
      document.documentElement.clientWidth ||
      window.innerWidth ||
      document.body.clientWidth;
    const height =
      document.documentElement.clientHeight ||
      window.innerHeight ||
      document.body.clientHeight;

    // Finding the smallest size which equals to the squareSize
    this.squareSize = width < height ? width : height;

    for (let index = this.squareSize; index > 0; index--) {
      // Only take odd numbers to consider 1px space in between
      if (index % 3 === 0) {
        this.indexes.push(index);
      }
    }
  }

  ngAfterViewInit(): void {
    // Get all the nodes from created squares
    let nodeList = document.querySelectorAll(
      this.indexes.map((id: number) => `[id="${id}"]`).join(', ')
    ) as unknown as HTMLElement[];

    // Find the x and y coordinates of elements and push it to results array
    nodeList.forEach((element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      this.resultArray.push(
        new SquareInfo(nodeList.length, rect.width, rect.x, rect.y)
      );
    });

    console.log(this.resultArray);
  }
}
