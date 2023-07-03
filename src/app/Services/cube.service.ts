import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CubeService {

  constructor() { }

  scramble(depth: number): string {
    let sides = ['L', 'R', 'U', 'D', 'F', 'B'];
    const rotationDirection = ['', '\''];
    const numberOfRotations = ['', '', '', '2'];

    let sequence = '';
    let prevSide = '';

    for (let i = 0; i < depth; i++) {
      const num = numberOfRotations[Math.floor(Math.random() * numberOfRotations.length)];
      const side = sides[Math.floor(Math.random() * sides.length)];
      const turnDirection = rotationDirection[Math.floor(Math.random() * rotationDirection.length)];

      const move = ''.concat(side, num === '2' ? '2' : turnDirection);
      sequence = sequence.concat(move, ' ');

      if (prevSide != '') {
        sides.push(prevSide);
      }
      prevSide = side;
      let index = sides.indexOf(side);
      sides.splice(index, 1);
    }

    return sequence;
  }
}
